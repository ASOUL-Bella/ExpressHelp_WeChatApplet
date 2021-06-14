// pages/mine/mine.js

const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUseGetUserProfile: false,
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName'), // 如需尝试获取用户信息可改为false
    wxuserInfo: "",
    myuserInfo: "",
    hasUserInfo: ""
  },

  getUserProfile(e) {
    var that = this
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    if (!app.globalData.hasUserInfo) {
      wx.getUserProfile({
        desc: '读取用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
        success: (res) => {
          that.setData({
            wxuserInfo: res.userInfo,
            hasUserInfo: true,
          })
          app.globalData.userInfo = res.userInfo
          app.globalData.hasUserInfo = true
          that.getUserInfo(e)
        }
      })
    } else {
      that.setData({
        wxuserInfo: app.globalData.userInfo,
        hasUserInfo: app.globalData.hasUserInfo
      })
      that.getUserInfo(e)
    }
  },
  getUserInfo(e) {
    var that = this;
    wx.request({
      url: 'http://localhost:8080/GraduationDesign/GetUserInfoServlet',
      data: {
        userName: that.data.wxuserInfo.nickName
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        if (!res.data) {
          that.addUser(e)
        } else {
          that.setData({
            myuserInfo: res.data,
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
        userName: that.data.wxuserInfo.nickName
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        that.setData({
          myuserInfo: res.data
        })
      }
    })
  },
  onTabItemTap: function (e) {
    this.getUserProfile(e)
  }
})