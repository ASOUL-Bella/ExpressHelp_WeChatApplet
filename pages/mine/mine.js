// pages/mine/mine.js

const app = getApp()
const common = require('../../utils/common_user.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUseGetUserProfile: false,
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName'), // 如需尝试获取用户信息可改为false
    userProfile: app.globalData.userProfile,
    userInfo: app.globalData.userInfo,
  },
  onShow:function(){
    this.setData({
      userProfile: app.globalData.userProfile,
      userInfo: app.globalData.userInfo
    })
  },
  onTabItemTap: function () {
    common.getUserProfile() 
  }
})