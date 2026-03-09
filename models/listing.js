const mongoose = require("mongoose");
const { Schema } = mongoose;
const Review = require("./review");

const listingSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  image: {
    type: String,
    default:
      "https://media.istockphoto.com/id/2189735845/photo/serene-urban-lake-with-reflections-of-clouds-and-buildings-under-a-blue-sky-bengaluru-india.jpg?s=2048x2048&w=is&k=20&c=Cru3wPuuIOnHPO5dIwD79Xxn0qJabJs7DRm7wa82bH4=",
    set: (v) =>
      v === ""
        ? "https://media.istockphoto.com/id/2189735845/photo/serene-urban-lake-with-reflections-of-clouds-and-buildings-under-a-blue-sky-bengaluru-india.jpg?s=2048x2048&w=is&k=20&c=Cru3wPuuIOnHPO5dIwD79Xxn0qJabJs7DRm7wa82bH4="
        : v,
  },
  price: {
    type: Number,
    required: true,
  },
  location: {
    type: String,
  },
  country: {
    type: String,
  },
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

listingSchema.post("findOneAndDelete", async (listing) => {
  if (listing) {
    await Review.deleteMany({ _id: { $in: listing.reviews } });
  }
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
