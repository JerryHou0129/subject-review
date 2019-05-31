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
        source: "../../uni_icon/uom.jpg"
      },
      {
        id: "monash",
        uni: "莫纳什大学",
        source: "../../uni_icon/monash.jpg"
      },
      {
        id: "rmit",
        uni: "RMIT",
        source: "../../uni_icon/rmit.jpg"
      },
      {
        id: "deakin",
        uni: "Deakin",
        source: "../../uni_icon/deakin.jpg"
      },
      {
        id: "xxx",
        uni: "xxxxxxxx",
        source: "../../uni_icon/uom.jpg"
      }
    ],

    background: [
      '../../images/logo2.jpeg',
      'https://images.unsplash.com/photo-1551446591-142875a901a1?w=640',
      '../../images/logo_blue.jpeg'
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
    wx.navigateTo({
      url: '../uom/uom',
    })
  }
})