const app = getApp()

Page({
    mixins: [require('../../mixin/themeChanged')],
    data: {
        userInfo: {
            userId: "17032428",
            userType: "客户",
            userName: "老男孩",
            name: "张三",
            phoneNum: "13777839828",
            points: "66",
            creditScore: "100"
        },
        userName: "",
        openType: "",
        temp: ""
    },
    onLoad: function (options) {
        this.data.userName = options.userName
        this.data.temp = options.openType
        if (!this.data.userName) {
            this.data.userName = app.globalData.userInfo.nickName
        }
        this.getUserInfo(options)
    },
    onShow: function () {
        this.setData({
            openType: this.data.temp
        })
    },
    getUserInfo(e) {
        var that = this;
        wx.request({
            url: 'http://localhost:8080/GraduationDesign/GetUserInfoServlet',
            data: {
                userName: that.data.userName
            },
            header: {
                'content-type': 'application/json' // 默认值
            },
            success(res) {
                if (!res.data) {
                    that.addUser(e)
                } else {
                    that.setData({
                        userInfo: res.data,
                    })
                }
            }
        })
    },
    addUser(e) {
        var that = this;
        wx.request({
            url: 'http://localhost:8080/GraduationDesign/AddUserServlet',
            data: {
                userName: app.globalData.userInfo.nickName,
            },
            header: {
                'content-type': 'application/json' // 默认值
            },
            success(res) {
                that.setData({
                    userInfo: res.data
                })
            }
        })
    },
    updateUserInfo(e) {
        var that = this;
        wx.request({
            url: 'http://localhost:8080/GraduationDesign/UpdateUserInfoServlet',
            data: {
                userId: e.detail.value.userId,
                userType: e.detail.value.userType,
                userName: app.globalData.userInfo.nickName,
                name: e.detail.value.name,
                phoneNum: e.detail.value.phoneNum,
                points: e.detail.value.points
            },
            header: {
                'content-type': 'application/json' // 默认值
            },
            success(res) {
                that.setData({
                    userInfo: res.data
                })
            }
        })
        that.openToast()
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
    }
});