const mongoose = require('mongoose');

mongoose.connect(process.env.URL_MONGO,{
  useUnifiedTopology: true,
  useNewUrlParser: true,
})
  .then(() => console.log("Database Conected"))
  .catch(err => console.error(err))