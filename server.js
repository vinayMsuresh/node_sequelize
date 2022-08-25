const express = require('express');
const cors = require('cors');
const productRoutes = require('./routes/productRoutes');

const PORT = process.env.PORT || 5000;

const corsOptions = {
    origin: 'http://localhost:5001',
};

const app = express();

app.use(express.json());

app.use(express.urlencoded({extended: true}));

app.use(cors(corsOptions));

app.use('/api/products', productRoutes);

app.get('/', (req, res) => {
    res.send('Hello from server');
})

app.listen(PORT, (err) => {
    if(err) throw err;
    console.log('Server listening at port ', PORT);
})