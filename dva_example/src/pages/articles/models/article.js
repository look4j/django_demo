import pathToRegexp from 'path-to-regexp'
import * as articlesService from '../services/articles';
import _ from 'lodash'

export default {
  namespace: 'article',
  state: {
    record: null,
    list: []
  },
  reducers: {
    save(state, {payload: {record, list}}) {
      let newState = {...state}
      if (!_.isEmpty(record))
        newState.record = record
      if (!_.isEmpty(list))
        newState.list = list
      return newState;
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
    * more_like_this({payload: {id}}, {call, put, select}) {
      const response = yield call(articlesService.more_like_this, id)

      const {data} = response
      yield put({
        type: 'save',
        payload: {
          list: data['results']
        }
      })
    }
  }
  ,
  subscriptions: {
    setup({dispatch, history}) {
      return history.listen(({pathname}) => {
        const match = pathToRegexp('/articles/:id').exec(pathname)
        if (match) {
          dispatch({type: 'detail', payload: {id: match[1]}})
          dispatch({type: 'more_like_this', payload: {id: match[1]}})
        }
      });
    },
  },
};
