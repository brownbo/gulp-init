import Api from './api'
let option = {
  httpType: 'GET',
  url: 'pass/list',
  query: {}
}

export default {
  fetch: (_opt) => {
    option.query = $.extend(option.query, _opt);
    return new Promise((resolve, reject) => {
      Api(option).done((response) => {
        resolve(response);
      }).fail((response) => {
        reject(response);
      })
    });
  }
}
