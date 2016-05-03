var $ = require('jquery');
var select2 = require('select2');
/**
 * ajax select2 封装
 * options.params [object] select2 配置内容
 * options.isValid [Boolean] [default: false] 是否开启change触发验证
 * demo: 
 * $('#shipId').select2({
 *   params: {
 *     language: 'it'
 *   },
 *   isValid: true
 * })
 */
$.fn.extend({
  'ajaxSelect2': function(options) {
    var self = $(this);

    function formatRepo(repo) {
      if (repo.loading) return repo.text;
      var name = repo.name;
      return '<div>' + name + '</div>'
    }

    function formatRepoSelection(repo) {
      return repo.name || repo.text;
    }

    var defaultParams = {
      language: 'zh-CN',
      placeholder: '请选择',
      allowClear: true,
      ajax: {
        url: '',
        dataType: 'json',
        type: 'get',
        delay: 250,
        data: function(params) {
          return {
            name: params.term, // search term
            currPage: params.currPage,
            page: params.page
          };
        },
        processResults: function(data, params) {
          params.currPage = params.page || 2;
          params.name = params.term
          return {
            results: data.data,
            pagination: {
              more: (params.currPage * 10) < data.totalRows
            }
          };
        },
        cache: true
      },
      escapeMarkup: function(markup) {
        return markup;
      },
      minimumInputLength: 0, // 几个字符开始搜索
      templateResult: formatRepo,
      templateSelection: formatRepoSelection
    }

    options = options ? options : {};

    // 深拷贝
    var params = $.extend(true, {}, defaultParams, options.params);

    if (!params.ajax.url) {
      throw '缺少ajax url';
    }
    // https://github.com/fex-team/fis3/issues/415
    // @require.async components/select2/i18n/az
    // @require.async components/select2/i18n/bg
    // @require.async components/select2/i18n/ca
    // @require.async components/select2/i18n/cs
    // @require.async components/select2/i18n/da
    // @require.async components/select2/i18n/de
    // @require.async components/select2/i18n/en
    // @require.async components/select2/i18n/es
    // @require.async components/select2/i18n/et
    // @require.async components/select2/i18n/eu
    // @require.async components/select2/i18n/fa
    // @require.async components/select2/i18n/fi
    // @require.async components/select2/i18n/fr
    // @require.async components/select2/i18n/gl
    // @require.async components/select2/i18n/hi
    // @require.async components/select2/i18n/hr
    // @require.async components/select2/i18n/hu
    // @require.async components/select2/i18n/id
    // @require.async components/select2/i18n/is
    // @require.async components/select2/i18n/it
    // @require.async components/select2/i18n/ko
    // @require.async components/select2/i18n/lt
    // @require.async components/select2/i18n/lv
    // @require.async components/select2/i18n/mk
    // @require.async components/select2/i18n/nb
    // @require.async components/select2/i18n/nl
    // @require.async components/select2/i18n/pl
    // @require.async components/select2/i18n/pt
    // @require.async components/select2/i18n/ro
    // @require.async components/select2/i18n/ru
    // @require.async components/select2/i18n/sk
    // @require.async components/select2/i18n/sr
    // @require.async components/select2/i18n/sv
    // @require.async components/select2/i18n/th
    // @require.async components/select2/i18n/tr
    // @require.async components/select2/i18n/uk
    // @require.async components/select2/i18n/vi
    // @require.async components/select2/i18n/zh-CN
    // @require.async components/select2/i18n/zh-TW

    // TODO 多语言请求失败时处理
    require(['components/select2/i18n/' + params.language], function (modValue) {
      self.select2(params);

      // 需要验证时，chang事件触发验证
      if (options.isValid) {
        self.on('change', function() {
          self.valid();
        })
      }
    });    
  }
})