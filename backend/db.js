const mongoose = require('mongoose');
require(dotenv).config();



const mongoURI = process.env.MONGO_URI;

mongoose.connect('mongodb+srv://prashantyug23cs:gje683Uhqf0Z6YWt@maintodo.2ijrl.mongodb.net/?retryWrites=true&w=majority&appName=MainToDO', {})
    .then(() => console.log('Db Connected'))
    .catch(err => console.log("Db fails to connect ", err));


const todoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    completed: {
        type: Boolean,
        required: true,
    }
});

const todo = mongoose.model('MainToDO', todoSchema);
module.exports = todo;





// /*

// prashantyug23cs

// gje683Uhqf0Z6YWt


// mongodb+srv://prashantyug23cs:gje683Uhqf0Z6YWt@maintodo.2ijrl.mongodb.net/?retryWrites=true&w=majority&appName=MainToDO
// */

 