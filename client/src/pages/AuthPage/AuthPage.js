import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { Link, Redirect } from "react-router-dom";
import FacebookLogin from "react-facebook-login";
import { GoogleLogin } from "react-google-login";

import api from "../../redux/api";

import {
  Col,
  Row,
  Card,
  Form,
  Modal,
  Button,
  Container,
} from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";

import "./style.css";

import { authActions } from "../../redux/actions";

import Footer from "../../components/Footer";
const FB_APP_ID = process.env.REACT_APP_FB_APP_ID;
const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;

export default function RegisterPage() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const [user, setUser] = useState({ firstName:"", lastName:"",email: "", password: "" });
  const [show, setShow] = useState(false);

  const onToggleModal = (e) => {
    e.preventDefault();
    setShow(!show);
  };

  const onLogin = (e) => {
    e.preventDefault();
    dispatch(authActions.loginRequest(user.email, user.password));
  };

  const onChange = (e) => {
    setUser({ ...user, [e.target.id]: e.target.value });
  };

  const onSubmit = (e) => {
    console.log("User day:",user)
    const {firstName,lastName,email,password} = user;
    e.preventDefault();
    dispatch(authActions.register(firstName, lastName, email, password));
  };
  // const oauthLogin = async (user, authProvider) => {
  //   const access_token = user.accessToken;
  //   const url = `/api/auth/login/${authProvider}`;
  //   const res = await api.post(url, { access_token, user });
  //   const newUser = res.data.user;
  //   if (newUser) {
  //     newUser.authenticated = true;
  //     newUser.provider = authProvider;
  //     setUser(newUser);
  //   }
  // };
  if (isAuthenticated) return <Redirect to="/" />;

  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Coderbook - Login or Sign Up</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <Container
        fluid
        className="min-vh-100 d-flex flex-column align-items-center justify-content-center"
      >
        <Row>
          <Col className="d-flex flex-column justify-content-center align-items-center align-items-md-start">
            <h1 className="text-primary text-sm-left">coderbook</h1>
            <p className="header">
              Coderbook let's you share with your friends and family.
            </p>
          </Col>
          <Col className="d-flex justify-content-center align-items-center">
            <Card style={{ width: "30rem" }} className="p-3 box-shadow">
              <Form className="d-flex flex-column justify-content-center align-content-center text-align-center">
                <Form.Group controlId="email">
                  <Form.Control
                    type="email"
                    onChange={onChange}
                    placeholder="Email or Phone Number"
                  />
                </Form.Group>
                <Form.Group controlId="password">
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    onChange={onChange}
                  />
                </Form.Group>
                <Button
                  block
                  type="submit"
                  variant="primary"
                  onClick={onLogin}
                  className="font-weight-bold"
                >
                  Login
                </Button>
                <Form.Group
                  className="mx-auto mt-3"
                  controlId="formBasicPassword"
                >
                  <Link className="" to="#">
                    Forgot Password?
                  </Link>
                </Form.Group>

                <Button
                  type="submit"
                  variant="success"
                  onClick={onToggleModal}
                  className="mx-auto w-50 font-weight-bold"
                >
                  Create an account
                </Button>
              </Form>
            </Card>
          </Col>
        </Row>
      </Container>
      <Modal
        show={show}
        dialogClassName="modal-90w"
        onHide={() => setShow(false)}
        aria-labelledby="example-custom-modal-styling-title"
        className="d-flex align-items-center justify-content-center"
      >
        <Modal.Header>
          <Modal.Title>
            Sign Up
            <p className="text-secondary font-weight-light p-modal">
              It's quick and easy.
            </p>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* STEP 1 */}
          <Form
            onSubmit={onSubmit}
            className="d-flex flex-column justify-content-center"
          >
            <Form.Row>
              <Form.Group as={Col} controlId="firstName">
                <Form.Control
                  type="firstname"
                  placeholder="First Name"
                  onChange={onChange}
                />
              </Form.Group>
              <Form.Group as={Col} controlId="lastName">
                <Form.Control
                  type="lastname"
                  placeholder="Last Name"
                  onChange={onChange}
                />
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} controlId="email">
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  onChange={onChange}
                />
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} controlId="password">
                <Form.Control
                  type="password"
                  placeholder="Password"
                  onChange={onChange}
                />
              </Form.Group>
            </Form.Row>
            <p className="text-center p-terms">
              By clicking Sign Up, you agree to our Terms, Data Policy and
              Cookie Policy. You may receive SMS notifications from us and can
              opt out at any time.
            </p>
            <Button className="mx-auto w-50" variant="primary" type="submit">
              Sign Up
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
      <Footer />
    </div>
  );
}
