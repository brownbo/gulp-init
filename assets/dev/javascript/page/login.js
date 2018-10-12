import { DBC2SBC } from '../util/string'

const inputeBlurFn = () => {
  $("input[type='text'], input[type='password']").blur(function(){
    var _self = $(this)
    _self.val(DBC2SBC(_self.val()))
  })
}

const init = () => {
  $("#loginForm").validate({isFormSubmit: true})
}


const bind = () => {
  inputeBlurFn()
}

export default {
  init: init,
  bind: bind
}