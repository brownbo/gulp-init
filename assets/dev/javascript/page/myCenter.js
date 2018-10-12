import { isSP } from '../consist/GLOBAL_CONFIG'
import {initCenterSwiper, initFreeSwiper} from '../util/swiper'

const addSwiperInit = () => {
  for(var i = 0; i < 5; i++) {
    if (isSP) {
      initFreeSwiper('#x_top_cell'+i)
    } else {
      initCenterSwiper('#x_top_cell'+i, ['.x_swiper_btn_p'+i, '.x_swiper_btn_n'+i])
    }
  }
}

const init = () => {
  addSwiperInit()
}


const bind = () => {

}

export default {
  init: init,
  bind: bind
}