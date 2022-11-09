const express = require('express');
const app = express();

const corsMiddleware = require('./middlewares/cors');
const setupMongoose = require('./models/setup');

app.use(express.json({ limit: '16mb' }));
app.use((req, res, next) => corsMiddleware(req, res, next));
app.use((req, res, next) => setupMongoose(req, res, next));

app.use('/products', require('./api/product'));
app.use('/users', require('./api/user'));
app.use('/carts', require('./api/cart'));
app.use('/user-addresses', require('./api/user-address'));
app.use('/orders', require('./api/order'));


app.listen(3000, () => {
    console.log('listening on port 3000');
});