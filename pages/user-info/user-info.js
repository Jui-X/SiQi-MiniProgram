//获取应用实例
const app = getApp()

Page({
  data: {
    nickname: "",
    faceUrl: '',
    mode: 'scaleToFill',
    focus: true,
  },
  //事件处理函数
  onLoad() {
    var that = this;
    const userInfo = app.getGlobalUserInfo()
    wx.checkSession({
      success() {
        that.setData({
          nickname: userInfo.nickName,
          faceUrl: userInfo.avatarUrl,
          country: userInfo.country,
          province: userInfo.province,
          city: userInfo.city
        })
      },
      fail() {
        wx.navigateTo({
          url: '../login/login',
        })
      }
    })
  },
  changeFace(e) {
    var that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album'],
      success: function (res) {
        var tempFilePaths = res.tempFilePaths;
        console.log(tempFilePaths);

        wx.showToast({
          title: '不允许修改头像！',
          icon: "none",
        })

        // wx.showLoading({
        //   title: '上传中...',
        // })
        // var serverUrl = app.serverUrl;
        // // fixme 修改原有的全局对象为本地缓存
        // var userInfo = app.getGlobalUserInfo();

        // wx.uploadFile({
        //   url: serverUrl + '/user/uploadFace?userID=1001',
        //   filePath: tempFilePaths[0],
        //   name: 'file',
        //   header: {
        //     'content-type': 'application/json', // 默认值
        //   },
        //   success: function (res) {
        //     var data = JSON.parse(res.data);
        //     console.log(data);
        //     wx.hideLoading();
        //     if (data.status == 200) {
        //       wx.showToast({
        //         title: '上传成功!~~',
        //         icon: "success"
        //       });

        //       var imageUrl = data.data;
        //       that.setData({
        //         faceUrl: serverUrl + imageUrl
        //       });
        //       app.setGlobalUserInfo(userInfo.faceUrl);

        //     } else if (data.status == 500) {
        //       wx.showToast({
        //         title: data.msg
        //       });
        //     } else if (res.data.status == 502) {
        //       wx.showToast({
        //         title: res.data.msg,
        //         duration: 2000,
        //         icon: "none",
        //         success: function () {
        //           wx.redirectTo({
        //             url: '../user-info/user-info',
        //           })
        //         }
        //       });

        //     }

        //   }
        // })

      }
    })
  }
})
