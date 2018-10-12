import Api from './api'

export default {
  post: (_opt) => {
    let option = {
      httpType: 'POST',
      url: 'user/comment/reply'
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
      url: `user/comment/reply/${_opt.commentReplyId}`
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