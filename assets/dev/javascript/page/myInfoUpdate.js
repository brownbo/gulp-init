import apiCountry from '../api/country'
import registerApi from "../api/register";
let countryDataList = null

const initSelectData = () => {
  apiCountry.fetch().then((res) => {
    countryDataList = res.data
    selectListBind(res.data)
    const defCity = res.data.filter(item => item.countryId.toString() === $('#address').val())
    $('#x_select_input').val(defCity.length === 0 ? '' : defCity[0].country)
  })
  $('.x_textarea_length').text($('#userText').val().length)
}

const selectListBind = (list) => {
  let countryList = ''
  list.forEach((item) => {
    countryList += '<li data-id="'+ item.countryId+'">'+ item.country +'</li>'
  })
  $('.x_select_ul').empty()
  $('.x_select_ul').append(countryList)
  selectLiClick()
}

const toggleList = (isShow) => {
  if(isShow) {
    $(".x_select_ul").show().css('opacity', 1)
    $(".x_select_label").css('transform', 'rotate(270deg)')
  } else {
    $(".x_select_ul").hide().css('opacity', 0)
    $(".x_select_label").css('transform', 'rotate(90deg)')
  }
}

const selectChangeFn = () => {
  $('#x_select_input').on('input propertychange', function(e) {
    const val = $(this).val()
    const countryList = val === '' ? countryDataList : countryDataList.filter((item) => {
      return item.country.toLowerCase().indexOf(val.toLowerCase()) > -1
    })
    selectListBind(countryList)
  })
}

const selectEvent = () => {
  $('body').unbind()
  $('.x_select_ul li').unbind()
  $('#x_select_input').on('focus click', (e) => {
    e.stopPropagation()
    toggleList(true)
  })

  $('body').not('.x_select_wrap').on('click', (e) => {
    toggleList(false)
  })
}

const selectLiClick = () => {
  $('.x_select_ul li').on('click', function(e) {
    e.stopPropagation()
    const _self = $(this)
    $('#x_select_input').val(_self.text())
    $('#address').val(_self.data('id'))
    toggleList(false)
  })
}

const textareaChange = () => {
  $("#userText").on('input propertychange', function() {
    const len = $(this).val().length
    $('.x_textarea_length').text(len)
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

const init = () => {
  initSelectData()
  $("#updateInfoForm").validate({isFormSubmit: true})
}


const bind = () => {
  selectChangeFn()
  selectEvent()
  textareaChange()
  changeFileImg()
}

export default {
  init: init,
  bind: bind
}