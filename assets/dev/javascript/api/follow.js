import Api from './api'

let postOption = {
  httpType: 'POST',
  url: 'user/follow'
}

let deleteOption = {
  httpType: 'POST',
  url: 'user/follow/delete'
}


export default {
  post: (_opt) => {
    postOption.query = $.extend(postOption.query, _opt);
    return new Promise((resolve, reject) => {
      Api(postOption).done((response) => {
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
