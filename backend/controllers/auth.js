const User = require("../models/user");
const config = require("../config/database");
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const crypto = require("../config/cryptojs");
    
    
    //account activation
    const accountActivation = (req, res) => {
        
        let _id_bidder = req.params.id
    // console.log("_id_bidder", _id_bidder,"req.params.id", req.params.id)
        User.findOne({
            where: {
                _id: _id_bidder  
            }
        }).then(async (user) => {
            await User.findOneAndUpdate({
                _id: _id_bidder},
                {$set: {active: true}}
            ).then(data => {
                console.log("Update state", data)
                res.status(200).send({
                    message: `${user.email}`
                })
            }).catch(err => {
                res.send('error: ' + err)
            })
        })
    }

    module.exports = {
        accountActivation
     
    }