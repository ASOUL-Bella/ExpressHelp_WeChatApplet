const app = getApp()

const getUserProfile = function () {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    var that = this
    if (!app.globalData.hasUserProfile) {
        wx.getUserProfile({
            desc: '读取用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
            success: (res) => {
                app.globalData.userProfile = res.userInfo
                app.globalData.hasUserProfile = true
                app.globalData.openid = wx.getStorageSync('openid')
                that.getUserInfo()
            }
        })
    } else if(!app.globalData.hasUserInfo){
        that.getUserInfo()
    }

}

const getUserInfo = function () {
    var that = this
    if (!app.globalData.hasUserInfo) {
        wx.request({
            url: 'http://localhost:8080/express_help/user/' + app.globalData.openid,
            method: "GET",
            data: {
            },
            header: {
                'content-type': 'application/json' // 默认值
            },
            success(res) {
                if (!res.data) {
                    that.createUser()
                    that.getUserInfo()
                } else {
                    app.globalData.userInfo = res.data
                    app.globalData.hasUserInfo = true
                }
            }
        })
    }
}

const createUser = function () {
    var that = this
    wx.request({
        url: 'http://localhost:8080/express_help/user',
        method: "POST",
        data: {
            id: app.globalData.openid,
            type: "客户",
            nickName: app.globalData.userProfile.nickName,
            points: 0,
            creditPoints: 100
        },
        header: {
            'content-type': 'application/json' // 默认值
        },
        success(res) {

        }
    })
}

module.exports = {
    getUserProfile,
    getUserInfo,
    createUser
}
