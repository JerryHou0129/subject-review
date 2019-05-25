
Page({
  data: {
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
    }
  },

  tapSubject: function (event) {
    //console.log("saonima")
    //console.log(event)
    //console.log(event.currentTarget.id)
    //console.log(this.data.subjects["comp10001"])
    //console.log(JSON.stringify(this.data.subjects)) 
    wx.navigateTo({
      url: '../subject_detail/subject_detail?subjects=' + JSON.stringify(this.data.subjects[event.currentTarget.id]),
    })
  },

})