const express = require('express')
const router = express.Router()
const Product = require('../model/product')

router.get('', function(req, res){
    Product.find({})
    .then(result => {
        res.json(result)
    })
    .catch(err => {
        res.json({'err':false})
    })
})

router.get('/:productId', function(req, res){
    const productId = req.params.productId
    Product.findById(productId)
    .then(result => {
        res.json(result)
    })
    .catch(err => {
        res.status(422).send({errors:  [{title: 'Product error',detail: 'Product not found!'}]})
    })
})

module.exports = router

/* エラー */
// router.get('', function(req, res){
//     Product.find({}, function(err, foundProducts){
//         res.json(foundProducts)
//     })
// })

// router.get('', function(req, res){
//     Product.find({})
//     .then(result => {
//         res.json(Product)
//     })
//     .catch(err => {
//         res.json({'err':false})
//     })
// })



