const mongoose = require('mongoose');
  
const GroupSchema = new mongoose.Schema({
    groupNo : {
        type: String,
        required: true,
    },
    employee: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'employee'
    }],
    // cgmName: {
    //     type: String
    // },
    dept: String

})


module.exports = Group = mongoose.model('group', GroupSchema);

