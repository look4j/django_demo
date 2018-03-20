import * as articlesService from '../services/articles';

export default {
  namespace: 'articles',
  state: {
    list: [],
    total: null,
    page: null,
    search: null,
  },
  reducers: {
    save(state, {payload: {data: list, total, page}}) {
      return {...state, list, total, page};
    },
    change_search(state, {payload: search}) {
      return {...state, search}
    }
  },
  effects: {
    * fetch({payload: {page = 1, search}}, {call, put}) {
      const {data} = yield call(articlesService.fetch, {page, search});
      yield put({
        type: 'save',
        payload: {
          data: data['results'],
          total: parseInt(data['count'], 10),
          page: parseInt(page, 10),
        }
      });
    },
    * remove({payload: id}, {call, put, select}) {
      yield call(articlesService.remove, id);
      const page = yield select(state => state.articles.page);
      yield put({type: 'fetch', payload: {page}});
    },
    * patch({payload: {id, values}}, {call, put, select}) {
      yield call(articlesService.patch, id, values);
      const page = yield select(state => state.articles.page);
      yield put({type: 'fetch', payload: {page}});
    },
    * create({payload: values}, {call, put, select}) {
      yield call(articlesService.create, values);
      const page = yield select(state => state.articles.page);
      yield put({type: 'fetch', payload: {page}});
    },
  },
  subscriptions: {
    setup({dispatch, history}) {
      return history.listen(({pathname, query}) => {
        if (pathname === '/articles') {
          dispatch({type: 'fetch', payload: query});
        }
      });
    },
  },
};
