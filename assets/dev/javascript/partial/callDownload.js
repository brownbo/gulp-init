import {isSP} from '../consist/UA'
const callDownLoad = () => {
  $('.x_pin').on('click', function () {
    let spUrl = 'https://app.pinnar.net/pinnarapp/index.html'
    let pcUrl = 'https://nippon.hodaiweb.com/news/40'
    if (isSP) {
      window.open(spUrl)
    } else {
      const url = $(this).data('url')
      if (url) {
        window.open(url)
      } else {
        window.open(pcUrl)
      }
    }
  })
}

export default callDownLoad