//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    avatarUrl: './user-unlogin.png',
    userInfo: {},
    logged: false,
    takeSession: false,
    requestResult: '',


    universities: [{
        id: "uom",
        uni: "墨尔本大学",
        source: "../../uni_icon/uom.jpg",
        subjects_num: 356,
      },
      {
        id: "monash",
        uni: "莫纳什大学",
        source: "../../uni_icon/monash.jpg",
        subjects_num: 121,
      },
      {
        id: "rmit",
        uni: "RMIT",
        source: "../../uni_icon/rmit.jpg",
        subjects_num: 503,
      },
      {
        id: "deakin",
        uni: "Deakin",
        source: "../../uni_icon/deakin.jpg",
        subjects_num: 179,
      },
    ],

    background: [
      'https://images.unsplash.com/photo-1551446591-142875a901a1?w=640',
      'https://images.unsplash.com/photo-1551446591-142875a901a1?w=640',
      'https://images.unsplash.com/photo-1551446591-142875a901a1?w=640'
    ],
    indicatorDots: true,
    autoplay: true,
    circular: true,
    interval: 5000,
    duration: 1000,
    previousMargin: 0,
    nextMargin: 0
  },
  onLoad: function() {

    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              this.setData({
                avatarUrl: res.userInfo.avatarUrl,
                userInfo: res.userInfo,
                logged: true,
              })
            }
          })
        }
      }
    })

    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        console.log('[云函数] [login] user openid: ', res.result.openid)
        app.globalData.openid = res.result.openid
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
      }
    })
  },



  tapUni: function(event) {
    var name = event.currentTarget.dataset.name
    wx.navigateTo({
      url: '../subject_overall/subject_overall?uni_name='+name,
    })
  },
  onShareAppMessage: function (options) {
    if (options.from === 'button') {
      // 来自页面内转发按钮
      console.log(options.target)
    }
    return {
      title: '分享页面',
      desc: '各个大学课程的详细资料，快来看一看',
      success: function (res) {
        console.log("转发成功:");
      },
      fail: function (res) {
        console.log("转发失败:");
      }
    }
  },

})

