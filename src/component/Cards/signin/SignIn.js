import { TextField, Button, Typography, InputAdornment, IconButton } from "@mui/material";
import { Formik, useFormik } from "formik";
import { Fragment, useContext, useState } from "react";
import * as Yup from 'yup';
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { TokenContext } from "../../ContextCreate";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  const { setToken } = useContext(TokenContext);

  return (
    <Fragment>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={Yup.object({
          email: Yup.string("Should be in Char").email().required(),
          password: Yup.string().required(),
        })}
        onSubmit={async (values) => {
          try {
            const response = await axios.post('http://localhost:9000/login', {
              email: values.email,
              password: values.password,
            });

            const { token } = response.data;
            localStorage.setItem('token', token);
            setToken(token)
            navigate('/');

          } catch (error) {
            // console.error('Error signing up:', error.message);
            console.log('Error-error:', error.response.data.message);
            toast.error(error.response.data.message, {
              // position: toast.POSITION.TOP_CENTER,
              autoClose: 1500
            });
          }
        }}
      >
        {
          formik => (
            <form onSubmit={formik.handleSubmit} style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh" }}>
              <div style={{ width: "50%" }}>
                <div style={{ margin: "20px 20px" }}>
                  <Typography variant="h3" gutterBottom color="primary" >Login Info</Typography>
                </div>
                <div>
                  {/* {console.log("formik", formik)} */}
                </div>
                <div style={{ margin: "20px 20px" }}>
                  <TextField
                    fullWidth
                    id="email"
                    name="email"
                    label="Email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && (formik.errors.email)}
                  />
                </div>
                <div style={{ margin: "20px 20px" }}>
                  <TextField
                    fullWidth
                    id="password"
                    name="password"
                    label="Password"
                    type={showPassword ? "text" : "password"}
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
                            data-testid='checkToggle'
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
                <div style={{ margin: "20px 20px" }}>
                  <Button color="primary" variant="contained" fullWidth type="submit">
                    SignIn
                  </Button>
                </div>
                <div style={{display: "flex", justifyContent: "center"}}>
                <p>Do not have an account? <Link to='/signup' >Create One</Link></p>
                </div>
                <ToastContainer />
              </div>
            </form>
          )
        }
      </Formik>
    </Fragment>
  )
}
