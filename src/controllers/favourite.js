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

exports.deleteFavouriteWithQueries = async (req, res) => {
    const { userid, placexid } = req.query;

    if (!(userid || placexid)) {
        res.status(404).json({ message: 'Incorrect query parameters - use userid and placexid' });
    }

    try {
        const deletedItems = await Favourite.findAll({ where: {
            UserId: userid,
            placeXid: placexid
        } });
    
        const deletedRows = await Favourite.destroy({ where: {
            UserId: userid,
            placeXid: placexid
        }});
    
        if(!deletedRows) {
            return res.status(404).json({ message: `Favourite with user ID ${userid} and XID ${placexid} doesn't exist` });
        }
    
        res.status(204).json(deletedItems);
    } catch (error) {
        res.status(500).json(error);
    }

};