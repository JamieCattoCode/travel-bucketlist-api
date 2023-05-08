const { User } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const TOKEN_KEY = process.env.TOKEN_KEY

exports.register = async (req, res) => {
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

    if (existingUser) {
        return res.status(409).json({message: `User ${username} already exists.`});
    } 

    try {
        const encryptedPassword = bcrypt.hashSync(password, 10);
    
        const newUser = await User.create({
            username,
            'email': email.toLowerCase(),
            'password': encryptedPassword
        });
        
        const token = jwt.sign(
            { user: newUser },
            TOKEN_KEY
            );

        return res.status(201)
        .cookie(
            'userToken', 
            token, 
            {maxAge: 1000*60*60*2}) // 2 hours maxAge
        .send({
            status: 201,
            message: 'New user created.'
        });
    } catch (error) {
        return res.status(500).json({ 'message': error.message });
    }

}