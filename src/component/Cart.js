import { useContext } from "react"
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Box, Divider, Grid, Paper, Typography } from '@mui/material';
import { Button, CardActionArea, CardActions } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { BookDataContext, StorageContext } from "./Context"
import { useNavigate } from "react-router-dom";
import DeleteOutlineTwoToneIcon from '@mui/icons-material/DeleteOutlineTwoTone';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import RemoveOutlinedIcon from '@mui/icons-material/RemoveOutlined';
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
    <div >
      {!updatedCartList.length ?
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
        </Box> :
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
                updatedCartList.map(book =>
                  <Box >
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
                            <Button> <RemoveOutlinedIcon /> </Button>
                            2
                            <Button> <AddOutlinedIcon /> </Button>
                            <Button sx={{ borderLeft: '1px solid gray', borderRadius: '0px', color: 'red' }} onClick={() => removeHandler(book.id)} > <DeleteOutlineTwoToneIcon />Remove </Button>
                          </Box>

                        </div>
                        <Box display='flex' justifyContent='end' mt={2}>
                          <Typography variant="overline" fontSize={14}> Total Amount: 280 </Typography>
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
                    <Typography variant="overline" fontSize={15}> ₹ 190 </Typography>
                  </Box>

                  <Divider />

                  <Box sx={{ display: "grid", margin: '30px 50px' }}>
                    <Button variant="contained" align="center"> Proceed to Checkout </Button>
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
