const app = getApp()
const util = require('../../utils/util.js')

Page({
    mixins: [require('../../mixin/themeChanged')],
    data: {
        order: "",
        orderId: "",
        userName: "",
        fulfilTime: "",

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
                userName: app.globalData.userInfo.nickName
            }),
            this.getOrderDetails(options)

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
    getOrderDetails(e) {
        var that = this;
        wx.request({
            url: 'http://localhost:8080/GraduationDesign/OrderDetailsServlet',
            method: 'get',
            dataType: 'json',
            data: {
                orderId: that.data.orderId
            },
            header: {
                'content-type': 'application/json' // 默认值
            },
            success(res) {
                that.setData({
                    order: res.data
                })
            }
        })
    },
    takeOrder(e) {
        var that = this;
        wx.request({
            url: 'http://localhost:8080/GraduationDesign/TakeOrderServlet',
            method: 'get',
            dataType: 'json',
            data: {
                orderId: that.data.orderId,
                userName: that.data.userName
            },
            header: {
                'content-type': 'application/json' // 默认值
            },
            success(res) {
                that.setData({
                    order: res.data
                })
            }
        })
        that.openToast1()
    },
    cancelOrder(e) {
        var that = this;
        wx.request({
            url: 'http://localhost:8080/GraduationDesign/CancelOrderServlet',
            method: 'get',
            dataType: 'json',
            data: {
                orderId: that.data.orderId
            },
            header: {
                'content-type': 'application/json' // 默认值
            },
            success(res) {
                that.setData({
                    order: res.data
                })
            }
        })
        that.openToast4()
    },
    confirmOrder(e) {
        var that = this;
        wx.request({
            url: 'http://localhost:8080/GraduationDesign/ConfirmOrderServlet',
            method: 'get',
            dataType: 'json',
            data: {
                orderId: that.data.orderId,
                userName: that.data.order.employeeName,
                orderFulfilTime: util.formatTime(new Date()),
            },
            header: {
                'content-type': 'application/json' // 默认值
            },
            success(res) {
                that.setData({
                    order: res.data
                })
            }
        })
        that.openToast2()
    },
    payOrder(e) {
        var that = this;
        wx.request({
            url: 'http://localhost:8080/GraduationDesign/PayOrderServlet',
            method: 'get',
            dataType: 'json',
            data: {
                orderId: that.data.orderId
            },
            header: {
                'content-type': 'application/json' // 默认值
            },
            success(res) {
                that.setData({
                    order: res.data
                })
            }
        })
        that.openToast3()
    },
    evaluateOrder(e) {
        var that = this;
        wx.navigateTo({
            url: '/pages/orderEvaluation/orderEvaluation?orderId=' + that.data.orderId,
            success: function (res) {}
        })
    },
    userTap(e) {
        var that = this;
        wx.navigateTo({
            url: '/pages/myinfo/myinfo?userName=' + e.currentTarget.dataset.username + '&openType=readonly',
            success: function (res) {}
        })
    }
});