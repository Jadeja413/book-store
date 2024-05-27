import { useContext, useEffect, useState } from "react"
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Box, Divider, Grid, Paper, Typography } from '@mui/material';
import { Button, CardActionArea, CardActions } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { BookDataContext, StorageContext, UserDataContext } from "./Context"
import { useNavigate } from "react-router-dom";
import DeleteOutlineTwoToneIcon from '@mui/icons-material/DeleteOutlineTwoTone';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import RemoveOutlinedIcon from '@mui/icons-material/RemoveOutlined';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TokenContext } from "./ContextCreate";
import axios from "axios";
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import StripeCheckoutForm from "./CartCheckout";
import ReactLoading from "react-loading";

const stripePromise = loadStripe('pk_test_51PGLfGSIADDoIVWIwJjSUdRvlDVEsipi0AUKgDjP6gMlkH8zJiVKmGOvd7fa1Nd4WYdy7yC8DMmLFHu1EYTjEFTl00odZntT6O');

export default function Cart() {
  const bookData = useContext(BookDataContext);
  const data = useContext(StorageContext);

  const [cartItem, setCartItem] = useState([])
  const [updateCart, setUpdateCart] = useState(false);
  const [isCheckout, setIsCheckout] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const { token, setToken } = useContext(TokenContext);
  const { setUserData } = useContext(UserDataContext);

  const user = JSON.parse(localStorage.getItem('user'));

  const TotalAmount = cartItem?.reduce((acc, item) => acc + item.bookQuantity * item.price, 0) || 0;


  async function fetchList() {
    try {
      const response = await axios.get('http://localhost:9000/cart',
        {
          params: { userId: user._id },
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      // console.log(response.data, "response====")
      // toast.success('Added to your WishList!');
      setCartItem(response?.data || []);
      setIsLoading(true);
    } catch (error) {
      // toast.error(error.response.data.message)
      console.log('error', error);
      if (error?.response?.data.message === 'jwt expired') {

        toast.error('Session Expired.', {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 1500
        })
        localStorage.removeItem('token');
        setToken(null);
        navigate('/login');
      }
    }
  }

  useEffect(() => {
    fetchList();
  }, [])

  const updatedCartList = bookData.filter(item1 => data.cartList.some(item2 => item1.id === item2.id));

  // function AddToWishListHandler(id) {
  //   const updatedCartList = data.cartList.filter(book => book.id !== id);

  //   data.setWishList((list) => {
  //     if (!list.some(item => item.id === id)) {
  //       toast.success("Added To Your WishList!", {
  //         position: toast.POSITION.TOP_CENTER,
  //         autoClose: 1500
  //       });
  //       return list.concat({ id: id });
  //     }
  //     toast.success("Already Added To Your WishList!", {
  //       position: toast.POSITION.TOP_CENTER,
  //       autoClose: 1500
  //     })
  //     return list;
  //   }
  //   );
  //   data.setCartList(updatedCartList);
  // }
  const AddToWishListHandler = async (productId) => {

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

      // const updatedUser = { ...user, wishlistCount: user.wishlistCount + 1 };
      // localStorage.setItem('user', JSON.stringify(updatedUser));

      toast.success('Added to your WishList!', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1500
      });

    } catch (error) {
      if (error.response.data.message === 'jwt expired') {
        toast.error('Session Expired! Please Login.', {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 1500
        })
        navigate('/login');
        localStorage.clear();
      } else {
        toast.error(error.response.data.message, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 1500
        })
        console.log('error', error);
      }
    }

  };

  const removeHandler = async (id) => {

    try {
      await axios.post('http://localhost:9000/cart/removeItem',
        { userId: user._id, bookId: id },
        {
          // params: { userId: user._id, bookId: id },
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      // console.log("removeCartCount", cartItem?.length);

      setUserData((prev) => ({ ...prev, cartlistCount: prev.cartlistCount - 1 }));

      fetchList();
    } catch (error) {
      if (error.response?.data.message === 'jwt expired') {
        toast.error('Session Expired.', {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 1500
        })
        localStorage.removeItem('token');
        setToken(null);
        navigate('/login');
      } else {
        console.log('error', error);
      }
    }
  }

  const AddCartHandler = async (productId) => {
    // setBtnTitle(true);
    // data.setCartList((list) => list.concat({ id: product.id }));
    // toast.success("Added To Your Cart!", {
    //   position: toast.POSITION.TOP_CENTER,
    //   autoClose: 1500
    // });
    // console.log("productId", productId)
    // const user = JSON.parse(localStorage.getItem('user'));

    try {

      await axios.post('http://localhost:9000/cart/add',
        { userId: user._id, bookId: productId, bookQuantity: 1 },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      fetchList();
    } catch (error) {
      if (error.response?.data.message === 'jwt expired') {

        toast.error('Session Expired.', {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 1500
        })
        localStorage.clear();
        setToken(null);
        navigate('/login');
      }
    }
  }

  const DeleteCartCountHandler = async (productId) => {
    // setBtnTitle(true);
    // data.setCartList((list) => list.concat({ id: product.id }));
    // toast.success("Added To Your Cart!", {
    //   position: toast.POSITION.TOP_CENTER,
    //   autoClose: 1500
    // });
    // console.log("productId", productId)
    // const user = JSON.parse(localStorage.getItem('user'));

    try {
      await axios.post('http://localhost:9000/cart/delete',
        { userId: user._id, bookId: productId, bookQuantity: 1 },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      // setUpdateCart(!updateCart)
      fetchList();
    } catch (error) {

      if (error.response?.data.message === 'jwt expired') {

        toast.error('Session Expired.', {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 1500
        })
        localStorage.removeItem('token');
        setToken(null);
        navigate('/login');
      } else {
        console.log('error', error);
      }
    }
  }

  if ( !cartItem.length && !isLoading ) {
    return <div style={{ minHeight: "81vh", display: "flex", justifyContent: "center", alignItems: "center" }}><ReactLoading type={"spin"} color={"black"} height={60} width={60} /></div>;
  }

  return (
    <div >
      {
        // !updatedCartList.length ?
        (!cartItem.length ) ?
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
              minHeight: '80vh',
            }}
          >
            <Typography variant="h3" align="left">
              Cart Is Empty
            </Typography>
            <Typography variant="h6" >
              Looks like you haven’t added anything to your cart yet
            </Typography>
            <Button variant="contained" onClick={() => navigate("/products")}>Browse Products</Button>
          </Box>
          :
          <Grid sx={{ margin: "50px 50px" }} >
            <Box>
              <Typography variant="h5" >Cart Items</Typography>
            </Box>

            <Grid container spacing={4} >
              <Grid item xs={12} md={6} sx={{
                // height: '900px',
                // width: '200px',
                overflowY: 'auto',
                // WebkitScrollbarWidth: '10px',
                scrollbarWidth: 'thin',
                scrollbarColor: 'gray',
              }} >

                {
                  // updatedCartList.map(book =>
                  cartItem?.map(book =>
                    <Box key={book.id}>
                      <Card sx={{ width: "auto", marginBottom: "40px", marginTop: "20px", display: "flex", }}>
                        <CardMedia
                          component="img"
                          height="100"
                          image={book.cover_image}
                          alt={book.title}
                          sx={{ width: "30%" }}
                        />
                        <CardContent sx={{ width: "70%" }}>
                          <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <h2>{book.title}</h2>
                            <div style={{ display: "flex", alignItems: "center" }} onClick={() => AddToWishListHandler(book.id)}>
                              <FavoriteBorderIcon htmlColor="gray" /> <span style={{ margin: " 10px 10px" }}>Add To WishList</span>
                              <ToastContainer />
                            </div>
                          </div>
                          <hr />
                          <div style={{ display: "flex", justifyContent: "space-between", marginTop: '30px ' }}>
                            <Box>
                              <Typography variant="body1" mt={1}>₹: {book.price}</Typography>
                            </Box>

                            <Box sx={{ border: '1px solid gray', borderRadius: '8px' }}>
                              <Button disabled={book.bookQuantity < 2} onClick={() => DeleteCartCountHandler(book.id)}> <RemoveOutlinedIcon /> </Button>
                              {book.bookQuantity}
                              <Button onClick={() => AddCartHandler(book.id)}> <AddOutlinedIcon /> </Button>
                              <Button sx={{ borderLeft: '1px solid gray', borderRadius: '0px', color: 'red' }} onClick={() => removeHandler(book.id)} > <DeleteOutlineTwoToneIcon /> Remove </Button>
                            </Box>

                          </div>
                          <Box display='flex' justifyContent='end' mt={2}>
                            <Typography variant="overline" fontSize={14}> Total Amount: {book.price * book.bookQuantity} </Typography>
                          </Box>
                        </CardContent>
                      </Card>
                    </Box>
                  )
                }
              </Grid>
              <Grid item xs={12} md={6} >
                <Paper elevation={2} sx={{ padding: '20px 10px', margin: "20px 20px 50px 10px" }}>
                  <Grid item xs={12} sx={{ margin: "20px" }}>
                    <Box >
                      <Box>
                        <Typography variant="h6" > Shipping Address </Typography>
                      </Box>

                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography sx={{ margin: '10px' }} > Add Delivery Address </Typography>
                        <Button sx={{ marginRight: '20px' }}>Change</Button>
                      </Box>

                      <Box >
                        <Typography variant="overline" component="div"> Address line 1, </Typography>
                        <Typography variant="overline" component="div"> Address line 2, </Typography>
                        <Typography variant="overline" component="div"> Address line 3, </Typography>
                        <Typography variant="overline" component="div"> Address line 4, </Typography>
                        <Typography variant="overline" component="div"> Address line 5, </Typography>
                        <Typography variant="overline" component="div"> Address line 6, </Typography>
                      </Box>

                    </Box>
                  </Grid>

                  <Grid item xs={12} sx={{ margin: "30px" }}>
                    <Box >
                      <Typography variant="h6" > Total Amount </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', justifyContent: 'space-around', margin: '10px 50px' }}>
                      <Typography variant="overline" fontSize={15}> Items Total </Typography>
                      <Typography variant="overline" fontSize={15}>
                        ₹: {TotalAmount}
                      </Typography>
                    </Box>

                    <Divider />

                    <Box sx={{ display: "grid", margin: '30px 50px' }}>
                      {/* <Button variant="contained" align="center" onClick={() => setIsCheckout(true)}> Proceed to Checkout </Button> */}
                      {
                        !isCheckout
                          ?
                          <Button variant="contained" align="center" onClick={() => setIsCheckout(true)}> Proceed to Checkout </Button>
                          :
                          <Elements stripe={stripePromise}>
                            <StripeCheckoutForm amount={(TotalAmount) * 100} />
                          </Elements>
                      }
                    </Box>
                  </Grid>
                </Paper>
              </Grid>
            </Grid>
          </Grid>
      }
    </div>

  )
}
