const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const destinationSchema = new Schema({
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
                                                    // this is how mongodb recomends storing geographical coordinates
    location: {
      type: { type: String, default: "Point" },     // specifies that its a point geometry as per mongodb
      coordinates: {
        type: [Number],                              // an array, index 0 = longitude, index 1 = latiude.
        index: '2dsphere'                            // mongodb has methods that allow for complex geospartail queries, this line is needed for that
                                                    // it will likely be beyoud the scope of the project
      }
    }
  });
  
  module.exports = mongoose.model('Destination', destinationSchema);