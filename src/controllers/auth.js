const { User } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const TOKEN_KEY = process.env.TOKEN_KEY;

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
            const token = jwt.sign(
                { user },
                TOKEN_KEY,
            );

            return res.status(201)
            .cookie('userToken', token, {maxAge: 1000*60*60*2}) // 2 hours maxAge
            .send({
                status: 201,
                message: 'User logged in.',
                user
            });

        } else return res.status(400).send('Invalid credentials entered.');

        } catch (err) {
            res.status(400).json({ error: err });
        }
}