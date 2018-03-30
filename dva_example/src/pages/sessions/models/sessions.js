import * as sessionsService from '../services/sessions'

import {routerRedux} from 'dva/router'

export default {
  namespace: 'sessions',
  state: {
    user: null
  },
  reducers: {
    save(_, {payload: user}) {
      return {user};
    },
  },
  effects: {
    * check(_, {call, put}) {
      const res = yield call(sessionsService.check)
      if (!res.err) {
        yield put({type: 'save', payload: res.data})
        yield put(routerRedux.push('/'))
      }
    },
    * login(_, {call, put}) {
      const res = yield call(sessionsService.login)
      yield put({type: 'save', payload: res.data})
      yield put(routerRedux.push('/'))
    },
    * logout(_, {call, put}) {
      yield call(sessionsService.logout)
      yield put({type: 'check'})
    }
  },
  subscriptions: {
    setup({dispatch}) {
      dispatch({type: 'check'})
    }
  }
};
