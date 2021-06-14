Page({
    mixins: [require('../../mixin/themeChanged')],
    data: {
        array1: ['功能异常', '支付问题', '产品建议','其它'],
        value1: 0,
    },
    bindPicker1Change: function (e) {
        this.setData({
            value1: e.detail.value
        })
    }
});