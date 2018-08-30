var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({

    categories: Schema.Types.Mixed,
    id: {type: String, required: true},
    name: {type: String, required: true},
    page_title: {type: String, required: true},
    page_description : {type: String, required: true},
    parent_category_id: {type: String, required: true},
    c_showInMenu: {type: Boolean, required: true},
    imageURL: {type: String, required: true}
});

module.exports = mongoose.model('Categories', schema);