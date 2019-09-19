const app = getApp();

Page({

  data: {
    selectedNav: '00',
    width: app.systemInfo.windowWidth,
    showspinner: false,
    box: false,
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

    var that = this;

    wx.request({
      url: app.globalData.urls + '/api/room/list',
      success: function(res) {
        if (res.data.code == 0) {
          that.setData({
            roomlist: res.data.data
          })
        }
      }
    })



  },

  onReady: function() {
    var that = this;
    app.getAddress(that);
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
    that.setData({
      box: true,
      clickRoom: e.target.dataset.roomid
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
                box: false
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

  }
})