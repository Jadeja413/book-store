import { useContext, useState, useEffect, useParams } from "react"
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Box, Typography } from '@mui/material';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { BookDataContext, StorageContext, UserDataContext } from "./Context"
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { TokenContext } from "./ContextCreate";
import ReactLoading from "react-loading";

export default function WishListComp() {

  const [wishList, setWishList] = useState([])
  const bookData = useContext(BookDataContext);
  const data = useContext(StorageContext);
  const { setUserData } = useContext(UserDataContext);
  const { token, setToken } = useContext(TokenContext)

  const navigate = useNavigate();

  const updatedWishList = bookData.filter(item1 => data.wishList.some(item2 => item1.id === item2.id));

  // const user = localStorage.getItem('user');
  // const userData = JSON.parse(user)._id;
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    async function fetchList() {
      try {
        const response = await axios.get('http://localhost:9000/wishlist',
          {
            params: { userId: user._id },
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
        // console.log(response.data, "response====")
        // toast.success('Added to your WishList!');
        setWishList(response.data)
      } catch (error) {
        // toast.error(error.response.data.message)
        console.log('error', error);
        if (error.response.data.message === 'jwt expired') {

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
    fetchList();
  }, [user._id])

  // function AddCartHandler(id) {
  //   data.setCartList((list) => list.concat({ id: id }));

  //   const filteredArray = data.wishList.filter(item => item.id !== id);

  //   data.setWishList(filteredArray);
  //   navigate("/cart");
  //   toast.success("Added To Your Cart!", {
  //     position: toast.POSITION.TOP_CENTER,
  //     autoClose: 1500
  //   });
  // }
  const AddCartHandler = async (productId) => {
    // data.setCartList((list) => list.concat({ id: productId }));

    // const filteredArray = data.wishList.filter(item => item.id !== productId);

    // data.setWishList(filteredArray);
    // navigate("/cart");
    // toast.success("Added To Your Cart!", {
    //   position: toast.POSITION.TOP_CENTER,
    //   autoClose: 1500
    // });
    // console.log("productId", productId)
    // const user = JSON.parse(localStorage.getItem('user'));
    try {
      const response = await axios.post('http://localhost:9000/cart/add',
        { userId: user._id, bookId: productId, bookQuantity: 1 },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const cartLength = parseInt(response?.data?.cartlist.books.length);
      setUserData((prev) => ({ ...prev, cartlistCount: cartLength }));


      const updatedUser = { ...user, cartlistCount: cartLength };
      localStorage.setItem('user', JSON.stringify(updatedUser));

      navigate("/cart");
    } catch (error) {
      if (error.response?.data.message === 'jwt expired') {
        localStorage.clear();
        setToken(null);
        navigate('/login')
      } else {
        toast.error(error.response?.data.message, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 1500
        })
        // console.log('error', error)
      }
    }

  }

  async function RemoveWishListHandler(id) {
    // const filteredArray = data.wishList.filter(item => item.id !== id);
    // data.setWishList(filteredArray);
    // toast.success("Removed From Your WishList!", {
    //   position: toast.POSITION.TOP_CENTER,
    //   autoClose: 1500
    // });

    try {
      const response = await axios.get('http://localhost:9000/wishlist/remove',
        {
          params: { userId: user._id, bookId: id },
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      setUserData((prev) => ({ ...prev, wishlistCount: prev.wishlistCount - 1 }));

      const updatedUser = { ...user, wishlistCount: user.wishlistCount - 1 };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setWishList(response.data)
      toast.success('Removed from your WishList!', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1500
      });
    } catch (error) {
      if (error.response?.data.message === 'jwt expired') {
        localStorage.clear();
        setToken(null);
        navigate('/login')
      } else {
        toast.error(error.response?.data.message, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 1500
        })
        // console.log('error', error)
      }
    }
  }

  if (!wishList) {
    return <div style={{ minHeight: "81vh", display: "flex", justifyContent: "center", alignItems: "center" }}><ReactLoading type={"spin"} color={"black"} height={60} width={60} /></div>;
  }

  return (
    <div style={{ width: "70%", margin: "auto" }}>
      <div>
        <h3>Your WishList!</h3>
      </div>
      {
        // updatedWishList.length ?
        //   updatedWishList.map(book =>
        wishList.length ?
          wishList.map(book =>
            <div style={{ margin: "40px 40px" }} key={book.id}>
              <Card sx={{ padding: "20px 20px" }}>
                {/* <CardActionArea onClick={()=>navigate(`/product/${book.id}`)}> */}
                <CardMedia
                  component="img"
                  height="120"
                  image={book.cover_image}
                  alt={book.title}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div" sx={{ cursor: 'pointer' }} onClick={() => navigate(`/product/${book.id}`)}>
                    {book.title}
                  </Typography>
                  <Typography gutterBottom variant="h7" component="div">
                    {book.author}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {book.description}
                  </Typography>
                </CardContent>
                {/* </CardActionArea> */}
                <CardActions>
                  <Button size="small" variant="contained" color="primary" onClick={() => AddCartHandler(book.id)}>
                    Add To Cart
                  </Button>
                  <ToastContainer />
                  <Button size="small" variant="outlined" color="primary" onClick={() => RemoveWishListHandler(book.id)}>
                    Remove From WishList
                  </Button>
                  <ToastContainer />
                </CardActions>
              </Card>
            </div>
          ) :
          <div>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                minHeight: '80vh',
              }}
            >
              <Typography variant="h3" >
                No Wishlist
              </Typography>
              <Typography variant="h6" >
                You haven’t wishlisted any items, Browse items and wishlist it
              </Typography>
              <Button variant="contained" onClick={() => navigate("/products")}>Browse Products</Button>
            </Box>
          </div>
      }
    </div>
  )
}
