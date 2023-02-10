const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
 title: String,
 details: String,
 product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
 user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
});

module.exports = mongoose.model('Review', ReviewSchema);