//获取应用实例
const app = getApp()

Page({
  data: {
    faceUrl: app.getGlobalUserInfo().faceUrl,
    mode: 'scaleToFill',
    nickname: 'Juicc',
    follow: 12,
    fans: 11,
    favor:99
  },
  //事件处理函数
  updateUserInfo(e) {
    wx.navigateTo({
      url: '../user-info/user-info',
    })
  }
})
