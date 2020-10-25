import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';
import { AvField, AvForm, AvGroup } from 'availity-reactstrap-validation';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Label, Row } from 'reactstrap';

import { createEntity, getEntity, reset, updateEntity } from './residence.reducer';

export interface IResidenceUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ResidenceUpdate = (props: IResidenceUpdateProps) => {
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { residenceEntity, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/residence');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...residenceEntity,
        ...values,
      };

      if (isNew) {
        props.createEntity(entity);
      } else {
        props.updateEntity(entity);
      }
    }
  };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="cityResidencesTrackApp.residence.home.createOrEditLabel">Criar ou editar uma residência</h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : residenceEntity} onSubmit={saveEntity}>
              <AvGroup>
                <Label id="zipcodeLabel" for="residence-zipcode">
                  CEP
                </Label>
                <AvField
                  id="residence-zipcode"
                  type="text"
                  name="zipcode"
                  validate={{
                    pattern: { value: '^\\d{8}$', errorMessage: "O CEP deve conter 8 dígitos." },
                    required: { value: true, errorMessage: 'Campo obrigatório.' },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="streetNumberLabel" for="residence-streetNumber">
                  Número
                </Label>
                <AvField
                  id="residence-streetNumber"
                  type="text"
                  name="streetNumber"
                  validate={{
                    pattern: { value: '^\\d{1,4}$', errorMessage: "Número de residência inválido." },
                    required: { value: true, errorMessage: 'Campo obrigatório.' },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="latitudeLabel" for="residence-latitude">
                  Latitude
                </Label>
                <AvField
                  id="residence-latitude"
                  type="string"
                  className="form-control"
                  name="latitude"
                  validate={{
                    required: { value: true, errorMessage: 'Campo obrigatório.' },
                    number: { value: true, errorMessage: 'Deve ser um número.' },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="longitudeLabel" for="residence-longitude">
                  Longitude
                </Label>
                <AvField
                  id="residence-longitude"
                  type="string"
                  className="form-control"
                  name="longitude"
                  validate={{
                    required: { value: true, errorMessage: 'Campo obrigatório.' },
                    number: { value: true, errorMessage: 'Deve ser um número.' },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="residentsLabel" for="residence-residents">
                  Quantidade de residentes
                </Label>
                <AvField
                  id="residence-residents"
                  type="string"
                  className="form-control"
                  name="residents"
                  validate={{
                    required: { value: true, errorMessage: 'Campo obrigatório.' },
                    number: { value: true, errorMessage: 'Deve ser um número.' },
                  }}
                />
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/residence" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">Voltar</span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp; Salvar
              </Button>
            </AvForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  residenceEntity: storeState.residence.entity,
  loading: storeState.residence.loading,
  updating: storeState.residence.updating,
  updateSuccess: storeState.residence.updateSuccess,
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ResidenceUpdate);
