import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ReactLoading from "react-loading";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./ProductDetailsPage.css"
import { BookDataContext, StorageContext, UserDataContext } from './Context';
// import { TokenContext } from './ContextCreate';
import axios from 'axios';

const ProductDetailsPage = () => {
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [btnTitle, setBtnTitle] = useState(false);
  const data = useContext(StorageContext);
  const params = useParams();
  const navigate = useNavigate();

  const books = useContext(BookDataContext);
  // const token = useContext(TokenContext);
  const token = localStorage.getItem('token');
  const { setUserData } = useContext(UserDataContext);

  useEffect(() => {

    // async function fetchBook() {
    //   try {
    //     const response = await fetch(`http://localhost:9000/books/${params.id}`, {
    //       headers: {
    //         Authorization: `Bearer ${token}`
    //       }
    //     }
    //     );
    //     if (!response.ok) {
    //       throw new Error('Failed to fetch product');
    //     }
    //     const data = await response.json();
    //     setProduct(data);
    //   } catch (error) {
    //     console.error('Error fetching product:', error.message);
    //   }
    // };

    async function fetchBook() {
      try {
        const bookFetchData = await axios.get(`http://localhost:9000/books/${params.id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        setProduct(bookFetchData.data);
      } catch (error) {
        // toast.error('session is expired');
        // localStorage.removeItem('token');
        // navigate('/login');
        console.log("eeeeeee", error)
      }
    }
    fetchBook();
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

  const handleAddToWishList = async (productId) => {
    // data.setWishList((list) => {
    //   if (!list.some(item => item.id === product.id)) {
    //     toast.success("Added To Your WishList!", {
    //       position: toast.POSITION.TOP_CENTER,
    //       autoClose: 1500
    //     });
    //     return list.concat({ id: product.id });
    //   }
    //   toast.success("Already Added To Your WishList!", {
    //     position: toast.POSITION.TOP_CENTER,
    //     autoClose: 1500
    //   })
    //   return list;
    // }
    // );

    try {
      const user = JSON.parse(localStorage.getItem('user'));

      await axios.post('http://localhost:9000/wishlist/add',
        { userId: user._id, bookId: productId },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      setUserData((prev) => ({ ...prev, wishlistCount: prev.wishlistCount + 1 }));

      const updatedUser = { ...user, wishlistCount: user.wishlistCount + 1 };
      localStorage.setItem('user', JSON.stringify(updatedUser));

      toast.success('Added to your WishList!', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1500
      });

    } catch (error) {
      toast.error(error.response.data.message, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1500
      })
      // console.log('error', error)
    }

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
            <button className="add-to-wish-btn" onClick={() => handleAddToWishList(product.id)}> Add to WishList </button>
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
