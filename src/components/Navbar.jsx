import { Navbar, Nav, Form, Container } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { setSearchQuery } from "../store/productSlice";
import { FaShoppingCart, FaSearch } from "react-icons/fa";
import "./Navbar.css";

function NavigationBar() {
  const dispatch = useDispatch();

  const handleSearch = (e) => {
    dispatch(setSearchQuery(e.target.value));
  };

  return (
    <Navbar
      bg="white"
      variant="light"
      expand="lg"
      fixed="top"
      className="navbar-custom shadow-sm"
    >
      <Container>
        <Navbar.Brand href="/" className="brand-text">
          <FaShoppingCart className="brand-icon" />
          ProCart
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Form className="d-flex search-form">
            <div className="search-wrapper">
              <FaSearch className="search-icon" />
              <Form.Control
                type="search"
                placeholder="Search products..."
                className="search-input"
                aria-label="Search"
                onChange={handleSearch}
              />
            </div>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;
