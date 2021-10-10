const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

//creating a bio form schema for bio forms table collection
const formSchema = mongoose.Schema({
    personnel_number: { type: String, required: true },
    lname: { type: String, required: true },
    email: {
        type: String,
        lowercase: true,
        required: true
  
    },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    title: { type: String, required: true },
    faculty: { type: String, required: true},
    position: { type: String, required: true },
    work_phone: { type: String, required: true },
    department: {
        type: String,
        required: true
  
    },
    postal_address: { type: String, required: true },
    next_of_kin: { type: String, required: true },
    next_of_kin_phone: { type: String, required: true },
    qualification: { type: String, required: true},
    institution: { type: String, required: true },
    field_study: { type: String, required: true },
    specialization: { type: String, required: true },
    language_description: { type: String, required: true}
    
});

// create variable form
formSchema.plugin(uniqueValidator);
const Form = (module.exports = mongoose.model("bio_forms", formSchema));

// function to get form by id
module.exports.getFormById = function (id, callback) {
    Form.findById(id, callback);
};


//get form by username
module.exports.getFormByUsername = function (username, callback) {
    const query = { email: username };
    Form.findOne(query, callback);
};

module.exports.getForm = function (form, callback) {
    Form.find(form, callback);
};

module.exports.updateStatus = function (_id, status, callback) {
    Form.updateOne({ _id: _id }, status, callback)
}

// add form fuction
module.exports.addForm = function (newForm, callback) {
    newForm.save(callback);
};



