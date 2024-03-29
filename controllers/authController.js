const express = require('express');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const router = express.Router();

router.post('/registerUser', async (req, res) => {
    const { email } = req.body;
    
    try{
        if(await User.findOne({ email })){
            return res.status(400).send({error: 'Email já cadastrado.'});
        }

        const user = await User.create(req.body);
        user.password = undefined;
        console.log({user});    
        return res.redirect('/');
    }catch(e){
        return res.status(400).send(e)
    }
});


router.post('/authenticate', async(req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({email}).select('+password');

    if(!user){
        return res.status(400).send({error : 'User not found'});
    }

    if(!await bcrypt.compare(password, user.password)){
        return res.status(400).send({error: 'Invalid Password'})
    }
    console.log('Usuário logado !!!')
    res.redirect('/');
})

module.exports = app => app.use('/auth', router);