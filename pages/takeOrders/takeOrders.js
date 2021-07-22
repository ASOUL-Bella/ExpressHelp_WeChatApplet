// pages/mine/mine.js

const app = getApp()
const common_user = require('../../utils/common_user.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUseGetUserProfile: false,
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName'),
    userInfo: null,
    ordersList: []
  },
  getOrdersList() {
    var that = this;
    wx.request({
      url: 'http://localhost:8080/express_help/order/all',
      method: 'get',
      dataType: 'json',
      data: {},
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        that.setData({
          ordersList: res.data.rows
        })
      }
    })
  },
  onTabItemTap: function () {
    common_user.getUserProfile()
    this.getOrdersList()
  }

})