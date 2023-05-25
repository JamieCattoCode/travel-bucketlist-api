const { User } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const TOKEN_KEY = process.env.ACCESS_TOKEN_KEY;

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;
    
        if (!(username && password)) {
            return res.status(400).send('You need to enter a username AND password.');
        }

        const user = await User.findOne({ where: 
            {
                username: username
            } 
        });
    
        if (user && (await bcrypt.compare(password, user.password))) {
            const accessToken = jwt.sign(
                { userId: user.id },
                TOKEN_KEY,
                { expiresIn: '1m' }
            );

            const refreshToken = jwt.sign(
                { userId: user.id },
                TOKEN_KEY,
                { expiresIn: '1d' }
            );

            return res.status(201)
            .cookie('userToken', refreshToken, { maxAge: 1000*60*60*24 }) // 2 hours maxAge
            .send({
                status: 201,
                message: 'User logged in.',
                user,
                accessToken
            });

        } else return res.status(400).send('Invalid credentials entered.');

        } catch (err) {
            console.log(err);
            res.status(400).json({ err });
        }
}