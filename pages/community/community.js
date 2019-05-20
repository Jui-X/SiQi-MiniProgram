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
    moment_cover: [ {
        username: "",
        faceUrl: "",
        title: "",
        coverUrl: ""
      }, {
      username: "",
      faceUrl: "",
      title: "",
      coverUrl: ""
      },
    ]
  },
  //事件处理函数
  onLoad() {
    var that = this;
    var serverUrl = app.serverUrl;
    wx.request({
      url: serverUrl + '/moment/momentCover',
      method: "GET",
      success: res => {
        if(res.statusCode == 200) {
          // for (var i = 0; i < res.data.length; i++) {
          //   if (i % 2 == 0) {
          //     that.setData({
          //       moment1: res.data[i]
          //     })
          //   }
          //   else {
          //     that.setData({
          //       moment2:res.data[i]
          //     })
          //   }
          // }
          that.setData({
            moment_cover: res.data
          })
          console.log(res.data)
          console.log(that.data.moment_cover)
        }
      }
    })
  },
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
  postMoment() {
    wx.navigateTo({
      url: '../post/post',
    })
  } 
})
