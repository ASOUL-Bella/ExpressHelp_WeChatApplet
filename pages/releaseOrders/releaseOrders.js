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
            url: 'http://localhost:8080/express_help/order',
            method: "POST",
            data: {
                customerName: app.globalData.userInfo.nickName,
                expressType: e.detail.value.expressType,
                expressWeight: e.detail.value.expressWeight,
                pickupAddress: e.detail.value.pickupAddress,
                receAddress: e.detail.value.receAddress,
                pickupInfo: e.detail.value.pickupInfo,
                releaseTime: Date.now(),
                limitTime: e.detail.value.limitTime,
                amount: e.detail.value.amount,
                remarks: e.detail.value.remarks,
                status: "待接取",
                employeeName: "暂无",
                fulfilTime: null
            },
            header: {
                'content-type': 'application/json' // 默认值
            },
            success(res) { }
        })
        that.openToast()
    }
});