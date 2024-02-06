import React, { Component } from "react";
import { Link } from "react-router-dom";
import http from "./httpServiceFoodDelievery.js";
import auth from "./httpServiceFoodDelieveryAuth.js";

class Login extends Component {
    state = {
        newCustomer: { email: "", password: "" },
        errors: {},
    }
    handleChange = (e) => {
        let { currentTarget: input } = e;
        let s1 = { ...this.state };
        s1.newCustomer[input.name] = input.value;
        this.handleFocusValidation(e);
        this.setState(s1);
    }

    async login(url, obj) {
        try {
            let response = await http.post(url, obj);
            console.log("resp", response)

            let { data } = response;
            auth.login(data);
            this.props.history.push("/");
        }
        catch (ex) {
            if (ex.response && ex.response.status === 400) {
                this.setState({ errMsgs: ex.response.data });
            }
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        let { newCustomer } = this.state;
        let error = this.validateAll();
        if (this.isValid(error)) {
            this.login("/loginuser", newCustomer);
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
        let { email, password } = this.state.newCustomer;
        let errors = {};
        errors.email = this.handleEmail(email);
        errors.password = this.handlePassword(password);
        return errors;
    }

    handleFocusValidation = (e) => {
        let { currentTarget: input } = e;
        let s1 = { ...this.state };

        switch (input.name) {
            case "email": s1.errors.email = this.handleEmail(input.value); break;
            case "password": s1.errors.password = this.handlePassword(input.value); break;
            default: break;
        }
        this.setState(s1);
    }

    handleEmail = (email) => !email ? "Email is required" : "";
    handlePassword = (password) => !password ? "Password is required" : "";

    render() {
        let { email, password } = this.state.newCustomer;
        let { errors } = this.state;
        let { errMsgs = null } = this.state;

        return (
            <div className="container">
                <div className="jumbotron mt-3">
                    <div className="text-center">
                        <h2 className="text-secondary">Login</h2>
                    </div>
                    {errMsgs && <p className="text-danger text-center mt-3">{errMsgs}</p>}
                    <form>
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

                        <div className="form-group text-center mt-4">
                            <button className="btn btn-success text-white mr-2 font-weight-bold rounded-pill" onClick={this.handleSubmit}>Login</button>
                            <Link to="/signup" className="btn btn-danger text-white font-weight-bold rounded-pill">New User</Link> <br />
                            <Link to="/signup" className="text-primary mt-3">Forgot Password</Link>
                        </div>

                    </form>
                </div>
            </div>
        )
    }
}
export default Login;