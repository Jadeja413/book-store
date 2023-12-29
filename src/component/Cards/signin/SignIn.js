import { TextField, Button, Typography } from "@mui/material";
import { Formik, useFormik } from "formik";
import { Fragment } from "react";
import * as Yup from 'yup';

export function SignIn() {
  return (
    <Fragment>
      <Formik
        initialValues={{firstName: "", lastName: "", email: ""}}
        validationSchema={Yup.object({
          firstName: Yup.string("Should be in Char").max(15, "First Name should have 15 char or less").required(),
          lastName: Yup.string("Should be in Char").max(15, "Last Name should have 15 char or less").required(),
        })}
        onSubmit={ (values) => {
          alert(JSON.stringify(values, null, 2));
        }}
      >
        {
          formik => (
            <form onSubmit={formik.handleSubmit} style={{display: "flex", alignItems: "center", justifyContent: "center", height: "100vh"}}>
              <div style={{width: "50%"}}>
                <div style={{margin: "20px 20px"}}>
                  <Typography variant="h3" gutterBottom color="primary" >Login Info</Typography>
                </div>
                <div style={{margin: "20px 20px"}}>
                  <TextField
                    fullWidth
                    id="firstName"
                    name="firstName"
                    label="First Name"
                    value={formik.values.firstName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                    helperText={formik.touched.firstName && (formik.errors.firstName)}
                  />
                </div>
                <div style={{margin: "20px 20px"}}>
                  <TextField
                    fullWidth
                    id="lastName"
                    name="lastName"
                    label="Last Name"
                    value={formik.values.lastName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                    helperText={formik.touched.lastName && formik.errors.lastName}
                  />
                </div>
                <div style={{margin: "20px 20px"}}>
                  <Button color="primary" variant="contained" fullWidth type="submit">
                    SignIn
                  </Button>
                </div>
              </div>
            </form>
          )
        }
      </Formik>
    </Fragment>
  )
}














// import { useFormik } from "formik";
// import * as Yup from 'yup';

// export function SignIn() {
//   const formik = useFormik({
//     initialValues: {
//       email: "",
//       firstName: "",
//       lastName: ""
//     },
//     validationSchema: Yup.object({
//       firstName: Yup.string().max(15, "First Name should have 15 char or less").required(),
//       lastName: Yup.string("should be char").max(15, "First Name should have 15 char or less").required(),
      
//     }),
//     onSubmit: values => {
//       alert(JSON.stringify(values, null, 2));
//     }
//   });

//   return (
//     <div>
//       <form onSubmit={formik.handleSubmit}>
//         <div>
//         <label htmlFor="firstName">First Name:</label>
//         <input id="firstName" type="text" {...formik.getFieldProps('firstName')} />
//         {formik.touched.firstName && formik.errors.firstName ? <div> {formik.errors.firstName} </div> : null}
//         </div>

//         <div>
//         <label htmlFor="lastName">Last Name:</label>
//         <input id="lastName" type="text" {...formik.getFieldProps('lastName')}/>
//         {formik.touched.lastName && formik.errors.lastName ? <div> {formik.errors.lastName} </div> : null}
//         </div>

//         <div>
//         <label htmlFor="email">Email Address:</label>
//         <input id="email" type="text" {...formik.getFieldProps('email')}/>
//         {formik.touched.email && formik.errors.email ? <div> {formik.errors.email} </div> : null}
//         </div>

//         <div>
//           <input type="submit"/>
//         </div>
//       </form>
//     </div>
//   )
// }
