import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import { Navbar, Nav } from 'react-bootstrap';
import ImagesList from './components/images-list.component';

function App() {
  return (
    <div>
      <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
        <Navbar.Brand href="#home">Inspiragram</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="#home">Account</Nav.Link>
          <Nav.Link href="#link">Likes</Nav.Link>
        </Nav>
        </Navbar.Collapse>
      </Navbar>
      <div className="container-fluid p-2">
        <ImagesList />
      </div>
    </div>
  );
}

export default App;
