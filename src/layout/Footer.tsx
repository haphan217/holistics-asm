import { Container, Row } from "reactstrap";

const Footer = () => {
  return (
    <footer>
      <Container fluid>
        <Row>
          <div className="my-0 mx-auto">
            <div className="copyright">&copy; 2021 haphan217</div>
          </div>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
