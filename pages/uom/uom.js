// pages/uom/uom.js
Page({
  data: {
    inputShowed: false,
    inputVal: "",
        subjects: [
      {
        code: "comp10001",
        name: "Foundation of Computing"
      },
      {
        code: "comp10002",
        name: "Foundation of Algorithms"
      },
      {
        code: "comp20007",
        name: "Design of Algorithm"
      }

    ]
  },

  tapSubject:function(event){
    console.log(event)
    wx.navigateTo({
      url: '../subject_detail/subject_detail?subjects=' + JSON.stringify(this.data.subjects[event.currentTarget.id]),
    })
  },
  
  showInput: function () {
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function () {
    this.setData({
      inputVal: "",
      inputShowed: false
    });
  },
  clearInput: function () {
    this.setData({
      inputVal: ""
    });
  },
  inputTyping: function (e) {
    this.setData({
      inputVal: e.detail.value
    });
  }
})