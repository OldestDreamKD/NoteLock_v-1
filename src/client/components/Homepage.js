import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Note, { Password } from "./Data.js";
import {
  Button,
  Card,
  Container,
  Row,
  Col,
  Navbar,
  Nav,
} from "react-bootstrap";
import NewEntryPopup from "./NewEntryPopup";
import NewPasswordEntryPopup from "./NewPasswordEntryPopup";
import EditEntryPopup from "./EditEntry";
import EditPasswordPopup from "./EditPassword";

const Homepage = () => {
  const [activeTab, setActiveTab] = useState("Notes");
  const [showNewEntryPopup, setShowNewEntryPopup] = useState(false);
  const [showNewPasswordEntryPopup, setShowNewPasswordEntryPopup] =
    useState(false);
  const [showEditEntryPopup, setShowEditEntryPopup] = useState(false);
  const [showEditPasswordEntryPopup, setShowEditPasswordEntryPopup] =
    useState(false);
  const [notes, setNotes] = useState([]);
  const [passwords, setPasswords] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null); // State to hold the selected note
  const [selectedPassword, setSelectedPassword] = useState(null); // State to hold the selected password

  useEffect(() => {
    setNotes(Note);
  }, []);

  useEffect(() => {
    console.log(Password);
    setPasswords(Password);
  }, []);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleAddNew = () => {
    if (activeTab === "Notes") {
      setShowNewEntryPopup(true);
    } else if (activeTab === "Passwords") {
      setShowNewPasswordEntryPopup(true);
    }
  };

  const handleEdit = (item, type) => {
    if (type === "note") {
      setSelectedNote(item); // Set the selected note data
      setShowEditEntryPopup(true);
    } else if (type === "password") {
      setSelectedPassword(item); // Set the selected password data
      setShowEditPasswordEntryPopup(true);
    }
  };

  const handleSaveNote = (newNote) => {
    setNotes((prevNotes) => {
      return [...prevNotes, newNote];
    });
  };

  const handleUpdateNote = (updatedNote) => {
    if (updatedNote.delete) {
      setNotes((prevNotes) =>
        prevNotes.filter((note) => note.id !== updatedNote.id)
      );
    } else {
      setNotes((prevNotes) =>
        prevNotes.map((note) =>
          note.id === updatedNote.id ? updatedNote : note
        )
      );
    }
  };

  const handleUpdatePassword = (updatedPassword) => {
    setPasswords((prevPasswords) => {
      if (updatedPassword.delete) {
        return prevPasswords.filter(
          (password) => password.id !== updatedPassword.id
        );
      } else {
        return prevPasswords.map((password) =>
          password.id === updatedPassword.id ? updatedPassword : password
        );
      }
    });
  };

  const handleSavePassword = (newPassword) => {
    setPasswords((prevPassword) => {
      return [...prevPassword, newPassword];
    });
  };

  return (
    <Container fluid className="vh-100 justify-content-center my-2 rounded-3">
      <Navbar expand="lg">
        <Navbar.Brand>NoteLock</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Button variant="outline-primary">Log Out</Button>
        </Navbar.Collapse>
      </Navbar>
      <Navbar bg="light" expand="lg" className="mb-3">
        <Nav className="mx-auto w-100">
          <Nav.Link
            onClick={() => handleTabClick("Notes")}
            active={activeTab === "Notes"}
            className="text-center mx-2 w-100 rounded-3"
            style={{
              backgroundColor: activeTab === "Notes" ? "white" : "transparent",
            }}
          >
            Notes
          </Nav.Link>
          <Nav.Link
            onClick={() => handleTabClick("Passwords")}
            className="text-center mx-2 w-100 rounded-3"
            style={{
              backgroundColor:
                activeTab === "Passwords" ? "white" : "transparent",
            }}
          >
            Passwords
          </Nav.Link>
        </Nav>
      </Navbar>
      <Row className="justify-content-center w-100">
        <Col md={11}>
          {activeTab === "Notes" &&
            notes.map((note, index) => (
              <Card
                style={{ cursor: "pointer" }}
                className="mb-2"
                key={index}
                onClick={() => handleEdit(note, "note")}
              >
                <Card.Body>
                  <div>
                    <h4>{note.title}</h4>
                    <p style={{ whiteSpace: "pre-wrap" }}>{note.content}</p>
                  </div>
                </Card.Body>
              </Card>
            ))}
          {activeTab === "Passwords" &&
            passwords.map((password, index) => (
              <Card
                style={{ cursor: "pointer" }}
                className="mb-2"
                key={index}
                onClick={() => handleEdit(password, "password")}
              >
                <Card.Body>
                  <div>
                    <h3>{password.accountName}</h3>
                    <p>Username: {password.username}</p>
                    <p>Password: ********</p>
                  </div>
                </Card.Body>
              </Card>
            ))}
        </Col>
      </Row>
      <NewEntryPopup
        show={showNewEntryPopup}
        onClose={() => setShowNewEntryPopup(false)}
        onAdd={handleSaveNote}
      />
      <EditEntryPopup
        show={showEditEntryPopup}
        onClose={() => setShowEditEntryPopup(false)}
        onEdit={handleUpdateNote}
        note={selectedNote} // Pass the selected note data to the edit popup
      />
      <NewPasswordEntryPopup
        show={showNewPasswordEntryPopup}
        onClose={() => setShowNewPasswordEntryPopup(false)}
        onSavePassword={handleSavePassword}
      />
      <EditPasswordPopup
        show={showEditPasswordEntryPopup}
        onClose={() => setShowEditPasswordEntryPopup(false)}
        onEdit={handleUpdatePassword}
        selectedPassword={selectedPassword} // Pass the selected password data to the edit popup
      />
      <Button
        variant="dark"
        onClick={handleAddNew}
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          zIndex: 1000,
        }}
      >
        <FontAwesomeIcon icon={faPlus} className="pe-2" />
        Add New
      </Button>
    </Container>
  );
};

export default Homepage;
