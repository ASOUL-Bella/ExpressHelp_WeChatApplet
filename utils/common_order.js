const app = getApp()

const getOrderDetails = function () {
  var that = this;
  wx.request({
    url: 'http://localhost:8080/express_help/order/' + that.data.orderId,
    method: 'GET',
    dataType: 'json',
    data: {
    },
    header: {
      'content-type': 'application/json' // 默认值
    },
    success(res) {
      that.setData({
        order: res.data,
        userName: app.globalData.userInfo.nickName
      })
    }
  })
}

const getOrdersList = function () {
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

module.exports = {
  getOrderDetails,
  getOrdersList
}
