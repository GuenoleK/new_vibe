import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IUserRoleStructure, defaultValue } from 'app/shared/model/user-role-structure.model';

export const ACTION_TYPES = {
  FETCH_USERROLESTRUCTURE_LIST: 'userRoleStructure/FETCH_USERROLESTRUCTURE_LIST',
  FETCH_USERROLESTRUCTURE: 'userRoleStructure/FETCH_USERROLESTRUCTURE',
  CREATE_USERROLESTRUCTURE: 'userRoleStructure/CREATE_USERROLESTRUCTURE',
  UPDATE_USERROLESTRUCTURE: 'userRoleStructure/UPDATE_USERROLESTRUCTURE',
  DELETE_USERROLESTRUCTURE: 'userRoleStructure/DELETE_USERROLESTRUCTURE',
  RESET: 'userRoleStructure/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IUserRoleStructure>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type UserRoleStructureState = Readonly<typeof initialState>;

// Reducer

export default (state: UserRoleStructureState = initialState, action): UserRoleStructureState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_USERROLESTRUCTURE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_USERROLESTRUCTURE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_USERROLESTRUCTURE):
    case REQUEST(ACTION_TYPES.UPDATE_USERROLESTRUCTURE):
    case REQUEST(ACTION_TYPES.DELETE_USERROLESTRUCTURE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_USERROLESTRUCTURE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_USERROLESTRUCTURE):
    case FAILURE(ACTION_TYPES.CREATE_USERROLESTRUCTURE):
    case FAILURE(ACTION_TYPES.UPDATE_USERROLESTRUCTURE):
    case FAILURE(ACTION_TYPES.DELETE_USERROLESTRUCTURE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_USERROLESTRUCTURE_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_USERROLESTRUCTURE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_USERROLESTRUCTURE):
    case SUCCESS(ACTION_TYPES.UPDATE_USERROLESTRUCTURE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_USERROLESTRUCTURE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {}
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

const apiUrl = 'api/user-role-structures';

// Actions

export const getEntities: ICrudGetAllAction<IUserRoleStructure> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_USERROLESTRUCTURE_LIST,
  payload: axios.get<IUserRoleStructure>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IUserRoleStructure> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_USERROLESTRUCTURE,
    payload: axios.get<IUserRoleStructure>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IUserRoleStructure> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_USERROLESTRUCTURE,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IUserRoleStructure> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_USERROLESTRUCTURE,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IUserRoleStructure> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_USERROLESTRUCTURE,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
