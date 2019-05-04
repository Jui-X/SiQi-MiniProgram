//获取应用实例
const app = getApp();
const username = app.globalData.username;

Page({
  data: {
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    interval: 3000,
    duration: 1000,
    currentTab: 0,
    moment: [{
      username: "",
      faceUrl: "",
      moment: "",
      imageUrl: ""
    }]
  },
  //事件处理函数
  changeTab(e) {
    const that = this;
    that.setData({
      currentTab: e.detail.current
    })
  },
  checkCurrentTab(e) {
    const that = this;
    if (that.data.checkCurrentTab == e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  },
  teamRecruit(e) {
    wx.navigateTo({
      url: '../team-recruit/team-recruit',
    })
  },
  teamInfo(e) {
    wx.navigateTo({
      url: '../team-info/team-info',
    })
  }
})
