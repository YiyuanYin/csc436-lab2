const mongoose = require('mongoose');
const uri = process.env.DB_URI

function connect() {
  const option = { useNewUrlParser: true }
  mongoose.connect(uri, option).then(() => console.log("Database connection established!"), err => { console.log("Error connecting Database instance due to: ", err); }
  )
}

module.exports = connect