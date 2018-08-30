var express = require('express');
var router = express.Router();
var Product = require('../models/products');

router.get('/:mainCategory/:category/:subcategory', function(req, res, next) {
    
    Product.find({"primary_category_id": req.params.subcategory}, function(err,docs){
      var productChunks = [];
      var chunkSize = 3;
      for (var i = 0; i < docs.length; i += chunkSize) {
          productChunks.push(docs.slice(i, i + chunkSize));
      }
    
    res.render(`partials/${req.params.category}`, { maincategory:req.params.mainCategory, categ: req.params.category,
        subcategory: req.params.subcategory, title: req.params.subcategory , products: productChunks });
    });
});

router.get('/:mainCategory/:category/:subcategory/:product', function(req, res, next) {
    Product.findOne({"id": req.params.product}, function(err,docs){
        if(docs.primary_category_id === req.params.subcategory ){
    res.render('partials/pdp', { maincategory:req.params.mainCategory, categ: req.params.category,
        subcategory: req.params.subcategory, product: docs.name, productURL: docs.id , title: req.params.subcategory, productDetails: docs });
        }
    });

});

module.exports = router;