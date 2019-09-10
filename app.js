//app.js
App({
  onLaunch: function() {
    //调用API从本地缓存中获取数据
    const that = this;
    that.urls();
    wx.getSystemInfo({
      success: function(res) {
        that.systemInfo = res;
      }
    })
    
    //获取授权信息
    that.login();

  },

  siteInfo: require("config.js"),

  urls: function() {
    var that = this;
    that.globalData.urls = that.siteInfo.config.url + that.siteInfo.config.subDomain;
  },

  login: function() {
    var that = this;

    wx.login({
      success(res) {
        if (res.code) {
          wx.request({
            url: that.globalData.urls + '/user/getUserInfo',
            data: {
              appid: "wxfd945e2b4a767dc3",
              secret: "0d921f83d3a88312703d8771709fb7e1",
              js_code: res.code,
              grantType: 'authorization_code',

            },
            method: "POST",
            header: {
              "Content-Type": "application/x-www-form-urlencoded"
            },
            success: function(res) {
              if (res.data.code == 500) {
                that.globalData.usinfo = 0;
                return;
              }
              if (res.data.code != 0) {
                wx.hideLoading();
                wx.showModal({
                  title: "提示",
                  content: "无法登录，请重试",
                  showCancel: false
                });
                return;
              }
              that.globalData.openId = res.data.data.openid;
              that.globalData.token = res.data.data.access_token;
            }
          })
        }
      }
    })
  },


  globalData: {
    userInfo: null
  },
  systemInfo: null,

})