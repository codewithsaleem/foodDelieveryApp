import React, { Component } from "react";
import { Link } from "react-router-dom";
import http from "./httpServiceFoodDelievery.js";

class Signup extends Component {
    state = {
        newCustomer: { name: "", email: "", password: "", location: "" },
        errors: {},
    }
    handleChange = (e) => {
        let { currentTarget: input } = e;
        let s1 = { ...this.state };
        s1.newCustomer[input.name] = input.value;
        this.handleFocusValidation(e);
        this.setState(s1);
    }

    async register(url, obj) {
        try {
            let response = await http.post(url, obj);
            let { data } = response;
            this.props.history.push("/login");
        } catch (ex) {
            if (ex.response && ex.response.status === 400) {
                this.setState({ errorMsgs: ex.response.data })
            }
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        let { newCustomer } = this.state;
        let error = this.validateAll();
        if (this.isValid(error)) {
            this.register("/user", newCustomer);
        } else {
            let s1 = { ...this.state };
            s1.errors = error;
            this.setState(s1);
        }
    }

    isValid = (error) => {
        let key = Object.keys(error);
        let count = key.reduce((acc, curr) => (error[curr] ? acc + 1 : acc), 0);
        return count === 0;
    }

    validateAll = () => {
        let { name, email, password, location } = this.state.newCustomer;
        let errors = {};
        errors.name = this.handleName(name);
        errors.email = this.handleEmail(email);
        errors.password = this.handlePassword(password);
        errors.location = this.handleLocation(location);
        return errors;
    }

    handleFocusValidation = (e) => {
        let { currentTarget: input } = e;
        let s1 = { ...this.state };

        switch (input.name) {
            case "name": s1.errors.name = this.handleName(input.value); break;
            case "email": s1.errors.email = this.handleEmail(input.value); break;
            case "password": s1.errors.password = this.handlePassword(input.value); break;
            case "location": s1.errors.location = this.handleLocation(input.value); break;
            default: break;
        }
        this.setState(s1);
    }

    handleName = (name) => !name ? "Name is required" : "";
    handleEmail = (email) => !email ? "Email is required" : "";
    handlePassword = (password) => !password ? "Password is required" : "";
    handleLocation = (location) => !location ? "Location is required" : "";

    render() {
        let { name, email, password, location } = this.state.newCustomer;
        let { errors, errorMsgs = null } = this.state;

        return (
            <div className="container">
                <div className="jumbotron mt-3">
                    <div className="text-center">
                        <h2 className="text-secondary">Register</h2>
                        {errorMsgs ? <div className="text-danger mt-3">{errorMsgs}</div> : ""}
                    </div>
                    <form>
                        <div className="form-group">
                            <label>Username</label>
                            <input
                                className="form-control"
                                type="text"
                                name="name"
                                value={name}
                                onChange={this.handleChange}
                                onBlur={this.handleFocusValidation}
                            />
                            {errors.name ? <div className="text-danger">{errors.name}</div> : ""}
                        </div>

                        <div className="form-group">
                            <label>Email</label>
                            <input
                                className="form-control"
                                type="text"
                                name="email"
                                value={email}
                                onChange={this.handleChange}
                                onBlur={this.handleFocusValidation}
                            />
                            {errors.email ? <div className="text-danger">{errors.email}</div> : ""}
                        </div>

                        <div className="form-group">
                            <label>Password</label>
                            <input
                                className="form-control"
                                type="password"
                                name="password"
                                value={password}
                                onChange={this.handleChange}
                                onBlur={this.handleFocusValidation}
                            />
                            {errors.password ? <div className="text-danger">{errors.password}</div> : ""}
                        </div>

                        <div className="form-group">
                            <label>Location</label>
                            <input
                                className="form-control"
                                type="text"
                                name="location"
                                value={location}
                                onChange={this.handleChange}
                                onBlur={this.handleFocusValidation}
                            />
                            {errors.location ? <div className="text-danger">{errors.location}</div> : ""}
                        </div>

                        <div className="form-group text-center mt-4">
                            <button className="btn btn-success text-white mr-2 font-weight-bold rounded-pill" onClick={this.handleSubmit}>Signup</button>
                            <Link to="/login" className="btn btn-danger text-white font-weight-bold rounded-pill">Already Register</Link>
                        </div>

                    </form>
                </div>
            </div>
        )
    }
}
export default Signup;