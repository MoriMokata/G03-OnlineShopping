const expressFunction = require('express');
const router = expressFunction.Router();
const mongoose = require('mongoose');
const { productSchema } = require('../models/product');
const authorization = require('../middlewares/authorize');

const addProduct = (productData) => {
    return new Promise((resolve, reject) => {
        let Product = mongoose.model('products', productSchema);
        Product.create(productData, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
}

const listProducts = () => {
    return new Promise((resolve, reject) => {
        let Product = mongoose.model('products', productSchema);
        Product.find({}, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
}

const listProductsByType = (type) => {
    return new Promise((resolve, reject) => {
        let Product = mongoose.model('products', productSchema);
        Product.find({ type: type }, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
}

const deleteProduct = (id) => {
    return new Promise((resolve, reject) => {
        let Product = mongoose.model('products', productSchema);
        Product.deleteOne({ _id: id }, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
}

// const getProduct = () => {
//     return new Promise((resolve, reject) => {
        
//     });
// }

router.route('/add').post(authorization, (req, res) => {
    addProduct(req.body)
    .then(result => {
        res.status(201).json(result);
    })
    .catch(err => {
        res.status(400).send(`${err.name}: ${err.message}`);;
    });
});

router.route('/get').get(authorization, (req, res) => {
    listProducts()
    .then(result => {
        res.status(201).json(result);
    })
    .catch(err => {
        res.status(400).send(`${err.name}: ${err.message}`);;
    });
});

router.route('/get/:type').get(authorization, (req, res) => {
    let type = req.params.type;
    listProductsByType(type)
    .then(result => {
        res.status(201).json(result);
    })
    .catch(err => {
        res.status(400).send(`${err.name}: ${err.message}`);;
    });
});

router.route('/:id').delete(authorization, (req, res) => {
    let id = req.params.id;
    deleteProduct(id)
    .then(result => {
        res.status(201).json(result);
    })
    .catch(err => {
        res.status(400).send(`${err.name}: ${err.message}`);;
    });
});

module.exports = router;