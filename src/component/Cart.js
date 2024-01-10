import { useContext } from "react"
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Box, Typography } from '@mui/material';
import { Button, CardActionArea, CardActions } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { BookDataContext, StorageContext } from "./Context"
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import "./Cart.css"

export default function Cart() {
  const bookData = useContext(BookDataContext);
  const data = useContext(StorageContext);

  const navigate = useNavigate();

  const updatedCartList = bookData.filter(item1 => data.cartList.some(item2 => item1.id === item2.id));

  function AddToWishListHandler(id) {
    const updatedCartList = data.cartList.filter(book => book.id !== id);
    
    data.setWishList((list) => {
      if (!list.some(item => item.id === id)) {
        toast.success("Added To Your WishList!", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 1500
        });
        return list.concat({ id: id });
      }
      toast.success("Already Added To Your WishList!", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1500
      })
      return list;
    }
    );
    data.setCartList(updatedCartList);
  }

  function removeHandler(id) {
    const filteredArray = data.cartList.filter(item => item.id !== id);
    data.setCartList(filteredArray);
    toast.success("Removed From Your Cart!", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 1500
    });
  }

  return (
    <div style={{ width: "90%", margin: "auto" }}>
      <div>
        <h3>Your Cart!</h3>
      </div>
      <div>
        {!updatedCartList.length &&
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
              Cart Is Empty
            </Typography>
            <Typography variant="h6" >
              Looks like you haven’t added anything to your cart yet
            </Typography>
            <Button variant="contained" onClick={() => navigate("/products")}>Browse Products</Button>
          </Box>}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        {updatedCartList.length > 0 &&
          <div style={{ width: "60%", height: "75vh", padding: "10px 10px", overflow: "auto", scrollbarWidth: "none", '&::-webkit-scrollbar': { display: 'none' }, border: "1px solid gray", borderRadius: "40px" }}>
            {
              updatedCartList.map(book =>
                <div >
                  <Card sx={{ width: "auto", margin: "40px 40px", display: "flex", }}>
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
                        <div style={{ display: "flex", alignItems: "center" }} onClick={()=>AddToWishListHandler(book.id)}>
                          <FavoriteBorderIcon htmlColor="gray" /> <span style={{ margin: " 10px 10px" }}>Add To WishList</span>
                          <ToastContainer />
                        </div>
                      </div>
                      <hr />
                      <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <h4>$: </h4>
                        <div>
                          <h5>- count + | <button onClick={()=>removeHandler(book.id)}>Remove</button></h5>
                        </div>
                      </div>
                      {/* <Typography gutterBottom variant="h5" component="div">
                        {book.title}
                      </Typography> */}
                      {/* <Typography gutterBottom variant="h7" component="div">
                        {book.author}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {book.description}
                      </Typography> */}
                    </CardContent>
                  </Card>
                </div>
              )
            }
          </div>}
        <div style={{ width: "40%", margin: "10px 10px" }}>
          {updatedCartList.length > 0 && <h3>Calculations</h3>}
        </div>
      </div>
    </div>
  )
}
