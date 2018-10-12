import url from '../util/url'

export const initDefaultLang = () => {
  let path = window.location.href
  let params = url.getQuery(path)
  if ('lang' in params) {
    $('.x_current_lang').html($(`.x_lang_${params.lang}`).html())
  } else {
    let lang = $('meta[name="language"]').attr('content')
    $('.x_current_lang').html($(`.x_lang_${lang}`).html())
  }
}

export const onSelectOpen = () => {
  $('.x_lang_select').click(function () {
    $('.x_lang_select').toggleClass('is_opened')
  })
}

export const onSelectItemClick = () => {
  $('.x_lang_item').click(function () {
    let path = window.location.href
    let params = url.getQuery(path)
    params.lang = $(this).data('value')
    window.location.href = url.removeQuery(path) + url.setQuery(params)
  })
}

const init = () => {
  initDefaultLang()
}

const bind = () => {
  onSelectOpen()
  onSelectItemClick()
}

export default {
  init,
  bind
}