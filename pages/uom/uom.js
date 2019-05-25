// pages/uom/uom.js
/*var arr = Object.keys(this.data.subjects);
console.log(arr.length); //6*/ //数每个学校科目数量
var WxSearch = require('../searchbar/searchbar.js');
Page({
  data: {
    inputShowed: false,
    inputVal: "",
    subjects: {
      "COMP10001":
      {
        code: "COMP10001",
        name: "Foundation of Computing",
        content: "Solving problems in areas such as business, biology, physics, chemistry, engineering, humanities, and social sciences often requires manipulating, analysing, and visualising data through computer programming.",
        assig: "40%",
        exam: "60%",
        difficulty: "2 stars",
        satisfication: "4 stars",
        description: "Basic Python",
        sample_exam: "扫码获得详细信息"
      },
      "COMP10002":
      {
        code: "COMP10002",
        name: "Foundation of Algorithms",
        content: "I havent seen this before, please shut up",
        assig: "30%",
        exam: "70%",
        difficulty: "2 stars",
        satisfication: "4 stars",
        description: "Basic C with some algorithms",
        sample_exam: "扫码获得详细信息"        
      },
      "INFO20003":
      {
        code: "INFO20003",
        name: "Database System",
        content: "What is wrong with this bug No question mark ok", //不能有问号，转不好json
        assig: "20%",
        exam: "80%",
        difficulty: "2 stars",
        satisfication: "4 stars",
        description: "Database with MySQL",
        sample_exam: "扫码获得详细信息"
      },
      "SWEN20003":
      {
        code: "SWEN20003",
        name: "Object Oriented Software Design",
        content: "What is wrong with this bug No question mark ok", //不能有问号，转不好json
        assig: "20%",
        exam: "80%",
        difficulty: "2 stars",
        satisfication: "4 stars",
        description: "Basic Java",
        sample_exam: "扫码获得详细信息"
      },
      "COMP30027":
      {
        code: "COMP30027",
        name: "Machine Learning",
        content: "What is wrong with this bug No question mark ok", //不能有问号，转不好json
        assig: "20%",
        exam: "80%",
        difficulty: "2 stars",
        satisfication: "4 stars",
        description: "Basic Machine Learning with python",
        sample_exam: "扫码获得详细信息"
      },
      "COMP30024":
      {
        code: "COMP30024",
        name: "Artificial Intelligence",
        content: "What is wrong with this bug No question mark ok", //不能有问号，转不好json
        assig: "20%",
        exam: "80%",
        difficulty: "2 stars",
        satisfication: "4 stars",
        description: "Basic AI with python",
        sample_exam: "扫码获得详细信息"
      },
      "COMP30020":
      {
        code: "COMP30020",
        name: "IT Project",
        content: "What is wrong with this bug No question mark ok", //不能有问号，转不好json
        assig: "20%",
        exam: "80%",
        difficulty: "2 stars",
        satisfication: "4 stars",
        sample_exam: "扫码获得详细信息"
      },
      "SWEN30006":
      {
        code: "SWEN30006",
        name: "Software Modelling Design",
        content: "What is wrong with this bug No question mark ok", //不能有问号，转不好json
        assig: "20%",
        exam: "80%",
        difficulty: "2 stars",
        satisfication: "4 stars",
        sample_exam: "扫码获得详细信息"
      }
    }
  },

  tapSubject: function(event) {
    //console.log("saonima")
    //console.log(event)
    //console.log(event.currentTarget.id)
    //console.log(this.data.subjects["comp10001"])
    //console.log(JSON.stringify(this.data.subjects)) 
    wx.navigateTo({
      url: '../subject_detail/subject_detail?subjects=' + JSON.stringify(this.data.subjects[event.currentTarget.id]),
    })
  },

  cancelSearch: function(event){
    console.log("asadaaddad");
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

  onLoad: function() {
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
        url: '../subject_detail/subject_detail?subjects=' + JSON.stringify(this.data.subjects[value])
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
  }
})