import Header from 'app/shared/layout/header/header';
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Residence from './entities/residence/residence';
import ResidenceDeleteDialog from './entities/residence/residence-delete-dialog';
import ResidenceDetail from './entities/residence/residence-detail';
import ResidenceUpdate from './entities/residence/residence-update';
import ResidencesHeatMap from './entities/residence/ResidencesHeatMap';

const baseHref = document.querySelector('base').getAttribute('href').replace(/\/$/, '');

const Routes = () => (
    <Router basename={baseHref}>
      <Header />
      <Route path="/" exact component={ResidencesHeatMap} />
      <Route exact path="/residence" component={Residence} />
      <Route exact path='/residence/new' component={ResidenceUpdate} />
      <Route exact path='/residence/:id/edit' component={ResidenceUpdate} />
      <Route exact path='/residence/:id' component={ResidenceDetail} />
      <Route exact path='/residence/:id/delete' component={ResidenceDeleteDialog} />
    </Router>
);

export default Routes;
