import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './residence.reducer';
import { IResidence } from 'app/shared/model/residence.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IResidenceProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const Residence = (props: IResidenceProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { residenceList, match, loading } = props;
  return (
    <div>
      <h2 id="residence-heading">
        Residences
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp; Create new Residence
        </Link>
      </h2>
      <div className="table-responsive">
        {residenceList && residenceList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Zipcode</th>
                <th>Street Number</th>
                <th>Latitude</th>
                <th>Longitude</th>
                <th>Residents</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {residenceList.map((residence, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${residence.id}`} color="link" size="sm">
                      {residence.id}
                    </Button>
                  </td>
                  <td>{residence.zipcode}</td>
                  <td>{residence.streetNumber}</td>
                  <td>{residence.latitude}</td>
                  <td>{residence.longitude}</td>
                  <td>{residence.residents}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${residence.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${residence.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${residence.id}/delete`} color="danger" size="sm">
                        <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && <div className="alert alert-warning">No Residences found</div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ residence }: IRootState) => ({
  residenceList: residence.entities,
  loading: residence.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Residence);
