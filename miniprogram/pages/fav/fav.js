const app = getApp()
Page({
  data: {
    title: '极客教育',
    barBg: '#f8f8f8',//#ff6600
    color: '#000000',//#ffffff

    fav_data: null,
  },

  tapSubject: function(event) {
    app.globalData.uni_name = this.data.fav_data[event.currentTarget.id].uni_name
    app.globalData.this_subject = this.data.fav_data[event.currentTarget.id].fav
    wx.navigateTo({
      url: '../subject_detail/subject_detail'
    })
  },

  onShow: function(options) {
    const db = wx.cloud.database()
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