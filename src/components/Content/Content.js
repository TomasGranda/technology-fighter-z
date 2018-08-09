import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";

import SelectionView from '../SelectionView/SelectionView';
import FightView from '../FightView/FightView';
import Home from '../Home/Home';
import CreateCharacter from '../CreateCharacter/CreateCharacter';

import * as sectionJSON from '../../config/section.json';

class Content extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: props.selected,
      section: props.section
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selected) {
      this.setState({
        selected: nextProps.selected
      });
    };
    if (nextProps.section >= 0) {
      this.setState({
        section: nextProps.section
      });
    };
  }

  render() {
    const { selected, section } = this.state;
    let content;

    console.log(section);
    
    switch (section) {
      case sectionJSON.home:
        content = (<Home />);
        break;
      case sectionJSON.createCharacter:
        content = (<CreateCharacter />);
        break;
      case sectionJSON.fight:
        if (selected.length === 2) {
          content = (<FightView />)
        } else {
          content = (<SelectionView />);
        };
        break;
      default:
        break;
    }

    return (
      <div>
        {content}
      </div>
    );
  }
}

Content.propTypes = {
  selected: PropTypes.array.isRequired,
  section: PropTypes.number.isRequired
};

const mapStateToProps = state => ({
  selected: state.character.selected,
  section: state.section.section
});

export default connect(mapStateToProps, null)(Content);