import Api from './api'

let getOption = {
  httpType: 'GET',
  url: 'user/comment/list',
  query: {}
}


export default {
  fetch: (_opt) => {
    getOption.query = $.extend(getOption.query, _opt);
    return new Promise((resolve, reject) => {
      Api(getOption).done((response) => {
        resolve(response);
      }).fail((response) => {
        reject(response);
      })
    });
  },
}

