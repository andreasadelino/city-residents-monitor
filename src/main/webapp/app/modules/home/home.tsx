import './home.scss';

import ResidencesHeatMap from 'app/entities/residence/residence-heatmap';
import { Brand } from 'app/shared/layout/header/header-components';
import React from 'react';
import { Col, Navbar, NavbarToggler, Row } from 'reactstrap';

export const Home = (props) => {

  return (
    <Row>
      <Navbar dark expand="sm" fixed="top" className="jh-navbar">
        <NavbarToggler aria-label="Menu" />
        <Brand />
      </Navbar>
      <Col md="12">
        <ResidencesHeatMap />
      </Col>
    </Row>
  );
};

export default Home;
