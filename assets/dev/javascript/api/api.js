import {isDev, baseUrl} from '../consist/GLOBAL_CONFIG'
import {openModal} from '../util/modal'

export default function (_opt) {
  let $defer = $.Deferred()
  let apiUrl = (isDev ? "/proxy"+baseUrl : baseUrl) + _opt.url
  let httpType = _opt.httpType
  let query = _opt.query
  let processData = 'processData' in _opt ? _opt.processData : true
  let contentType = 'contentType' in _opt ? _opt.contentType : 'application/x-www-form-urlencoded;charset=UTF-8'

  $.ajax({
    type: httpType,
    dataType: 'json',
    url: apiUrl,
    data: query,
    cache: false,
    processData: processData,
    contentType: contentType,
    success: $defer.resolve,
    error: $defer.reject,
    traditional: true,
    // xhrFields: {
    //   withCredentials: true
    // },
    // crossDomain: true
  })

  $(document).ajaxError((event, request, settings) => {
    if (request.status === 403) {
      $('.x_modal_normal').addClass('is_hidden')
      openModal('x_modal_login')
    }
  })

  return $defer.promise()
}