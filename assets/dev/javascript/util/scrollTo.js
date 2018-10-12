export default ($target) => {
  console.log($target)
  if ($target.length) {
    event.preventDefault()
    let distance = $target.offset().top - 40
    $('html, body').stop().animate({
      scrollTop: distance || 0
    }, distance / 2)
  }
}