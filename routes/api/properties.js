const express = require('express');
const router = express.Router();
const propertyController = require('../../controllers/api/properties');

router.get('/', propertyController.getProperty);

router.delete('/:id', propertyController.deleteFavoriteProperty);

router.post('/addFavoriteProperty', propertyController.addFavoriteProperty);

module.exports = router;
