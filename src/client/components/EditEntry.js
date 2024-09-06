import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPenToSquare } from "@fortawesome/free-solid-svg-icons";

const EditEntryPopup = ({ show, onClose, onEdit, note }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [deleteStatus, setDeleteStatus] = useState(false);

  useEffect(() => {
    if (note) {
      setTitle(note.title || "");
      setContent(note.content || "");
    }
  }, [note]);

  useEffect(() => {
    if (deleteStatus) {
      handleSubmit(); // Handle delete when deleteStatus is updated
    }
  }, [deleteStatus]);

  const handleClose = () => {
    setContent("");
    setTitle("");
    setDeleteStatus(false);
    onClose();
  };

  const handleDelete = () => {
    setDeleteStatus(true); // Set delete status to true
  };

  const handleSubmit = (e) => {
    if (e) e.preventDefault(); // Prevent default form submission if an event is provided

    if (deleteStatus) {
      onEdit({ id: note.id, delete: true });
    } else {
      onEdit({ id: note.id, title, content });
    }
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Entry</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={(e) => e.preventDefault()}>
          {" "}
          {/* Prevent default form submission */}
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
          <div className="d-flex justify-content-between mt-3">
            <Button variant="danger" onClick={handleDelete}>
              <FontAwesomeIcon icon={faTrash} className="pe-2" />
              Delete
            </Button>
            <Button variant="dark" type="button" onClick={handleSubmit}>
              <FontAwesomeIcon icon={faPenToSquare} className="pe-2" />
              Save Note
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditEntryPopup;
