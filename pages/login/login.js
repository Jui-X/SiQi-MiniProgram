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
    if (app.getGlobalUserInfo()) {
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
    var serverUrl = app.serverUrl

    wx.login({
      success: function (res) {
        console.log(res)
        // 获取登录的临时凭证
        var code = res.code;

        wx.showLoading({
          title: '正在授权，请稍等...',
        });

        // 调用后端，获取微信的session_key, secret
        wx.request({
          url: serverUrl + '/wxLogin',
          data: {
            code: code
          },
          method: "POST",
          success: function(res) {
            console.log(res);
            wx.hideLoading();
            if (res.data.status == 200) {
              wx.getUserInfo({
                success(res) {
                  const userInfo = res.userInfo
                  
                  // user.nickName = userInfo.nickName
                  // user.avatarUrl = userInfo.avatarUrl

                  app.setGlobalUserInfo(res.userInfo)
                  console.log(app.getGlobalUserInfo())
                }
              })
              // app.setGlobalUserInfo(res.data.data)

              wx.navigateBack({ })
            } 
            else if (res.data.status == 500) {
              wx.showToast({
                title: res.data.msg,
                icon: 'none',
                duration: 3000
              })
            }
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
