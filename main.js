const express = require('express'); // import express library
const app = express();
app.use(express.json());

let products = [ // static array
    {
        id: '1',
        name: 'tv',
        company: 'samsung',
        size: '50'
    },
    {
        id: '2',
        name: 'tv',
        company: 'lg',
        size: '65'
    },
    {
        id: '3',
        name: 'tv',
        company: 'panasonic',
        size: '39'
    }
];
app.get('/products/', (req,res)=>{ // send list of products
    res.send(products);
});

app.get('/products/:id', (req,res)=>{ // send product by id
    for (let product of products){
        if (product.id === req.params.id)
            res.send(product);
    }
    res.send('product is not exist');
});

app.post('/products/', (req,res)=>{ // create new product
    products.push(req.body);
    res.send(req.body);
});

app.put('/products/:id', (req,res)=>{ // change an exist product
    products.forEach((product, i)=>{
        if (product.id === req.params.id){
            products[i] = req.body;
            res.send(req.body);
        }
    });
    res.send('id product is not exist');
});

app.delete('/products/:id', (req,res)=>{ // delete product by id
    products.forEach((product, i)=>{
        if (product.id === req.params.id){
            products.splice(i,1);
            res.send(req.params.id + 'deleted!')
        }
    });
    res.send('id product is not exist');
});



app.listen(3000); // localhost port