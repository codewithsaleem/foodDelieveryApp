const express = require("express");
const bcrypt = require("bcryptjs");
const app = express();
app.use(express.json());

// Enable CORS for all routes
const cors = require('cors');
app.use(cors());

//Database MongoDB Connection:-
const mongoDB = require("./serverNodeFoodDelieveryDB.js");
mongoDB();

//Middleware:-
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.header(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, PATCH, HEAD, OPTIONS",
    );
    next();
})

var port = process.env.PORT || 2450;
app.listen(port, () => console.log(`Node app listening on port ${port}`));


const User = require("./serverNodeFoodDelieverySchema.js");
const Orders = require("./serverNodeFoodDelieverySchemaOrders.js");
let userEmailData = "";

//RESTapi's for user:-
app.post("/user", async function (req, res) {
    let body = req.body;

    //Secure Password in hashing form:-
    let salt = await bcrypt.genSalt(10);
    let securePass = await bcrypt.hash(body.password, salt);

    try {
        let userData = await User.findOne({ email: body.email });
        if (userData) {
            let pwdCompare = await bcrypt.compare(body.password, userData.password);
            if (!pwdCompare && !userData.email) {
                User.create({
                    name: body.name,
                    location: body.location,
                    email: body.email,
                    password: securePass
                })
                res.json({ success: true })
            } else {
                res.status(400).send("You have already signed! Plz Login");
            }
        } else {
            User.create({
                name: body.name,
                location: body.location,
                email: body.email,
                password: securePass
            })
            res.json({ success: true })
        }
    } catch (error) {
        res.status(400).send("Invalid Credentials!!");
    }

})
app.post("/loginuser", async function (req, res) {
    let body = req.body;
    userEmailData = body.email;

    try {
        let userData = await User.findOne({ email: body.email });

        if (!userData) {
            return res.status(400).send("Invalid Credentials!!")
        }
        let pwdCompare = await bcrypt.compare(body.password, userData.password);
        console.log(pwdCompare)
        if (!pwdCompare) {
            return res.status(400).send("Invalid Credentials!!");
        } else {
            return res.send(body);
        }
    }
    catch (error) {
        res.status(400).send("Invalid Credentials!!");
    }
})

//REST Api's for food data and category:-
app.get("/foodData", async function (req, res) {
    const { food_items, food_category } = await mongoDB();

    try {
        res.send([food_items, food_category])
    } catch (error) {
        res.json({ success: false })
    }
})

//REST Api's for orders:-
app.post("/orders", async function (req, res) {
    let data = req.body.order_data;
    await data.splice(0, 0, { Order_date: req.body.order_date });

    //If email not existing in the db then create:-
    let eId = await Orders.findOne({ "email": req.body.email });
    if (eId === null) {
        try {
            await Orders.create({
                email: req.body.email,
                order_data: [data]
            }).then(() => {
                res.json({ success: true })
            })
        } catch (error) {
            res.send("Servor Error", error.message)
        }
    } else {
        try {
            await Orders.findOneAndUpdate({ email: req.body.email, },
                { $push: { order_data: data } }).then(() => {
                    res.json({ success: true })
                })
        } catch (error) {
            res.send("Servor Error", error.message)
        }
    }
})

//API for myorders:-
app.get("/myOrders", async function (req, res) {
    let body = req.body;

    try {
        let orderData = await Orders.findOne({ "email": userEmailData });
        res.send(orderData)
        console.log("orderData", orderData);
    } catch (error) {
        res.send("Server error", error.message);
    }
})
