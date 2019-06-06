// pages/subject_detail/subject_detail.js
const app = getApp()
const db = wx.cloud.database()
Page({
 onShareAppMessage: function (options) {
    if (options.from === 'button') {
      // 来自页面内转发按钮
      console.log(options.target)
    }
    return {
      title: '分享页面',
      //path: 'pages/subject_detail/subject_detail?uni_name='+app.globalData.uni_name+'&subject=' + app.globalData.this_subject,
      path: 'pages/index/index',
      desc: '科目分享，快来看一看', 
      success: function (res) {
        console.log("转发成功:");
      },
      fail: function (res) {
        console.log("转发失败:");
      }
    }
  },
  /**
   * 页面的初始数据
   */
  data: {
    title: '极客教育',
    barBg: '#f8f8f8',//#ff6600
    color: '#000000',//#ffffff


    uni_name: null,
    subject:null,
    head: "../../subject_img/",
    tail: ".png",
    source: null,
    isClick:false,

    satisfaction: 0,
    difficulty: 0,
    comment: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    if (options.subject) {
      console.log("gggggg")
      app.globalData.this_subject = options.subject,
      app.globalData.uni_name = options.uni_name
    }

    wx.cloud.callFunction({
      // 云函数名称
      name: 'update_subject_detail',
      // 传给云函数的参数
      data: {
        subject: app.globalData.this_subject,
        uni_name: app.globalData.uni_name,
      },
      success: function (res) {
        // console.log(app.globalData.this_subject)
        // console.log(app.globalData.uni_name)
        // console.log("oooooooooooo")
        // console.log(res.result)
        // console.log(res.result.diff) // 3
        // console.log(res.result.sat) // 3
        that.setData({
          difficulty: res.result.diff,
          satisfaction: res.result.sat
        })
      },
      fail: console.error
    })




      //if (options.share_query){
      that.setData({
        subject: app.globalData.this_subject,
        uni_name: app.globalData.uni_name
      });
    
    that.setData({ source: that.data.head + that.data.subject.code + that.data.tail})

    var id = app.globalData.openid + that.data.subject.code

  
     db.collection('users').where({
       _openid: app.globalData.openid,
       'fav.code': that.data.subject.code
     }).get({
       success: res => {
         if (res.data.length != 0){
           that.setData({
            isClick:true
          })
         }
         console.log("-------------")
         console.log('[数据库] [查询记录] 成功: ', res.data)
       },
       fail: err => {
         wx.showToast({
           icon: 'none',
           title: '查询记录失败'
         })
         console.error('[数据库] [查询记录] 失败：', err)
       }
     })

    //--------------------------------------------------------





  },

  comment:function(event){
    wx.navigateTo({
      url: '../comment/comment'
    })
  },


  add_fav:function(event){
    
    if (this.data.isClick == false) {
      console.log("when is_fav = false")

      /*let jobData = this.data.jobStorage;
      jobData.push({
        jobid: jobData.length,
        id: this.data.job.id
      })
      wx.setStorageSync('jobData', jobData);//设置缓存*/
      db.collection('users').add({
        data: {
          _id: app.globalData.openid + this.data.subject.code,
          fav: this.data.subject,
          is_fav: true,
          uni_name: this.data.uni_name
        },
        success: res => {
          // 在返回结果中会包含新创建的记录的 _id
          this.setData({
            userId: res._id,
            fav: this.data.subject,
          })
          console.log("#####################")
          wx.showToast({
            title: '已收藏',
          })
          console.log('[数据库] [新增记录] 成功，记录 _id: ', res._id)
        },
        fail: err => {
          wx.showToast({
            icon: 'none',
            title: '新增记录失败'
          })
          console.error('[数据库] [新增记录] 失败：', err)
        }
      })
    } else {
      console.log("when is_fav = true")
      var id = app.globalData.openid + this.data.subject.code
       db.collection('users').doc(id).remove({
         success: res => {
           wx.showToast({
             title: '已取消收藏',
           })
           this.setData({
             counterId: '',
             count: null,
           })
         },
         fail: err => {
           wx.showToast({
             icon: 'none',
             title: '删除失败',
           })
           console.error('[数据库] [删除记录] 失败：', err)
         }
       })
    }

    this.setData({
      isClick: !this.data.isClick
    })
  },

 
 
})