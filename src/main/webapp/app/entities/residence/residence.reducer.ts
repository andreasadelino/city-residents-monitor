import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IResidence, defaultValue } from 'app/shared/model/residence.model';

export const ACTION_TYPES = {
  FETCH_RESIDENCE_LIST: 'residence/FETCH_RESIDENCE_LIST',
  FETCH_RESIDENCE: 'residence/FETCH_RESIDENCE',
  CREATE_RESIDENCE: 'residence/CREATE_RESIDENCE',
  UPDATE_RESIDENCE: 'residence/UPDATE_RESIDENCE',
  DELETE_RESIDENCE: 'residence/DELETE_RESIDENCE',
  RESET: 'residence/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IResidence>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type ResidenceState = Readonly<typeof initialState>;

// Reducer

export default (state: ResidenceState = initialState, action): ResidenceState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_RESIDENCE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_RESIDENCE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_RESIDENCE):
    case REQUEST(ACTION_TYPES.UPDATE_RESIDENCE):
    case REQUEST(ACTION_TYPES.DELETE_RESIDENCE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_RESIDENCE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_RESIDENCE):
    case FAILURE(ACTION_TYPES.CREATE_RESIDENCE):
    case FAILURE(ACTION_TYPES.UPDATE_RESIDENCE):
    case FAILURE(ACTION_TYPES.DELETE_RESIDENCE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_RESIDENCE_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_RESIDENCE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_RESIDENCE):
    case SUCCESS(ACTION_TYPES.UPDATE_RESIDENCE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_RESIDENCE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {},
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

const apiUrl = 'api/residences';

// Actions

export const getEntities: ICrudGetAllAction<IResidence> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_RESIDENCE_LIST,
  payload: axios.get<IResidence>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<IResidence> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_RESIDENCE,
    payload: axios.get<IResidence>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IResidence> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_RESIDENCE,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IResidence> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_RESIDENCE,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IResidence> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_RESIDENCE,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
