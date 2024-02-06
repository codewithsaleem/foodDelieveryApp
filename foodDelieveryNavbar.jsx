import React, { useState } from "react";
import { Link } from "react-router-dom";
import Model from "./foodDelieveryModal";
import Cart from "./foodDelieveryCart";
import { useCart } from "./foodDelieveryContextReducer";

function Navbar(props) {
    const [cartView, setCartView] = useState(false);
    let data = useCart();
    console.log("llll", data)
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-success" style={{ fontFamily: 'sans-serif' }}>
                <div className="container-fluid">
                    <Link className="navbar-brand fs-3 ms-2 fst-italic font-weight-bold" to="/"><i className="fa-solid fa-store"></i> Food Zone</Link>
                    <button className="navbar-toggler mr-3" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse ms-2" id="navbarNav">
                        <ul className="navbar-nav me-auto">
                            <li className="nav-item">
                                <Link className="nav-link active fs-5" aria-current="page" to="/home">Home</Link>
                            </li>

                            {props.user ?
                                <li className="nav-item">
                                    <Link className="nav-link fs-5" aria-current="page" to="/myOrder">MyOrder</Link>
                                </li>
                                : ""}
                        </ul>

                        <div className="d-flex">
                            {!props.user ?
                                <React.Fragment>
                                    <Link className="btn bg-white text-success mr-2 font-weight-bold" to="/login">Login</Link>
                                    <Link className="btn bg-white text-success mr-2 font-weight-bold" to="/signup">Signup</Link>
                                </React.Fragment>

                                :
                                <React.Fragment>
                                    <div className="btn bg-white text-success mr-2 font-weight-bold" onClick={() => { setCartView(true) }}>
                                        <i className="fa-sharp fa-solid fa-cart-shopping"></i> My Cart <span className="text-danger p-1">{data?.length || 0}</span>
                                    </div>
                                    {cartView ? <Model onClose={() => { setCartView(false) }}><Cart /></Model> : null}

                                    <Link className="btn bg-white text-danger mr-2 font-weight-bold" to="/logout">Logout</Link>
                                </React.Fragment>
                            }
                        </div>
                    </div>


                </div>
            </nav>
        </div>
    )
}

export default Navbar;
