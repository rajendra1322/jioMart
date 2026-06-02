import "./Navigation.css"
import { Link, useLocation, useNavigate } from "react-router-dom"
import livenow from "./assets/livenow.png"
import every from "./assets/everything.webp"
import home from "./assets/home.webp"
import happy from "./assets/first.webp"
import fashion from "./assets/second.webp"
import phone from "./assets/third.webp"
import appliances from "./assets/fourth.webp"
import groceries from "./assets/fifth.webp"
import nine from "./assets/sixth.webp"
import global from "./assets/seven.webp"
import mb from "./assets/milk.webp"
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useEffect, useState } from "react"
import axios from "axios"
import toast from "react-hot-toast"
import pin from "./assets/locationnn.svg"
import bag from './assets/spbag.webp';
import MapPicker from "./Mappicker"
import {
    LocateFixed,
    MapPin,
    Menu,
    Search,
    ShieldCheck,
    ShoppingBag,
    User,
    X,
} from "lucide-react"
import ProductSkeleton from "./skeletons/ProductSkeleton"


function Navigation() {
    const navigatee = useNavigate();
    var settings = {
        dots: false,
        infinite: false,
        autoplay: true,
        autoplaySpeed: 3000,
        speed: 500,
        slidesToShow: 7,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 5,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 800,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    arrows: false,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    arrows: false,
                },
            },
        ],

    };
    const [showLocation, setshowLocaiton] = useState(false);
    const [showcart, setShowcart] = useState(false);
    const [cart, setCart] = useState([]);
    const [showpincode, setShowpincode] = useState(false);
    const location = useLocation();
    const [userData, setUserData] = useState(null);
    const [products, setProducts] = useState([]);
    const [productsLoading, setProductsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [showSearchResults, setShowSearchResults] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const localdatas = JSON.parse(localStorage.getItem("cart")) || [];
                if (localdatas.length === 0) {
                    setCart([]);
                    return;
                }
                const ids = localdatas.map(item => item.productId);
                const res = await axios.post("https://backend-fgbg.onrender.com/getproductbyId", { ids });

                const updatedcart = res.data.map(product => {
                    const cartItem = localdatas.find(c => c.productId == product._id.toString());

                    return {
                        ...product,
                        quantity: cartItem.quantity
                    }
                });
                setCart(updatedcart);
            }
            catch (err) {
                console.log(err)
            }


        };
        fetchData();
        window.addEventListener("cartUpdated", fetchData);
        return () => { window.removeEventListener("cartUpdated", fetchData) };
    }, [])

    const totalAmount = cart.reduce((sum, item) => {
        return sum + (item.quantity * item.price);
    }, 0);
    const totalQuantity = cart.length;
    const isVaild = cart.length > 0;
    const toggleCart = () => {
        setShowcart((prev) => !prev);
        window.dispatchEvent(new Event("updatedCart"));
    }

    const handlepinclick = (e) => {
        e.preventDefault();
        setShowpincode(true);
        setshowLocaiton(false);
    }
    const [pinn, setPinc] = useState("");
    const isValid = pinn.length === 6;
    const handlepinsave = (e) => {
        e.preventDefault();
        try {
            localStorage.setItem("pincode", pinn);
            window.dispatchEvent(new Event("updatedCart"));

            navigatee("/");
            setShowpincode(false);
            setshowLocaiton(false);

        } catch (err) {
            console.log(err);
        }

    }

    const currentpin = localStorage.getItem("pincode");
    let place;
    if (currentpin >= 560001 && currentpin <= 562101) {

        place = "Bangalore..";
    }
    else if (currentpin >= 574201 && currentpin <= 575001) {
        place = "Dakshina.."
    }

    const handleCart = () => {
        navigatee("/Cartdetails");
    }



    async function fetchData() {
        try {
            const token = localStorage.getItem("token");

            if (!token) return;

            const res = await axios.get(
                "https://backend-fgbg.onrender.com/getuser",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            if (res.data) {
                setUserData(res.data);
            }

        } catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        fetchData();
    }, []);


    useEffect(() => {

        if (location.state?.showToast) {
            toast.success("product placed sucessfully...");
            navigatee(".", { replace: true, state: null });

        }
    }, [location, navigatee])

    const handleAccount = () => {
        navigatee("/Useraccount");
    }

    const [mapLocation, setmapLocation] = useState(null);
    const [locationQuery, setLocationQuery] = useState("");
    const [locationResults, setLocationResults] = useState([]);
    const [locationSearching, setLocationSearching] = useState(false);

    useEffect(() => {
        axios.get("https://backend-fgbg.onrender.com/fetchProduct")
            .then((res) => setProducts(Array.isArray(res.data) ? res.data : []))
            .catch((err) => console.log("product search api error", err))
            .finally(() => setProductsLoading(false));
    }, []);

    const filteredProducts = searchQuery.trim()
        ? products
            .filter((item) => {
                const term = searchQuery.toLowerCase();
                return (
                    item.name?.toLowerCase().includes(term) ||
                    item.description?.toLowerCase().includes(term)
                );
            })
            .slice(0, 6)
        : [];

    const openProduct = (product) => {
        setSearchQuery("");
        setShowSearchResults(false);
        navigatee(`/Productdetails/${product._id}`);
    };

    const handleProductSearch = (e) => {
        e.preventDefault();

        if (!searchQuery.trim()) return;
        if (filteredProducts.length > 0) {
            openProduct(filteredProducts[0]);
            return;
        }

        toast.error("No matching product found.");
    };

    const searchLocation = async (e) => {
        e.preventDefault();
        if (!locationQuery.trim()) return;

        setLocationSearching(true);
        try {
            const res = await fetch(
                `https://nominatim.openstreetmap.org/search?format=json&limit=5&q=${encodeURIComponent(locationQuery)}`
            );
            const data = await res.json();
            setLocationResults(Array.isArray(data) ? data : []);
            if (!data?.length) toast.error("No location found.");
        } catch (err) {
            console.log(err);
            toast.error("Location search failed.");
        } finally {
            setLocationSearching(false);
        }
    };

    const selectLocationResult = (result) => {
        const nextLocation = {
            lat: Number(result.lat),
            lng: Number(result.lon),
        };
        setmapLocation(nextLocation);
        setAddress(result.display_name);
        setLocationResults([]);
        setLocationQuery(result.display_name);
    };

    const getAddress = async (lat, lng) => {
        try {
            const res = await fetch(
                `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
            );
            const data = await res.json();
            return data.display_name || "Address not found";
        } catch (err) {
            console.log(err);
            return "Error fetching address";
        }
    };

    
    const [loading, setLoading] = useState(false);
    const handleSave = async () => {
        if (!mapLocation) {
            toast.error("Please search or select a location on the map.");
            return;
        }

        setLoading(true);

        const addr = await getAddress(mapLocation.lat, mapLocation.lng);

        setAddress(addr);

        localStorage.setItem("userAddress", addr);
        localStorage.setItem("userLocation", JSON.stringify(mapLocation));

        setLoading(false);
    };
    const handleContinue = () => {
        setshowLocaiton(false);

        
    };
    const [address, setAddress] = useState("");
    useEffect(() => {
        const savedAddress = localStorage.getItem("userAddress");
        const savedLocation = localStorage.getItem("userLocation");

        if (savedAddress && savedLocation) {
            setAddress(savedAddress);
            setmapLocation(JSON.parse(savedLocation));
        }
    }, []);






    return (
        <>

            <nav className="navbar">
                <div className="main">
                    <div className="navbarleft">
                        <Link to="/">
                            <div className="jiologorajmart">
                                <img src={bag} alt="jiomartlogo" className="logoleft" />
                                <p className="jiologoname">RajMart</p>
                            </div>
                        </Link>

                    </div>
                    <div className="navbarmiddle">
                        <form className="middlemain" onSubmit={handleProductSearch}>

                            <button className="search" type="submit" aria-label="Search products">
                                <Search className="searchicons" />

                            </button>
                            <div className="text">
                                <input
                                    type="text"
                                    placeholder="Search for groceries, mobiles, fashion..."
                                    className="searchtext"
                                    value={searchQuery}
                                    onChange={(e) => {
                                        setSearchQuery(e.target.value);
                                        setShowSearchResults(true);
                                    }}
                                    onFocus={() => setShowSearchResults(true)}
                                />


                            </div>

                            <button className="hamburger" type="button" aria-label="Browse menu">
                                <Menu className="iconham" />

                            </button>

                            {showSearchResults && searchQuery.trim() && (
                                <div className="searchResults">
                                    {productsLoading ? (
                                        <>
                                            <ProductSkeleton compact />
                                            <ProductSkeleton compact />
                                            <ProductSkeleton compact />
                                        </>
                                    ) : filteredProducts.length > 0 ? (
                                        filteredProducts.map((item) => (
                                            <button
                                                type="button"
                                                className="searchResultItem"
                                                key={item._id}
                                                onMouseDown={() => openProduct(item)}
                                            >
                                                <img src={item.image} alt={item.name} />
                                                <span>
                                                    <strong>{item.name}</strong>
                                                    <small>₹{item.price}</small>
                                                </span>
                                            </button>
                                        ))
                                    ) : (
                                        <p className="noSearchResult">No products match "{searchQuery}"</p>
                                    )}
                                </div>
                            )}

                        </form>
                        <div className="rightmain">
                            <div className="rightnav" >
                                <div className="shopp" onClick={toggleCart}>
                                    <ShoppingBag className="shopping" />
                                    {totalQuantity > 0 && (
                                        <span className="quantityspan">{totalQuantity}</span>
                                    )}
                                    {showcart && (
                                        <div className="addoverlay">
                                            <div className="addpopup">
                                                <div className="addheadding">
                                                    <p className="addheaddingP">cart name</p>
                                                    <p>({totalQuantity}) Items</p>

                                                </div>

                                                {cart.map((item) => (
                                                    <div className="addpopupheader" key={item._id}>
                                                        <p className="addname">{item.name}</p>
                                                        <p className="addprice">{item.quantity}X{item.price}</p>

                                                    </div>


                                                ))}
                                                <div className="addtotaldiv">
                                                    <p className="addtotal">Total amount to be paid:</p>
                                                    <p className="addtotalamount">    {totalAmount}</p>


                                                </div>
                                                <button className={`addtobtn ${isVaild ? "enabled" : ""}`} onClick={handleCart} disabled={!isVaild} >Proceed to Cart</button>

                                            </div>
                                        </div>
                                    )}

                                </div>



                                {userData ? (

                                    <span className="firstletter" onClick={handleAccount}>
                                        {userData?.email?.charAt(0).toUpperCase() || "M"}
                                    </span>

                                ) : (
                                    <Link to="/Signin">
                                        <div className="userlogo">
                                            <User className="user" />
                                            <span className="intext">SignIn</span>
                                        </div>
                                    </Link>
                                )}



                                <Link to="/Admin">
                                    <span className="admin"><ShieldCheck size={18} />Admin</span>
                                </Link>

                            </div>

                        </div>
                    </div>
                </div>
            </nav>

            <div className="location" onClick={() => { setshowLocaiton(true) }}>
                <p className="deliveryText">Scheduled delivery to:
                    <strong> {address ? address.split(",").slice(0, 2).join(", ") : `${place || ""}${currentpin || "Select location"}`}</strong>

                    <span className="arrow">▼</span>

                </p>




            </div>
            {showLocation && (
                <div className="locationModal">

                    <div className="locationPanel">


                        <div className="locationPanelHeader">
                            <h2>
                                Select Delivery Location
                            </h2>
                            <button
                                onClick={() => setshowLocaiton(false)}
                                className="locationClose"
                                aria-label="Close location"
                            >
                                <X size={18} />
                            </button>
                        </div>


                        <p className="locationHelp">
                            Set your delivery location to check availability, offers and discounts.
                        </p>

                        <form className="locationSearchBox" onSubmit={searchLocation}>
                            <MapPin size={18} />
                            <input
                                type="text"
                                placeholder="Search area, city or landmark"
                                value={locationQuery}
                                onChange={(e) => setLocationQuery(e.target.value)}
                            />
                            <button type="submit" disabled={locationSearching}>
                                {locationSearching ? "Searching" : "Search"}
                            </button>
                        </form>

                        {locationResults.length > 0 && (
                            <div className="locationResults">
                                {locationResults.map((item) => (
                                    <button
                                        type="button"
                                        key={item.place_id}
                                        onClick={() => selectLocationResult(item)}
                                    >
                                        <MapPin size={16} />
                                        <span>{item.display_name}</span>
                                    </button>
                                ))}
                            </div>
                        )}


                        <button className="signinLocationBtn">
                            Sign In to select address
                        </button>


                        <div className="locationDivider">
                            <div></div>
                            <span>OR</span>
                            <div></div>
                        </div>


                        <div
                            onClick={handlepinclick}
                            className="pincodeChoice"
                        >
                            <img src={pin} alt="pin" className="w-5 h-5" />
                            <span>
                                Enter a pincode
                            </span>
                        </div>


                        <div className="mapCard">
                            <div className="mapFrame">
                                <MapPicker setLocation={setmapLocation} selectedLocation={mapLocation} />
                            </div>

                            <button
                                onClick={handleSave}
                                disabled={!mapLocation || loading}
                                className="useLocationBtn"
                            >
                                <LocateFixed size={17} />
                                {loading ? "Fetching Address..." : "Use This Location"}
                            </button>
                        </div>


                        {address && (
                            <div className="selectedAddress">
                                <p>
                                    Selected Address:
                                </p>
                                <span>
                                    {address}
                                </span>

                                <button
                                    onClick={handleContinue}
                                    className="continueLocationBtn"
                                >
                                    Continue
                                </button>
                            </div>
                        )}

                    </div>
                </div>
            )}
            {showpincode && (
                <div className="overlay">
                    <div className="popup">
                        <div className="popupincode">
                            <h2 className="h2pin">Enter PIN Code</h2>
                            <p className="ppin">Enter PIN code to see product availability, offers and discounts.</p>
                            <p className="ppinn">Pin code</p>
                            <input type="text" placeholder="Enter your pincode" className="inputpin" value={pinn} onChange={(e) => setPinc(e.target.value)} maxLength={6} />
                            <button className={`btnpin ${isValid ? "enabled" : ""}`} onClick={handlepinsave} >Apply</button>

                        </div>
                    </div>
                </div>

            )}

            <div className="topplaces">
                <Slider {...settings}>
                    <div className="itemstop">
                        <img src={livenow} alt="livenow logo" className="imagetop" />
                        <a href="/" className="atop">Live Now</a>
                    </div>
                    <div className="itemstop">
                        <img src={every} alt="" className="imagetop" />
                        <a href="/" className="atop">Everything store</a>
                    </div>
                    <div className="itemstop">
                        <img src={home} alt="" className="imagetop" />
                        <a href="/" className="atop">Home&Styles</a>
                    </div>
                    <div className="itemstop">
                        <img src={happy} alt="" className="imagetop" />
                        <a href="/" className="atop">Happy Hour Sale</a>
                    </div>
                    <div className="itemstop">
                        <img src={fashion} alt="" className="imagetop" />
                        <a href="/" className="atop">Fashion</a>
                    </div>
                    <div className="itemstop">
                        <img src={phone} alt="" className="imagetop" />
                        <a href="/" className="atop">Smartphone</a>
                    </div>
                    <div className="itemstop">
                        <img src={appliances} alt="" className="imagetop" />
                        <a href="/" className="atop">Electronics</a>
                    </div>
                    <div className="itemstop">
                        <img src={groceries} alt="" className="imagetop" />
                        <a href="/" className="atop">Groceries</a>
                    </div>
                    <div className="itemstop">
                        <img src={nine} alt="" className="imagetop" />
                        <a href="/" className="atop">99To999</a>
                    </div>
                    <div className="itemstop">
                        <img src={global} alt="" className="imagetop" />
                        <a href="/" className="atop">Global Store</a>
                    </div>
                    <div className="itemstop">
                        <img src={mb} alt="" className="imagetop" />
                        <a href="/" className="atop">Milkbasket</a>
                    </div>
                </Slider>
            </div>
            <div className="hrline">
            </div>


        </>
    );

}

export default Navigation
