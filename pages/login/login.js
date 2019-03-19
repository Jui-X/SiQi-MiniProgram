//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e.detail.userInfo)
    console.log(e.detail.rawData)

    wx.login({
      success: function (res) {
        console.log(res)
        // 获取登录的临时凭证
        var code = res.code;
        // 调用后端，获取微信的session_key, secret
        wx.request({
          url: 'http://127.0.0.1:8081/wxLogin',
          data: {
            code: code
          },
          method: "POST",
          success: function(result) {
            console.log(result);
            // wx.redirectTo({
            //   url: '../index/index',
            //   success: function(res) {},
            //   fail: function(res) {},
            //   complete: function(res) {},
            // })
          }
        })
      }
    })

    app.globalData.userInfo = e.detail.userInfo
    // 保存用户信息到本地缓存，可以用作小程序端的拦截器
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
