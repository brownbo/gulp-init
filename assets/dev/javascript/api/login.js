import Api from './api'

let option = {
  httpType: 'POST',
  url: 'login/submit',
  query: {
    username: 'test@111.com',
    password: 'q1234567'
  }
}

export default {
  post: (_opt) => {
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
