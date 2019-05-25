// pages/comment/comment.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    universities: ['UoM', 'Monash', 'RMIT', 'Deakin'],
    code: ['COMP10001', 'COMP10002', 'INFO20003', 'SWEN30006'],
    name: ['Foundation of Computing', 'Foundation of Algorithm', 'Database System', 'Software Modelling Design'],
    index: 0,
    maxLen: 200, // 最多放多少字
    info: "",
    nowLen: 0, //备注当前字数
    flag_star: 0,
    flag_emoji: 0,
  },

  bindPickerChange: function(e) {
    console.log('携带值', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  bindTextAreaChange: function(e) {
    var that = this
    var value = e.detail.value,
      len = parseInt(value.length);
    if (len > that.data.maxLen)
      return;
    that.setData({
      info: value,
      nowLen: len
    })
  },

  changeColor1: function() {
    var that = this;
    that.setData({
      flag_star: 1
    });
  },
  changeColor2: function() {
    var that = this;
    that.setData({
      flag_star: 2
    });
  },
  changeColor3: function() {
    var that = this;
    that.setData({
      flag_star: 3
    });
  },
  changeColor4: function() {
    var that = this;
    that.setData({
      flag_star: 4
    });
  },
  changeColor5: function() {
    var that = this;
    that.setData({
      flag_star: 5
    });
  },

  changeEmoji1: function() {
    var that = this;
    that.setData({
      flag_emoji: 1
    });
  },
  changeEmoji2: function() {
    var that = this;
    that.setData({
      flag_emoji: 2
    });
  },
  changeEmoji3: function() {
    var that = this;
    that.setData({
      flag_emoji: 3
    });
  },
  changeEmoji4: function() {
    var that = this;
    that.setData({
      flag_emoji: 4
    });
  },
  changeEmoji5: function() {
    var that = this;
    that.setData({
      flag_emoji: 5
    });
  },

  submit: function(event) {
    var that = this;
    wx.showToast({
      title: '发布成功',
      icon: 'success',
      duration: 1500,
      mask: false,
      success: function() {
        that.setData({
          info: '',
          noteNowLen: 0,
          flag: 0
        })

      }
    })

    setTimeout(function(){
      wx.navigateBack({
        delta: 2
      })
    }, 1500)

  }
})