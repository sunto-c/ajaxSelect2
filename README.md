## 参数

### params [object]

> select2 配置内容

### isValid [Boolean] [default: false] 

> 是否开启change触发验证



## 使用

```js

require(['jquery', '/static/js/ajaxSelect2'], function($) {

  $('#shipId').select2({
    params: {
      language: 'it',
      ajax: {
        type: 'get'
      }
    },
    isValid: true // 开启change事件触发验证
  })
})

```