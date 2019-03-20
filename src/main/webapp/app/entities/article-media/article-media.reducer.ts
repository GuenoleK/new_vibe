import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IArticleMedia, defaultValue } from 'app/shared/model/article-media.model';

export const ACTION_TYPES = {
  FETCH_ARTICLEMEDIA_LIST: 'articleMedia/FETCH_ARTICLEMEDIA_LIST',
  FETCH_ARTICLEMEDIA: 'articleMedia/FETCH_ARTICLEMEDIA',
  CREATE_ARTICLEMEDIA: 'articleMedia/CREATE_ARTICLEMEDIA',
  UPDATE_ARTICLEMEDIA: 'articleMedia/UPDATE_ARTICLEMEDIA',
  DELETE_ARTICLEMEDIA: 'articleMedia/DELETE_ARTICLEMEDIA',
  RESET: 'articleMedia/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IArticleMedia>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type ArticleMediaState = Readonly<typeof initialState>;

// Reducer

export default (state: ArticleMediaState = initialState, action): ArticleMediaState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_ARTICLEMEDIA_LIST):
    case REQUEST(ACTION_TYPES.FETCH_ARTICLEMEDIA):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_ARTICLEMEDIA):
    case REQUEST(ACTION_TYPES.UPDATE_ARTICLEMEDIA):
    case REQUEST(ACTION_TYPES.DELETE_ARTICLEMEDIA):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_ARTICLEMEDIA_LIST):
    case FAILURE(ACTION_TYPES.FETCH_ARTICLEMEDIA):
    case FAILURE(ACTION_TYPES.CREATE_ARTICLEMEDIA):
    case FAILURE(ACTION_TYPES.UPDATE_ARTICLEMEDIA):
    case FAILURE(ACTION_TYPES.DELETE_ARTICLEMEDIA):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_ARTICLEMEDIA_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_ARTICLEMEDIA):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_ARTICLEMEDIA):
    case SUCCESS(ACTION_TYPES.UPDATE_ARTICLEMEDIA):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_ARTICLEMEDIA):
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

const apiUrl = 'api/article-medias';

// Actions

export const getEntities: ICrudGetAllAction<IArticleMedia> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_ARTICLEMEDIA_LIST,
  payload: axios.get<IArticleMedia>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IArticleMedia> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_ARTICLEMEDIA,
    payload: axios.get<IArticleMedia>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IArticleMedia> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_ARTICLEMEDIA,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IArticleMedia> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_ARTICLEMEDIA,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IArticleMedia> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_ARTICLEMEDIA,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
