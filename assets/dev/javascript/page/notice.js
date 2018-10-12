import noticeApi from "../api/notice";
import listLoading from "../partial/listLoading";
import notice_item from "../template/_item_notice.pug"

const bindApiFn = () => {
  noticeApi.fetch().then(res => {
    let $item = notice_item({data: res.data})
    $('.notice_ul').append($item)
  })
}

const init = () => {
  listLoading('notice', noticeApi, {sort: ''})
}

const bind = () => {

}

export default {
  init: init,
  bind: bind
}