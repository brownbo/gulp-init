/**
 * @param {String} url
 * @return {Object} params
 */
const getQuery = (url) => {
  let params = {}
  let parser = document.createElement('a')
  parser.href = url
  let query = parser.search.substring(1)
  if (query) {
    let vars = query.split('&')

    for (let item of vars) {
      let pair = item.split(/=/)
      params[pair[0]] = decodeURIComponent(pair[1])
    }
  }
  return params
}

/**
 * @param {Object} params
 * @return {String} path
 */
const setQuery = (params) => {
  let path = "?";
  for (let key in params) {
    path += key + '=' + params[key] + '&'
  }
  path = path.substr(0, (path.length - 1))
  return path
}

/**
 * @param {String} url
 * @return {String} url
 */
const removeQuery = (url) => {
  return url.split('?')[0]
}


export default {
  getQuery,
  setQuery,
  removeQuery
}