import { useContext, useState, useEffect, useParams } from "react"
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Box, Typography } from '@mui/material';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { BookDataContext, StorageContext } from "./Context"
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function WishListComp() {
  const bookData = useContext(BookDataContext);
  const data = useContext(StorageContext);

  const navigate = useNavigate();

  const updatedWishList = bookData.filter(item1 => data.wishList.some(item2 => item1.id === item2.id));

  function AddCartHandler(id) {
    data.setCartList((list) => list.concat({ id: id }));
    
    const filteredArray = data.wishList.filter(item => item.id !== id);

    data.setWishList(filteredArray);
    navigate("/cart");
    toast.success("Added To Your Cart!", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 1500
    });
  }

  function RemoveWishListHandler(id) {
    const filteredArray = data.wishList.filter(item => item.id !== id);
    data.setWishList(filteredArray);
    toast.success("Removed From Your WishList!", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 1500
    });
  }

  return (
    <div style={{ width: "70%", margin: "auto" }}>
      <div>
        <h3>Your WishList!</h3>
      </div>
      {
        updatedWishList.length ?
          updatedWishList.map(book =>
            <div style={{ margin: "40px 40px"}}>
              <Card sx={{padding: "20px 20px" }}>
                {/* <CardActionArea onClick={()=>navigate(`/product/${book.id}`)}> */}
                  <CardMedia
                    component="img"
                    height="120"
                    image={book.cover_image}
                    alt={book.title}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
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
                  <Button size="small" variant="contained" color="primary" onClick={()=>AddCartHandler(book.id)}>
                    Add To Cart
                  </Button>
                  <ToastContainer />
                  <Button size="small" variant="outlined" color="primary" onClick={()=>RemoveWishListHandler(book.id)}>
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
