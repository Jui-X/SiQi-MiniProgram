//获取应用实例
const app = getApp()

Page({
  data: {
    faceUrl: "../resource/images/noneface.png",
    mode: 'scaleToFill',
    nickname: '橘子',
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
