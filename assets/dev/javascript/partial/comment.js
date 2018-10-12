import {trim} from '../util/string'
import {openModal} from '../util/modal'
import {isDev} from '../consist/GLOBAL_CONFIG'
import ApiLogin from '../api/login'
import scrollTo from '../util/scrollTo'

import ApiComment from '../api/comment'
import ApiReply from '../api/reply'

const clearInputValue = ($textarea, $button, $count) => {
  $textarea.val('')
  $button.addClass('disabled')
  $count.text(0)
}

const onInputBlur = (el) => {
  const $target = $('.content_comment')

  $target.on('blur', `.${el} textarea`, function () {
    setTimeout(() => {
      $(this).parents('.textarea_wrapper').removeClass('is_focus')
    }, 100)
  })
}

const onInputFocus = (el) => {
  const $target = $('.content_comment')

  $target.on('focus', `.${el} textarea`, function () {
    // check is login
    const isLogin = $('#x_header').data('login')
    if (isLogin) {
      $(this).parents('.textarea_wrapper').addClass('is_focus')
    } else {
      openModal('x_modal_login')
    }
  })
}

const onInput = (el) => {
  const $container = $('.content_comment')

  $container.on('keyup', `.${el} textarea`, function () {
    const $target = $(`.${el}`)
    const $count = $target.find('.x_text_count .number')
    const $button = $target.find('.button')
    let value = $(this).val()
    let formattedValue = ''

    if (value.length > 0) {
      formattedValue = trim($(this).val())
    }

    $count.text(formattedValue.length)

    if (formattedValue.length > 0) {
      $button.removeClass('disabled')
    } else {
      $button.addClass('disabled')
    }
  })
}

const renderData = (item, isInit) => {
  const $container = $('.comment_container')
  const $template = $('script#comment_template')
  const $content = $($template.html())

  if (isInit) {
    $container.append($content)
  } else {
    $container.prepend($content)
  }

  //set data
  $content.attr('data-id', item.commentId)
  $content.find('.text').text(item.content)
  $content.find('.x_name').text(item.username)
  $content.find('.x_date').text(item.creDt)
  if (item.userImgUrl) {
    const $avatar = $content.find('.x_avatar')
    $avatar.removeClass('is_default')
    $avatar.css('background-image', `url(${item.userImgUrl})`)
  }

  if (item.delFlag) {
    $content.find('.x_comment_delete').removeClass('hidden')
  }

  if (item.commentReplyList && item.commentReplyList.length > 0) {
    for (let replyItem of item.commentReplyList)
      renderReplyData($content, replyItem, isInit)
  }
}

const renderReplyData = ($commentItem, item, isInit) => {
  const $container = $commentItem.find('.reply_container')
  const $template = $('script#reply_template')
  const $content = $($template.html())

  if (isInit) {
    $container.append($content)
  } else {
    $container.prepend($content)
  }

  //set data
  $content.attr('data-id', item.commentReplyId)
  $content.find('.text').text(item.content)
  $content.find('.x_name').text(item.username)
  $content.find('.x_date').text(item.creDt)

  if (item.userImgUrl) {
    $content.find('.x_avatar').removeClass('is_default')
    $content.find('.x_avatar').css('background-image', `url(${item.userImgUrl})`)
  }

  if (item.delFlag) {
    $content.find('.x_reply_delete').removeClass('hidden')
  }
}

const onCommentSubmit = () => {
  const $target = $('.content_comment')

  $target.on('click', '.x_comment_button', function () {
    if ($(this).hasClass('disabled')) {
      return
    }

    const $target = $('.x_comment_input')
    const $count = $target.find('.x_text_count .number')
    const $textarea = $target.find('textarea')
    let text = $textarea.val()

    let option = {
      objId: isDev ? 142 : $('#x_header').data('id'),
      commentType: isDev ? 'NEWS' : $('#x_header').data('type'),
      content: text
    }
    ApiComment.post(option)
      .then(res => {
        // clear input value
        clearInputValue($textarea, $(this), $count)

        // set item data
        renderData(res.data)
      })
  })
}

