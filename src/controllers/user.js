const { User } = require("../models");
const helper = require('./helper');

exports.addUser = async (req, res) => {
    // helper.addItem(res, req.body, User);
    try {
        const newItem = await User.create(req.body);
        // const itemWithoutPassword = removePassword(newItem.dataValues);
        res.status(201).set('Access-Control-Allow-Origin', '*').json(newItem);
    } catch (err) {
        res.status(404).set('Access-Control-Allow-Origin', '*').json({message: err});
    }
};

exports.getAllUsers = async (req, res) => {
    if (req.query.username) {
        const users = await User.findAll({
            where: {
                username: req.query.username
            }
        });
        if (!users) {
            return res.status(404).json({ message: `user '${req.query.username}' does not exist.` });
        }
    
        const [ userObject ] = users;
        res.status(200).set('Access-Control-Allow-Origin', '*').json(userObject);
    } else {
        helper.getAllItems(res, User);
    }
};

exports.getUser = async (req, res) => {
    helper.getItem(res, req.params.id, User);
};

exports.getUserByName = async (req, res) => {
    const user = await User.findAll({
        where: {
            username: req.params.username
        }
    });
    if (!user) {
        return res.status(404).json({ message: `user '${req.params.username}' does not exist.` });
    }

    res.status(200).json(user);
}

exports.updateUser = async (req, res) => {
    helper.updateItem(res, req.params.id, req.body, User);
};

exports.deleteUser = async (req, res) => {
    helper.deleteItem(res, req.params.id, User);
};