const bind = () => {
  let $absoluteDom = !!$('.page_content') ? $('.page_content') : $(window)
  $absoluteDom.on('scroll', function(event){
    const $header = $('#x_header')
    event.preventDefault()
    if ($(this).scrollTop() > $header.height()) {
      $header.addClass('is_fixing')
    }
    if ($(this).scrollTop() > $header.height() + 1) {
      $header.addClass('is_fixed')
    } else {
      $header.removeClass('is_fixed')
    }
    if ($(this).scrollTop() === 0) {
      $header.removeClass('is_fixing')
    }
  })
}

export default {
  bind
}