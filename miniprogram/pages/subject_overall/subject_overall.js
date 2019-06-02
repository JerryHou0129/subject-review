
/*var arr = Object.keys(this.data.subjects);
console.log(arr.length); //6*/ //数每个学校科目数量
const WxSearch = require('../searchbar/searchbar.js');

Page({
  
  data: {
    inputShowed: false,
    inputVal: "",
    uni_name: null,
    subjects: null
  },

  tapSubject: function(event) {
    wx.navigateTo({
      url: '../subject_detail/subject_detail?uni_name='+ this.data.uni_name +'&subject=' + JSON.stringify(this.data.subjects[event.currentTarget.id]),
    })
  },

  cancelSearch: function(event){
    showInput();
  },

  showInput: function() {
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function() {
    this.setData({
      inputVal: "",
      inputShowed: false
    });
  },
  clearInput: function() {
    this.setData({
      inputVal: ""
    });
  },
  inputTyping: function(e) {
    this.setData({
      inputVal: e.detail.value
    });
  },

  onLoad: function(options) {
    const UniData = require('../../data/'+ options.uni_name+'_data.js');
    this.setData({
      subjects: UniData.subjects,
      uni_name: UniData.uni_name
    })
    var that = this;
    var each;
    var subjects = that.data.subjects
    var code_list = []
    for (each in subjects){
      code_list.push(subjects[each]["code"])
    }
    console.log(code_list)
    WxSearch.init(
      that, // 本页面一个引用
      code_list, // 搜索匹配，[]表示不使用
      that.mySearchFunction, // 提供一个搜索回调函数
      that.myGobackFunction //提供一个返回回调函数
    );
  },

  // 转发函数,固定部分
  wxSearchInput: WxSearch.wxSearchInput, // 输入变化时的操作
  wxSearchKeyTap: WxSearch.wxSearchKeyTap, // 点击提示或者关键字、历史记录时的操作
  wxSearchDeleteAll: WxSearch.wxSearchDeleteAll, // 删除所有的历史记录
  wxSearchConfirm: WxSearch.wxSearchConfirm, // 搜索函数
  wxSearchClear: WxSearch.wxSearchClear, // 清空函数

  // 搜索回调函数  
  mySearchFunction: function(value) {
    // do your job here
    // 跳转
    console.log("saosndoaidjsodjasodjsa")
    console.log(value);
    console.log(this.data.subjects[value])
    if (this.data.subjects[value]){
      wx.navigateTo({
        url: '../subject_detail/subject_detail?uni_name='+ this.data.uni_name +'&subject=' + JSON.stringify(this.data.subjects[value])
      })
    }
    else{
      console.log("wrong code")
    }
  },

  // 返回回调函数
  myGobackFunction: function() {
    // do your job here
    // 跳转
    wx.redirectTo({
      url: '../index/index?searchValue=返回'
    })
  },

  onShareAppMessage: function (options) {
    if (options.from === 'button') {
      // 来自页面内转发按钮
      console.log(options.target)
    }
    return {
      title: '分享页面',
      desc: '大学的课程资料，快来看一看',
      success: function (res) {
        console.log("转发成功:");
      },
      fail: function (res) {
        console.log("转发失败:");
      }
    }
  },
})