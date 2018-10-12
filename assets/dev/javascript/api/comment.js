import Api from './api'

export default {
  get: (_opt) => {
    let option = {
      httpType: 'POST',
      url: 'public/comment/list',
      query: {}
    }
    option.query = $.extend(option.query, _opt);
    return new Promise((resolve, reject) => {
      Api(option).done((response) => {
        resolve(response);
      }).fail((response) => {
        reject(response);
      })
    });
  },
  post: (_opt) => {
    let option = {
      httpType: 'POST',
      url: 'user/comment',
      query: {}
    }

    option.query = $.extend(option.query, _opt);
    return new Promise((resolve, reject) => {
      Api(option).done((response) => {
        resolve(response);
      }).fail((response) => {
        reject(response);
      })
    });
  },
  delete: (_opt) => {
    let option = {
      httpType: 'DELETE',
      url: `user/comment/${_opt.commentId}`
    }
    option.query = $.extend(option.query, _opt);
    return new Promise((resolve, reject) => {
      Api(option).done((response) => {
        resolve(response);
      }).fail((response) => {
        reject(response);
      })
    });
  },
}