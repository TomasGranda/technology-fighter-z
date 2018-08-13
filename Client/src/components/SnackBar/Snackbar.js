import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Row, Col } from 'react-bootstrap';

import './Snackbar.css';

const SnackBar = props => {
  return (
    <Grid fluid>
      <Row>
        <Col sm={1} />
        <Col sm={2} className={`snackbar snackbar-${props.type}`} id="snackbar">
          <p>{props.message}</p>
        </Col>
      </Row>
    </Grid>
  )
}

SnackBar.propTypes = {
  type: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired
}

export default SnackBar;