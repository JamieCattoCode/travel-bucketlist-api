const { User } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const TOKEN_KEY = 'Jg5pp8H4qVLr';

exports.register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
    
        if(!(username && email && password)) {
            return res.status(400).json({message: 'You need to enter a username, email, and password.'});
        }

        const existingUser = await User.findOne({ where: 
            {
                username: username, 
                email: email
            } 
        });

        if (existingUser) res.status(409).json({message: `User ${username} already exists.`});

        const encryptedPassword = bcrypt.hashSync(password, 10);
        const newUser = await User.create({
            username,
            email: email.toLowerCase(),
            password: encryptedPassword
        });

        const token = jwt.sign(
            { username: newUser.username, email: newUser.email },
            TOKEN_KEY
            );

        const newUserWithToken = {...newUser, token: token};

        return res.status(201)
        .cookie(
            'userToken', 
            token, 
            {maxAge: 1000*60*60*2}) // 2 hours maxAge
        .send({
            status: 201,
            message: 'New user created.'
        })
        //.json({user: newUserWithToken});
        
    } catch (err) {
        res.status(400);
    }
}

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
                { username: user.username, email: user.email },
                TOKEN_KEY,
            );

            return res.status(201)
            .cookie('userToken', token, {maxAge: 1000*60*60*2}) // 2 hours maxAge
            .send({
                status: 201,
                message: 'User logged in.',
                user
            });
            // .json({user: userWithToken});

        } else return res.status(400).send('Invalid credentials entered.');

        } catch (err) {
            console.log(err);
        }
}