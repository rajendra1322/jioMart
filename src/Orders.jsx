

import React, { useEffect, useState } from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import { Modal, Box, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Adminhome from "./Adminhome";
import TableSkeleton from "./skeletons/TableSkeleton";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  
  const [openModal, setOpenModal] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);

  
  const [openAddressModal, setOpenAddressModal] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState([]);

  
  const fetchOrders = async () => {
    try {
      const res = await axios.get(
        "https://backend-fgbg.onrender.com/status/orders"
      );
      setOrders(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);
 


  
  const updateStatus = async (id, status) => {
    await axios.put(
      `https://backend-fgbg.onrender.com/status/${id}`,
      { status }
    );
    fetchOrders();
  };

  
  const rows = orders.map((item) => ({
    id: item._id,
    userId: item.users[0]?.id,
    totalProducts: item.products.length,
    total: item.totalamount,
    time: new Date(item.createdAt).toLocaleString(),
    address: item.deliveryaddress[0]?.area,
    mobile: item.users[0]?.phone,
    payment: item.paymentType,
    status: item.status,
    fullProducts: item.products,
    fullAddress: item.deliveryaddress,
  }));

 
  const columns = [
    { field: "userId", headerName: "User ID", width: 200 },

    {
      field: "totalProducts",
      headerName: "Products",
      width: 130,
      renderCell: (params) => (
        <button
          onClick={() => {
            setSelectedProducts(params.row.fullProducts);
            setActiveIndex(0);
            setOpenModal(true);
          }}
          style={{
            color: "#1976d2",
            cursor: "pointer",
            fontWeight: "600",
            border: "none",
            background: "transparent",
          }}
        >
          {params.value} items
        </button>
      ),
    },

    { field: "total", headerName: "Total", width: 120 },

    { field: "time", headerName: "Order Time", width: 200 },

    {
      field: "address",
      headerName: "Address",
      width: 180,
      renderCell: (params) => (
        <button
          onClick={() => {
            setSelectedAddress(params.row.fullAddress);
            setOpenAddressModal(true);
          }}
          style={{
            color: "#1976d2",
            cursor: "pointer",
            border: "none",
            background: "transparent",
          }}
        >
          {params.value}
        </button>
      ),
    },

    { field: "mobile", headerName: "Mobile", width: 150 },

    { field: "payment", headerName: "Payment", width: 130 },

    {
      field: "status",
      headerName: "Status",
      width: 180,
      renderCell: (params) => (
        <select
          value={params.value}
          disabled={params.value === "Delivered"}
          onChange={(e) =>
            updateStatus(params.row.id, e.target.value)
          }
          style={{
            padding: "5px",
            borderRadius: "5px",
          }}
        >
          <option>Placed</option>
          <option>Confirmed</option>
          <option>Packed</option>
          <option>Shipped</option>
          <option>Out for Delivery</option>
          <option>Delivered</option>
          <option>Cancelled</option>
        </select>
      ),
    },
  ];
 

  return (
    <div className="admin-page">
      <Adminhome />

      <div className="admin-content">
        <h2 className="admin-page-title">Order Details</h2>

        {loading ? (
          <TableSkeleton rows={8} columns={8} />
        ) : (
        <div className="admin-data-grid">
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={8}
            rowsPerPageOptions={[5, 8, 10]}
            disableRowSelectionOnClick
          />
        </div>
        )}
      </div>

     
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "min(600px, calc(100vw - 32px))",
            maxHeight: "90vh",
            overflowY: "auto",
            bgcolor: "white",
            borderRadius: 3,
            boxShadow: 24,
            p: 3,
          }}
        >
          <IconButton
            onClick={() => setOpenModal(false)}
            sx={{ position: "absolute", top: 10, right: 10 }}
          >
            <CloseIcon />
          </IconButton>

          {selectedProducts.length > 0 && (
            <>
              <img
                src={selectedProducts[activeIndex].image}
                alt=""
                style={{
                  width: "100%",
                  height: "300px",
                  objectFit: "contain",
                  borderRadius: "10px",
                }}
              />

              <div style={{ marginTop: "10px" }}>
                <h3>{selectedProducts[activeIndex].name}</h3>
                <p>Price: ₹{selectedProducts[activeIndex].price}</p>
                <p>Qty: {selectedProducts[activeIndex].quantity}</p>
                <p>
                  Category: {selectedProducts[activeIndex].category}
                </p>
              </div>

              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  marginTop: "15px",
                  overflowX: "auto",
                }}
              >
                {selectedProducts.map((prod, index) => (
                  <img
                    key={index}
                    src={prod.image}
                    alt=""
                    onClick={() => setActiveIndex(index)}
                    style={{
                      width: 60,
                      height: 60,
                      objectFit: "cover",
                      cursor: "pointer",
                      border:
                        activeIndex === index
                          ? "2px solid #1976d2"
                          : "1px solid #ccc",
                      borderRadius: "6px",
                    }}
                  />
                ))}
              </div>
            </>
          )}
        </Box>
      </Modal>

      
      <Modal
        open={openAddressModal}
        onClose={() => setOpenAddressModal(false)}
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "min(500px, calc(100vw - 32px))",
            maxHeight: "90vh",
            overflowY: "auto",
            bgcolor: "white",
            borderRadius: 3,
            boxShadow: 24,
            p: 3,
          }}
        >
          <IconButton
            onClick={() => setOpenAddressModal(false)}
            sx={{ position: "absolute", top: 10, right: 10 }}
          >
            ✕
          </IconButton>

          <h2 style={{ marginBottom: "15px" }}>Delivery Address</h2>

          {selectedAddress.map((addr, index) => (
            <div
              key={index}
              style={{
                borderBottom: "1px solid #eee",
                marginBottom: "10px",
                paddingBottom: "10px",
              }}
            >
              <p><strong>Name:</strong> {addr.Rname}</p>
              <p>
                <strong>Address:</strong> {addr.houseNumber}, {addr.building}
              </p>
              <p>{addr.address}, {addr.area}</p>
              <p><strong>Phone:</strong> {addr.Rnumber}</p>
              <p><strong>Pincode:</strong> {addr.pincode}</p>
            </div>
          ))}
        </Box>
      </Modal>
    </div>
  );
}

export default Orders;
