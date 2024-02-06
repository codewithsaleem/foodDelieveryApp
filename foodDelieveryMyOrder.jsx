import React, { useEffect, useState } from "react";
import http from "./httpServiceFoodDelievery.js";
import { Link } from "react-router-dom";
function MyOrder(props) {
    const [myOrder, setMyOrder] = useState("");
    const fetchData = async () => {
        let response = await http.get("/myOrders");
        let { data } = response;
        setMyOrder(data);
    }
    useEffect(() => {
        fetchData();
    }, [])

    return (
        <div className="container mt-3">
            {myOrder ?
                <div>
                    <h2 className="text-center">List of Orders</h2>
                    <p className="text-center font-weight-bold text-secondary">{myOrder.email}</p>
                    {myOrder.order_data.map((item) =>
                        <div className="row mb-3" style={{ backgroundColor: 'rgb(242, 240, 235)' }}>
                            {
                                item.map((ele) => {
                                    return (
                                        // <div key={ele.Order_date}>

                                        ele.Order_date ?
                                            <React.Fragment>
                                                <div className="font-weight-bold fs-5 text-secondary mb-2">
                                                   Order Date : {ele.Order_date}
                                                </div>
                                            </React.Fragment>
                                            :
                                            (
                                                <div className="col-12 col-md-6 col-lg-4">
                                                    <div className="card rounded mb-3 text-center" style={{ width: '20rem', maxHeight: '350px' }}>
                                                        <img src={ele.img} className="card-img-top" alt="..." style={{ height: '150px', objectFit: 'cover' }} />
                                                        <div className="card-body">
                                                            <h5 className="card-title">{ele.name}</h5>
                                                            <p>
                                                                Quantity : {ele.qty} <br />
                                                                Size : {ele.size} <br />
                                                                Price : ₹{ele.price}/-
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            )

                                        // </div>
                                    )
                                })
                            }
                        </div>
                    )
                    }
                </div>
                : <div className="fs-2 text-center mt-4">
                    You have not ordered yet! <br />
                    <Link className="btn btn-success text-white font-weight-bold mb-4 mt-3 rounded-pill" to="/"><i className="fa-sharp fa-solid fa-cart-shopping"></i> Order Now</Link>
                </div>}

        </div>
    )
}

export default MyOrder;