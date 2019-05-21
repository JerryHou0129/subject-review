// pages/uom/uom.js
Page({
  data: {
    inputShowed: false,
    inputVal: "",
        subjects: [
      {
        code: "comp10001",
        name: "Foundation of Computing",
        content: "Some bullshit and balabalablabalbalblablaalb",
        assig: "40%",
        exam: "60%"
      },
      {
        code: "comp10002",
        name: "Foundation of Algorithms",
        content: "I havent seen this before, please shut up",
        assig: "30%",
        exam: "70%"
      },
      {
        code: "comp20007",
        name: "Deisgn of algorithm",
        content: "What is wrong with this bug No question mark ok", //不能有问号，转不好json
        assig: "20%",
        exam: "80%"
      }
    ]
  },

  tapSubject:function(event){
    console.log(JSON.stringify(this.data.subjects[event.currentTarget.id]))
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