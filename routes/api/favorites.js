const express = require('express');
const router = express.Router();
const favoriteController = require('../../controllers/api/favourites');

router.post('/', favoriteController.create);
router.get('/', favoriteController.index);


module.exports = router;