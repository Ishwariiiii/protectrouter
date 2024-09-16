import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import './LoginPage.css';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../redux/authentication/authSlice';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),

  password: Yup.string()
    .min(6, 'Password too short')
    .required('Required'),
});

export default function LoginPage() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false)
  const { loginData } = useSelector(state => state.auth)
  const token = localStorage.getItem("token")
  // console.log(token)

  useEffect(() => {
    if (token) {
      navigate('/dashboard');
    } else {
      navigate("/")
    }
  }, [token, loginData]);

  return (
    <div className="login-container ">
      <h2>Login Page</h2>

      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={LoginSchema}
        onSubmit={(values, { setSubmitting }) => {
          setLoading(true)
          dispatch(loginUser(values));
          setSubmitting(false);
        }}
      >
        {({ handleChange, handleSubmit, isSubmitting }) => (
          <Form className="login-form" onSubmit={handleSubmit}>
            <div className="form-field">
              <label htmlFor="email">Email</label>
              <Field
                type="email"
                name="email"
                placeholder="Enter your email"
                onChange={handleChange}
              />
              <ErrorMessage name="email" component="div" className="error-message" />
            </div>

            <div className="form-field">
              <label htmlFor="password">Password</label>
              <Field
                type="password"
                name="password"
                placeholder="Enter your password"
                onChange={handleChange}
              />
              <ErrorMessage name="password" component="div" className="error-message" />
            </div>

            <button type='submit' disabled={isSubmitting}>Login</button>
            {loading ? <Box sx={{ display: 'flex', justifyContent: "center", marginTop: "20px" }}>
              <CircularProgress />
            </Box> : ""}

            <Link to='/register'>Register</Link>
          </Form>
        )}
      </Formik>
    </div>
  );
}