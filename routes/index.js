var express = require('express');
var router = express.Router();

var User = require('../models/user');
var Category = require('../models/categories');
var Cart = require('../models/cart');
var Product = require('../models/products');

/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.session.success){
    var successMessage = req.session.success;
    req.session.success = null;
  Category.find(function(err,docs){
    res.render('shop/index', { title: "Home", categories: docs, success: successMessage });});
  }else{
    Category.find(function(err,docs){
    res.render('shop/index', { title: "Home", categories: docs });});
  }
});

router.get('/add-to-cart/:id', function (req, res, next) {
  var productId = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart : {});
  
  Product.findOne( { id: req.params.id }, function(err, product) {
      cart.add(product, product.id);
      req.session.cart = cart;
      res.redirect(req.get('referer'));
  });
});

router.get('/reduce/:id', function(req, res, next) {
  var productId = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart : {});

  cart.reduceByOne(productId);
  req.session.cart = cart;
  res.redirect('/shopping-cart');
});

router.get('/remove/:id', function(req, res, next) {
  var productId = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart : { });

  cart.removeItem(productId);
  req.session.cart = cart;
  res.redirect('/shopping-cart');
});

router.get('/increment/:id', function(req, res, next) {
  var productId = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart : { });

  cart.incrementByOne(productId);
  req.session.cart = cart;
  res.redirect('/shopping-cart');
});

router.get('/shopping-cart', function (req, res, next) {
  if (!req.session.cart) {
      return res.render('shop/shopping-cart', {products: null, maincategory: 'shopping-cart'});
  }
  var cart = new Cart(req.session.cart);
  res.render('shop/shopping-cart', {products: cart.generateArray(), totalPrice: cart.totalPrice, maincategory: 'shopping-cart'});
});

router.get('/checkout', isLoggedIn, function(req, res, next) {
  req.session.cart = null;
  req.session.success = "Products are successfully bought!"; 
  res.redirect('/');
});


module.exports = router;

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
      return next();
  }
  req.session.failure = 1;
  res.redirect('/user/signin');
}
