const express = require('express')
const mongoose = require('mongoose')

const productSchema = new mongoose.Schema(
    {
        productName: {
            type: String,
            required: true
        },

        productUSP: {
            type: String,
            required: true
        }
        ,
        productPrice: {
            type: Number,
            required: true
        },
        productDescription:{
            type: String,
            required: true
        }
        ,
        productImageUrl:{
            type: String,
            required: true
        }

    }
)

const PRODUCT = mongoose.model('product', productSchema)
module.exports = PRODUCT