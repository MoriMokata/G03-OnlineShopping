const expressFunction = require('express');
const router = expressFunction.Router();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const { makeHash, compareHash } = require('../services/bcrypt');

const { userSchema } = require('../models/user');

const key = 'MY_KEY';

const createUser = (userData) => {
    return new Promise((resolve, reject) => {
        let User = mongoose.model('users', userSchema);
        User.create(userData, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        })
    })
}

const findUser = (email) => {
    return new Promise((resolve, reject) => {
        let User = mongoose.model('users', userSchema);
        User.findOne({ email: email }, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve({
                    id: data._id,
                    email: data.email,
                    password: data.password,
                    role: data.role,
                });
            }
        });
    });
}

const findUserById = (id) => {
    return new Promise((resolve, reject) => {
        let User = mongoose.model('users', userSchema);
        User.findOne({ _id: id }, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
}

const updateUser = (userData) => {
    return new Promise((resolve, reject) => {
        let User = mongoose.model('users', userSchema);
        User.findByIdAndUpdate(userData._id, userData, { returnDocument: 'after' }, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        })
    });
}

router.route('/create').post((req, res) => {
    makeHash(req.body.password)
    .then(hashText => {
        let payload = {
            username: req.body.username,
            email: req.body.email,
            password: hashText,
            role: req.body.role,
        };

        createUser(payload)
        .then(result => {
            res.status(201).json(result);
        })
        .catch(err => {
            res.status(400).send(`${err.name}: ${err.message}`);
        });
    })
    .catch(err => {
        res.status(400).send(err.message);
    }); 
})

router.route('/signin').post(async (req, res) => {
    let payload = {
        email: req.body.email,
        password: req.body.password,
    }

    try {
        const result = await findUser(payload.email);
        const loginStatus = await compareHash(payload.password, result.password);
        
        if (loginStatus) {
            const token = jwt.sign(result, key, { expiresIn: "24h" });
            res.status(200).json({ result, token, loginStatus });
        } else {
            res.status(200).json({ loginStatus });
        }
    } catch (err) {
        res.status(400).send(err.message);
    }
})

router.route('/:id').get(async (req, res) => {
    let id = req.params.id;

    findUserById(id)
    .then(result => {
        res.status(201).json(result);
    })
    .catch(err => {
        res.status(400).send(`${err.name}: ${err.message}`);
    });
    
})

router.route('/:id').put(async (req, res) => {
    let payload = {
        _id: req.params.id,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        address: {
            address: req.body.address.address,
            country: req.body.address.country,
            region: req.body.address.region,
            zipcode: req.body.address.zipcode,
            mobile: req.body.address.mobile,
        },
        gender: req.body.gender,
        occupation: req.body.occupation,
        birthDay: req.body.birthDay,
        picture: req.body.picture,
    }

    updateUser(payload)
    .then(result => {
        res.status(201).json(result);
    })
    .catch(err => {
        res.status(400).send(`${err.name}: ${err.message}`);
    });

})

module.exports = router;