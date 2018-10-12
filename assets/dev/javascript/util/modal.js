import {isDev, baseUrl} from '../consist/GLOBAL_CONFIG'
import callDownload from '../partial/callDownload'
import template_shop_modal from '../template/_modal_shop.pug'

const modalAddClass = (el) => {
  $('.page_content, body').css('overflow','auto')
  el.addClass('is_hidden')
}

export const initModal = () => {
  $('body').on('click', '.modal .x_close', function (e) {
    const $modal = $('.x_close').parents('.modal')
    modalAddClass($modal)
  })

  $('body').on('click', '.modal .x_cancel', function (e) {
    const $modal = $('.x_cancel').parents('.modal')
    modalAddClass($modal)
  })

  $('body').on('click', '.modal_background', function (e) {
    const $modal = $('.modal_background').parents('.modal')
    modalAddClass($modal)
  })
}

const onShopCollapseClick = () => {
  $('.x_icon_collapse').on('click', function () {
    $(this).toggleClass('active')
    $(this).parents('.shop_detail').find('.shop_detail_list').toggleClass('is_close')
  })
}

const bindShopData = (data) => {
  let $shop = template_shop_modal({"data":data,"isDev": isDev, "baseUrl": baseUrl})
  const $shopWrap = $(".x_shop")
  $shopWrap.empty();
  $shopWrap.append($shop);
  onShopCollapseClick()
  callDownload()
}

export const openModal = (el, cb) => {
  const $target = $(`.${el}`)
  $('.page_content, body').css('overflow','hidden')
  $target.removeClass('is_hidden')

  if(cb && typeof cb !== "function") {
    bindShopData(cb)
  } else if (cb) {
    cb()
  }
}