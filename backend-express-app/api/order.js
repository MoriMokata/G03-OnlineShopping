const expressFunction = require('express');
const router = expressFunction.Router();
const mongoose = require('mongoose');
const { cartSchema, productSchema } = require('../models/product');
const { orderSchema } = require('../models/order');
const authorization = require('../middlewares/authorize');

const createOrder = (orderData) => {
    return new Promise(async (resolve, reject) => {
        const session = await mongoose.startSession();
        session.startTransaction();

        let Order = mongoose.model('orders', orderSchema)
        Order.create(orderData, (err, data) => {
            if (err) {
                reject(err);
            } else {
                let Cart = mongoose.model('carts', cartSchema);
                data.carts.forEach(element => {
                    Cart.findById(element._id, (cart_err, cart_data) => {
                        if (cart_err) {
                            session.abortTransaction();
                            reject(cart_err);
                        } else {
                            Cart.findByIdAndUpdate(cart_data._id, element, (cart_update_err, cart_update_data) => {
                                if (cart_update_err) {
                                    session.abortTransaction();
                                    reject(cart_update_err);
                                }

                                let Product = mongoose.model('products', productSchema);
                                Product.findById(cart_data.productId, (product_err, product_data) => {
                                    if (product_err) {
                                        session.abortTransaction();
                                        reject(product_err);
                                    } else {
                                        Product.findByIdAndUpdate(product_data._id, { quantity: (product_data.quantity - cart_update_data.quantity) }, (product_update_err) => {
                                            if (product_update_err) {
                                                session.abortTransaction();
                                                reject(product_update_err);
                                            }
                                        });
                                    }
                                });
                            });
                        }
                    });
                });

                session.endSession();
                resolve(data);
            }
        });

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