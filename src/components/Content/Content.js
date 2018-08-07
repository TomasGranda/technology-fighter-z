import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";

import SelectionView from '../SelectionView/SelectionView';
import FightView from '../FightView/FightView';

class Content extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: props.selected
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selected) {
      this.setState({
        selected: nextProps.selected
      });
    };
  }

  render() {
    const { selected } = this.state;
    let content;

    if (selected.length === 2) {
      content = (<FightView />)
    } else {
      content = (<SelectionView />);
    };

    return (
      <div>
        {content}
      </div>
    );
  }
}

Content.propTypes = {
  selected: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  selected: state.character.selected
});

export default connect(mapStateToProps, null)(Content);