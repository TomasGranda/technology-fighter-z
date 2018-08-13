import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Grid, Row } from 'react-bootstrap';

import { getCharacters } from '../../actions/characterActions';

import CharacterList from '../Character/CharacterList';

class SelectionView extends Component {
  componentDidMount() {
    this.props.getCharacters();
  }

  render() {
    return (
      <Grid>
        <Row>
          <CharacterList />
        </Row>
      </Grid>
    );
  };
};

SelectionView.propTypes = {
  getCharacters: PropTypes.func.isRequired
};

export default connect(null, { getCharacters })(SelectionView);