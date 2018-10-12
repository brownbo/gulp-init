
const selectItemFn = () => {
  $('.x_select_wrap').on('click', function(e) {
    e.stopPropagation()
    $(this).toggleClass('list_show_ul')
  })
  $('.x_select_list li').on('click', function (e) {
    e.stopPropagation()
    const $selectText = $('.select_text')
    const $this = $(this)
    $this.toggleClass('selected').siblings().removeClass('selected')
    if($this.hasClass('selected')) {
      $(".select_text").text($this.text())
    } else {
      $selectText.text($selectText.data('text'))
    }
  })
  $('body').on('click', function (e) {
    $('.x_select_wrap').removeClass('list_show_ul')
  })
}

const init = () => {

}


const bind = () => {
  selectItemFn()
}

export default {
  init: init,
  bind: bind
}