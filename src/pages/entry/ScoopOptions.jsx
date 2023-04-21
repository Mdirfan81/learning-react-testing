import { Col, Row, Form } from "react-bootstrap";
import { useOrderDetails } from "../../context/OrderDetails";

export default function ScoopOptions({ name, imagePath }) {
  const { updateItemCount } = useOrderDetails();

  const handleChange = (e) => {
    return updateItemCount(name, parseInt(e.target.value), "scoops");
  };
  return (
    <Col xs={12} sm={6} md={4} lg={3} style={{ textAlign: "center" }}>
      <img
        style={{ width: "75%" }}
        src={`http://localhost:3030/${imagePath}`}
        alt={`${name} scoop`}
      />
      <Form.Group
        controlId={`${name}-count`}
        as={Row}
        style={{ marginTo: "10px" }}
      >
        <Form.Label column xs="6" style={{ textAlign: "rigth" }}>
          {name}
        </Form.Label>
        <Col xs="5" style={{ textAlign: "left" }}>
          <Form.Control
            type="number"
            defaultValue={0}
            onChange={handleChange}
          />
        </Col>
      </Form.Group>
    </Col>
  );
}
