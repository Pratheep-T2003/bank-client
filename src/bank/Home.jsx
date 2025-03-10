import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { HashRouter, Routes, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import Register from './register';
import Deposit from './deposit';
import Cashback from './caseback';
import Alldata from './alldata';
import Home from './home';
import UserContext from './context';
import '../bank/Home.css';

function App() {
  return (
    <UserContext.Provider
      value={{
        users: [
          {
            name: "Pratheep",
            email: "politepratheep02@gmail.com",
            password: "12345",
            amount: 1000,
          },
        ],
      }}
    >
      <HashRouter>
        {/* Navbar Section */}
        <Navbar expand="lg" className="bg-body-tertiary">
          <Container>
            <Navbar.Brand as={Link} to="/">Black's Bank</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link as={Link} to="/">Home</Nav.Link>
                <Nav.Link as={Link} to="/register">Register</Nav.Link>
                <Nav.Link as={Link} to="/deposit">Deposit</Nav.Link>
                <Nav.Link as={Link} to="/cashback">Withdraw</Nav.Link>
                <Nav.Link as={Link} to="/alldata">All Data</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        {/* Page Routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/deposit" element={<Deposit />} />
          <Route path="/cashback" element={<Cashback />} />
          <Route path="/alldata" element={<Alldata />} />
        </Routes>
      </HashRouter>
    </UserContext.Provider>
  );
}

export default App;
