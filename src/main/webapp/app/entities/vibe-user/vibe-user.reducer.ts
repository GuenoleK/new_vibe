import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IVibeUser, defaultValue } from 'app/shared/model/vibe-user.model';

export const ACTION_TYPES = {
  FETCH_VIBEUSER_LIST: 'vibeUser/FETCH_VIBEUSER_LIST',
  FETCH_VIBEUSER: 'vibeUser/FETCH_VIBEUSER',
  CREATE_VIBEUSER: 'vibeUser/CREATE_VIBEUSER',
  UPDATE_VIBEUSER: 'vibeUser/UPDATE_VIBEUSER',
  DELETE_VIBEUSER: 'vibeUser/DELETE_VIBEUSER',
  RESET: 'vibeUser/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IVibeUser>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type VibeUserState = Readonly<typeof initialState>;

// Reducer

export default (state: VibeUserState = initialState, action): VibeUserState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_VIBEUSER_LIST):
    case REQUEST(ACTION_TYPES.FETCH_VIBEUSER):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_VIBEUSER):
    case REQUEST(ACTION_TYPES.UPDATE_VIBEUSER):
    case REQUEST(ACTION_TYPES.DELETE_VIBEUSER):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_VIBEUSER_LIST):
    case FAILURE(ACTION_TYPES.FETCH_VIBEUSER):
    case FAILURE(ACTION_TYPES.CREATE_VIBEUSER):
    case FAILURE(ACTION_TYPES.UPDATE_VIBEUSER):
    case FAILURE(ACTION_TYPES.DELETE_VIBEUSER):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_VIBEUSER_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_VIBEUSER):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_VIBEUSER):
    case SUCCESS(ACTION_TYPES.UPDATE_VIBEUSER):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_VIBEUSER):
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

const apiUrl = 'api/vibe-users';

// Actions

export const getEntities: ICrudGetAllAction<IVibeUser> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_VIBEUSER_LIST,
  payload: axios.get<IVibeUser>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IVibeUser> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_VIBEUSER,
    payload: axios.get<IVibeUser>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IVibeUser> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_VIBEUSER,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IVibeUser> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_VIBEUSER,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IVibeUser> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_VIBEUSER,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
