import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Residence from './residence';
import ResidenceDetail from './residence-detail';
import ResidenceUpdate from './residence-update';
import ResidenceDeleteDialog from './residence-delete-dialog';
import ResidencesHeatMap from './ResidencesHeatMap';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/heat-map`} component={ResidencesHeatMap} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={ResidenceUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={ResidenceUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={ResidenceDetail} />
      <ErrorBoundaryRoute path={match.url} component={Residence} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={ResidenceDeleteDialog} />
  </>
);

export default Routes;
