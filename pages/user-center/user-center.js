//获取应用实例
const app = getApp()

Page({
  data: {
    nickname: '',
    faceUrl: "",
    mode: 'scaleToFill',
    follow: 12,
    fans: 11,
    favor: 99
  },
  //事件处理函数
  onLoad() {
    var that = this;
    const userInfo = app.getGlobalUserInfo()
    wx.checkSession({
      success() {
        that.setData({
          nickname: userInfo.nickName,
          faceUrl: userInfo.avatarUrl
        })
      },
      fail () {
        wx.navigateTo({
          url: '../login/login',
        })
      }
    })
  },
  updateUserInfo(e) {
    wx.navigateTo({
      url: '../user-info/user-info',
    })
  }
})
