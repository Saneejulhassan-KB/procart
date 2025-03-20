import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Card,
  Row,
  Col,
  Pagination,
  Form,
  Spinner,
  Container,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import {
  fetchProducts,
  fetchCategories,
  setCategory,
  setCurrentPage,
} from "../store/productSlice";
import { motion } from "framer-motion";

function ProductList() {
  const dispatch = useDispatch();
  const {
    products,
    categories,
    selectedCategory,
    searchQuery,
    currentPage,
    productsPerPage,
    loading,
  } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchCategories());
  }, [dispatch]);

  // Filter products based on category and search query
  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      !selectedCategory || product.category === selectedCategory;
    const matchesSearch = product.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  // Function to truncate text
  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "60vh" }}
      >
        <Spinner animation="border" role="status" variant="primary">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  return (
    <Container className="py-5">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-5"
      >
        <h1 className="text-center mb-4">Our Products</h1>
        <div className="d-flex justify-content-center">
          <Form.Select
            className="w-50 shadow-sm"
            value={selectedCategory}
            onChange={(e) => {
              dispatch(setCategory(e.target.value));
              dispatch(setCurrentPage(1));
            }}
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </Form.Select>
        </div>
      </motion.div>

      <Row xs={1} md={2} lg={3} xl={4} className="g-4">
        {currentProducts.map((product, index) => (
          <Col key={product.id}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-100 shadow-sm hover-shadow">
                <div className="position-relative">
                  <Link
                    to={`/product/${product.id}`}
                    className="text-decoration-none"
                  >
                    <Card.Img
                      variant="top"
                      src={product.image}
                      style={{
                        height: "200px",
                        objectFit: "contain",
                        padding: "1rem",
                      }}
                      className="bg-light"
                    />
                  </Link>
                  <div className="position-absolute top-0 end-0 m-2">
                    <span className="badge bg-primary">${product.price}</span>
                  </div>
                </div>
                <Card.Body className="d-flex flex-column">
                  <OverlayTrigger
                    placement="top"
                    overlay={
                      <Tooltip id={`tooltip-title-${product.id}`}>
                        {product.title}
                      </Tooltip>
                    }
                  >
                    <Card.Title
                      className="h6 mb-2"
                      style={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        height: "24px",
                      }}
                    >
                      {truncateText(product.title, 50)}
                    </Card.Title>
                  </OverlayTrigger>
                  <Card.Text
                    className="text-muted mb-3"
                    style={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      fontSize: "0.9rem",
                    }}
                  >
                    {truncateText(product.description, 100)}
                  </Card.Text>
                  <Link
                    to={`/product/${product.id}`}
                    className="btn btn-outline-primary mt-auto"
                  >
                    View Details
                  </Link>
                </Card.Body>
              </Card>
            </motion.div>
          </Col>
        ))}
      </Row>

      {totalPages > 1 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mt-5"
        >
          <Pagination className="justify-content-center">
            <Pagination.First
              onClick={() => dispatch(setCurrentPage(1))}
              disabled={currentPage === 1}
              className="mx-1"
            />
            <Pagination.Prev
              onClick={() => dispatch(setCurrentPage(currentPage - 1))}
              disabled={currentPage === 1}
              className="mx-1"
            />
            {[...Array(totalPages)].map((_, index) => (
              <Pagination.Item
                key={index + 1}
                active={index + 1 === currentPage}
                onClick={() => dispatch(setCurrentPage(index + 1))}
                className="mx-1"
              >
                {index + 1}
              </Pagination.Item>
            ))}
            <Pagination.Next
              onClick={() => dispatch(setCurrentPage(currentPage + 1))}
              disabled={currentPage === totalPages}
              className="mx-1"
            />
            <Pagination.Last
              onClick={() => dispatch(setCurrentPage(totalPages))}
              disabled={currentPage === totalPages}
              className="mx-1"
            />
          </Pagination>
        </motion.div>
      )}
    </Container>
  );
}

export default ProductList;
