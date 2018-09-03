import React from "react";
import PropTypes from "prop-types";

import { Grid, Row, Col } from "react-bootstrap";

import "./Snackbar.css";

const SnackBar = props => {
  return (
    <Grid className="snackbar" id={props.id} fluid>
      <Row>
        <Col sm={2} />
        <Col sm={10} className={`snackbar-pill snackbar-${props.type}`}>
          <p>{props.message}</p>
        </Col>
      </Row>
    </Grid>
  );
};

SnackBar.propTypes = {
  type: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired
};

export default SnackBar;
