import {isDev, isSP} from '../consist/GLOBAL_CONFIG'
import apiNews from '../api/news'
import apiPass from '../api/pass'
import apiRoute from '../api/route'
import apiHowTo from '../api/howTo'
import apiRank from '../api/rank'

import getTemplate from '../partial/renderTemplate'
import {initNormalSwiper, initCoverSwiper} from '../util/swiper'
import url from '../util/url'
import youtubePlayer from '../util/youtubeVideoPlayer'
import {onAreaTagClick, onItemClick} from '../page/list'
import {onLikeClick} from '../partial/like'

import ellipsis from '../partial/ellipsis'

const fetchData = () => {
  const apiObj = {
    collection: apiNews,
    route: apiRoute,
    pass: apiPass,
    howTo: apiHowTo
  }
  const query = {
    "page": 0,
    "size": 6,
    "sort": ['upDt,desc', 'showDt,desc']
  }

  for (let item in apiObj) {
    apiObj[item].fetch(query)
      .then((res) => {
        let $item = getTemplate(res.data, item === 'collection' ? 'news' : item, true)
        $(`.x_${item}_container`).append($item)

        $('.x_like_btn').unbind('click')
        onLikeClick('x_like_btn')

        if (isSP) {
          $(function () {
            $(".lazy").lazyload({
              container: $(".x_page_content"),
              appear: function () {
                initCoverSwiper('#x_top_cell' + $(this).parents('.list_cell').index())
              }
            })
          });
        }
      })
      .then(() => {
        ellipsis()
        $(`.x_${item}_container`).find('a').attr('href', 'javascript:void(0);')
      })
  }
}

const onButtonClick = () => {
  $('.x_map_collapse').on('click', function () {
    $('.x_map_wrap').toggleClass('is_open')
    $('.x_map_wrap .close_img').toggleClass('is_open')
    $('.text_open').toggleClass('hidden')
    $('.text_close').toggleClass('hidden')
  })
}

const onmMapItemClick = () => {
  $('.x_cell').on('click', function () {
    let key = $(this).data('value')
    let params = url.getQuery(window.location.href)
    params.area = key
    let searchPath = (isDev ? '/search/search.html' : '/toSearch') + url.setQuery(params)
    window.location.href = searchPath
  })
}

// scroll event sub side action
const onScroll = () => {
  $(window).on('scroll', function () {
    const $sideBar = $('.x_side_bar')
    const initHeight = $sideBar.offset().top
    if ($(this).scrollTop() > initHeight && $(this).scrollTop() < $(document).height() - 356 - $sideBar.find('.wrapper').height()) {
      $('.x_side_bar').addClass('is_fixed')
    } else {
      $('.x_side_bar').removeClass('is_fixed')
      if ($(this).scrollTop() >= $(document).height() - 356 - $sideBar.find('.wrapper').height()) {
        $('.x_side_bar').addClass('at_bottom')
      } else {
        $('.x_side_bar').removeClass('at_bottom')
      }
    }
  })
}

const init = () => {
  onScroll()
  fetchData()
  initNormalSwiper('#listSwiper')
  youtubePlayer.init('ytplayer0')
}

const bind = () => {
  onmMapItemClick()
  onButtonClick()
  onAreaTagClick()
  onItemClick()
  if (isSP) {
    youtubePlayer.bind()
  }
}

export default {
  init: init,
  bind: bind
}