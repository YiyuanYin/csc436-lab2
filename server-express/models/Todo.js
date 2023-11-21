const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TodoSchema = new Schema({
  title: {type: String, required: true},
  description: String,
  author: {type: Schema.Types.ObjectId, ref: 'User'},
  completed: {type: Boolean, required: true },
  dateCreated: { type: String },
  dateCompleted: { type: String }
})

module.exports = mongoose.model('Todo', TodoSchema)