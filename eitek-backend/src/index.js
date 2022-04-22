const express = require('express');
const app = express();

//midlewares
app.use(express.json());
app.use(express.urlencoded({extended:false}));

//listen port
app.listen(3000);
console.log('Server on port 3000');

//routes
app.use(require('./routes/index'));