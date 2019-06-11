//index.js
//获取应用实例
const app = getApp()
const db = wx.cloud.database()
Page({
  data: {
    title: '极客教育',
    barBg: '#f8f8f8', //#ff6600
    color: '#000000', //#ffffff
    avatarUrl: './user-unlogin.png',
    userInfo: {},
    logged: false,
    takeSession: false,
    requestResult: '',


    universities: [{
        id: "UoM",
        uni: "墨尔本大学",
        source: "../../uni_icon/uom.jpg",
        subjects_num: 356,
      },
      {
        id: "Monash",
        uni: "莫纳什大学",
        source: "../../uni_icon/monash.jpg",
        subjects_num: 121,
      },
      {
        id: "RMIT",
        uni: "RMIT",
        source: "../../uni_icon/rmit.jpg",
        subjects_num: 503,
      },
      {
        id: "Deakin",
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
    //wx.clearStorageSync()
    
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              console.log(res.userInfo)
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
          wx.cloud.callFunction({
            name: 'update_fav',
            data: {
              openid: app.globalData.openid,
            },
            success: function(res) {
              var storage = wx.getStorageSync('fav')
              if (storage) {
                app.globalData.fav_subjects = storage
                console.log("有缓存")
                console.log(app.globalData.fav_subjects)
              } else {
                console.log("没有缓存")
     

                var temp_name
                var temp_code
                var temp_data
                var i
                for (var each of res.result.favs.data) {
                  temp_name = each.uni_name
                  temp_code = each.code
                  temp_data = require('../../data/' + temp_name + '_data.js')
                  app.globalData.fav_subjects[temp_code] = temp_data.subjects[temp_code]
                  app.globalData.fav_subjects[temp_code]['is_fav'] = true
                  db.collection(temp_name).doc(temp_code).get().then(res =>{
                    app.globalData.fav_subjects[temp_code]['difficulty'] = res.data.difficulty
                    app.globalData.fav_subjects[temp_code]['satisfaction'] = res.data.satisfaction
                  }).catch(res=>{})
                }
                wx.setStorageSync('fav', app.globalData.fav_subjects)
              }
              wx.hideLoading()
            }
          })
        },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
      }
    })



  /* var uniData = require('../../data/' + "University of Melbourne" + '_data.js');
   wx.cloud.callFunction({
     name: 'update_subject',
     data: {
       subjects: uniData.subjects,
       uni_name: "University of Melbourne"
     },
     success: function(res) {
       wx.setStorageSync("University of Melbourne", res.result.subjects)
       uniData = require('../../data/' + "Monash" + '_data.js');
       wx.cloud.callFunction({
         name: 'update_subject',
         data: {
           subjects: uniData.subjects,
           uni_name: "Monash"
         },
         success: function (res) {
           wx.setStorageSync("Monash", res.result.subjects)
           uniData = require('../../data/' + "RMIT" + '_data.js');
           wx.cloud.callFunction({
             name: 'update_subject',
             data: {
               subjects: uniData.subjects,
               uni_name: "RMIT"
             },
             success: function (res) {
               wx.setStorageSync("RMIT", res.result.subjects)
               uniData = require('../../data/' + "Deakin" + '_data.js');
               wx.cloud.callFunction({
                 name: 'update_subject',
                 data: {
                   subjects: uniData.subjects,
                   uni_name: "Deakin"
                 },
                 success: function (res) {
                   wx.setStorageSync("Deakin", res.result.subjects)
                   wx.hideLoading()
                 },
                 fail: console.error
               })
             },
             fail: console.error
           })
         },
         fail: console.error
       })
     },
     fail: console.error
   })*/

},



tapUni: function(event) {
  wx.showLoading({
    title: '数据加载中',
    mask: true
  })

  var name = event.currentTarget.dataset.name
  var storage = wx.getStorageSync(name)
  if(storage){
    console.log("youhuancun")
    console.log(storage)
    app.globalData.uni_name = name
    app.globalData.subjects = storage
    wx.hideLoading()
    wx.navigateTo({
      url: '../subject_overall/subject_overall'
    })
  }
  else{
    console.log("meihuancun")
    var uniData = require('../../data/' + name + '_data.js');
    app.globalData.uni_name = uniData.uni_name
    app.globalData.subjects = uniData.subjects

    db.collection(app.globalData.uni_name).get().then(res => {
      for (var each of res.data) {
        app.globalData.subjects[each._id]["difficulty"] = Math.round(each.difficulty / each.count)
        app.globalData.subjects[each._id]["satisfaction"] = Math.round(each.satisfaction / each.count)
        
        var c = each._id
        if (app.globalData.fav_subjects[c] && (app.globalData.fav_subjects[c].uni_name == app.globalData.uni_name)){
            app.globalData.subjects[each._id]['is_fav'] = true
          }
      }

      wx.setStorageSync(app.globalData.uni_name, app.globalData.subjects)
      console.log(app.globalData.subjects)
      console.log(app.globalData.uni_name)

      wx.hideLoading()
      wx.navigateTo({
        url: '../subject_overall/subject_overall'
      })
    })
  }

},
onShareAppMessage: function(options) {
  if (options.from === 'button') {
    // 来自页面内转发按钮
    console.log(options.target)
  }
  return {
    title: '分享页面',
    desc: '各个大学课程的详细资料，快来看一看',
    success: function(res) {
      console.log("转发成功:");
    },
    fail: function(res) {
      console.log("转发失败:");
    }
  }
},

})