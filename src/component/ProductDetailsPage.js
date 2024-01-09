import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ReactLoading from "react-loading";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./ProductDetailsPage.css"
import { StorageContext } from './Context';

const ProductDetailsPage = () => {
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [btnTitle, setBtnTitle] = useState(false);
  const data = useContext(StorageContext);
  const params = useParams();
  const navigate = useNavigate();

  const uniqueIds = new Set();

  console.log("data", data)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://freetestapi.com/api/v1/books/${params.id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch product');
        }
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product:', error.message);
      }
    };

    fetchProduct();
  }, [params.id]);

  const handleQuantityChange = (e) => {
    setQuantity(parseInt(e.target.value, 10));
  };

  if (!product) {
    return <div style={{ minHeight: "81vh", display: "flex", justifyContent: "center", alignItems: "center" }}><ReactLoading type={"spin"} color={"black"} height={60} width={60} /></div>;
  }

  function AddCartHandler() {
    setBtnTitle(true);
    data.setCartList((list) => list.concat({ id: product.id }));
    toast.success("Added To Your Cart!", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 1500
    });
  }

  const handleAddToWishList = () => {
    data.setWishList((list) => {
      if (!list.some(item => item.id === product.id)) {
        toast.success("Added To Your WishList!", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 1500
        });
        return list.concat({ id: product.id });
      }
      toast.success("Already Added To Your WishList!", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1500
      })
      return list;
    }
    );
  };

  return (
    <div style={{ minHeight: "81vh", display: "flex", alignItems: "center" }}>
      <div className="product-details-container" style={{ minHeight: "40vh" }}>
        <div className="product-details-image">
          <img src={product.image} alt={product.title} />
        </div>
        <div className="product-details-info">
          <h2>{product.title}</h2>
          <p className="product-price">₹ {product?.price}</p>
          <div className="quantity-section">
            <label htmlFor="quantity">Quantity:</label>
            <input
              type="number"
              id="quantity"
              min="1"
              value={quantity}
              onChange={handleQuantityChange}
            />
          </div>
          <div>
            {!btnTitle ?
              <button className="add-to-cart-btn" onClick={AddCartHandler}> Add to Cart </button> :
              <button className="add-to-cart-btn" onClick={() => { setBtnTitle(true); navigate("/cart") }}> Go to Cart </button>}
            <button className="add-to-wish-btn" onClick={handleAddToWishList}> Add to WishList </button>
            <ToastContainer />
          </div>

          <div className="product-description">
            <h3>Description:</h3>
            <p>{product.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
