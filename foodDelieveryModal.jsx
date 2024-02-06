import React from "react";
import ReactDom from "react-dom";

const MODAL_STYLES = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    borderRadius: '20px',
    backgroundColor: 'rgba(232,232,232)',
    transform: 'translate(-50%, -50%)',
    zIndex: 1000,
    height: '90%',
    width: '90%'
}

// const OVERLAY_STYLES = {
//     position: 'fixed',
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//     backgroundColor: 'rgba(0, 0, 0, .7)',
//     transform: 'translate(-50%, -50%)',
//     zIndex: 1000,
// }

export default function Model({ children, onClose }) {
    return ReactDom.createPortal(
        <React.Fragment>
            {/* <div style={OVERLAY_STYLES} /> */}
            <div style={MODAL_STYLES}>
                <button className="btn btn-sm btn-danger fs-4 mb-4" style={{ marginLeft: "90%", marginTop: "20px" }} onClick={onClose}>X</button>
                {children}
            </div>
        </React.Fragment>,
        document.getElementById("cart-root")
       )
}