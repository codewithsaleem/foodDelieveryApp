import React, { useState, useRef, useEffect } from 'react'
import { useDispatchCart, useCart } from './foodDelieveryContextReducer.jsx'

export default function Card(props) {
  let data = useCart();
  const [qty, setQty] = useState(1)
  const [size, setSize] = useState("")
  const priceRef = useRef();

  let options = props.options;
  let priceOptions = Object.keys(options);
  let foodItem = props.foodItem;
  const dispatch = useDispatchCart();

  const handleQty = (e) => {
    setQty(e.target.value);
  }
  const handleOptions = (e) => {
    setSize(e.target.value);
  }
  const handleAddToCart = async () => {
    let food = []
    for (const item of data) {
      if (item.id === foodItem._id) {
        food = item;

        break;
      }
    }
    console.log(food)
    console.log(new Date())
    if (food) {
      if (food.size === size) {
        await dispatch({ type: "UPDATE", id: foodItem._id, price: finalPrice, qty: qty })
        return
      }
      else if (food.size !== size) {
        await dispatch({ type: "ADD", id: foodItem._id, name: foodItem.name, CategoryName: foodItem.CategoryName, price: finalPrice, qty: qty, size: size, img: foodItem.img })
        return
      }
      return
    }
    await dispatch(
      {
        type: "ADD", id: foodItem._id, CategoryName: foodItem.CategoryName, name: foodItem.name, img: foodItem.img, price: finalPrice, qty: qty, size: size
      }
    )
  }

  useEffect(() => {
    setSize(priceRef.current.value)
  }, [])


  let finalPrice = qty * parseInt(options[size]);   //This is where Price is changing

  return (
    <div className='text-center'>

      <div className="card mt-3 rounded" style={{ width: "16rem", maxHeight: "360px" }}>
        <img src={foodItem.img} className="card-img-top" alt="..." style={{ height: "150px", objectFit: "cover" }} />
        <div className="card-body">
          <h5 className="card-title">{foodItem.name}</h5>

          {/* <p className="card-text">This is some random text. This is description.</p> */}
          <div className='container w-100 p-0' style={{ height: "38px" }}>
            <select className="m-2 h-100 w-20 bg-danger text-white font-weight-bold rounded" style={{ select: "#FF0000" }} onChange={handleQty} value={qty}>
              {Array.from(Array(6), (e, i) => {
                return (
                  <option key={i + 1} value={i + 1}>{i + 1}</option>)
              })}
            </select>
            <select className="m-2 h-100 w-20 bg-danger text-white font-weight-bold rounded" style={{ select: "#FF0000" }} ref={priceRef} onChange={handleOptions} value={size}>
              {priceOptions.map((i) => {
                return <option key={i} value={i}>{i}</option>
              })}
            </select>
            <div className=' d-inline ms-2 h-100 w-20 fs-5' >
              ₹{finalPrice}/-
            </div>
          </div>
          <hr></hr>
          <button className={`btn btn-success justify-center ms-2 font-weight-bold rounded-pill`} onClick={handleAddToCart}>Add to Cart</button>
        </div>
      </div>
    </div>
  )
}
//