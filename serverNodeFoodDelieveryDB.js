const mongoose = require("mongoose");
const mongoURL =
    "mongodb+srv://goFood:Saleem%4012345@cluster0.4jm3du6.mongodb.net/goFoodMERN?retryWrites=true&w=majority";

const mongoDB = async () => {
    try {
        await mongoose.connect(mongoURL);
        console.log("Connected to MongoDB.....");

        const fetchedData = mongoose.connection.db.collection("food_items");
        const fetchedData1 = mongoose.connection.db.collection("food_category");

        const food_items = await fetchedData.find({}).toArray();
        const food_category = await fetchedData1.find({}).toArray();

        return { food_items, food_category };
    }

    catch (error) {
        console.error("Error connecting to MongoDB:", error.message);
    }
};
module.exports = mongoDB;