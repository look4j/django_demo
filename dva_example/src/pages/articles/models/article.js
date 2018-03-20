import pathToRegexp from 'path-to-regexp'
import * as articlesService from '../services/articles';

export default {
  namespace: 'article',
  state: {
    record: null
  },
  reducers: {
    save(state, {payload: {record}}) {
      return {...state, record};
    },
  },
  effects: {
    * detail({payload: {id}}, {call, put, select}) {
      const {data} = yield call(articlesService.detail, id);
      yield put({
        type: 'save',
        payload: {
          record: data
        }
      });
    },
  },
  subscriptions: {
    setup({dispatch, history}) {
      return history.listen(({pathname}) => {
        const match = pathToRegexp('/articles/:id').exec(pathname)
        if (match) {
          dispatch({ type: 'detail', payload: { id: match[1] } })
        }
      });
    },
  },
};
