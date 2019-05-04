//获取应用实例
const app = getApp()

Page({
  data: {
    faceUrl: '../resource/images/noneface.png',
    mode: 'scaleToFill',
    focus: true,
    nickname: "橘子",
  },
  //事件处理函数
  changeFace(e) {
    var that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album'],
      success: function (res) {
        var tempFilePaths = res.tempFilePaths;
        console.log(tempFilePaths);

        wx.showLoading({
          title: '上传中...',
        })
        var serverUrl = app.serverUrl;
        // fixme 修改原有的全局对象为本地缓存
        var userInfo = app.getGlobalUserInfo();

        wx.uploadFile({
          url: serverUrl + '/user/uploadFace?userID=1001',
          filePath: tempFilePaths[0],
          name: 'file',
          header: {
            'content-type': 'application/json', // 默认值
            'headerUserId': userInfo.id,
            'headerUserToken': userInfo.userToken
          },
          success: function (res) {
            var data = JSON.parse(res.data);
            console.log(data);
            wx.hideLoading();
            if (data.status == 200) {
              wx.showToast({
                title: '上传成功!~~',
                icon: "success"
              });

              var imageUrl = data.data;
              that.setData({
                faceUrl: serverUrl + imageUrl
              });
              app.setGlobalUserInfo(userInfo.faceUrl);

            } else if (data.status == 500) {
              wx.showToast({
                title: data.msg
              });
            } else if (res.data.status == 502) {
              wx.showToast({
                title: res.data.msg,
                duration: 2000,
                icon: "none",
                success: function () {
                  wx.redirectTo({
                    url: '../user-info/user-info',
                  })
                }
              });

            }

          }
        })

      }
    })
  }
})
