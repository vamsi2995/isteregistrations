require("dotenv").config();   

const mongoose = require("mongoose");

const url = process.env.MONGO_URI;

const registrationSchema = new mongoose.Schema({
  name: { type: String, required: [true, "Required field"] },
  branch: { type: String, required: [true, "Required field"] },
  year: { type: Number, required: [true, "Required field"] },
  mobile: { type: Number, required: [true, "Required field"] },
  mail: { type: String, default: "No mail id" },
  amount: { type: Number, required: [true, "Required field"] },
  paymentMode: { type: String, required: [true, "Required field"] },
  date: {type: Date,default: Date.now()},
}, { collection: "IsteMembers" });

let connection = {};

connection.getRegistrationCollection = async () => {
  try {
    return (await mongoose.connect(url)).model("IsteMembers",registrationSchema);
  } catch (err) {
    let error = new Error("Could not connect to the database");
    error.status = 500;
    throw error;
  }
};

module.exports = connection;
