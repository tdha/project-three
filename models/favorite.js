const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const favouriteSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    address: { type: String},
    purchasePrice: {type: String},
    travelTime: {type: String},
    distance: { type: String},
    transportation: { type: String},
    postCode: { type: Number},
    property: { type: Number},
   }, {
      timestamps: true
    });
  
  module.exports = mongoose.model('Favourite', favouriteSchema);