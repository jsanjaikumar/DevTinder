const mongoose = require('mongoose');

const connectDB = async ()=>{
    await mongoose.connect(
      "mongodb+srv://masterdev:FQcMqoig3uQCwRCR@masterdev.5w2hkcy.mongodb.net/TevDinder"
    );
}

module.exports = connectDB;
