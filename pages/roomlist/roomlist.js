const app = getApp();

Page({

  data: {
    selectedNav: '00',
    width: app.systemInfo.windowWidth,
    showspinner: false,
    box: false,
    wxlogin:true,
    toplogo: "/images/logo.png",
    nearby: [{
        name: '附近（智能范围）',
        id: 'a01',
      },
      {
        name: '500米',
        id: 'a02',
      },
      {
        name: '1000米',
        id: 'a03',
      },
      {
        name: '2000米',
        id: 'a04',
      },
      {
        name: '5000米',
        id: 'a05',
      },
    ],
    sort: [{
        name: '全部',
        id: 'b00'
      },
      {
        name: '婚礼策划',
        id: 'b01'
      },
      {
        name: '婚纱摄影',
        id: 'b02'
      },
      {
        name: '婚宴酒店',
        id: 'b03'
      },
      {
        name: '婚礼用车',
        id: 'b04'
      },
      {
        name: '婚礼用品',
        id: 'b05'
      },
      {
        name: '金银首饰',
        id: 'b06'
      },
    ],
    rank: [{
        name: '智能排序',
        id: 'c00',
      },
      {
        name: '离我最近',
        id: 'c01',
      },
      {
        name: '人气最高',
        id: 'c02',
      },
      {
        name: '评价最好',
        id: 'c03',
      },
      {
        name: '人均最低',
        id: 'c04',
      },
      {
        name: '人均最高',
        id: 'c05',
      },
    ],
    spinners: [],
    roomlist: "",
    km: 0
  },

  onLoad: function() {

    wx.hideShareMenu({})

    var that = this;

    //进来后先进行地址选定，然后把当前位置的经纬度拿到后传入后台计算
    app.getAddress(that);




  },

  onShow: function() {
    var that = this;

    if (that.data.addr) {
      wx.request({
        url: app.globalData.urls + '/api/room/list',
        data: {
          latitude: that.data.latitude,
          longitude: that.data.longitude
        },
        success: function(res) {
          console.log(res);
          if (res.data.code == 0 && res.data.data.length > 0) {
            that.setData({
              roomlist: res.data.data
            })
          } else {
            wx.showToast({
              title: '暂无房间',
              duration: 3000
            })
          }
        }
      })
    }
  },

  navitation(event) {
    let id = event.currentTarget.dataset.id;
    const that = this;
    if (id == that.data.selectedNav) {
      id = '00';
      that.setData({
        showspinner: false,
      })
    } else {
      that.setData({
        showspinner: true,
      })
    }
    that.setData({
      selectedNav: id,
    })
    let temps = that.data.spinners;
    if (id == '02') {
      temps = that.data.sort;
    } else if (id == '03') {
      temps = that.data.rank;
    } else if (id == '01') {
      temps = that.data.nearby;
    }
    that.setData({
      spinners: temps,
    })
  },

  spinnerclick(event) {
    const that = this;
    that.setData({
      showspinner: false,
    })
  },

  storelick(event) {
    const that = this;
    const data = that.data;
    that.setData({
      clickRoom: event.currentTarget.dataset.id
    })
    wx.navigateTo({
      url: '../roomdetail/roomdetail?roomId=' + that.data.clickRoom + '&addr=' + data.addr + '&latitude=' + data.latitude + '&longitude=' + data.longitude
    })
  },

  enterPassword: function(e) {
    //e.target.dataset.roomid
    var that = this;
    wx.getSetting({
      success: (res) => {
        if (res.authSetting['scope.userInfo']) {//授权了，可以获取用户信息了
          wx.getUserInfo({
            success: (res) => {
              that.setData({
                wxlogin: true
              })
              that.setData({
                box: true,
                clickRoom: e.target.dataset.roomid
              })
            }
          })
        } else {//未授权，跳到授权页面
          that.setData({
            wxlogin: false
          })
        }
      }
    })
    

  },

  //授权通过信息存储
  userlogin: function (e) {
    var that = this;
    //没有授权用户信息 , 拒绝
    if (!e.detail.rawData) {
      wx.showToast({
        title: '授权失败，请授权使用',
        icon: "none",
        duration: 3000
      })
      that.setData({
        wxlogin: true
      })
      return;
    }

    wx.request({
      url: app.globalData.urls + '/api/user/decodeUserInfo',
      data: {
        openId: app.globalData.openId, //用户的唯一标识
        nickName: e.detail.userInfo.nickName, //微信昵称
        avatarUrl: e.detail.userInfo.avatarUrl, //微信头像
        province: e.detail.userInfo.province, //用户注册的省
        city: e.detail.userInfo.city, //用户注册的市
        gender: e.detail.userInfo.gender, //用户性别
        country: e.detail.userInfo.country //用户所在国家
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded', // 默认值
        'token': app.globalData.token
      },
      method: "post",
      success: function (e) {
        if (e.data.code == 0) {
          wx.showToast({
            title: '授权已经成功',
            mask: true,
            duration: 2000,
            success: function () {
              that.setData({
                wxlogin: true
              })
            }
          })
        } else {
          wx.showModal({
            title: '授权通知',
            content: '为了体验建议告诉我们您的微信公开信息，绝对不会泄露隐私噢！',
          })
        }
      }
    })
  },

  cancel: function(e) {
    var that = this;
    that.setData({
      box: false
    })
  },

  setValue: function(e) {
    var pwd = e.detail.value;
    this.setData({
      pwd: pwd
    })
  },

  confirm: function() {
    var that = this;
    if (that.data.clickRoom && that.data.pwd) {
      wx.request({
        method: "post",
        header: {
          "Content-Type": "application/x-www-form-urlencoded",
          "token": app.globalData.token
        },
        url: app.globalData.urls + '/api/room/checkPwd',
        data: {
          id: that.data.clickRoom,
          pwd: that.data.pwd
        },
        success: function(res) {
          switch (res.data.data) {
            case 0:
              wx.showToast({
                title: '系统错误,稍后再试!',
                duration: 3000,
                icon: "none"
              })
              break;
            case 2:
              wx.showToast({
                title: '密码错误,进入失败!',
                duration: 3000,
                icon: "none"
              })
              break;
            case 1:
              wx.navigateTo({
                url: '../roomdetail/roomdetail?roomId=' + that.data.clickRoom + '&addr=' + that.data.addr + '&latitude=' + that.data.latitude + '&longitude=' + that.data.longitude
              })
              that.setData({
                clickRoom: "",
                box: false,
                pwd: ""
              })
              break;
          }
        }
      })
    } else if (!that.data.pwd) {
      wx.showToast({
        title: '请输入密码!',
        duration: 3000,
        icon: "none"
      })
    } else {
      wx.showToast({
        title: '系统错误，稍后再试!',
        duration: 3000,
        icon: "none"
      })
    }
  },
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
    }
    return {
      title: "大约客",
      path: '/pages/roomlist/roomlist'
    }

  },
  search: function(e) {

    var that = this;

    var roomList = that.data.roomlist;

    var roomId = e.detail.value;

    if (roomId == "" || roomId == null) {
      if (that.data.addr) {
        wx.request({
          url: app.globalData.urls + '/api/room/list',
          data: {
            latitude: that.data.latitude,
            longitude: that.data.longitude
          },
          success: function(res) {
            console.log(res);
            if (res.data.code == 0 && res.data.data.length > 0) {
              that.setData({
                roomlist: res.data.data
              })
            } else {
              wx.showToast({
                title: '暂无房间',
                duration: 3000
              })
            }
          }
        })
      }
    } else {
      if (that.data.addr) {
        wx.request({
          url: app.globalData.urls + '/api/room/listById',
          data: {
            roomId: roomId,
            latitude: that.data.latitude,
            longitude: that.data.longitude
          },
          success: function(res) {
            console.log(res);
            if (res.data.code == 0) {
              that.setData({
                roomlist: res.data.data
              })
            }
          }
        })
      }
    }
  }
})