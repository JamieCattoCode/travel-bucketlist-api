module.exports = (connection, DataTypes) => {
    const schema = {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    args: true,
                    msg: 'You need to enter a username.'
                },
                notEmpty: {
                    args: true,
                    msg: 'Your username cannot be left empty.'
                }
            }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isEmail: {
                    args: true,
                    msg: 'Your email address needs to be a valid format.'
                },
                notNull: {
                    args: true,
                    msg: 'You need to enter an email address.'
                },
                notEmpty: {
                    args: true,
                    msg: 'Your email address cannot be left empty.'
                }
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: {
                    args: [8.99],
                    msg: 'Your password must be 8 characters or above.'
                },
                notNull:
                {
                    args: true,
                    msg: 'You need to enter a password.'
                },
                notEmpty: {
                    args: true,
                    msg: 'Your password cannot be left empty.'
                }
            }
        }
    };

    const UserModel = connection.define('User', schema);
    return UserModel;
};