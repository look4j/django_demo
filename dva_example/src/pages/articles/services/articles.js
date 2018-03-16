import {PAGE_SIZE} from '../constants'
import request from '../../../utils/request';

export function fetch({page = 1}) {
  return request(`/api/articles?page=${page}&limit=${PAGE_SIZE}`);
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
