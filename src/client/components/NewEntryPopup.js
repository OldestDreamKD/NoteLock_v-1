import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const NewEntryPopup = ({ show, onClose, onAdd }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleClose = () => {
    setContent("");
    setTitle("");
    onClose();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd({ title, content });
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add New Entry</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formBasicTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formBasicContent">
            <Form.Label>Content</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </Form.Group>

          <div className="d-flex justify-content-center mt-3">
            <Button variant="dark" type="submit">
              <FontAwesomeIcon icon={faPlus} className="pe-2" />
              Save Note
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default NewEntryPopup;
