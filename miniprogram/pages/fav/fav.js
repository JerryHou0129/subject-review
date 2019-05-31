const app =getApp()
Page({
  data: {
    fav_data:null,
  },

  tapSubject: function(event) {
    //console.log("saonima")
    //console.log(event)
    //console.log(event.currentTarget.id)
    //console.log(this.data.subjects["comp10001"])
    //console.log(JSON.stringify(this.data.subjects)) 

    wx.navigateTo({
      url: '../subject_detail/subject_detail?uni_name=' + this.data.fav_data[event.currentTarget.id].uni_name + '&subject=' + JSON.stringify(this.data.fav_data[event.currentTarget.id].fav),
    })
  },

  onShow: function(options) {
    const db = wx.cloud.database()
    // 查询当前用户所有的 counters
    db.collection('users').where({
      _openid: app.globalData.openid,
      is_fav: true
    }).get({
      success: res => {
        //this.setData({
        //  queryResult: JSON.stringify(res.data, null, 2)
        //})
        console.log('[数据库] [查询记录] 成功: ', JSON.stringify(res.data, null, 2))
        this.setData({
          fav_data: res.data,
        })
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

})