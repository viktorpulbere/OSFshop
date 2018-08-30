var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({

    variation_attributes: Schema.Types.Mixed,
    id: {type: String, required: true},
    name: {type: String, required: true},
    page_title: {type: String, required: true},
    page_description : {type: String, required: true},
    primary_category_id: {type: String, required: true},
    price_max: Number,
    price: Number,
    currency: {type: String, required: true},
    master: Schema.Types.Mixed,
    image_groups: Schema.Types.Mixed,
    short_description : {type: String, required: true},
    orderable: Boolean,
    variants: Schema.Types.Mixed,
    type: Schema.Types.Mixed,
    long_description: {type: String, required: true},
    c_isSale: Boolean
});

module.exports = mongoose.model('Products', schema);