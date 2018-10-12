import {isDev, isSP, baseUrl} from '../consist/GLOBAL_CONFIG'
import listLoading from '../partial/listLoading'
import {initNormalSwiper} from '../util/swiper'
import url from '../util/url'
import youtubePlayer from "../util/youtubeVideoPlayer";

export const onAreaTagClick = () => {
  $('.news_list').on('click', 'ul.area_list li', function (e) {
      e.stopPropagation()
      let $target = $(this).parents('.item_wrapper')
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

const itemLink = ($this) => {
  let $target = $this.parents('.item_wrapper')
  let type = $target.data('type')
  let id = $target.data('id')
  window.location.href =isDev ? '/news/detail.html\?isDev\=true' : `${baseUrl}${type}/${id}`
}

export const onItemClick = () => {
  $('.news_list').on('click', 'li .cover', function () {
    itemLink($(this))
  })

  $('.news_list').on('click', 'li .visual_video', function () {
    itemLink($(this))
  })

  $('.news_list').on('click', 'li .visual', function () {
    itemLink($(this))
  })

  $('.news_list').on('click', 'li .detail', function () {
    itemLink($(this))
  })

  $('.page_detail .news_list').unbind('click')
}

export const init = (type, api) => {
  youtubePlayer.init('ytplayer0')
  initNormalSwiper('#listSwiper')
  listLoading(type, api)
  $(window).resize(function () {
    initNormalSwiper('#listSwiper')
  })
}

export const bind = () => {
  onAreaTagClick()
  onItemClick()
  if (isSP) {
    youtubePlayer.bind()
  }
}

export default {
  init,
  bind
}