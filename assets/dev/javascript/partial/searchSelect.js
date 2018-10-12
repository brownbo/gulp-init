import url from '../util/url'
import {baseUrl, isDev} from '../consist/GLOBAL_CONFIG'
import string from '../util/string'

const onSubmit = () => {
  let path = window.location.href
  let params = url.getQuery(path)
  params.searchType = $('.x_current_search_key:last').data('value')
  if (params.searchType === 'all') {
    delete params.searchType
  }

  let keywords = $('.x_global_search_input:last').val()
  if (keywords !== '' && string.trim(keywords) !== '') {
    params.keywords = keywords
  }

  let searchPath = (isDev ? '/search/search.html' : `${baseUrl}toSearch` ) + url.setQuery(params)
  window.location.href = encodeURI(searchPath)
}

const initDefaultSearchKey = () => {
  let path = window.location.href
  let params = url.getQuery(path)
  let $current = $('.x_current_search_key')
  if ('searchType' in params) {
    $current.html($(`.search_key_${params.searchType}`).html())
    $current.data('value', params.searchType)
  } else {
    $current.html($(`.search_key_all`).html())
    $current.data('value', 'all')
  }
  // Bind out click close event
  $(document).on('click', function () {
    $('.x_search_select').removeClass('is_opened')
  })
}

const onSearchOpen = () => {
  $('.select_list').on('click', function (e) {
    e.stopPropagation()
  })
  $('.x_current_search_key').click(function (e) {
    e.stopPropagation()
    $('.x_search_select').addClass('is_opened')
  })
}

const onSearchItemClick = () => {
  $('.x_search_key_item').click(function () {
    let key = $(this).data('value')
    $('.x_current_search_key').data('value', key).html($(`.search_key_${key}`).html())
    $('.x_search_select').removeClass('is_opened')
  })
}

const onSearchButtonClick = () => {
  $('.search_button').on('click', function (e) {
    e.stopPropagation()
    onSubmit()
  })
}

const onSearchEnter = () => {
  $('.x_global_search_input:last').keypress(function (e) {
    if (e.which === 13) {
      onSubmit()
    }
  })
}

const onSPSearchIconClick = () => {
  $('.x_search_open').on('click', function () {
    let path = window.location.href
    let params = url.getQuery(path)
    let searchPath = (isDev ? '/search/search.html' : `${baseUrl}toSearch` ) + url.setQuery(params)
    window.location.href = searchPath
  })
}

const init = () => {
  initDefaultSearchKey()
}

const bind = () => {
  onSearchOpen()
  onSearchItemClick()
  onSearchButtonClick()
  onSPSearchIconClick()
  onSearchEnter()
}

export default {
  init,
  bind
}