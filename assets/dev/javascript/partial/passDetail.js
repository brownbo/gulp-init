import {isSP} from '../consist/GLOBAL_CONFIG'
import {initFreeSwiper, initMutipleSwiper} from '../util/swiper'

export default function () {
  let swiperArr = [
    '#routeSwiper',
    '#passSwiper',
    '#relationSwiperUse',
    '#relationSwiperShop',
    '#relationSwiperBuy',
    '#spotSwiper',
    '#modalSwiper',
    '#mainNewsSwiper',
    '#mainPassSwiper',
    '#mainRouteSwiper'
  ]

  for (let item of swiperArr) {
    if (isSP) {
      initFreeSwiper(item)
    } else {
      initMutipleSwiper(item)
    }
  }

}