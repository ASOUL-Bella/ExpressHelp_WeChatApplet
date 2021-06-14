const app = getApp()
const util = require('../../utils/util.js')

Page({
    mixins: [require('../../mixin/themeChanged')],
    data: {
        array1: ['文件证件', '手机数码', '办公居家', '生活日用', '蛋糕', '鲜花', '生鲜果蔬', '其他'],
        array2: ['小于1kg', '1~5kg', '5~10kg', '大于10kg'],
        value1: 0,
        value2: 0,
        toast: false,
        hideToast: false
    },
    openToast: function () {
        this.setData({
            toast: true
        });
        setTimeout(() => {
            this.setData({
                hideToast: true
            });
            setTimeout(() => {
                this.setData({
                    toast: false,
                    hideToast: false,
                });
            }, 300);
        }, 3000);
    },
    bindPicker1Change(e) {
        this.setData({
            value1: e.detail.value
        })
    },
    bindPicker2Change(e) {
        this.setData({
            value2: e.detail.value
        })
    },
    orderSubmit(e) {
        var that = this;
        wx.request({
            url: 'http://localhost:8080/GraduationDesign/ReleaseOrdersServlet',
            data: {
                userName: app.globalData.userInfo.nickName,
                edType: e.detail.value.edType,
                edWeight: e.detail.value.edWeight,
                pickupAdd: e.detail.value.pickupAdd,
                receAdd: e.detail.value.receAdd,
                pickupInfo: e.detail.value.pickupInfo,
                orderReleaseTime: util.formatTime(new Date()),
                orderLimitTime: e.detail.value.orderLimitTime,
                orderAmount: e.detail.value.orderAmount,
                remarks: e.detail.value.remarks,
            },
            header: {
                'content-type': 'application/json' // 默认值
            },
            success(res) {}
        })
        that.openToast()
    }
});