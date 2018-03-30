import request from '../../../utils/request';


export function login(auth = {'username':'admin', 'password':'4rfv5tgb'}) {
  return request(`/api/sessions`, {
    method: 'POST',
    body: JSON.stringify(auth)
  })
}

export function check() {
  return request(`/api/sessions`, {
    method: 'GET'
  })
}

export function logout() {
  return request(`/api/sessions`, {
    method: 'DELETE'
  })
}
