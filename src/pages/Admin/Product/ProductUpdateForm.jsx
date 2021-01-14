import React, { useState } from "react"
import { updateProduct } from "../../../api/product"
import { toast } from "react-toastify"
import Spinner from "react-bootstrap/Spinner"
import FileUpload from "./FileUpload"

const ProductUpdateForm = ({ product, fetchProducts }) => {
  const initialState = {
    name: product.name,
    description: product.description,
    price: product.price,
    quantity: product.quantity,
    // category: product.category.name,
    images: product.images,
  }

  const [newProduct, setNewProduct] = useState(initialState)
  // eslint-disable-next-line
  const [loading, setLoading] = useState(false)

  const { name, description, price, quantity } = newProduct

  const handleChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value })
  }

  const handleUpdateProduct = async () => {
    setLoading(true)
    try {
      const response = await updateProduct(product.slug, newProduct)
      if (response.data) {
        fetchProducts()
      }
      setLoading(false)
    } catch (err) {
      setLoading(false)
      console.log(err)
      toast.error(err.message)
    }
  }

  return (
    <>
      <div className="form">
        <label htmlFor="1"> Nom </label>
        <input
          onChange={(e) => handleChange(e)}
          className="form-control my-2"
          type="text"
          value={name}
          name="name"
          placeholder="Nom du produit"
          autoFocus
          required
          id="1"
        />
        <label> Description </label>
        <input
          onChange={handleChange}
          className="form-control my-2"
          type="textarea"
          value={description}
          name="description"
          placeholder="Description du produit"
          required
        />
        <label> Prix </label>
        <input
          onChange={handleChange}
          className="form-control my-2"
          type="number"
          value={price}
          name="price"
          placeholder="Prix du produit"
          required
        />

        <label> Quantité </label>
        <input
          onChange={handleChange}
          className="form-control my-2"
          type="number"
          value={quantity}
          name="quantity"
          placeholder="Quantité du produit"
          required
        />
        <label> Images </label>
        <FileUpload product={newProduct} setProduct={setNewProduct} />
        <button
          className="btn btn-outline-info my-2 my-sm-0"
          onClick={handleUpdateProduct}
        >
          {loading ? (
            <Spinner animation="border" variant="info" />
          ) : (
            "Enregistrer"
          )}
        </button>
      </div>
    </>
  )
}

export default ProductUpdateForm
