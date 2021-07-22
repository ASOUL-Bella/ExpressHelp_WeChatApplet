const app = getApp()
const common = require('../../utils/common_user.js')

Page({
    mixins: [require('../../mixin/themeChanged')],
    data: {
        userInfo: null,
        openType: "",
        temp: ""
    },
    onLoad: function (options) {
        this.setData({
            userInfo:app.globalData.userInfo,
            openType: options.openType
        })
    },
    updateUserInfo(e) {
        var that = this;
        wx.request({
            url: 'http://localhost:8080/express_help/user/' + app.globalData.openid,
            method: "PUT",
            data: {
                id:app.globalData.openid,
                stuNum:e.detail.value.stuNum,
                type: e.detail.value.type,
                nickName: e.detail.value.nickName,
                name: e.detail.value.name,
                phone: e.detail.value.phone,
                points: e.detail.value.points,
                creditPoints:e.detail.value.creditPoints
            },
            header: {
                'content-type': 'application/json' // 默认值
            },
            success(res) {
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