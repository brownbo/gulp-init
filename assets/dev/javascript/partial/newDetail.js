import {isSP} from '../consist/GLOBAL_CONFIG'
import {initFreeSwiper, initMutipleSwiper} from '../util/swiper'

export default function () {
  let swiperArr = [
    '#mainPassSwiper',
    '#mainRouteSwiper',
    '#mainNewsSwiper'
  ]

  if (typeof subPostLength !== 'undefined') {
    for (let i = 0; i < subPostLength; i++) {
      swiperArr.push(`#routeSwiper${i + 1}`)
      swiperArr.push(`#passSwiper${i + 1}`)
      swiperArr.push(`#relateSwiper${i + 1}`)
    }
  }

  for (let item of swiperArr) {
    if (isSP) {
      initFreeSwiper(item)
    } else {
      initMutipleSwiper(item)
    }
  }
}