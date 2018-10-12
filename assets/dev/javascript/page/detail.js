import copyLink from '../util/copyLink'
import {onLikeClick, onMarkClick, onShopLikeClick} from '../partial/like'
import Comment from '../partial/comment'

const onShopCollapseClick = () => {
  $('.x_icon_collapse').on('click', function () {
    $(this).toggleClass('active')
    $(this).parents('.shop_detail').find('.shop_detail_list').toggleClass('is_close')
  })
}

// scroll event sub side action
const onScroll = () => {
  $(window).on('scroll', function () {
    const $header = $('#x_header')
    if ($(this).scrollTop() > $header.height() && $(this).scrollTop() < $(document).height() - 1030) {
      $('.x_side_bar').addClass('is_fixed')
    } else {
      $('.x_side_bar').removeClass('is_fixed')
      if ($(this).scrollTop() >= $(document).height() - 1030) {
        $('.x_side_bar').addClass('at_bottom')
      } else {
        $('.x_side_bar').removeClass('at_bottom')
      }
    }
  })
}

export const init = () => {
  onScroll()
  Comment.init()
}

export const bind = () => {
  onShopCollapseClick()

  // リンクのコピー
  copyLink()

  // like action
  onLikeClick('x_like', 'like')
  onMarkClick('x_mark', 'bookmark')
  onShopLikeClick('x_shop_like', 'shop')

  // comment action
  Comment.bind()
}

export default {
  init,
  bind
}