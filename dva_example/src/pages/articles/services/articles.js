import {PAGE_SIZE} from '../constants'
import request from '../../../utils/request';
import _ from 'lodash'

export function fetch({page = 1, search}) {
  if (_.isEmpty(search)) {
    return request(`/api/articles?page=${page}&limit=${PAGE_SIZE}`)
  } else {
    return request(`/api/articles?page=${page}&limit=${PAGE_SIZE}&search=${search}`)
  }
}

export function detail(id) {
  return request(`/api/articles/${id}`, {
    method: 'GET'
  })
}

export function remove(id) {
  return request(`/api/articles/${id}`, {
    method: 'DELETE',
  });
}

export function patch(id, values) {
  return request(`/api/articles/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(values),
  });
}

export function create(values) {
  return request('/api/articles', {
    method: 'POST',
    body: JSON.stringify(values),
  });
}
