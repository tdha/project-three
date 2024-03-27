const Property = require('../../models/property');
const User = require('../../models/user');

async function addFavoriteProperty(req, res) {
  try {
    const user = await User.findOne({ _id: req.user._id });
    const newFavorite = new Property({
      ...req.body.propertyData,
      user,
    });

    const savedFavorite = await newFavorite.save();
    res.status(201).json(savedFavorite);
  } catch (error) {
    console.error('Error adding favorite:', error);
    res.status(500).json({ message: 'Error adding favorite' });
  }
}

async function getProperty(req, res) {
  try {
    const favorites = await Property.find({ user: req.user._id });

    if (favorites.length > 0) {
      res.status(200).json(favorites);
    } else {
      res
        .status(404)
        .json({ message: 'No favorites properties found for this user' });
    }
  } catch (error) {
    console.error('Error getting favorites:', error);
    res.status(500).json({ message: 'Error getting favorites' });
  }
}

async function deleteFavoriteProperty(req, res) {
  try {
    console.log(req.params);
    const property = await Property.findOne({
      property_id: req.params.id,
      user: req.user._id,
    });

    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }

    const result = await Property.deleteOne({ _id: property._id });
    console.log(result);
    res.status(200).json({ message: 'Property deleted successfully' });
  } catch (error) {
    console.error('Error deleting property:', error);
    res.status(500).json({ message: 'Error deleting property' });
  }
}

module.exports = {
  addFavoriteProperty,
  getProperty,
  deleteFavoriteProperty,
};
