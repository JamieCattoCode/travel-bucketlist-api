const { User, Destination, List, Favourite } = require('../models');

const removePassword = (object) => {
    if(object.password) {
        delete object.password;
    }
    return object;
}

const getModelAsString = (model) => {
    if (model === User) {
        return 'user';
    }
    if (model === Destination) {
        return 'destination';
    }
    if (model === List) {
        return 'list';
    }
    if (model === Favourite) {
        return 'favourite';
    }
}


exports.addItem = async (res, item, Model) => {
    try {
        const newItem = await Model.create(item);
        const itemWithoutPassword = removePassword(newItem.dataValues);
        res.status(201).set('Access-Control-Allow-Origin', '*').json(itemWithoutPassword);
    } catch (err) {
        res.status(404).set('Access-Control-Allow-Origin', '*').json({message: err});
    }
}

exports.getAllItems = async (res, Model) => {
    const items = await Model.findAll();
    const itemsWithoutPassword = items.map((item) => removePassword(item.dataValues));
    res.status(200).json(itemsWithoutPassword);
}

exports.getItem = async (res, itemId, Model) => {
    const item = await Model.findByPk(itemId);

    if (!item) {
        return res.status(404).json({ message: `${getModelAsString(Model)} ${itemId} does not exist.` });
    }

    const itemWithoutPassword = removePassword(item.dataValues);
    res.status(200).json(itemWithoutPassword);
}

exports.updateItem = async (res, itemId, updateData, Model) => {
    const [ updatedRows ] = await Model.update(updateData, { where: {id: itemId} });
    const updatedItem = await Model.findByPk(itemId);

    if (!updatedItem) {
        return res.status(404).json({ message: `${getModelAsString(Model)} ${itemId} does not exist.` });
    }

    const itemWithoutPassword = removePassword(updatedItem.dataValues);
    res.status(200).json(itemWithoutPassword);
}

exports.deleteItem = async (res, itemId, Model) => {
    const deletedItem = await Model.findByPk(itemId)
    const deletedRows = await Model.destroy({ where: {id: itemId} });
    if (!deletedRows) {
        return res.status(404).json({ message: `${getModelAsString(Model)} ${itemId} does not exist.` });
    }

    const deletedItemWithoutPassword = removePassword(deletedItem.dataValues);
    res.status(204).json(deletedItemWithoutPassword);
}