const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = mongoose.model('User');
module.exports = {

    async create(req, res){
        const { username, email, password } = req.body;
        bcrypt.hash(password, 10, async (err, hash) => { 
            if(err){
                return res.status(200).json({ success: false, err });
            }
            await User.create({
                username,
                email,
                password: hash
            })
            .then(data => {
                if(data){
                    return res.status(200).json({ success: true });
                }
                return res.status(200).json({ success: false });
    
            })
            .catch(err => {
                return res.status(200).json({ success: false, err });
    
            });
        });
    },

    async login(req, res){
        const {username, password } = req.body;
        try {
            await User.findOne({ username })
            .then(data => {
                if(data){
                    bcrypt.compare(password, data.password, (err, result) => {
                        if(err){
                            return res.status(400).json({success: false, err});
                        }
                        jwt.sign({user: data}, 'secret', (err, token) => {
                            const bearerToken = `Bearer ${token}`;
                            return res.status(200).json({ success: true, bearerToken });
                        });
                    });
                }
            })
        }catch(err){
            return res.status(500).json({ success: false, err});
        }
    },

    async home(req, res){
        jwt.verify(req.token, 'secret', (err, data) => {
            if(err){
                return res.status(403).json({success: false, errors: { token: 'Forbidden' } });
            }else {
                delete data.user.password;
                return res.status(200).json({ success: true, data, home: 'TUDO CERTO NA BAHIA', data});
            }
        });
    }
}