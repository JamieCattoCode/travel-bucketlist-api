module.exports = (connection, DataTypes) => {
    const schema = {
        placeXid: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    args: true,
                    msg: 'You need to enter an external xid.'
                }
            }
        }
    };

    const FavouriteModel = connection.define('Favourite', schema);
    return FavouriteModel;
}