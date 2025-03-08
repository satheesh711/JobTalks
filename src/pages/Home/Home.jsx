import React from "react";
import { Container, Row, Col, Button, Card, Navbar, Nav } from "react-bootstrap";

const Home = () => {
  return (
    <>
      {/* Navbar */}
      <Navbar bg="light" expand="lg" className="shadow-sm">
        <Container>
          <Navbar.Brand href="/">JobTalks</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link href="#reviews">Company Reviews</Nav.Link>
              <Nav.Link href="#jobs">Jobs</Nav.Link>
              <Nav.Link href="#about">About</Nav.Link>
              <Button variant="primary" className="ms-3">Sign Up</Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Hero Section */}
      <section className="hero bg-primary text-white text-center py-5">
        <Container>
          <h1 className="display-4">Find the Best Companies & Jobs</h1>
          <p className="lead">Explore company reviews and job opportunities in one place.</p>
          <Button variant="light" className="mt-3">Get Started</Button>
        </Container>
      </section>

      {/* Company Reviews Section */}
      <section id="reviews" className="py-5">
        <Container>
          <h2 className="text-center mb-4">Top Rated Companies</h2>
          <Row>
            {[1, 2, 3].map((index) => (
              <Col key={index} md={4}>
                <Card className="shadow-sm">
                  <Card.Body>
                    <Card.Title>Company {index}</Card.Title>
                    <Card.Text>⭐⭐⭐⭐⭐ 4.{index} Rating</Card.Text>
                    <Button variant="primary">View Details</Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Job Listings Section */}
      <section id="jobs" className="bg-light py-5">
        <Container>
          <h2 className="text-center mb-4">Latest Job Listings</h2>
          <Row>
            {[1, 2, 3].map((index) => (
              <Col key={index} md={4}>
                <Card className="shadow-sm">
                  <Card.Body>
                    <Card.Title>Job Title {index}</Card.Title>
                    <Card.Text>Company {index} - Location</Card.Text>
                    <Button variant="success">Apply Now</Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Footer */}
      <footer className="text-center py-3 bg-dark text-white">
        <p>© 2025 JobTalks. All rights reserved.</p>
      </footer>
    </>
  );
};

export default Home;
