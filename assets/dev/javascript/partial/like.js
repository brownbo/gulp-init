import ApiLike from '../api/like'
import ApiFollow from '../api/follow'

import {isDev} from '../consist/GLOBAL_CONFIG'

const changeLikeClass = (el, $target, type) => {
  const $el = $(`.${el}`)
  let count = $target.text()
  if(type) {
    if(el === 'x_like') {
      $el.find('span').text(parseInt(count, 10) - 1).removeClass('liked')
    } else {
      $target.text(parseInt(count, 10) - 1).removeClass('liked')
    }
  } else {
    if(el === 'x_like') {
      $el.find('span').text(parseInt(count, 10) + 1).addClass('liked')
    } else {
      $target.text(parseInt(count, 10) + 1).addClass('liked')
    }
  }
  return true
}

export const onLikeClick = (el, key) => {
  const $target = $(`.${el}`)
  let isLicking = true
  $target.on('click', function (e) {
    e.stopPropagation()
    let $countTarget = $(this).find('span')
    let id = $(this).data('id')
    let type = $(this).data('type')
    let _option = {
      objId: id,
      likeType: type
    }
    if(isLicking) {
      if ($countTarget.hasClass('liked')) {
        isLicking = false
        ApiLike.delete(_option)
          .then(res => {
            isLicking = changeLikeClass(el, $countTarget, true)
          }).catch(err => {
            isLicking = true
          })
      } else {
        isLicking = false
        ApiLike.post(_option)
          .then(res => {
            isLicking = changeLikeClass(el, $countTarget)
          }).catch(err => {
            isLicking = true
          })
      }
    }
  })
}

export const onMarkClick = (el, key) => {
  const $target = $(`.${el}`)
  $target.on('click', function () {
    let status = $(this).data('status')
    let id = $('#x_header').data('id')
    let type = $('#x_header').data('type')
    let _option = {
      objId: isDev ? 91 : id,
      followType: isDev ? 'NEWS' : type
    }
    if (status) {
      ApiFollow.delete(_option)
        .then(res => {
          $target.data('status', false)
          $target.find('img').attr('src', `/nippon/resources/image/icon/${key}.svg`)
        })
    } else {
      ApiFollow.post(_option)
        .then(res => {
          $target.data('status', true)
          $target.find('img').attr('src', `/nippon/resources/image/icon/${key}_active.svg`)
        })
    }
  })
}

export const onShopLikeClick = (el) => {
  const $target = $(`.${el}`)
  $target.on('click', function () {
    let status = $(this).data('status')
    let id = isDev ? 4 : $(this).parents('.shop').data('id')
    let type = 'SHOP'
    let _option = {
      objId: isDev ? 91 : id,
      followType: type
    }

    if (status) {
      ApiFollow.delete(_option)
        .then(res => {
          $(this).data('status', false)
          $(this).removeClass('active')
        })

      $(this).data('status', false)
      $(this).removeClass('active')
    } else {
      ApiFollow.post(_option)
        .then(res => {
          $(this).data('status', true)
          $(this).addClass('active')
        })
    }
  })
}
