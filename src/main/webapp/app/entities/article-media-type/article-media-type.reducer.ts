import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IArticleMediaType, defaultValue } from 'app/shared/model/article-media-type.model';

export const ACTION_TYPES = {
  FETCH_ARTICLEMEDIATYPE_LIST: 'articleMediaType/FETCH_ARTICLEMEDIATYPE_LIST',
  FETCH_ARTICLEMEDIATYPE: 'articleMediaType/FETCH_ARTICLEMEDIATYPE',
  CREATE_ARTICLEMEDIATYPE: 'articleMediaType/CREATE_ARTICLEMEDIATYPE',
  UPDATE_ARTICLEMEDIATYPE: 'articleMediaType/UPDATE_ARTICLEMEDIATYPE',
  DELETE_ARTICLEMEDIATYPE: 'articleMediaType/DELETE_ARTICLEMEDIATYPE',
  RESET: 'articleMediaType/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IArticleMediaType>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type ArticleMediaTypeState = Readonly<typeof initialState>;

// Reducer

export default (state: ArticleMediaTypeState = initialState, action): ArticleMediaTypeState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_ARTICLEMEDIATYPE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_ARTICLEMEDIATYPE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_ARTICLEMEDIATYPE):
    case REQUEST(ACTION_TYPES.UPDATE_ARTICLEMEDIATYPE):
    case REQUEST(ACTION_TYPES.DELETE_ARTICLEMEDIATYPE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_ARTICLEMEDIATYPE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_ARTICLEMEDIATYPE):
    case FAILURE(ACTION_TYPES.CREATE_ARTICLEMEDIATYPE):
    case FAILURE(ACTION_TYPES.UPDATE_ARTICLEMEDIATYPE):
    case FAILURE(ACTION_TYPES.DELETE_ARTICLEMEDIATYPE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_ARTICLEMEDIATYPE_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_ARTICLEMEDIATYPE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_ARTICLEMEDIATYPE):
    case SUCCESS(ACTION_TYPES.UPDATE_ARTICLEMEDIATYPE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_ARTICLEMEDIATYPE):
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

const apiUrl = 'api/article-media-types';

// Actions

export const getEntities: ICrudGetAllAction<IArticleMediaType> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_ARTICLEMEDIATYPE_LIST,
  payload: axios.get<IArticleMediaType>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IArticleMediaType> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_ARTICLEMEDIATYPE,
    payload: axios.get<IArticleMediaType>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IArticleMediaType> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_ARTICLEMEDIATYPE,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IArticleMediaType> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_ARTICLEMEDIATYPE,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IArticleMediaType> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_ARTICLEMEDIATYPE,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
