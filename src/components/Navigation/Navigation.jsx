import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import styles from "../Navigation/Navigation.module.css";
import Buttons from "../Buttons/Buttons";
import { useContext, useEffect, useState } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

const Navigation = ({ signOutHandler }) => {
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);
  const [userName, setUserName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [isValidEmail, setIsValidEmail] = useState("");
  const [password, setPassword] = useState("");
  const [recoveryEmail, setRecoveryEmail] = useState("");
  const [loginUserName, setLoginUserName] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const { currentUser, allUsers, authenticateUser, handleLogOut } =
    useContext(CurrentUserContext);

  const handleClose = () => {
    setShowSignUpModal(false);
    setShowLoginModal(false);
    setShowForgotPasswordModal(false);
  };
  const signUpModalHandler = () => setShowSignUpModal(true);
  const loginModalHandler = () => setShowLoginModal(true);

  const onNameChangeHandler = (e) => {
    const trimed = e.target.value.replace(/\s/g, "").toLowerCase();
    setUserName(trimed);
  };
  const onEmailChangeHandler = (e) => {
    const emailRegEx = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/;
    const validate = emailRegEx.test(e.target.value);
    if (validate) {
      setEmailAddress(e.target.value);
      setIsValidEmail(true);
    } else {
      setIsValidEmail(false);
    }
  };
  const onPasswordChangeHandler = (e) => {
    const trimed = e.target.value.replace(/\s/g, "").toLowerCase();
    setPassword(trimed);
  };

  const onLoginUserNameChangeHandler = (e) => setLoginUserName(e.target.value);
  const onLoginPasswordChangeHandler = (e) => setLoginPassword(e.target.value);

  const signUpBtnHandler = () => {
    if (!isValidEmail || !userName || !emailAddress || !password) {
      alert("Please fill all the fields correctly before signing up.");
    } else {
      const userData = {};
      userData.user_name = userName;
      userData.email = emailAddress;
      userData.password = password;
      allUsers(userData);
      handleClose();
      setUserName("");
      setEmailAddress("");
      setPassword("");
      alert("Signed Up Successfully");
    }
  };

  const loginBtnHandler = () => {
    const loginData = {};
    loginData.user_name = loginUserName;
    loginData.password = loginPassword;
    authenticateUser(loginData);
    handleClose();
  };

  const onForgotPasswordHandler = () => {
    setShowLoginModal(false);
    setShowForgotPasswordModal(true);
  };

  const onRecoveryEmailChangeHandler = (e) => {
    setRecoveryEmail(e.target.value);
  };

  const sendRecoveryEmailHandler = () => {
    alert(
      "Recovery Password Sent !! \n Please check your Email Inbox or Spam folder."
    );
    handleClose();
  };

  const logOutHandler = () => {
    handleLogOut();
    signOutHandler();
    alert("Signed Out Successfully !!");
  };

  return (
    <>
      <Modal show={showForgotPasswordModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Recover Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            onChange={onRecoveryEmailChangeHandler}
            type="email"
            placeholder="Enter your email address"
          />
        </Modal.Body>
        <Modal.Footer>
          <Buttons
            btnName="Send Recovery Email"
            variant="outline-success"
            onClickHandler={sendRecoveryEmailHandler}
          />
        </Modal.Footer>
      </Modal>

      <Modal show={showSignUpModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            <h2>Sign Up</h2>
            <h6>Please fill in this form to create an account.</h6>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Username</Form.Label>
              <Form.Control
                onChange={onNameChangeHandler}
                type="text"
                placeholder="Enter new username"
                value={userName}
              />
              <Form.Text className="text-muted">
                Username should not contain spaces.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                onChange={onEmailChangeHandler}
                type="email"
                placeholder="Enter email"
                // value={emailAddress}
              />
              {!isValidEmail && (
                <>
                  <Form.Text className="text-muted">
                    Please enter the correct email address
                  </Form.Text>
                </>
              )}
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                onChange={onPasswordChangeHandler}
                type="password"
                placeholder="Password"
                value={password}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check
                type="checkbox"
                label="I accept all the terms and conditions."
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Buttons
            btnName="Cancel"
            variant="secondary"
            onClickHandler={handleClose}
          />
          <Buttons
            btnName="Sign Up"
            variant="primary"
            onClickHandler={signUpBtnHandler}
          />
        </Modal.Footer>
      </Modal>

      <Modal show={showLoginModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            <h2>Login</h2>
            <h6>Please put your credentials to login to your account.</h6>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>User Name</Form.Label>
              <Form.Control
                onChange={onLoginUserNameChangeHandler}
                type="text"
                placeholder="Enter New User Name"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                onChange={onLoginPasswordChangeHandler}
                type="password"
                placeholder="Password"
              />
              <Form.Text className="text-muted">
                <p
                  className={styles.forgotPasswordLink}
                  onClick={onForgotPasswordHandler}
                >
                  Forgot Password
                </p>
              </Form.Text>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Buttons
            btnName="Login"
            variant="primary"
            onClickHandler={loginBtnHandler}
          />
        </Modal.Footer>
      </Modal>
      <div className={styles.navBar}>
        <Navbar className="bg-body-tertiary">
          <Container>
            <Navbar.Brand href="#home">
              <div className={styles.branding}>
                <img
                  alt=""
                  src="converter.png"
                  width="40"
                  height="30"
                  className="d-inline-block align-top"
                />{" "}
                <h4>
                  <b>Currency Converter</b>
                </h4>
              </div>
            </Navbar.Brand>
            <Navbar.Collapse className="justify-content-end">
              {currentUser.user_name && (
                <>
                  <Navbar.Text>
                    Signed in as: <b>{currentUser.user_name}</b>
                  </Navbar.Text>
                  <Buttons
                    btnName="Sign Out"
                    variant="danger"
                    cssStyles={{ margin: "0rem 1rem" }}
                    onClickHandler={logOutHandler}
                  />
                </>
              )}
              {!currentUser.user_name && (
                <>
                  <Buttons
                    btnName="Sign In"
                    variant="success"
                    cssStyles={{ margin: "0rem 1rem" }}
                    onClickHandler={loginModalHandler}
                  />
                  <Buttons
                    btnName="Sign Up"
                    variant="secondary"
                    cssStyles={{ margin: "0rem 1rem" }}
                    onClickHandler={signUpModalHandler}
                  />
                </>
              )}
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
    </>
  );
};
export default Navigation;
