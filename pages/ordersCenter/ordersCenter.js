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
    userInfo: "",
    ordersList: []
  },
  onLoad: function (options) {
    this.setData({
      navbarActiveIndex: options.index,
      userInfo:app.globalData.userInfo
    })
    this.getOrdersList()
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
  }
})