var express = require('express');
var router = express.Router();
var Category = require('../models/categories');

router.get('/womens', function(req, res, next) {
    Category.findOne({id:'womens'}, function(err,docs){
    res.render('partials/category', { maincategory: 'womens', title: "Womens", category: docs });
    });
});

router.get('/womens/:subcategory', function(req, res, next) {
  var array = ['womens-accessories','womens-clothing','womens-jewelry'];
   if(array.indexOf(req.params.subcategory) == -1){
    res.redirect('/womens');
   }else{
    Category.findOne({id:'womens'},'categories', function(err,docs){
      if(req.params.subcategory === 'womens-clothing'){
        var category = docs.categories[0];
      }else if(req.params.subcategory === 'womens-accessories'){
        var category = docs.categories[2];
      }else{
        var category = docs.categories[1];
      }
      var document = [];
      for(var i = 0; i < category.categories.length; i+=1 ){
        document.push(category.categories[i]);
      }
      res.render('partials/subcategoryW', { maincategory: 'womens', categ: category.id , description: category.page_description, title: category.page_title, documents: document });
    });}
  });

module.exports = router;