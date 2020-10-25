import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Table } from 'reactstrap';

import { getEntities } from './residence.reducer';

export interface IResidenceProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const Residence = (props: IResidenceProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { residenceList, match, loading } = props;
  return (
    <div>
      <h2 id="residence-heading">
        Residências
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp; Adicionar residência
        </Link>
      </h2>
      <div className="table-responsive">
        {residenceList && residenceList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>CEP</th>
                <th>Número</th>
                <th>Latitude</th>
                <th>Longitude</th>
                <th>Quantidade de residentes</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {residenceList.map((residence, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/view/${residence.id}`} color="link" size="sm">
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
                      <Button tag={Link} to={`${match.url}/view/${residence.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">Visualizar</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${residence.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Editar</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${residence.id}/delete`} color="danger" size="sm">
                        <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Excluir</span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && <div className="alert alert-warning">Nenhuma residência encontrada</div>
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
