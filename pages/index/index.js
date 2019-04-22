//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    indicatorDots: true,
    vertical: false,
    autoplay: false,
    interval: 3000,
    duration: 1000,
    currentTab: 0,

  },
  search(e) {
    wx.navigateTo({
      url: '../search/search',
    })
  } 
})
