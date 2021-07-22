// index.js
// 获取应用实例
const app = getApp()
const common = require('../../utils/common_user.js')

Page({
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUseGetUserProfile: false,
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName') // 如需尝试获取用户信息可改为false
  },
  onLoad: function (options){
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
  },
  getUserProfile() {
    common.getUserProfile()
  }
})