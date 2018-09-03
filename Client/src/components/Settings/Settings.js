import React from "react";

import { Grid, Row, Col, Table } from "react-bootstrap";

import * as keyboards from "../../config/keyboards.json";

const Settings = () => {
  return (
    <Grid>
      <Row>
        <Col sm={2} />
        <Col sm={8}>
          <center><h3>Keyboards</h3></center>
          <hr />
          <Table striped bordered condensed hover>
            <thead>
              <tr>
                <th></th>
                <th>Player One</th>
                <th>Player Two</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>Attack</th>
                <td>{String.fromCharCode(keyboards.attack1)}</td>
                <td>{String.fromCharCode(keyboards.attack2)}</td>
              </tr>
              <tr>
                <th>Ultimate</th>
                <td>{String.fromCharCode(keyboards.ultimate1)}</td>
                <td>{String.fromCharCode(keyboards.ultimate2)}</td>
              </tr>
            </tbody>
          </Table>
        </Col>
        <Col sm={2} />
      </Row>
    </Grid>
  );
}

export default Settings;
