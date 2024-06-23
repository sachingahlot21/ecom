const PRODUCT = require('../modals/index')

async function handleAddProduct(req, res) {

    const body = req.body
    if (!body ||
        !body.productName ||
        !body.productPrice ||
        !body.productUSP ||
        !body.productDescription ||
        !body.productImageUrl
    ) {
        return res.status(400).json({ msg: "all fields are required" })
    }

    const result = await PRODUCT.create({
        productName: body.productName,
        productPrice: body.productPrice,
        productUSP: body.productUSP,
        productImageUrl: body.productImageUrl,
        productDescription: body.productDescription
    })
    console.log("result:", result)

    return res.status(201).json({ msg: "success!" })

}

async function handleGetProduct(req, res) {
    const allProductData = await PRODUCT.find({})
    return res.json(allProductData)
}

async function handleDeleteProduct(req, res) {
    const productId = req.params.id;

    try {
        const deletedProduct = await PRODUCT.findByIdAndDelete(productId);

        if (!deletedProduct) {
            return res.status(404).json({ msg: "Product not found" });
        }

        return res.json({ msg: "Product deleted successfully" });
    } catch (error) {
        console.error("Error deleting product:", error);
        return res.status(500).json({ msg: "Internal Server Error" });
    }
}

async function handleEditProduct(req, res) {
    try {
      const { id } = req.params;
      const { productName, productPrice, productUSP, productDescription, productImageUrl } = req.body;
  
      const updatedProduct = await PRODUCT.findByIdAndUpdate(
        id,
        { productName, productPrice, productUSP, productDescription, productImageUrl },
        { new: true, runValidators: true }
      );
  
      if (!updatedProduct) {
        return res.status(404).send({ message: 'Product not found' });
      }
  
      res.status(200).send(updatedProduct);
    } catch (error) {
      res.status(500).send({ message: 'Error updating product', error });
    }
  }
  

module.exports = { handleAddProduct, handleGetProduct, handleDeleteProduct, handleEditProduct }