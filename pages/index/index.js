//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),

    universities: [
      {
        id:"uom",
        uni:"墨尔本大学",
        source:"../../uni_icon/uom.jpg"
      },
      {
        id:"monash",
        uni: "莫纳什大学",
        source: "../../uni_icon/monash.jpg"
      },
      {
        id:"rmit",
        uni: "RMIT",
        source: "../../uni_icon/rmit.jpg"
      },
      {
        id:"deakin",
        uni: "Deakin",
        source: "../../uni_icon/deakin.jpg"
      },
      {
        id:"xxx",
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
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },

  tapUni:function(event){
    wx.navigateTo({
      url: '../uom/uom',
    })
  }
})
