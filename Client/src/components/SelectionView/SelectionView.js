import React from 'react';
import { Grid, Row } from 'react-bootstrap';

import CharacterList from '../Character/CharacterList';

const SelectionView = () => {
  return (
    <Grid>
      <Row>
        <CharacterList />
      </Row>
    </Grid>
  );
};

export default SelectionView;