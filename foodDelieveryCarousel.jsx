import React from "react";

function Carousels() {
    return (
        <React.Fragment>
            <div id="carouselExampleControls" className="carousel slide" data-ride="carousel" style={{ objectFit: 'contain !important' }}>
                <div className="carousel-inner" style={{ maxHeight: '350px' }}>

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
        </React.Fragment>
    )
}

export default Carousels;