//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    favList: []
  },

  toDetailsTap: function (e) {
    wx.navigateTo({
      url: "/pages/goods-detail/goods-detail?id=" + e.currentTarget.dataset.id
    })
  },
  home: function () {
    wx.switchTab({
      url: "/pages/index/index"
    })
  },
  onShow: function () {
  }

})