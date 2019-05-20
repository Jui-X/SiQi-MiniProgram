//获取应用实例
const app = getApp();
const username = app.globalData.username;

Page({
  data: {
    count: 1,

    title: "",
    moment: "",
    imgList: [],
    result: []
  },
  
  post(e) {
    var that = this;
    var serverUrl = app.serverUrl;
    var title = e.detail.value.title;
    var moment = e.detail.value.moment;
    console.log(that.data.imgList)
    console.log(that.data.imgList[0])

    wx.showToast({
      title: '发送成功~',
      duration: 2000,
    })

    wx.navigateBack({
      
    })

    // wx.uploadFile({
    //   url: serverUrl + '/moment/post',
    //   formData: {
    //     username: app.getGlobalUserInfo().nickName,
    //     faceUrl: app.getGlobalUserInfo().avatarUrl,
    //     title: title,
    //     content: moment,
    //   },
    //   filePath: that.data.imgList[0],
    //   name: 'imgFile',
    //   header: {
    //     'content-type': 'application/json', // 默认值
    //   },
    // })
  },

  previewImage(e) {
    const imgList = this.data.imgList
    var idx = e.currentTarget.id
    wx.previewImage({
      current: imgList[idx],
      urls: imgList,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },

  chooseImage(e) {
    var that = this
    wx.chooseImage({
      count: 5,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        that.setData({
          imgList: res.tempFilePaths
        })
      },
      fail: function (res) { },
      complete: function (res) { },
    })
  },

  cancel() {
    wx.navigateBack({})
  }
})
