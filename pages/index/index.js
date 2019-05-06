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

  courseInfo(e) {
    wx.navigateTo({
      url: '../video-course/video-course',
    })
  },
  tutorialInfo(e) {
    wx.navigateTo({
      url: '../tutorial/tutorial',
    })
  }

})
