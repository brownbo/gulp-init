import getTemplate from '../partial/renderTemplate'
import{isSP} from '../consist/GLOBAL_CONFIG'
import {onLikeClick} from "./like"
import ellipsis from '../partial/ellipsis'

export default function (type, api, params, isNotScroll) {
  const $target = $('.x_news_list')
  const $renderParent = $target.find('.x_render_parent')
  const $loading = $target.find('.x_loading')
  let total_page = 0
  let over = false
  let query = {
    "page": 0,
    "size": 12,
    "sort": type !== 'rank' ? ['upDt,desc', 'showDt,desc'] : ''
  }

  if (params) {
    query = Object.assign(query, params)
  }

  let setDom = () => {
    offScrollEvent()
    $loading.addClass('is_shown')
    api.fetch(query)
      .then((response) => {
        total_page = Math.ceil(response.data.total / response.data.pageSize)
        $('.x_total_count').text(response.data.total)
        // if fetch data is empty
        if (response.data.total + '' === '0') {
          $('.x_is_empty').addClass('active')
        } else {
          let $item = getTemplate(response.data, type)
          if (isNotScroll) {
            $renderParent.empty()
          }
          $renderParent.append($item)
          $('.x_like_btn').unbind('click')
          onLikeClick('x_like_btn')
          if (!isNotScroll) {
            if (response.data.pageNum >= total_page) {
              over = true
              return false
            } else {
              over = false
              query.page++
              setTimeout(function () {
                setScrollEvent()
              }, 100)
            }
          }
        }
      })
      .then(() => {
        // always
        $loading.removeClass('is_shown')

        ellipsis()

        // forbidden a tag href action
        $renderParent.find('a').attr('href', 'javascript:void(0);')
      })
  }

  let setScrollEvent = () => {
    if (isSP && type !== 'search') {
      $('.x_page_content').on('scroll.is_bottom', (event) => {
        if ($('.x_page_content').scrollTop() + $('.x_page_content').height() + 30 >= $('.x_scroll_content').height()) {
          if (over) {
            return false
          } else {
            over = true
            setDom()
          }
        }
      })
    } else {
      $(window).on('scroll.is_bottom', (event) => {
        if ($(window).scrollTop() + $(window).height() + 100 >= $(document).height()) {
          if (over) {
            return false
          } else {
            over = true
            setDom()
          }
        }
      })
    }
  }
  let offScrollEvent = () => {
    $(window).off('scroll.is_bottom')
  }
  let init = () => {
    setDom()
  }
  init()
}