import React, { useEffect } from "react";
import auth from "./httpServiceAdminFacultyAuth.js";

function Logout() {
    useEffect(() => {
        auth.logout();
        window.location = "/login";
    }, [])
    return("")
}

export default Logout;