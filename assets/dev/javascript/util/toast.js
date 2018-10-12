import toast from '../template/_toast.pug'

export default (message) => {
  const $toast = toast({
    message
  })
  if ($('.toast').length === 0) {
    $('.page_a').append($toast)
    setTimeout(function () {
      $('.toast').remove()
    }, 1000)
  }
}