// NewPasswordEntryPopup.js
import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const NewPasswordEntryPopup = ({ show, onClose, onSavePassword }) => {
  const [accountName, setAccountName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleClose = () => {
    setAccountName("");
    setUsername("");
    setPassword("");
    onClose();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSavePassword({ accountName, username, password });
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add New Password</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formBasicAccountName">
            <Form.Label>Account Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter account name"
              value={accountName}
              onChange={(e) => setAccountName(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formBasicUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <div className="d-flex justify-content-center mt-3">
            <Button variant="dark" type="submit">
              <FontAwesomeIcon icon={faPlus} className="pe-2" />
              Save Password
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default NewPasswordEntryPopup;
