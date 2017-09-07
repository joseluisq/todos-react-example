import fetch from 'unfetch'

function checkStatus (res) {
  if (res.ok) {
    return res
  } else {
    var error = new Error(res.statusText)
    error.res = res
    return Promise.reject(error)
  }
}

function api (url, options = null) {
  return fetch(`http://localhost:8000${url}`, options)
    .then(checkStatus)
    .then((r) => r.json())
    .catch()
}

function jsons (url, params = {}, method = 'POST') {
  return api(url, {
    method,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(params)
  })
}

function gets (url) {
  return api(url)
}

function posts (url, params = {}) {
  return jsons(url, params)
}

function puts (url, params = {}) {
  return jsons(url, params, 'PUT')
}

function deletes (url, params = {}) {
  return jsons(url, params, 'DELETE')
}

export default {
  get: gets,
  post: posts,
  put: puts,
  delete: deletes
}
