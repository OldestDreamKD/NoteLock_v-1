import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPenToSquare } from "@fortawesome/free-solid-svg-icons";

const EditPasswordPopup = ({ show, onClose, onEdit, selectedPassword }) => {
  const [accountName, setAccountName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [deleteStatus, setDeleteStatus] = useState(false);

  useEffect(() => {
    if (selectedPassword) {
      setAccountName(selectedPassword.accountName || "");
      setUsername(selectedPassword.username || "");
      setPassword(selectedPassword.password || "");
    }
  }, [selectedPassword]);

  const handleClose = () => {
    setAccountName("");
    setUsername("");
    setPassword("");
    setDeleteStatus(false);
    onClose();
  };

  const handleDelete = () => {
    onEdit({ id: selectedPassword.id, delete: true }); // Directly handle delete
    handleClose();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!deleteStatus) {
      onEdit({ id: selectedPassword.id, accountName, username, password });
    }
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Password</Modal.Title>
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

          <div className="d-flex justify-content-between mt-3">
            <Button variant="danger" onClick={handleDelete}>
              <FontAwesomeIcon icon={faTrash} className="pe-2" />
              Delete
            </Button>
            <Button variant="dark" type="submit">
              <FontAwesomeIcon icon={faPenToSquare} className="pe-2" />
              Save Note
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditPasswordPopup;
