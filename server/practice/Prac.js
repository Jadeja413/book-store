// const express = require("express");
// const app = express();

// const port = 5000;

// const router = express.Router()

// // predicate the router with a check and bail out when needed
// router.use((req, res, next) => {
//   if (!req.headers['x-auth']) return next('router')
//   next()
// })

// router.get('/user/:id', (req, res) => {
//   res.send('hello, user!')
// })

// // use the router and 401 anything falling through
// app.use('/admin', router, (req, res) => {
//   res.sendStatus(401)
// })

// // app.get('/', (req, res) => {
// //     res.send("Hello Express");
// // });

// // app.get('/user/:id', (req, res, next) => {
// //     console.log('ID:', req.params.id)
// //     next()
// //   }, (req, res, next) => {
// //     res.send('User Info')
// //   })
  
//   // handler for the /user/:id path, which prints the user ID
// //   app.get('/user/:id', (req, res, next) => {
// //     res.send(req.params.id)
// //   })

// app.listen(port, ()=>{
//     console.log(`Example app listening on port ${port}`)
// });
