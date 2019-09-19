//app.js
var map = require('utils/amap-wx.js')
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

  countDistance(sx1, sy1, ex2, ey2, obj) {
    var myAmapFun = new map.AMapWX({
      key: 'eacbcb4fbf73999c872f1eb4551822fd'
    });

    myAmapFun.getWalkingRoute({
      origin: '116.481028,39.989643',
      destination: '116.434446,39.90816',
      success: function(data) {
        if (data.paths[0] && data.paths[0].distance) {
          obj.setData({
            km: (data.paths[0].distance / 1000).toFixed(1)
          });
        }
      }
    })
  },

  getAddress: function(obj) {
    var that = this;
    wx.chooseLocation({
      success: function(res) {
        obj.setData({
          addr: res.address,
          latitude: res.latitude,
          longitude: res.longitude
        })
        that.countDistance(res.latitude, res.longitude, 0, 0, obj);
      },
      fail: function() {
        wx.getSetting({
          success: function(res) {
            var status = res.authSetting;
            if (!status['scope.userLocation']) {
              wx.showModal({
                title: '是否授权当前位置',
                content: '需要获取您的地理位置，请确认授权，否则地图功能将无法使用',
                showCancel: false,
                success: function(tip) {
                  if (tip.confirm) {
                    wx.openSetting({
                      success: function(res) {
                        if (res.authSetting["scope.userLocation"] === true) {
                          wx.showToast({
                            title: '授权成功',
                            icon: 'success',
                            duration: 1000
                          })
                          //授权成功之后，再调用chooseLocation选择地方
                          wx.chooseLocation({
                            success: function(res) {
                              obj.setData({
                                addr: res.address,
                                latitude: res.latitude,
                                longitude: res.longitude
                              })
                              that.countDistance(res.latitude, res.longitude, 0, 0, obj);
                            },
                          })
                        } else {
                          wx.showToast({
                            title: '授权失败',
                            icon: 'success',
                            duration: 1000
                          })
                        }
                      },
                      fail: function() {
                        wx.showToast({
                          title: '调用授权窗口失败',
                          icon: 'success',
                          duration: 1000
                        })
                      }
                    })
                  }
                }
              })
            }
          }
        })
      }
    })
  },


  globalData: {
    userInfo: null
  },
  systemInfo: null,

})