import Api from './api'

let getOption = {
  httpType: 'GET',
  url: 'user/follow/news/list',
  query: {}
}

let deleteOption = {
  httpType: 'POST',
  url: 'user/follow/delete/batch',
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
  delete: (_opt) => {
    deleteOption.query = $.extend(deleteOption.query, _opt);
    return new Promise((resolve, reject) => {
      Api(deleteOption).done((response) => {
        resolve(response);
      }).fail((response) => {
        reject(response);
      })
    });
  },
}

