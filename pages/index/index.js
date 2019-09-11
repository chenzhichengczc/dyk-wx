//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    width: app.systemInfo.windowWidth,
    height: app.systemInfo.windowHeight,
    wxlogin: true,
    toplogo: "/images/logo.png",
    banner: ['http://i.dxlfile.com/adm/material/2016_12_12/20161212135600242250.jpg',
      'http://i.dxlfile.com/adm/material/2017_01_04/2017010411165785666.jpg',
      'http://i.dxlfile.com/adm/material/2017_01_04/20170104140739205869.jpg',
      'http://i.dxlfile.com/adm/material/2017_01_16/20170116171332214897.jpg'
    ],
    functions: [{
        url: '../../images/i01.png',
        name: '活动定制',
        id: '01'
      },
      {
        url: '../../images/i02.png',
        name: '房间列表',
        id: '02'
      },
      {
        url: '../../images/i03.png',
        name: '我的活动',
        id: '03'
      },
      {
        url: '../../images/i04.png',
        name: '收藏列表',
        id: '04'
      },
      {
        url: '../../images/i05.png',
        name: '商家加盟',
        id: '05'
      },
      {
        url: '../../images/i06.png',
        name: '公司介绍',
        id: '06'
      },
    ],

    goods: [{
      url: 'http://p1.meituan.net/wedding/5c683d257d0a418c146308b455bb5b582651471.jpg%40640w_480h_0e_1l%7Cwatermark%3D0',
      name: '热烈如初',
      price: '13800',
      oldprice: '19800',
      sell: '5',
      address: '二环路东五段万达广场8单元2101(近成仁公交站)',
      km: '1.1km'
    }]
  },

  onLoad: function() {
    var that = this;
    wx.hideTabBar();
    wx.getSetting({
      success: (res) => {
        if (res.authSetting['scope.userInfo']) {//授权了，可以获取用户信息了
          wx.getUserInfo({
            success: (res) => {
              that.setData({
                wxlogin: true
              })
              wx.showTabBar();
            }
          })
        } else {//未授权，跳到授权页面
          that.setData({
            wxlogin: false
          })
          wx.hideTabBar();
        }
      }
    })
  },

  fucClick(event) {
    const id = event.currentTarget.dataset.id;
    console.log(id);
    switch (id) {
      case "01":
        wx.navigateTo({
          url: '/pages/customized/customized',
        });
        break;
      case "02":
        wx.switchTab({
          url: '/pages/roomlist/roomlist',
        })
        break;
      case "04":
        wx.navigateTo({
          url: '/pages/fav-list/fav-list',
        });
        break;
      case "05":
        wx.navigateTo({
          url: '/pages/join/join',
        });
        break;
    }

  },


  //授权通过信息存储
  userlogin: function(e) {
    var that = this;
    //没有授权用户信息 , 拒绝
    if (!e.detail.rawData) {
      wx.showToast({
        title: '授权失败，请授权使用',
        icon: "none",
        duration: 3000
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
              wx.showTabBar();
            }
          })
        }else{
          wx.showModal({
            title: '授权通知',
            content: '为了体验建议告诉我们您的微信公开信息，绝对不会泄露隐私噢！',
          })
        }
      }
    })
  },


  goodDetail(event) {
    wx.navigateTo({
      url: '',
    })
  }

})