const Sequelize = require('sequelize');
const UserModel = require('./user');
const DestinationModel = require('./destination');
const ListModel = require('./list');
const FavouriteModel = require('./favourite');

const { PGUSER, PGHOST, PGPASSWORD, PGDATABASE, PGPORT } = process.env;

const setupDatabase = () => {
    const connection = new Sequelize(PGDATABASE, PGUSER, PGPASSWORD, {
        host: PGHOST,
        port: PGPORT,
        dialect: 'postgres',
        logging: false,
    });

    const User = UserModel(connection, Sequelize);
    const Destination = DestinationModel(connection, Sequelize);
    const List = ListModel(connection, Sequelize);
    const Favourite = FavouriteModel(connection, Sequelize);

    // Destination.hasMany(Favourite, {
        // foreignkey: {
        //     name: 'DestinationId',
        //     allowNull: false
        // }
    // });
    // Favourite.belongsTo(Destination);
    User.hasMany(Favourite, {
        foreignkey: {
            name: 'UserId',
            allowNull: false
        }
    });
    Favourite.belongsTo(User);

    connection.sync({alter: true});

    return { User, Destination, List, Favourite };
}

module.exports = setupDatabase();