const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema(
  {
    address: String,
    purchase_price: Number,
    property_id: String,
    property_post_code: String,
    area: Number,
    sold_date: Date,
    strata_lot_number: String,
    street_address: String,
    coordinates: {
      lat: Number,
      lon: Number,
    },
    travelTime: Number,
    distance: Number,
    transportation: String,
    user: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  },
  {
    timestamps: true,
  }
);

const Property = mongoose.model('Property', propertySchema);

module.exports = Property;
