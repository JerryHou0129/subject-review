// pages/subject_detail/subject_detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    subjects:null,
    head: "../../subject_img/",
    tail: ".jpg",
    source: null,
    isClick: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({subjects: JSON.parse(options.subjects)});
    console.log(this.data.subjects)
    this.setData({source: this.data.head +this.data.subjects.code+this.data.tail})
    console.log(this.data.source)
  },

  comment:function(event){
    wx.navigateTo({
      url: '../comment/comment',
    })
  },

  click:function(event){
    if (!this.data.isClick == false) {
      /*let jobData = this.data.jobStorage;
      jobData.push({
        jobid: jobData.length,
        id: this.data.job.id
      })
      wx.setStorageSync('jobData', jobData);//设置缓存*/
      wx.showToast({
        title: '已收藏',
      });
    } else {
      wx.showToast({
        title: '已取消收藏',
      })
    }
    this.setData({
      isClick: !this.data.isClick
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})