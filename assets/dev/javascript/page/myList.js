import listLoading from "../partial/listLoading"
import {openModal} from "../util/modal"
import {isDev, baseUrl, isSP} from "../consist/GLOBAL_CONFIG"
import ApiLogin from '../api/login'
import url from "../util/url"

const onDelete= (type, api) => {
  $('.x_delete_btn').on('click', function () {
    const arr = []
    const domArr = []
    $('input[name="followCk"]:checked').each((i, item) => {
      arr.push(Number($(item).val()))
      domArr.push($(item).parents('li'))
    })
    if(arr.length === 0) {
      alert('削除したい記事を選択してください')
    } else {
      //confirm modal
      openModal('x_modal_normal', () => {
        const $modal = $('.x_modal_normal')
        const $confirm = $modal.find('.x_confirm')

        $confirm.unbind('click')
        $confirm.on('click', () => {
          api.delete({ids: arr})
            .then(res => {
              $modal.addClass('is_hidden')
              $(".x_news_list").removeClass('edit_wrapper')
              domArr.forEach(item => {
                item.remove()
              })
              let $totalCount = $('.x_total_count')
              $('.header').css('display', 'block')
              $totalCount.text(parseInt($totalCount.text(), 10) - arr.length)
              $('.page_content, body').css('overflow','auto')
              itemClick(type)
            })
        })
      })
    }
  })
}

export const onAreaTagClick = () => {
  $('.news_list').on('click', 'ul.area_list li', function (e) {
      e.stopPropagation()
      let $target = $(this).parents('.x_item_wrapper')
      let value = $(this).data('value')
      let params = {}
      params.area = value
      params.searchType = $target.data('type').toUpperCase()
      if (isDev) {
        params.isDev = true
      }
      window.location.href = (isDev ? `/search/search.html` : `${baseUrl}toSearch` ) + url.setQuery(params)
    }
  )
}

const itemClick = (type) => {
  if(type === 'favStore') {
    $('.news_list').on('click', 'li', function (e) {
      e.stopPropagation()
      const params = $(this).data('shops')
      openModal('x_shop_modal', params)
    })
  } else {
    $('.news_list').on('click', '.x_item_wrapper', function (e) {
      e.stopPropagation()
      let $target = $(this)
      let url = $target.data('url').substring(1)
      window.location.href = isDev ? '/news/detail.html\?isDev\=true' : `${baseUrl}${url}`
    })
  }
}

const selectFn = (type, api) => {
  if(isSP) {
    $(".x_select_list select").on('change', function (e) {
      e.stopPropagation()
      let params = {
        sort: $(this).val()
      }
      bindListLoading(type, api, params)
    })
  } else {
    $(".x_select_list li").on('click', function (e) {
      e.stopPropagation()
      const $this = $(this)
      const isSelect = $this.hasClass('selected')
      let params = {
        sort: isSelect ? $(this).data('id') : ''
      }
      bindListLoading(type, api, params)
    })
  }
}

const changeEditeFn = (type) => {
  $('.x_edit_btn').on('click', function () {
    $('.news_list').unbind('click')
    $(".x_news_list").addClass('edit_wrapper')
    if(isSP) {
      $('.header').css('display', 'none')
    }
    $('.edit_wrapper .x_item_wrapper').on('click', function (e) {
      e.stopPropagation()
      console.dir($(this).find('input[name="followCk"]')[0])
      let $thisCheck = $($(this).find('input[name="followCk"]')[0])
      $thisCheck.attr('checked', !$thisCheck.is(':checked'))
    })
  })
  $(".x_cancel_btn").on('click', function () {
    $('.edit_wrapper .x_item_wrapper').unbind()
    itemClick(type)
    $('input[name="followCk"]:checked').each((i, item) => {
      $(item).attr('checked',false)
    })
    if(isSP) {
      $('.header').css('display', 'block')
    }
    $(".x_news_list").removeClass('edit_wrapper')
  })
}

const bindListLoading = (type, api, params) => {
  let sort = params ? Object.assign({sort: ''}, params) : {sort: ''}
  if(type !== 'favStore') {
    listLoading('search', api, sort, true)
  } else {
    listLoading(type, api, sort, true)
  }
}

const init = (type, api) => {
  // dev environment call login
  if (isDev) {
    ApiLogin.post()
  }

  bindListLoading(type, api)
  itemClick(type)
  if(type !== 'favStore') {
    onAreaTagClick()
  }
}


const bind = (type, api) => {
  changeEditeFn(type)
  onDelete(type,api)
  selectFn(type, api)
}

export default {
  init: init,
  bind: bind
}