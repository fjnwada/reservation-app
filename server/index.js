
const express = require('express')
const mongoose = require('mongoose');
const bodyPaeser = require('body-parser')
const config = require('./config')
const FakeDb = require('./fake-db')
const productRoutes = require('./routes/products')
const userRoutes = require('./routes/user')
const path = require('path')


  mongoose.connect(config.DB_URI,
  // {
  //   userNewUrlParser: true,
  //   useUnifiedTopology: true,
  //   useCreateIndex: true
  // }
  )
  .then(
    () => {
      if(process.env.NODE_ENV !== 'production'){
        const fakeDb = new FakeDb();
        // fakeDb.initDb();
      }
  }
);


const app = express()

app.use(bodyPaeser.json())

app.use('/api/v1/products',productRoutes)
app.use('/api/v1/users',userRoutes)

if(process.env.NODE_ENV === 'production'){
  const appPath = path.join(__dirname, '..', 'dist','reservation-app')
  app.use(express.static(appPath))
  app.get("*", function(req, res){
    res.sendFile(path.resolve(appPath, 'index.html'))
  })
}



const PORT = process.env.PORT || '3001'

app.listen(PORT, function(){
    console.log('I am runnning')
})

// const v8 = require('v8');

// const maxHeapSize = 256; // MB単位で指定
// v8.setFlagsFromString(`--max-old-space-size=${maxHeapSize}`);

