const express = require('express');
const favouriteController = require('../controllers/favourite');

const router = express.Router();

router.post('', favouriteController.addFavourite);
router.get('', favouriteController.getAllFavourites);
router.get('/:id', favouriteController.getFavourite);
router.patch('/:id', favouriteController.updateFavourite);
router.delete('/:id', favouriteController.deleteFavourite);
router.delete('/', favouriteController.deleteFavouriteWithQueries)

module.exports = router;