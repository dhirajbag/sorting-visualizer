import React from 'react';
import {
  Navbar,
  NavbarBrand
} from 'reactstrap';

const Header = (props) => {
  return (
    <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/"><font color="secondary"><h3>Sorting Visualizer</h3></font></NavbarBrand>
      </Navbar>
    </div>
  );
}

export default Header;