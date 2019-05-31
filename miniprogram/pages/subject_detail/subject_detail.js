// pages/subject_detail/subject_detail.js
const app = getApp()
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    uni_name: null,
    subject:null,
    head: "../../subject_img/",
    tail: ".png",
    source: null,
    isClick:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({subject: JSON.parse(options.subject)});
    this.setData({ uni_name: options.uni_name });
    this.setData({source: this.data.head +this.data.subject.code+this.data.tail})
    console.log(this.data.source)
    
    var id = app.globalData.openid + this.data.subject.code
    console.log(app.globalData.openid)
  
     db.collection('users').where({
       _openid: app.globalData.openid,
       'fav.code': this.data.subject.code
     }).get({
       success: res => {
         if (res.data.length != 0){
          this.setData({
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
  },

  comment:function(event){
    wx.navigateTo({
      url: '../comment/comment?uni_name='+ this.data.uni_name +'&subject=' + JSON.stringify(this.data.subject)
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