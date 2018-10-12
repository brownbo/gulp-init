import item from '../template/_item_standard.pug'
import notice_item from "../template/_item_notice.pug"
import {isDev, isSP, baseUrl} from '../consist/GLOBAL_CONFIG'

export default (data, type, isTop) => {
  let template
  if (type === 'notice') {
    template = notice_item({
      "data": data
    })
  } else if (type === 'notice') {

  } else {
    template = item({
      "data": data,
      "linkTo": type,
      "isDev": isDev,
      "isSP": isSP,
      "isTop": isTop || false,
      "baseUrl": baseUrl
    })
  }
  return template
}