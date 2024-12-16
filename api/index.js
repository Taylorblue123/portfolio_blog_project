const express = require('express');
const app = express();
const cors = require('cors');
const { default: mongoose } = require('mongoose');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const salt = bcrypt.genSaltSync(10);
const secret = 'ascfqeafcaecfqa';

app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(express.json());

mongoose.connect('mongodb+srv://taylorblue123:qwert123456@cluster0.c4clt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');

app.post('/register', async (req, res) => {
    const {username, password} = req.body;
    try {
        const userDoc = await User.create({
        username, 
        password:bcrypt.hashSync(password, salt)
    });
        res.status(200).json(userDoc);

    } catch (error) {
        res.status(400).json({message: error.message});
    }
});

app.post('/admin', async (req, res) => {
    const {username, password} = req.body;
    const userDoc = await User.findOne({username});
    const passOk = bcrypt.compare(password, userDoc.password, (err, result) => {
        if(result){
            //login in
            jwt.sign({username, id: userDoc._id}, secret, {}, (err,token)=>{
                if(err) throw err;
                res.cookie('token', token).json('ok');
                res.status(200);
            });


        } else {
            res.status(400).json({message: "Login Failed"});
        }
    });

});

app.listen(4000, () => {
    console.log('Server is running on port 4000');
});
//