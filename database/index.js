const mongoose = require('mongoose');

try{
    mongoose.connect('mongodb://localhost:27017/myquiz', {useNewUrlParser: true});
    mongoose.Promise = global.Promise;
}catch(e){
    console.log(e);
}


module.exports = mongoose;