const expressFunction = require('express');
const router = expressFunction.Router();
const mongoose = require('mongoose');
const { cartSchema } = require('../models/product');
const authorization = require('../middlewares/authorize');

const addToCart = (cart) => {
    return new Promise((resolve, reject) => {
        let Cart = mongoose.model('carts', cartSchema);
        Cart.create(cart, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
}

const getCartByUser = (id) => {
    return new Promise((resolve, reject) => {
        let Cart = mongoose.model('carts', cartSchema);
        Cart.aggregate([
            {
                "$match": {
                    "userId": mongoose.Types.ObjectId(id)
                }
            },
            {
                "$lookup": {
                    "from": "products",
                    "localField": "productId",
                    "foreignField": "_id",
                    "as": "product"
                },
                
            },
            {
                "$set": {
                    "product": {"$first": "$product"},
                }
            },
              
        ]).exec((err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
        
    });
}

const updateCartItem = (cartItem) => {
    return new Promise((resolve, reject) => {
        let Cart = mongoose.model('carts', cartSchema);
        Cart.findByIdAndUpdate(cartItem._id, cartItem, { returnDocument: 'after' }, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
}

const deleteCartItem = (id) => {
    return new Promise((resolve, reject) => {
        let Cart = mongoose.model('carts', cartSchema);
        Cart.deleteOne({ _id: id }, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
}

router.route('/add').post(authorization, (req, res) => {
    addToCart(req.body)
    .then(result => {
        res.status(201).json(result);
    })
    .catch(err => {
        res.status(400).send(`${err.name}: ${err.message}`);;
    });
});


router.route('/update/:id').put(authorization, (req, res) => {
    let payload = {
        _id: req.params.id,
        quantity: req.body.quantity,
    }
    console.log(payload);

    updateCartItem(payload)
    .then(result => {
        res.status(201).json(result);
    })
    .catch(err => {
        res.status(400).send(`${err.name}: ${err.message}`);;
    });
});

router.route('/user/:id').get(authorization, (req, res) => {
    let id = req.params.id;
    getCartByUser(id)
    .then(result => {
        res.status(201).json(result);
    })
    .catch(err => {
        res.status(400).send(`${err.name}: ${err.message}`);;
    });
});

router.route('/:id').delete(authorization, (req, res) => {
    let id = req.params.id;
    deleteCartItem(id)
    .then(result => {
        res.status(201).json(result);
    })
    .catch(err => {
        res.status(400).send(`${err.name}: ${err.message}`);;
    });
});

module.exports = router;
