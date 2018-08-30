var express = require('express');
var router = express.Router();
var Category = require('../models/categories');

router.get('/mens', function(req, res, next) {
    Category.findOne({id:'mens'}, function(err,docs){
    res.render('partials/category', { maincategory: 'mens', title: "Mens", category: docs });
    });
});

router.get('/mens/:subcategory', function(req, res, next) {
  var array = ['mens-clothing','mens-accessories'];
  if(array.indexOf(req.params.subcategory) == -1){
    res.redirect('/mens');
  }else{
  Category.findOne({id:'mens'},'categories', function(err,docs){
    if(req.params.subcategory === 'mens-clothing'){
      var category = docs.categories[0];
    }else{
      var category = docs.categories[1];
    }
    var document = [];
    for(var i = 0; i < category.categories.length; i+=1 ){
      document.push(category.categories[i]);
    }
      res.render('partials/subcategoryM', { maincategory: 'mens', categ: category.id,  description: category.page_description , title: category.page_title, documents: document });
  });}
});

router.get('/pdp', function(req,res){
  res.render('partials/pdp');
});


module.exports = router;