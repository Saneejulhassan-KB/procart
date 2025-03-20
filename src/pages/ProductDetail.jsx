import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, Row, Col, Spinner, Badge } from "react-bootstrap";
import axios from "axios";
import { motion } from "framer-motion";

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `https://fakestoreapi.com/products/${id}`
        );
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

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

  if (!product) {
    return (
      <div className="text-center py-5">
        <h2 className="text-muted">Product not found</h2>
      </div>
    );
  }

  return (
    <motion.div
      className="container py-5"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Row className="g-4">
        <Col md={6}>
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="h-100 shadow-sm border-0">
              <Card.Img
                variant="top"
                src={product.image}
                style={{
                  height: "400px",
                  objectFit: "contain",
                  padding: "2rem",
                  backgroundColor: "#f8f9fa",
                }}
                className="p-3"
              />
            </Card>
          </motion.div>
        </Col>
        <Col md={6}>
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card className="h-100 shadow-sm border-0">
              <Card.Body className="p-4">
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  <Badge bg="primary" className="mb-3">
                    {product.category}
                  </Badge>
                </motion.div>
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                >
                  <Card.Title className="h2 mb-4">{product.title}</Card.Title>
                </motion.div>
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                >
                  <Card.Text className="h3 text-primary mb-4">
                    ${product.price.toFixed(2)}
                  </Card.Text>
                </motion.div>
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.9 }}
                >
                  <Card.Text className="mb-4" style={{ lineHeight: "1.8" }}>
                    {product.description}
                  </Card.Text>
                </motion.div>
              </Card.Body>
            </Card>
          </motion.div>
        </Col>
      </Row>
    </motion.div>
  );
}

export default ProductDetail;
