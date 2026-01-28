const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const Listing = require("./models/listing");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const wrapAsync = require("./utils/wrapAsync");
const ExpressError = require("./utils/ExpressError");
const { listingSchema, reviewSchema } = require("./schema");
const Review = require("./models/review");
const listings = require("./routes/listing");
const reviews = require("./routes/review");

main()
  .then(() => {
    console.log("Connection successful");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/StayVista");
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public")));

app.use("/listings",listings);
app.use("/listings/:id/reviews",reviews);

//Home route
app.get(
  "/",
  wrapAsync(async (req, res) => {
    res.redirect("/listings");
  })
);

//Random route that doesn't exist
app.use((req, res, next) => {
  next(new ExpressError(404, "page not found"));
});

app.use((err, req, res, next) => {
  let { status = 500, message = "Something went wrong" } = err;
  res.status(status).render("error.ejs", { message });
  // res.status(status).send(message);
});

let port = 8080;
app.listen(port, () => {
  console.log(`Server is listening to the request on port ${port}`);
});
