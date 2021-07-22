// app.js

App({
    onLaunch() {
        // 展示本地存储能力
        const logs = wx.getStorageSync("logs") || [];
        logs.unshift(Date.now());
        wx.setStorageSync("logs", logs);

        // 登录
        wx.login({
            success: (res) => {
                // 发送 res.code 到后台换取 openId, sessionKey, unionId
                wx.request({
                    url: 'https://api.weixin.qq.com/sns/jscode2session',
                    data: {
                        appid: "wx87e91249f0bfc059",
                        secret: "d8ccb3fe1b169deb8cb896517f1b655a",
                        js_code: res.code,
                        grant_type: "authorization_code"
                    },
                    header: {
                        'content-type': 'application/json' // 默认值
                    },
                    method: "GET",
                    success(res) {
                        wx.setStorageSync(//将得到的openid存储到缓存里面方便后面调用
                            "openid",
                            res.data.openid
                        )
                    }
                })
            },
        });
    },
    globalData: {
        userProfile: "",
        hasUserProfile: false,
        userInfo: "",
        hasUserInfo: false,
        openid: null
    },
});
