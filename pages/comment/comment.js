// pages/comment/comment.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    universities: ['UoM', 'Monash', 'RMIT', 'Deakin'],
    code: ['COMP10001', 'COMP10002', 'INFO20003', 'SWEN30006'],
    name: ['Foundation of Computing', 'Foundation of Algorithm', 'Database System', 'Software Modelling Design'],
    index: 0
  },

  bindPickerChange: function (e) {
    console.log('携带值', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
})