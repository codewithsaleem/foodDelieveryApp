import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import auth from "./httpServiceFoodDelieveryAuth.js";
import Navbar from "./foodDelieveryNavbar";
import Footbar from "./foodDelieveryFootbar";
import Home from "./foodDelieveryHome";
import Signup from "./foodDelieverySignup";
import Login from "./foodDelieveryLogin";
import Logout from "./foodDelieveryLogout.jsx";
import { CartProvider } from "./foodDelieveryContextReducer.jsx";
import Cart from "./foodDelieveryCart.jsx";
import MyOrder from "./foodDelieveryMyOrder.jsx";

function MainComponent() {
    let user = auth.getUser();

    return (
        <React.Fragment>
            <CartProvider>
                <div>
                    <Navbar user={user} />
                </div>

                <div>
                    <Switch>
                        <Route path="/myOrder" component={MyOrder} />
                        <Route path="/mycart" component={Cart} />
                        <Route path="/signup" component={Signup} />
                        <Route path="/logout" component={Logout} />
                        <Route path="/login" component={Login} />
                        <Route path="/" component={Home} />
                        <Redirect from="" to="/" />
                    </Switch>
                </div>
            </CartProvider>

            <div>
                <Footbar />
            </div>
        </React.Fragment>
    )
}

export default MainComponent;