import React, { useState, useEffect } from "react";
import { Button, Card, Form, Container, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import Homepage from "./Homepage";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [invalidMessage, setInvalidMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:3000/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email, password: password }),
    }) // Replace with your server's URL
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          console.log(data);
          return <Homepage></Homepage>;
        } else {
          console.log(data);
          setInvalidMessage("Invalid email or password");
        }
      });
  };

  return (
    <div className="vh-100 d-flex align-items-center justify-content-center custom-background">
      <Row className="justify-content-center">
        <Col>
          <Card>
            <Card.Body>
              <Card.Title className="custom-font-title">
                Welcome to NoteLock
              </Card.Title>
              <Card.Text className="custom-font-light mb-4 ">
                Enter your credentials to access your secure vault.
              </Card.Text>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label className="fw-bold">Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                  <Form.Label className="fw-bold mt-1">Password</Form.Label>
                  <div className="input-group mb-3">
                    <Form.Control
                      className="border border-end-0"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <div className="input-group-append ">
                      <Button
                        className="border border-start-0 fw-bold"
                        variant=" outline-dark"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        <FontAwesomeIcon
                          icon={showPassword ? faEyeSlash : faEye}
                        />
                      </Button>
                    </div>
                  </div>
                </Form.Group>
                {invalidMessage && (
                  <p className="text-danger">{invalidMessage}</p>
                )}
                <div className="d-grid">
                  <Button variant="dark" type="submit">
                    Log In
                  </Button>
                </div>
              </Form>
              <div className="mt-3">
                <Button
                  variant="link"
                  className="link-offset-2 link-underline link-underline-opacity-0"
                >
                  Don't have an account? Register here
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default LoginForm;
