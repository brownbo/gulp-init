const onMenuClick = () => {
  $('.x_menu_toggle').on('click', function (event) {
    event.preventDefault()

    const $menu = $('.x_menu')
    const targetClass = 'is_opened'
    $menu.toggleClass(targetClass)
  })
}

const onMenuCloseClick = () => {
  $('.x_menu_close').on('click', function (event) {
    event.preventDefault()

    const $menu = $('.x_menu')
    const targetClass = 'is_opened'
    $menu.removeClass(targetClass)
    // returnScroll()
  })
}

const bind = () => {
  onMenuClick()
  onMenuCloseClick()
}

export default {
  bind
}