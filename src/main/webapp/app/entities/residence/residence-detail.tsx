import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './residence.reducer';
import { IResidence } from 'app/shared/model/residence.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IResidenceDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ResidenceDetail = (props: IResidenceDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { residenceEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          Residence [<b>{residenceEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="zipcode">Zipcode</span>
          </dt>
          <dd>{residenceEntity.zipcode}</dd>
          <dt>
            <span id="streetNumber">Street Number</span>
          </dt>
          <dd>{residenceEntity.streetNumber}</dd>
          <dt>
            <span id="latitude">Latitude</span>
          </dt>
          <dd>{residenceEntity.latitude}</dd>
          <dt>
            <span id="longitude">Longitude</span>
          </dt>
          <dd>{residenceEntity.longitude}</dd>
          <dt>
            <span id="residents">Residents</span>
          </dt>
          <dd>{residenceEntity.residents}</dd>
        </dl>
        <Button tag={Link} to="/residence" replace color="info">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/residence/${residenceEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ residence }: IRootState) => ({
  residenceEntity: residence.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ResidenceDetail);
