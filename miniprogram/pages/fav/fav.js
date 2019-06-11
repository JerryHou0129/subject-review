const app = getApp()
Page({
  data: {
    title: '极客教育',
    barBg: '#f8f8f8', //#ff6600
    color: '#000000', //#ffffff

    fav_data: null,
  },

  tapSubject: function(event) {
    app.globalData.uni_name = this.data.fav_data[event.currentTarget.id].uni_name
    app.globalData.this_subject = this.data.fav_data[event.currentTarget.id]
    wx.navigateTo({
      url: '../subject_detail/subject_detail'
    })
  },

  onShow: function(options) {
    console.log(app.globalData.fav_subjects)
    this.setData({
      fav_data: app.globalData.fav_subjects
    })
  },

})