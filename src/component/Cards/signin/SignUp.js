import { useContext, useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { TextField, Button, Typography, IconButton, InputAdornment } from "@mui/material";
import { Formik } from "formik";
import { Fragment } from "react";
import * as Yup from 'yup';
import axios from "axios";
import { TokenContext } from "../../ContextCreate";
import { useNavigate } from "react-router-dom";

export function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  const navigate = useNavigate();
  const {setToken} = useContext(TokenContext);

  return (
    <Fragment>
      <Formik
        initialValues={{firstName: "", lastName: "", email: "", password: "", confirmPassword: ""}}
        validationSchema={Yup.object({
          firstName: Yup.string("Should be in Char").max(15, "First Name should have 15 char or less").required(),
          lastName: Yup.string("Should be in Char").max(15, "Last Name should have 15 char or less").required(),
          email: Yup.string().email('Invalid email address').required('Email is required'),
          password: Yup.string().required("Password required"),
          confirmPassword: Yup.string().oneOf([Yup.ref('password')], 'Passwords must match').required('changepassword is required')
        })}
        onSubmit={ async (values) => {
          try {
            const response = await axios.post('http://localhost:9000/signup', {
              firstName: values.firstName,
              lastName: values.lastName,
              email: values.email,
              password: values.password,
            });
      
            const {token} = response.data;
            localStorage.setItem('token', token);
            setToken(token)
            navigate('/');
      
          } catch (error) {
            console.error('Error signing up:', error.message);
            // toast.error(error.response.data.message, {
            //   // position: toast.POSITION.TOP_CENTER,
            //   autoClose: 1500
            // });
          }
        }}
      >
        {
          formik => (
            <form onSubmit={formik.handleSubmit} style={{display: "flex", alignItems: "center", justifyContent: "center", height: "100vh"}}>
              <div style={{width: "50%"}}>
                <div style={{margin: "20px 20px"}}>
                  <Typography variant="h3" gutterBottom color="primary" >Create Your Account</Typography>
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
                  <TextField
                    fullWidth
                    id="email"
                    name="email"
                    label="Email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                  />
                </div>
                <div style={{margin: "20px 20px"}}>
                  <TextField
                    fullWidth
                    id="password"
                    name="password"
                    label="Password"
                    type={showPassword ? "text" :"password"}
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                          >
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                    error={formik.touched.password && Boolean(formik.errors.password)}
                    helperText={formik.touched.password && formik.errors.password}
                  />
                </div>
                <div style={{margin: "20px 20px"}}>
                  <TextField
                    fullWidth
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    label="Confirm Your Password"
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                    helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                  />
                </div>
                <div style={{margin: "20px 20px"}}>
                  <Button color="primary" variant="contained" fullWidth type="submit">
                    SignUp
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
