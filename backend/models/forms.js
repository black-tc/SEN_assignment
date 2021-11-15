const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

//creating a bio form schema for bio forms table collection
const formSchema = mongoose.Schema({
    personnel_number: { type: String, required: true },
    fname: { type: String, required: true },
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
    phone_home: { type: String, required: true },
    next_of_kin: { type: String, required: true },
    next_of_kin_phone: { type: String, required: true },
    qualification: { type: String, required: true},
    institution: { type: String, required: true },
    field_study: { type: String, required: true },
    specialization: { type: String, required: true },
    language_description_1: {
        language_1: { type: String, required: true },
        speak_1: { type: String, required: false },
        read_1: { type: String, required: false },
        write_1: { type: String, required: false },
    },
    language_description_2: {
        language_2: { type: String, required: false },
        speak_2: { type: String, required: false },
        read_2: { type: String, required: false },
        write_2: { type: String, required: false },
    },
    language_description_3: {
        language_3: { type: String, required: false },
        speak_3: { type: String, required: false },
        read_3: { type: String, required: false },
        write_3: { type: String, required: false },
    },
    language_description_4: {
        language_4: { type: String, required: false },
        speak_4: { type: String, required: false },
        read_4: { type: String, required: false },
        write_4: { type: String, required: false },
    },
    language_description_5: {
        language_5: { type: String, required: false },
        speak_5: { type: String, required: false },
        read_5: { type: String, required: false },
        write_5: { type: String, required: false },
    },
    society_1: {
        society_name_1: { type: String, required: false },
        society_position_1: { type: String, required: false },
        date_joined_1: { type: String, required: false },
    },
    society_2: {
        society_name_2: { type: String, required: false },
        society_position_2: { type: String, required: false },
        date_joined_2: { type: String, required: false },
    },
    society_3: {
        society_name_3: { type: String, required: false },
        society_position_3: { type: String, required: false },
        date_joined_3: { type: String, required: false },
    },
    society_4: {
        society_name_4: { type: String, required: false },
        society_position_4: { type: String, required: false },
        date_joined_4: { type: String, required: false },
    },
    body_1: {
        body_name_1: { type: String, required: false },
        body_position_1: { type: String, required: false },
        date_joined__body_1: { type: String, required: false },
    },
    body_2: {
        body_name_2: { type: String, required: false },
        body_position_2: { type: String, required: false },
        date_joined__body_2: { type: String, required: false },
    },
    body_3: {
        body_name_3: { type: String, required: false },
        body_position_3: { type: String, required: false },
        date_joined__body_3: { type: String, required: false },
    },
    body_4: {
        body_name_4: { type: String, required: false },
        body_position_4: { type: String, required: false },
        date_joined__body_4: { type: String, required: false },
    },
    publication_1: {
        publication_name_1: { type: String, required: false },
        date_publication_1: { type: String, required: false },
        publisher_name_1: { type: String, required: false },
        subject_publication_1: { type: String, required: false },
        co_author_1: { type: String, required: false },
    },
    publication_2: {
        publication_name_2: { type: String, required: false },
        date_publication_2: { type: String, required: false },
        publisher_name_2: { type: String, required: false },
        subject_publication_2: { type: String, required: false },
        co_author_2: { type: String, required: false },
    },
    publication_3: {
        publication_name_3: { type: String, required: false },
        date_publication_3: { type: String, required: false },
        publisher_name_3: { type: String, required: false },
        subject_publication_3: { type: String, required: false },
        co_author_3: { type: String, required: false },
    },
    publication_4: {
        publication_name_4: { type: String, required: false },
        date_publication_4: { type: String, required: false },
        publisher_name_4: { type: String, required: false },
        subject_publication_4: { type: String, required: false },
        co_author_4: { type: String, required: false },
    }
    
});

// create variable form
formSchema.plugin(uniqueValidator);
const Form = (module.exports = mongoose.model("bio_forms", formSchema));

// function to get form by id
module.exports.getFormById = function (id, callback) {
    Form.findById(id, callback);
};

// this function returns the bio form records in the database
module.exports.getAllForms = function (form, callback) {
    Form.find(form, callback);
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



