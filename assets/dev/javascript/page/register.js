import {isDev, baseUrl} from '../consist/GLOBAL_CONFIG'
import registerApi from '../api/register'
import {DBC2SBC} from "../util/string";

const submiteFn = () => {
  $(".x_submit_button").on("click", function () {
    $("#registerForm").validate({validateForm: true}, function (obj) {
      if(obj) {
        if($("#registerForm input[type='hidden'][name='email']").length===0) {
          registerApi.fetchEmail({
            email: $("#registerForm input[name='email']").val()
          }).then(res => {
            if(res.status !== 1) {
              $(".register_cont_wrap").hide()
              $(".register_sure_wrap").show()

              var password_len = ''
              for(var i=0;i<$("#registerForm input[name='password']").val().length;i++) {
                password_len += '• '
              }
              var imgUrl = $("#registerForm input[name='userImgUrl']").val()
              if(imgUrl !== '') {
                $(".x_img_portrait_text").css({'background': '#fff url("'+ imgUrl+'") center no-repeat', 'background-size':'cover'})
              } else {
                $(".x_img_portrait_text").removeAttr('style')
              }
              $(".name_text").text($("#registerForm input[name='userName']").val())
              $(".email_text").text($("#registerForm input[name='email']").val())
              $(".password_text").text(password_len)
            } else {
              $("#registerForm input[name='email']").parents('.form_wrap').addClass('error_wrap').find('.error_text').text(res.message)
            }
          })
        } else {
          $(".register_cont_wrap").hide()
          $(".register_sure_wrap").show()
          $(".name_text").text($("#registerForm input[name='userName']").val())
          var imgUrl = $("#registerForm input[name='userImgUrl']").val()
          if(imgUrl !== '') {
            $(".x_img_portrait_text").attr("src", imgUrl).css('background-color', '#fff')
          } else {
            $(".x_img_portrait_text").removeAttr("src").css('background-color', 'transparent')
          }
        }
      }
    })
  })
}

const changeFileImg = () => {
  $(".x_selectImg_plus").click(function () {
    $("#x_change_file").trigger('click')
  })
  $("#x_change_file").change(function(e) {
    var $xImgPort = $(".x_img_wrap")
    if($(this)[0].files[0]) {
      var form = new FormData()
      form.append("file",$(this)[0].files[0])
      form.append("userCount",'ONLY')
      $xImgPort.addClass('form_img_loading')
      registerApi.imgFetch(form).then(res => {
        if(res.data) {
          $xImgPort.removeClass('form_img_loading')
          $xImgPort.css({'background': '#fff url("'+ res.data+'") center no-repeat', 'background-size':'cover'})
          $("#x_imgUrl_input").prop("value", res.data)
        } else {
          $("#x_imgUrl_input").prop('value', '')
          $xImgPort.removeClass('form_img_loading').removeAttr('style')
        }
      })
    } else {
      $("#x_imgUrl_input").prop('value', '')
      $xImgPort.removeClass('form_img_loading').removeAttr('style')
    }
  })
}

const submiteFormFn = () => {
  $('.login_checkbox_wrap input[type="checkbox"]').change(function(){
    if(!$(this).is(':checked')){
      $("#registerForm input[type='submit']").attr('disabled','disabled')
    } else {
      $("#registerForm input[type='submit']").removeAttr('disabled')
    }
  })
  $("#registerForm").submit(function (e) {
    e.stopPropagation()
    var _self = $(this)
    $("#registerForm").validate({validateForm: true}, function (obj) {
      if(obj) {
        var params = {}
        var formObj = _self.serializeArray()
        $.each(formObj, function() {
          params[this.name] = this.value
        })
        params = JSON.stringify(params)
        registerApi.fetch(params).then(res => {
          window.location.href = isDev ? `/login/register_suc.html?isDev=true` : `${baseUrl}login/registerSuc`
        })
      }
    })
    return false
  })
}
const backSubmit = () => {
  $(".x_back_submit").on('click', function () {
    $(".register_cont_wrap").show()
    $(".register_sure_wrap").hide()
  })
}

const inputBlurFn = () => {
  $("input[type='text'], input[type='password']").blur(function(){
    var _self = $(this)
    _self.val(DBC2SBC(_self.val()))
  })
}

const isOtherLogin = () => {
  if($('input[name="thirdPartyId"]').val() !== '') {
    $('input[name="email"]').attr('check', 'email')
    $('input[type="password"]').attr('check', 'compare')
  }
}

const init = () => {
  isOtherLogin()
  inputBlurFn()
  $("#registerForm").validate()
}

const bind = () => {
  submiteFn()
  changeFileImg()
  submiteFormFn()
  backSubmit()
}

export default {
  init: init,
  bind: bind
}