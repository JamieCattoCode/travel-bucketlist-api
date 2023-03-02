module.exports = (connection, DataTypes) => {
    const schema = {
        name: DataTypes.STRING,
    };

    const ListModel = connection.define('List', schema);
    return ListModel;
}