// pages/subject_detail/subject_detail.js
const app = getApp()
const db = wx.cloud.database()
Page({
  onShareAppMessage: function(options) {
    if (options.from === 'button') {
      // 来自页面内转发按钮
      console.log(options.target)
    }
    return {
      title: '分享页面',
      //path: 'pages/subject_detail/subject_detail?uni_name='+app.globalData.uni_name+'&subject=' + app.globalData.this_subject,
      path: 'pages/index/index',
      desc: '科目分享，快来看一看',
      success: function(res) {
        console.log("转发成功:");
      },
      fail: function(res) {
        console.log("转发失败:");
      }
    }
  },
  /**
   * 页面的初始数据
   */
  data: {
    title: '极客教育',
    barBg: '#f8f8f8', //#ff6600
    color: '#000000', //#ffffff


    uni_name: null,
    subject: null,
    head: "../../subject_img/",
    tail: ".png",
    source: null,
    isClick: false,

    satisfaction: 0,
    difficulty: 0,
    comment: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    if (options.subject) {
      console.log("gggggg")
      app.globalData.this_subject = options.subject,
      app.globalData.uni_name = options.uni_name
    }

    //if (options.share_query){
    that.setData({
      subject: app.globalData.this_subject,
      uni_name: app.globalData.uni_name,
      difficulty: app.globalData.this_subject["difficulty"],
      satisfaction: app.globalData.this_subject["satisfaction"]
    });

    that.setData({
      source: that.data.head + that.data.subject.code + that.data.tail
    })

    if(app.globalData.this_subject.is_fav == true){
      that.setData({
        isClick:true
      })
    }


    //--------------------------------------------------------





  },

  comment: function(event) {
    wx.navigateTo({
      url: '../comment/comment'
    })
  },


  add_fav: function(event) {
    if (this.data.isClick == false) {

      db.collection('fav').add({
        data: {
          code: this.data.subject.code,
          uni_name: this.data.uni_name
        }
      }).then(res => {
        app.globalData.fav_subjects[this.data.subject.code] = this.data.subject
        wx.setStorageSync('fav', app.globalData.fav_subjects)
          wx.showToast({
            title: '已收藏',
          })
        })
      
    } else {

      wx.cloud.callFunction({
        name: 'remove',
        data: {
          openid: app.globalData.openid,
          uni_name: app.globalData.uni_name,
          code: app.globalData.this_subject.code
        },
        success: function (res) {
          app.globalData.this_subject.is_fav = false
          delete app.globalData.fav_subjects[app.globalData.this_subject.code]
          wx.showToast({
            title: '已取消收藏',
          })
        }
      })
  }

  this.setData({
    isClick: !this.data.isClick
  })
},



})