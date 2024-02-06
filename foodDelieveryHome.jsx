import React, { useEffect, useState } from "react";
import http from "./httpServiceFoodDelievery.js";
import Card from "./foodDelieveryCard";

function Home() {
    const [foodItems, setFoodItems] = useState([]);
    const [foodCategory, setFoodCategory] = useState([]);
    const [search, setSearch] = useState("");

    const fetchData = async () => {
        let response = await http.get("/foodData");
        let { data } = response;
        setFoodItems(data[0]);
        setFoodCategory(data[1]);
    }

    useEffect(() => {
        fetchData();
    }, [])
    
    return (
        <React.Fragment>
            {/* //Carousel */}
            <div id="carouselExampleControls" className="carousel slide" data-ride="carousel" style={{ objectFit: 'contain !important' }}>
                <div className="carousel-inner" style={{ maxHeight: '350px' }}>

                    <div className="carousel-caption">
                        <input
                            className="form-control mr-sm-2 bg-success text-white font-weight-bold"
                            type="search"
                            placeholder="Search by Food Name"
                            aria-label="Search"
                            value={search}
                            onChange={(e) => { setSearch(e.target.value) }}
                        />
                    </div>

                    <div className="carousel-item active">
                        <img className="d-block w-100" src="https://source.unsplash.com/random/900x700/?burger" alt="First slide" />
                    </div>
                    <div className="carousel-item">
                        <img className="d-block w-100" src="https://source.unsplash.com/random/900x700/?pastry" alt="Second slide" />
                    </div>
                    <div className="carousel-item">
                        <img className="d-block w-100" src="https://source.unsplash.com/random/900x700/?barbeque" alt="Third slide" />
                    </div>
                </div>
                <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="sr-only">Previous</span>
                </a>
                <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="sr-only">Next</span>
                </a>
            </div>

            <div className="container p-4 mt-2 mb-2" style={{backgroundColor: 'rgb(242, 240, 235)'}}>
                {
                    foodCategory.length > 0 ?
                        foodCategory.map((c1, index1) => (
                            <React.Fragment>
                                <div className="row" key={c1._id}>
                                    <div className="fs-5 mb-2 font-weight-bold text-secondary">
                                        {c1.CategoryName}
                                    </div>
                                    <hr />

                                    {
                                        foodItems.length > 0 ?
                                            foodItems.filter((ele, index) => (ele.CategoryName === c1.CategoryName) && (ele.name.toLowerCase().includes(search.toLowerCase())))
                                                .map((items) => (
                                                    <div key={items._id} className="col-sm-12 col-md-6 col-lg-3">
                                                        <Card
                                                            foodItem={items}
                                                            options={items.options[0]}
                                                        />
                                                    </div>
                                                ))
                                            : <div className="fs-2">No Such Data Found</div>
                                    }
                                </div>
                            </React.Fragment>
                        ))
                        : ""
                }
            </div>
        </React.Fragment>
    )
}

export default Home;