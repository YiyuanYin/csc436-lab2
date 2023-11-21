const mongoose = require('mongoose');
const uri = "uri-here"

function connect() {
  const option = { useNewUrlParser: true }
  mongoose.connect(uri, option).then(() => console.log("Database connection established!"), err => { console.log("Error connecting Database instance due to: ", err); }
  )
}

module.exports = connect