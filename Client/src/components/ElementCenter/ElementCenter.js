import React from "react";

import { Grid, Row, Col } from "react-bootstrap";

const ElementCenter = props => {
  return (
    <Grid fluid>
      <Row className="height-25" />
      <Row className="height-50">
        <Col xs={2} />
        <Col xs={8} className="text-center">
          {props.children}
        </Col>
        <Col xs={2} />
      </Row>
    </Grid>
  );
};

export default ElementCenter;