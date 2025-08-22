const mongoose = require('mongoose');

const connectDB = async ()=>{
    await mongoose.connect(
      "mongodb+srv://masterdev:Masterdev@masterdev.5w2hkcy.mongodb.net/TevDinder"
    );
}

module.exports = connectDB;
