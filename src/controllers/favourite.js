const { Favourite } = require('../models');
const helper = require('./helper');

exports.addFavourite = async (req, res) => {
    helper.addItem(res, req.body, Favourite);
}

exports.getAllFavourites = async (req, res) => {
    helper.getAllItems(res, Favourite);
}

exports.getFavourite = async (req, res) => {
    helper.getItem(res, req.params.id, Favourite);
};

exports.updateFavourite = async (req, res) => {
    helper.updateItem(res, req.params.id, req.body, Favourite);
};

exports.deleteFavourite = async (req, res) => {
    helper.deleteItem(res, req.params.id, Favourite);
};