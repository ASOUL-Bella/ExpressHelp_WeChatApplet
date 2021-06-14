// pages/mine/mine.js

const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUseGetUserProfile: false,
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName'),
    userInfo: {},
    hasUserInfo: false,
    ordersList: []
  },
  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    if (!app.globalData.hasUserInfo) {
      wx.getUserProfile({
        desc: '读取用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
        success: (res) => {
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
          app.globalData.userInfo = res.userInfo
          app.globalData.hasUserInfo = true
        }
      })
    } else {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: app.globalData.hasUserInfo
      })
    }
  },
  getOrderList(e) {
    var that = this;
    wx.request({
      url: 'http://localhost:8080/GraduationDesign/OrdersListServlet',
      method: 'get',
      dataType: 'json',
      data: {},
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        that.setData({
          ordersList: res.data
        })
      }
    })
  },
  onTabItemTap: function (e) {
    this.getUserProfile(e)
    this.getOrderList(e)
  }

})