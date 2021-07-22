
const app = getApp()
const util = require('../../utils/util.js')
const common = require('../../utils/common_order.js')

Page({
    mixins: [require('../../mixin/themeChanged')],
    data: {
        order: "",
        orderId: "",
        fulfilTime: null,
        userName: "",
        toast1: false,
        hideToast1: false,
        toast2: false,
        hideToast2: false,
        toast3: false,
        hideToast3: false,
        toast4: false,
        hideToast4: false
    },
    onLoad: function (options) {
        this.setData({
            orderId: options.orderId,
        }),
            this.getOrderDetails()

    },
    openToast1: function () {
        this.setData({
            toast1: true
        });
        setTimeout(() => {
            this.setData({
                hideToast1: true
            });
            setTimeout(() => {
                this.setData({
                    toast1: false,
                    hideToast1: false,
                });
            }, 300);
        }, 3000);
    },
    openToast2: function () {
        this.setData({
            toast2: true
        });
        setTimeout(() => {
            this.setData({
                hideToast2: true
            });
            setTimeout(() => {
                this.setData({
                    toast2: false,
                    hideToast2: false,
                });
            }, 300);
        }, 3000);
    },
    openToast3: function () {
        this.setData({
            toast3: true
        });
        setTimeout(() => {
            this.setData({
                hideToast3: true
            });
            setTimeout(() => {
                this.setData({
                    toast3: false,
                    hideToast3: false,
                });
            }, 300);
        }, 3000);
    },
    openToast4: function () {
        this.setData({
            toast4: true
        });
        setTimeout(() => {
            this.setData({
                hideToast4: true
            });
            setTimeout(() => {
                this.setData({
                    toast4: false,
                    hideToast4: false,
                });
            }, 300);
        }, 3000);
    },
    getOrderDetails() {
        var that = this;
        wx.request({
            url: 'http://localhost:8080/express_help/order/' + that.data.orderId,
            method: 'GET',
            dataType: 'json',
            data: {
            },
            header: {
                'content-type': 'application/json' // 默认值
            },
            success(res) {
                that.setData({
                    order: res.data,
                    userName: app.globalData.userInfo.nickName
                })
            }
        })
    },
    takeOrder(e) {
        var that = this;
        wx.request({
            url: 'http://localhost:8080/express_help/order/' + that.data.orderId,
            method: 'PUT',
            dataType: 'json',
            data: {
                id: that.data.order.id,
                customerName: that.data.order.customerName,
                expressType: that.data.order.expressType,
                expressWeight: that.data.order.expressWeight,
                pickupAddress: that.data.order.pickupAddress,
                receAddress: that.data.order.receAddress,
                pickupInfo: that.data.order.pickupInfo,
                releaseTime: that.data.order.releaseTime,
                limitTime: that.data.order.limitTime,
                amount: that.data.order.amount,
                remarks: that.data.order.remarks,
                status: "代送达",
                employeeName: that.data.userName,
                fulfilTime: that.data.order.fulfilTime
            },
            header: {
                'content-type': 'application/json' // 默认值
            },
            success(res) {
                that.setData({
                    order: res.data
                })
                that.getOrderDetails()
            }
        })
        that.openToast1()
    },
    cancelOrder(e) {
        var that = this;
        wx.request({
            url: 'http://localhost:8080/express_help/order/' + that.data.orderId,
            method: 'PUT',
            dataType: 'json',
            data: {
                id: that.data.order.id,
                customerName: that.data.order.customerName,
                expressType: that.data.order.expressType,
                expressWeight: that.data.order.expressWeight,
                pickupAddress: that.data.order.pickupAddress,
                receAddress: that.data.order.receAddress,
                pickupInfo: that.data.order.pickupInfo,
                releaseTime: that.data.order.releaseTime,
                limitTime: that.data.order.limitTime,
                amount: that.data.order.amount,
                remarks: that.data.order.remarks,
                status: "已取消",
                employeeName: that.data.userName,
                fulfilTime: that.data.order.fulfilTime
            },
            header: {
                'content-type': 'application/json' // 默认值
            },
            success(res) {
                that.setData({
                    order: res.data
                })
                that.getOrderDetails()
            }
        })
        that.openToast4()
    },
    confirmOrder(e) {
        var that = this;
        wx.request({
            url: 'http://localhost:8080/express_help/order/' + that.data.orderId,
            method: 'PUT',
            dataType: 'json',
            data: {
                id: that.data.order.id,
                customerName: that.data.order.customerName,
                expressType: that.data.order.expressType,
                expressWeight: that.data.order.expressWeight,
                pickupAddress: that.data.order.pickupAddress,
                receAddress: that.data.order.receAddress,
                pickupInfo: that.data.order.pickupInfo,
                releaseTime: that.data.order.releaseTime,
                limitTime: that.data.order.limitTime,
                amount: that.data.order.amount,
                remarks: that.data.order.remarks,
                status: "待支付",
                employeeName: that.data.userName,
                fulfilTime: that.data.order.fulfilTime
            },
            header: {
                'content-type': 'application/json' // 默认值
            },
            success(res) {
                that.setData({
                    order: res.data
                })
                that.getOrderDetails()
            }
        })
        that.openToast2()
    },
    payOrder(e) {
        var that = this;
        wx.request({
            url: 'http://localhost:8080/express_help/order/' + that.data.orderId,
            method: 'PUT',
            dataType: 'json',
            data: {
                id: that.data.order.id,
                customerName: that.data.order.customerName,
                expressType: that.data.order.expressType,
                expressWeight: that.data.order.expressWeight,
                pickupAddress: that.data.order.pickupAddress,
                receAddress: that.data.order.receAddress,
                pickupInfo: that.data.order.pickupInfo,
                releaseTime: that.data.order.releaseTime,
                limitTime: that.data.order.limitTime,
                amount: that.data.order.amount,
                remarks: that.data.order.remarks,
                status: "已完成",
                employeeName: that.data.userName,
                fulfilTime: that.data.order.fulfilTime
            },
            header: {
                'content-type': 'application/json' // 默认值
            },
            success(res) {
                that.setData({
                    order: res.data
                })
                that.getOrderDetails()
            }
        })
        that.openToast3()
    },
    evaluateOrder(e) {
        var that = this;
        wx.navigateTo({
            url: '/pages/orderEvaluation/orderEvaluation?orderId=' + that.data.order.id,
            success: function (res) { }
        })
    },
    userTap(e) {
        var that = this;
        wx.navigateTo({
            url: '/pages/myinfo/myinfo?userName=' + e.currentTarget.dataset.username + '&openType=readonly',
            success: function (res) { }
        })
    }
});