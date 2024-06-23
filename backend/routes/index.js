const express = require('express')
const router = express.Router()

const {handleAddProduct, handleGetProduct, handleDeleteProduct, handleEditProduct} = require('../controllers/index')

router.post('/' , handleAddProduct)
router.get('/' , handleGetProduct)
router.delete('/:id' , handleDeleteProduct)
router.put('/:id' , handleEditProduct)


module.exports = router 