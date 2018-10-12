/*!
* validate.js 1.0.0
*
* coy coding for to validate
*/
(function($) {
  $.fn.validate = function(options, callback) {
    //self form obj
    var root = this;
    if(!root[0]) return false;
    var formId = root[0].id;
    var zflas = [];
    var defaults = {
      //obj
      validateRow: '.form_wrap',
      error_class: 'error_wrap',
      required: {
        message: options && options.message ? options.message.notNull : '必須項目です。必ずご入力ください。'
      },
      imgRequired: {
        message: options && options.message ? options.message.notNullImg : '写真サイズ：縦***横***サイズは2M以内'
      },
      compare: {
        message: options && options.message ? options.message.notSomePw : 'パスワードが不一致です'
      },
      length: {
        message: options && options.message ? options.message.minNumPw : '大文字と小文字を分けて、8-20桁の数字と英字、或は符号からなります'
      },
      //regexp
      email: {
        parent: /^[\.a-zA-Z0-9＼_＼-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
        message: options && options.message ? options.message.email : 'メールアドレスは@を含む，正しい書式で入力してください。'
      },
      password: {
        parent: /^[a-zA-Z0-9]{8,20}$/,
        message: options && options.message ? options.message.minNumPw : '大文字と小文字を分けて、8-20桁の数字と英字、或は符号からなります'
      }
    };
    if(options) {
      defaults = $.extend(defaults, options);
    }
    $("#" + formId + " [check]").parents(defaults.validateRow).each(function(){ zflas.push(true)});
    //validate status show
    var validateStatus = function (obj, status, message) {
      var validateRowDom = obj.parents(defaults.validateRow);
      if(!status) {
        validateRowDom.addClass(defaults.error_class).find('.error_text').text('※'+ message);
      } else {
        validateRowDom.removeClass(defaults.error_class);
      }
      return status;
    }
    //validate function
    var checkVali = function(obj,str_info){
      switch(str_info){
        case "minlength":
          return obj.val().length < Number(obj.attr("minlength")) ? validateStatus(obj, false, defaults.length.message) : validateStatus(obj, true);
          break;
        case "maxlength":
          return obj.val().length > Number(obj.attr("maxlength")) ? validateStatus(obj, false, defaults.length.message) : validateStatus(obj, true);
          break;
        case "email":
          return !defaults.email.parent.test(obj.val()) ? validateStatus(obj, false, defaults.email.message) : validateStatus(obj, true);
          break;
        case "password":
          return !defaults.password.parent.test(obj.val()) ? validateStatus(obj, false, defaults.password.message) : validateStatus(obj, true);
          break;
        case "compare":
          return obj.val() != obj.parents(defaults.validateRow).find('input').not(obj).val() ? validateStatus(obj, false, defaults.compare.message) : validateStatus(obj, true);
          break;
        case "imgRequired":
          return obj.val() == "" ? validateStatus(obj, false, defaults.imgRequired.message) : validateStatus(obj, true);
          break;
        case "required":
          return obj.val().trim() == "" ? validateStatus(obj, false, defaults.required.message) : validateStatus(obj, true);
          break;
        default:
          return false;
      }
    };
    //loop take check
    var loopCheck = function(obj) {
      var checkStatus = false;
      var arr = obj.attr("check").split(" ");
      if(obj.attr("minlength") && !checkVali(obj, "minlength")) {
        checkStatus = checkVali(obj, "minlength");
        return checkStatus;
      }
      if(obj.attr("maxlength") && !checkVali(obj, "maxlength")) {
        checkStatus = checkVali(obj, "maxlength");
        return checkStatus;
      }
      for(var x=0;x<arr.length;x++){
        checkStatus = checkVali(obj, arr[x]);
        if(!checkStatus){
          break;
        }
      }
      return checkStatus;
    }
    //submit validate
    var _submiteVali = function() {
      $("#" + formId + " [check]").each(function(){
        var _self = $(this), index = _self.parents(defaults.validateRow).index(defaults.validateRow);
        if(_self.attr("check")) {
          if(_self.attr("check").indexOf('required') === -1 && _self.val() === '') {
            zflas[index] = true
          } else {
            zflas[index] = loopCheck(_self);
          }
        }
      });
    };
    var isValidate = function() {
      return zflas.every(function(item){ return item});
    };
    //submit button style
    var buttonChange = function (className, isDisabled) {
      if(isDisabled){
        $('#' + formId + ' .' + className).children().addClass('disabled');
      } else {
        $('#' + formId + ' .' + className).children().removeClass('disabled');
      }
    }
    if(defaults.validateForm){
      _submiteVali();
      return callback && callback(isValidate());
    } else {
      $("#" + formId + " [check]").each(function(){
        var _self = $(this), index = _self.parents(defaults.validateRow).index(defaults.validateRow);
        _self.on("blur", function(){
          zflas[index] = loopCheck(_self);
          if(defaults.isSubmitStyle) {
            if(!isValidate()) {
              buttonChange(defaults.submitClass, true);
            } else {
              buttonChange(defaults.submitClass, false);
            }
          }
        });
      });

      if(root.is("form") && defaults.isFormSubmit) {
        root.submit(function (e) {
          e.stopPropagation();
          //submit validate before
          _submiteVali();
          return isValidate();
        })
      }
    }
  }
})(jQuery)