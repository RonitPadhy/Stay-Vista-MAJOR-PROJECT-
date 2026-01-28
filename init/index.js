const mongoose = require("mongoose");
const initData = require("./data");
const Listing = require("../models/listing");

main().then(() =>{
    console.log("Connection successful");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/StayVista');
}

const initDB = async() => {
    await Listing.deleteMany({});
    await Listing.insertMany(initData.data); //initData is itself an object 
    console.log("Data was initialised");
}

initDB();