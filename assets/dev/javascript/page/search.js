import{isDev, isSP} from '../consist/GLOBAL_CONFIG'
import listLoading from '../partial/listLoading'
import {findItemIndex} from '../util/array'
import url from '../util/url'
import {onAreaTagClick, onItemClick} from '../page/list'
import apiSearch from '../api/search'

let searchForm = {
  type: ['all'],
  area: ['all'],
  theme: ['all'],
  traffic: ['all'],
  budget: ['-1']
}

const setCondition = ($this) => {
  let value = $this.data('value')
  let $target = $this.parents('.item').find('.reset_text') // condition display container
  let conditionType = $this.parents('.item').data('value')
  let $labels = $(`.${conditionType} .label_item`)
  let activeValue = ''
  for (let i = 0; i < $labels.length; i++) {
    let $item = $(`.${conditionType} .label_item:eq(${i})`)
    if ($item.hasClass('active')) {
      activeValue = activeValue + '　' + $item.text()
    }
  }
  $target.text(activeValue)
}

const submit = (needResetCondition) => {
  let params = {}

  // get keywords
  let keywords = ''
  if (isSP) {
    keywords = $('.search_bar .x_global_search_input').val()
  } else {
    keywords = $('.search .x_global_search_input').val()
  }
  params.keywords = keywords

  // format search params
  if (needResetCondition) {
    setDefaultActive(params)
    params.searchType = ''
    params.area = 'all'
    params.classification = 'all'
    params.trafficMode = 'all'
    params.budget = '-1'
  } else {
    params.searchType = searchForm.type.toString()
    params.area = searchForm.area.toString()
    params.classification = searchForm.theme.toString()
    params.trafficMode = searchForm.traffic.toString()
    params.budget = searchForm.budget.toString()
  }

  if (isDev) {
    params.isDev = true
  }
  window.history.replaceState('', '', window.location.pathname + url.setQuery(params))

  if (params.isDev) {
    delete params.isDev
  }
  $('.x_render_parent').empty()
  listLoading('search', apiSearch, params)
}

const onConditionItemClick = () => {
  let $conditionItem = $('.item')
  $conditionItem.on('click', '.label_item', function (e) {
    e.stopPropagation()

    // get search key&value
    let key = $(this).parents('.item').data('value')
    let value = $(this).data('value')+''

    // is clicked all item
    if (value === 'all' || value === '-1') {
      if (!$(this).hasClass('active')) {
        $(this).addClass('active')
      } else {
        return
      }
      // clear brother nodes active status
      $(this).siblings('.label_item').removeClass('active')
      searchForm[key] = [value]
    } else {
      // clear 'all' status
      $(this).prevAll('.label_item:first-child').removeClass('active')
      $(this).toggleClass('active')

      // remove searchForm all item
      let index = -1
      if (key === 'budget') {
        if (searchForm[key][0] === '-1') {
          index = 0
        }
      } else {
        index = findItemIndex(searchForm[key], 'all')
      }
      if (index > -1) {
        searchForm[key].splice(index, 1)
      }

      //style setting
      if ($(this).hasClass('active')) {
        searchForm[key].push(value)
      } else {
        let index = findItemIndex(searchForm[key], value)
        searchForm[key].splice(index, 1)
      }
    }

    // default active action if no item was selected
    if (searchForm[key].length === 0) {
      if (key === 'budget') {
        searchForm[key].push('-1')
      } else {
        searchForm[key].push('all')
      }
      $(this).prevAll('.label_item:first-child').addClass('active')
    }

    if (isSP) {
      setCondition($(this))
    } else {
      removeEmptyHolder()
      submit()
    }
  })
}

const onSearchClick = () => {
  $('.search_button').on('click', function () {
    let needResetCondition = true
    $('.x_search_condition').removeClass('active')
    submit(needResetCondition)
  })
}

// search content empty holder
const removeEmptyHolder = () => {
  // empty placeholder remove
  if ($('.x_is_empty').hasClass('active')) {
    $('.x_is_empty').removeClass('active')
  }
}

// sp click event
const onFilterClick = () => {
  $('.x_icon_filter').on('click', function () {
    $('.x_search_condition').toggleClass('active')
  })
}

const onConditionClick = () => {
  $('.search_condition').on('click', '.item', function () {
    if ($(this).hasClass('active')) {
      $(this).removeClass('active')
    } else {
      $('.search_condition .item').removeClass('active')
      $(this).addClass('active')
    }
  })
}

const onResetTotal = () => {
  $('.x_reset_total').on('click', function () {
    if (isDev) {
      window.location.href = url.removeQuery(window.location.href) + url.setQuery({isDev: true})
    } else {
      window.location.href = url.removeQuery(window.location.href)
    }
  })
}

const onSearchEnter = () => {
  $('.x_global_search_input').keypress(function (e) {
    if (e.which === 13) {
      let needResetCondition = true

      $('.x_search_condition').removeClass('active')
      removeEmptyHolder()
      submit(needResetCondition)
    }
  })
}

const onConfirmTotal = () => {
  $('.x_confirm_total').on('click', function () {
    $('.x_search_condition').removeClass('active')
    removeEmptyHolder()
    submit()
  })
}

// init
const activeCondition = (obj, item) => {
  let text = []
  $(`.${item}`).find('.label_item').removeClass('active')
  for (let value of obj[item]) {
    text.push($(`.${item}`).find(`div[data-value = ${value}]`).text())
    let formatText = text.toString()
    $(`.${item}`).find(`div[data-value = ${value}]`).addClass('active')
    if (isSP) {
      $(`.${item}`).find('.reset_text').text(formatText)
    }
  }
}

const setDefaultActive = (params) => {
  if (params.isDev) {
    delete params.isDev
  }

  searchForm = {
    keywords: params.keywords ? params.keywords : '',
    type: params.searchType ? params.searchType.split(',') : ['all'],
    area: params.area ? params.area.split(',') : ['all'],
    theme: params.classification ? params.classification.split(',') : ['all'],
    traffic: params.trafficMode ? params.trafficMode.split(',') : ['all'],
    budget: params.budget ? params.budget.split(',') : ['-1']
  }

  for (let item in searchForm) {
    if (item !== 'keywords') {
      activeCondition(searchForm, item)
    } else {
      if (isSP) {
        $('.search_bar .x_global_search_input').val(searchForm.keywords)
      } else {
        $('.search .x_global_search_input').val(searchForm.keywords)
      }
    }
  }
}

const init = () => {
  // hidden footer nav
  $('.footerl_navi').addClass('hidden')

  // unbind search button click
  $('.search_button').unbind('click')

  $(window).unbind('scroll')

  $('#x_header').addClass('is_fixed')

  let initParams = url.getQuery(window.location.href)
  setDefaultActive(initParams)
  listLoading('search', apiSearch, initParams)
}

const bind = () => {
  onResetTotal()
  onSearchEnter()
  onSearchClick()
  onConditionItemClick()

  onAreaTagClick()
  onItemClick()

  // SP event
  onFilterClick()
  onConfirmTotal()
  onConditionClick()
}

export default {
  init: init,
  bind: bind
}
