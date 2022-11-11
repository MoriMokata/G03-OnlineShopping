const expressFunction = require('express');
const router = expressFunction.Router();
const mongoose = require('mongoose');
const { cartSchema, productSchema } = require('../models/product');
const { orderSchema } = require('../models/order');
const authorization = require('../middlewares/authorize');

const createOrder = async (orderData) => {
    return new Promise((resolve, reject) => {
        let Order = mongoose.model('orders', orderSchema);
    
        let checkStock = orderData.carts.map(item => checkProductStock(item))
        Promise.all(checkStock)
        .then(_ => {
            let updateCart = orderData.carts.map(item => updateCarts(item))
            Promise.all(updateCart)
            .then(_ => {
                Order.create(orderData, (err, data) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(data);
                    }
                })
            })
            .catch(err => { reject(err) });
        })
        .catch(err => { reject(err) });
    });
}

const checkProductStock = (cartItem) => {
    return new Promise((resolve, reject) => {
        let Product = mongoose.model('products', productSchema);
        Product.findById(cartItem.productId, (err, data) => {
            if (err) {
                reject(err);
            } else {
                if (!data) {
                    reject(new mongoose.Error('product not found'));
                }
                if (data.quantity - cartItem.quantity < 0) {
                    reject(new mongoose.Error('product out of stock'));
                }
                resolve(data);
            }
        });
    });
}

const updateCarts = (cartItem) => {
    return new Promise((resolve, reject) => {
        let Product = mongoose.model('products', productSchema);
        let Cart = mongoose.model('carts', cartSchema);

        Cart.findByIdAndUpdate(cartItem._id, cartItem).
        then(cartResult => {
            Product.findById(cartResult.productId).then(product_result => {
                Product.findByIdAndUpdate(product_result._id, { quantity: product_result.quantity - cartResult.quantity }, (err, data) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(cartResult);
                    }
                });
            });
        })
        .catch(err => {
            reject(err);
        })
        
    });
}

const getOrderDetail = (id) => {
    return new Promise((resolve, reject) => {
        let Order = mongoose.model('orders', orderSchema);
        Order.aggregate([
            {
                "$match": {
                    "_id": mongoose.Types.ObjectId(id),
                },
            },
            {
                "$lookup": {
                    "from": "users",
                    "localField": "userAddress.userId",
                    "foreignField": "_id",
                    "as": "userAddress.user"
                }
            },
            {
                "$set": {
                    "userAddress.user": {"$first": "$userAddress.user"},
                }
            },
            {
                "$unwind": "$carts"
            },
            {
                "$lookup": {
                    "from": "products",
                    "localField": "carts.productId",
                    "foreignField": "_id",
                    "as": "carts.product"
                }
            },
            {
                "$set": {
                    "carts.product": { "$first": "$carts.product" }
                }
            },
            {
                "$unwind": "$carts.productId"
            },
            {
                "$group": {
                    "_id": "$_id",
                    "carts": { "$push": "$carts" },
                    "userAddress": { "$first": "$userAddress" },
                    "comment": { "$first": "$comment" },
                    "shipping": { "$first": "$shipping" },
                    "payment": { "$first": "$payment" },
                    "totalPrice": { "$first": "$totalPrice" },
                    "orderTime": { "$first": "$orderTime" },
                }
            }
        ]).exec((err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data[0]);
            }
        });
    });
}

const getOrderByMember = (memberId) => {
    return new Promise((resolve, reject) => {
        let Order = mongoose.model('orders', orderSchema);
        Order.aggregate([
            {
                "$match": {
                    "userAddress.userId": mongoose.Types.ObjectId(memberId),
                },
            },
            {
                "$lookup": {
                    "from": "users",
                    "localField": "userAddress.userId",
                    "foreignField": "_id",
                    "as": "userAddress.user"
                }
            },
            {
                "$set": {
                    "userAddress.user": {"$first": "$userAddress.user"},
                }
            },
            {
                "$unwind": "$carts"
            },
            {
                "$lookup": {
                    "from": "products",
                    "localField": "carts.productId",
                    "foreignField": "_id",
                    "as": "carts.product"
                }
            },
            {
                "$set": {
                    "carts.product": { "$first": "$carts.product" }
                }
            },
            {
                "$unwind": "$carts.productId"
            },
            {
                "$group": {
                    "_id": "$_id",
                    "carts": { "$push": "$carts" },
                    "userAddress": { "$first": "$userAddress" },
                    "comment": { "$first": "$comment" },
                    "shipping": { "$first": "$shipping" },
                    "payment": { "$first": "$payment" },
                    "totalPrice": { "$first": "$totalPrice" },
                    "orderTime": { "$first": "$orderTime" },
                }
            }
        ]).exec((err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
}

const getOrderAll = () => {
    return new Promise((resolve, reject) => {
        let Order = mongoose.model('orders', orderSchema);
        Order.aggregate([
            {
                "$lookup": {
                    "from": "users",
                    "localField": "userAddress.userId",
                    "foreignField": "_id",
                    "as": "userAddress.user"
                }
            },
            {
                "$set": {
                    "userAddress.user": {"$first": "$userAddress.user"},
                }
            },
            {
                "$unwind": "$carts"
            },
            {
                "$lookup": {
                    "from": "products",
                    "localField": "carts.productId",
                    "foreignField": "_id",
                    "as": "carts.product"
                }
            },
            {
                "$set": {
                    "carts.product": { "$first": "$carts.product" }
                }
            },
            {
                "$unwind": "$carts.productId"
            },
            {
                "$group": {
                    "_id": "$_id",
                    "carts": { "$push": "$carts" },
                    "userAddress": { "$first": "$userAddress" },
                    "comment": { "$first": "$comment" },
                    "shipping": { "$first": "$shipping" },
                    "payment": { "$first": "$payment" },
                    "totalPrice": { "$first": "$totalPrice" },
                    "orderTime": { "$first": "$orderTime" },
                }
            }
        ]).exec((err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
}

router.route('/all').get(authorization, (req, res) => {
    getOrderAll(req.params.id)
    .then(result => {
        res.status(200).json(result);
    })
    .catch(err => {
        res.status(400).send(`${err.name}: ${err.message}`);
    });
});

router.route('/create').post(authorization, (req, res) => {
    createOrder(req.body)
    .then(result => {
        res.status(201).json(result);
    })
    .catch(err => {
        res.status(400).send(`${err.name}: ${err.message}`);
    });
});


router.route('/success/:id').get(authorization, (req, res) => {
    getOrderDetail(req.params.id)
    .then(result => {
        res.status(200).json(result);
    })
    .catch(err => {
        res.status(400).send(`${err.name}: ${err.message}`);
    });
});

router.route('/user/:id').get(authorization, (req, res) => {
    getOrderByMember(req.params.id)
    .then(result => {
        res.status(200).json(result);
    })
    .catch(err => {
        res.status(400).send(`${err.name}: ${err.message}`);
    });
});

module.exports = router;