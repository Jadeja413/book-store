import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ReactLoading from "react-loading";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./ProductDetailsPage.css"
import { BookDataContext, StorageContext, UserDataContext } from './Context';
// import { TokenContext } from './ContextCreate';
import axios from 'axios';
import { TokenContext } from './ContextCreate';
import { Box, Container, Rating, TextField, Typography } from '@mui/material';

const ProductDetailsPage = () => {
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [btnTitle, setBtnTitle] = useState(false);
  const data = useContext(StorageContext);
  const params = useParams();
  const navigate = useNavigate();

  // const books = useContext(BookDataContext);
  const { token, setToken } = useContext(TokenContext);
  // const token = localStorage.getItem('token');
  const { setUserData } = useContext(UserDataContext);

  const user = JSON.parse(localStorage.getItem('user'));

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
        toast.error('session is expired');
        localStorage.clear();
        setToken(null);
        navigate('/login');
        console.log("error", error)
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

  const AddCartHandler = async (productId) => {
    // setBtnTitle(true);
    // data.setCartList((list) => list.concat({ id: product.id }));
    // toast.success("Added To Your Cart!", {
    //   position: toast.POSITION.TOP_CENTER,
    //   autoClose: 1500
    // });
    // console.log("productId", productId);
    // const user = JSON.parse(localStorage.getItem('user'));
    try {

      const response = await axios.post('http://localhost:9000/cart/add',
        { userId: user._id, bookId: productId, bookQuantity: quantity },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const cartLength = parseInt(response?.data?.cartlist.books.length);
      setUserData((prev) => ({ ...prev, cartlistCount: cartLength }));

      setBtnTitle(true);

      const updatedUser = { ...user, cartlistCount: cartLength };
      localStorage.setItem('user', JSON.stringify(updatedUser));

      toast.success("Added To Your Cart!", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1500
      });
    } catch (error) {
      if (error.response.data.message === 'jwt expired') {
        toast.error('Session Expired.', {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 1500
        });
        localStorage.clear();
        navigate('/login');
      } else {
        toast.error(error.response.data.message, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 1500
        });
        console.log('error', error);
      }
    }
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
      if (error.response?.data.message === 'jwt expired') {
        toast.error('session is expired!');
        localStorage.removeItem('token');
        setToken(null);
        navigate('/login');
      } else {
        toast.error(error.response.data.message, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 1500
        })
        console.log('error', error);
      }
    }

  };

  return (
    <Container sx={{ minHeight: "81vh", display: "flex", alignItems: "center" }}>
      <Box className="product-details-container">
        <Box className="product-details-image">
          <img src={product.image} alt={product.title} />
        </Box>
        <Box className="product-details-info">
          <Typography variant="h4" component="div">
            {product.title}
          </Typography>
          <Typography variant="h5" color="text.secondary" gutterBottom>
            ₹ {product.price}
          </Typography>
          <Box className="quantity-section" sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
            <Typography variant="body1" sx={{ mr: 2 }}>Quantity:</Typography>
            <TextField
              type="number"
              id="quantity"
              variant="outlined"
              size="small"
              inputProps={{ min: 1 }}
              value={quantity}
              onChange={handleQuantityChange}
              sx={{ width: '100px' }}
            />
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
            <Rating value={product.rating} readOnly />
            <Typography variant="body2" sx={{ ml: 1 }}>
              {product.reviewsCount} Reviews
            </Typography>
          </Box>
          <Box sx={{ mt: 2 }}>
            {!btnTitle ?
              <button
                className="add-to-cart-btn"
                disabled={quantity === 0}
                onClick={() => AddCartHandler(product.id)}
              >
                Add to Cart
              </button> :
              <button
                className="add-to-cart-btn"
                onClick={() => { setBtnTitle(true); navigate("/cart") }}
              >
                Go to Cart
              </button>}
            <button
              className="add-to-wish-btn"
              onClick={() => handleAddToWishList(product.id)}
            >
              Add to WishList
            </button>
          </Box>
          <ToastContainer />
          <Box className="product-description">
            <Typography variant="h6">
              Description:
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {product.description}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default ProductDetailsPage;
