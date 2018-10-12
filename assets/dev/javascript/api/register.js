import Api from './api'
let option = {
  httpType: 'PUT',
  url: 'login/register',
  contentType: 'application/json',
  processData: false,
  query: {}
}
let optionEmail = {
  httpType: 'GET',
  url: 'login/mailCheck',
  query: {}
}
let optionImg = {
  httpType: 'POST',
  url: 's3',
  contentType: false,
  processData: false,
  query: {}
}

export default {
  fetch: (_opt) => {
    option.query = _opt;
    return new Promise((resolve, reject) => {
      Api(option).done((response) => {
        resolve(response);
      }).fail((response) => {
        reject(response);
      })
    });
  },
  fetchEmail: (_opt) => {
    optionEmail.query = $.extend(optionEmail.query, _opt);
    return new Promise((resolve, reject) => {
      Api(optionEmail).done((response) => {
        resolve(response);
      }).fail((response) => {
        reject(response);
      })
    });
  },
  imgFetch: (_opt) => {
    optionImg.query = _opt;
    return new Promise((resolve, reject) => {
      Api(optionImg).done((response) => {
        resolve(response);
      }).fail((response) => {
        reject(response);
      })
    });
  }
}
