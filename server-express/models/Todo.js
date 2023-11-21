const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TodoSchema = new Schema({
  title: {type: String, required: true},
  description: String,
  author: {type: Schema.Types.ObjectId, ref: 'User'},
  complete: {type: Boolean, required: true },
  dateCreated: { type: Date },
  dateCompleted: { type: Date }
})

module.exports = mongoose.model('Todo', TodoSchema)