const onReplySubmit = () => {
  const $target = $('.content_comment')

  $target.on('click', '.x_reply_button', function () {
    if ($(this).hasClass('disabled')) {
      return
    }
    const $commentItem = $(this).parents('.comment_wrapper')
    const $parent = $(this).parents('.x_comment_reply')
    const $target = $parent.find('.x_reply_input')
    const $count = $target.find('.x_text_count .number')
    const $textarea = $target.find('textarea')
    let text = $textarea.val()
    let option = {
      commentId: $commentItem.data('id'),
      content: text
    }

    ApiReply.post(option)
      .then(res => {
        // clear input value
        clearInputValue($textarea, $(this), $count)
        // set item data
        renderReplyData($commentItem, res.data)
      })
  })
}

const replyAction = ($elem) => {
  const $wrapper = $elem.parents('.comment_wrapper')
  const $collapseItem = $wrapper.find('.x_comment_reply')
  const $otherCollapseItem = $wrapper.siblings('.comment_wrapper')

  $collapseItem.toggleClass('expand')

  // other comment reply collapse
  $otherCollapseItem.removeClass('expand')

  if ($elem.hasClass('at_end')) {
    const $close = $wrapper.find('.action_container .is_close')
    const $open = $wrapper.find('.action_container .is_open')
    $close.toggleClass('hidden')
    $open.toggleClass('hidden')
  } else {
    $elem.find('.is_open').toggleClass('hidden')
    $elem.find('.is_close').toggleClass('hidden')
  }
}

const onReplyCollapse = () => {
  const $target = $('.content_comment')
  $target.on('click', '.reply_collapse', function () {
    replyAction($(this))
  })
}

const onDelete = () => {
  const $target = $('.content_comment')
  const emptyHolder = $('.empty_holder').text()

  $target.on('click', '.x_delete', function () {
    const $contentContainer = $(this).parents('.comment_item').find('.text')

    //confirm modal
    openModal('x_modal_normal', () => {
      const $modal = $('.x_modal_normal')
      const $confirm = $modal.find('.x_confirm')
      const commentId = $(this).parents('.comment_wrapper').data('id')

      $confirm.unbind('click')
      $confirm.on('click', () => {
        if ($(this).hasClass('x_reply_delete')) {
          const commentReplyId = $(this).parents('.reply').data('id')
          const option = {
            commentId,
            commentReplyId
          }
          ApiReply.delete(option)
            .then(res => {
              $modal.addClass('is_hidden')
              $contentContainer.text(emptyHolder)
              $(this).addClass('hidden')
            })
        } else {
          let option = {
            commentId
          }
          ApiComment.delete(option)
            .then(res => {
              $modal.addClass('is_hidden')
              $contentContainer.text(emptyHolder)
              $(this).addClass('hidden')
            })
        }
      })
    })

  })
}


const init = () => {
  // dev environment call login
  if (isDev) {
    ApiLogin.post()
  }

  const $header = $('#x_header')
  let option = {
    objId: isDev ? 142 : $header.data('id'),
    commentType: isDev ? 'NEWS' : $header.data('type')
  }

  ApiComment.get(option)
    .then(res => {
      for (let item of res.data) {
        renderData(item, true)
      }

      let anchor = isDev ? 21 : commentId || ''
      if (anchor) {
        const $commentItem = $(`.comment_wrapper[data-id=${anchor}]`)
        let replyAnchor = isDev ? 47 : replyId || ''
        if (replyAnchor) {
          const $replyItem = $(`.reply[data-id=${replyAnchor}]`)
          const $replyCollapse = $replyItem.parents('.comment_wrapper').find('.reply_collapse')
          replyAction($replyCollapse)
          scrollTo($replyItem)
        } else {
          scrollTo($commentItem)
        }
      }
    })
}

const bind = () => {
  onInput('x_comment_input')
  onInput('x_reply_input')

  onInputFocus('x_comment_input')
  onInputFocus('x_reply_input')

  onInputBlur('x_comment_input')
  onInputBlur('x_reply_input')

  onCommentSubmit()
  onReplySubmit()

  onDelete()
  onReplyCollapse()
}

export default{
  init,
  bind
}
