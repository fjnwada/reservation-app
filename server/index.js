
const express = require('express')
const mongoose = require('mongoose');
const config = require('./config/dev')
const FakeDb = require('./fake-db')

const productRoutes = require('./routes/products')

  mongoose.connect(config.DB_URI)
  .then(
    () => {
    const fakeDb = new FakeDb();
    fakeDb.initDb();
  }
);


const app = express()

app.use('/api/v1/products',productRoutes)

const PORT = process.env.PORT || '3001'

app.listen(PORT, function(){
    console.log('I am runnning')
})

const v8 = require('v8');

const maxHeapSize = 256; // MB単位で指定
v8.setFlagsFromString(`--max-old-space-size=${maxHeapSize}`);

