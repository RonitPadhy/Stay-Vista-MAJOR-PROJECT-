require("dotenv").config();

const mongoose = require("mongoose");
const Listing = require("./models/listing");
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");

const mapToken = process.env.MAP_TOKEN;

const geocodingClient = mbxGeocoding({
  accessToken: mapToken,
});

// 🔗 Connect DB
mongoose
  .connect("mongodb://127.0.0.1:27017/StayVista")
  .then(() => console.log("DB Connected"))
  .catch((err) => console.log(err));

const fixListings = async () => {
  const listings = await Listing.find({});

  for (let listing of listings) {
    // 👉 Only fix broken ones
    if (
      !listing.geometry ||
      !listing.geometry.coordinates ||
      listing.geometry.coordinates.length === 0
    ) {
      try {
        console.log("Fixing:", listing.title);

        let response = await geocodingClient
          .forwardGeocode({
            query: listing.location,
            limit: 1,
          })
          .send();

        let geoData = response.body.features[0].geometry;

        // ✅ Fix geometry properly
        listing.geometry = geoData;

        await listing.save();

        console.log("✅ Fixed:", listing.title);
      } catch (err) {
        console.log("❌ Error fixing:", listing.title);
      }
    }
  }

  console.log("🎉 Done fixing all listings");
  mongoose.connection.close();
};

fixListings();