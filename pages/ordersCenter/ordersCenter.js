const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    navbarActiveIndex: 0,
    navbarTitle: [
      "全部",
      "待支付",
      "待接取",
      "待送达",
      "已完成",
      "已取消"
    ],
    userInfo: {},
    hasUserInfo: false,
    ordersList: []
  },
  onLoad: function (options) {
    this.setData({
      navbarActiveIndex: options.index
    })
    this.getUserProfile(options)
    this.getOrderList(options)
  },

  /**
   * 点击导航栏
   */
  onNavBarTap: function (event) {
    // 获取点击的navbar的index
    let navbarTapIndex = event.currentTarget.dataset.navbarIndex
    // 设置data属性中的navbarActiveIndex为当前点击的navbar
    this.setData({
      navbarActiveIndex: navbarTapIndex
    })
  },

  /**
   *
   */
  onBindAnimationFinish: function ({
    detail
  }) {
    // 设置data属性中的navbarActiveIndex为当前点击的navbar
    this.setData({
      navbarActiveIndex: detail.current
    })
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
  }
})