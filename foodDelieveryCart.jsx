import React from "react";
import { useCart, useDispatchCart } from "./foodDelieveryContextReducer";
import http from "./httpServiceFoodDelievery.js";
import auth from "./httpServiceFoodDelieveryAuth.js";

function Cart() {
    let data = useCart();
    let dispatch = useDispatchCart();
    let user = auth.getUser();
    let totalPrice = data.reduce((acc, curr) => (acc + curr.price*curr.qty), 0);
console.log(totalPrice)
    const postToOrder = async (url, obj) => {
        let response = await http.post(url, obj);
        let { data } = response;
        if (response.status === 200) {
            dispatch({ type: "DROP" })
        }
        alert ("Your order has successfully created!");
    }

    const handleCheckOut = (e) => {
        e.preventDefault();
        let userEmail = user.email;
        postToOrder("/orders",
            {
                email: userEmail,
                order_data: data,
                order_date: new Date().toDateString()
            }
        )
    }

    return (
        < div className="container" >
            {!data || data.length === 0 ?
                <div className="fs-2 text-center mt-4">
                    No items in the cart!
                </div>
                :
                <React.Fragment>
                    <table class="table table-dark table-responsive-lg table-responsive-sm table-responsive-md">
                        <thead>
                            <tr>
                                <th scope="col" className="text-success">S.No.</th>
                                <th scope="col" className="text-success">Name</th>
                                <th scope="col" className="text-success">Category</th>
                                <th scope="col" className="text-success">Size</th>
                                <th scope="col" className="text-success">Quantity</th>
                                <th scope="col" className="text-success">Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((ele, index) => (
                                <tr key={index}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{ele.name}</td>
                                    <td>{ele.CategoryName}</td>
                                    <td>{ele.size}</td>
                                    <td>{ele.qty}</td>
                                    <td>{ele.price}</td>
                                    <td><i className="fa-solid fa-trash" onClick={() => { dispatch({ type: 'REMOVE', index: index }) }}></i></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div>
                        <h2 className="fs-3">Total Price : ₹{totalPrice}/-</h2>
                    </div>

                    <div>
                        <button className="btn btn-success font-weight-bold rounded-pill mt-3" onClick={handleCheckOut}>Order Now</button>
                    </div>
                </React.Fragment>
            }
        </div >
    )
}

export default Cart;