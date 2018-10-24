import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { getCharacters } from "../../actions/characterActions";
import { setCreateCharacter } from "../../actions/sectionActions";

import { Grid, Row, Button } from "react-bootstrap";
import CharacterList from "../Character/CharacterList";
import Spinner from "../Spinner/Spinner";
import ElementCenter from "../ElementCenter/ElementCenter";

import ImgSpinner from "../../assets/spinner.png";

class SelectionView extends Component {
  componentDidMount() {
    this.props.getCharacters();
  }

  render() {
    const { characters, loading } = this.props.character;
    let content;

    if (characters === null || loading) {
      content = (
        <ElementCenter>
          <Spinner src={ImgSpinner} width="80px" />
        </ElementCenter>
      );
    } else if (characters.length === 0) {
      content = (
        <ElementCenter>
          <p>No characters found</p>
          <Button onClick={this.props.setCreateCharacter} bsStyle="primary">
            Create character
          </Button>
        </ElementCenter>
      ); 
    } else {
      content = <CharacterList characters={characters} />;
    }

    return (
      <Grid>
        <Row>{content}</Row>
      </Grid>
    );
  }
}

SelectionView.propTypes = {
  getCharacters: PropTypes.func.isRequired,
  setCreateCharacter: PropTypes.func.isRequired,
  character: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  character: state.character
});

export default connect(mapStateToProps, { getCharacters, setCreateCharacter })(SelectionView);