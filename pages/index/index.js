//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    width: app.systemInfo.windowWidth,
    height: app.systemInfo.windowHeight,
    wxlogin: true,
    toplogo: "/images/logo.png",
    painting: {},
    shareImage: '',
    picture: false,
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
          url: '/pages/business/business',
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
  },

  eventDraw() {
    wx.showLoading({
      title: '绘制分享图片中',
      mask: true
    })
    this.setData({
      picture: true,
      painting: {
        width: 375,
        height: 555,
        clear: true,
        views: [{
          type: 'image',
          url: '/images/logo.png',
          top: 0,
          left: 0,
          width: 375,
          height: 555
        },
        {
          type: 'roundrect',
          background: "#fff",
          top: 57.5,
          left: 88,
          width: 280,
          height: 25,
          radius: 10,
          shadowBlur: 10,
          shadowColor: "rgba(255,255,255,.5)"
        },
        {
          type: 'image',
          url: 'https://wx.qlogo.cn/mmhead/Q3auHgzwzM7v6mLlMiblTaIBuq8VYHVBj61wC69r1jfz4wvjicSsMnKg/0',
          top: 27.5,
          left: 29,
          width: 55,
          height: 55,
          borderRadius: true
        },
        {
          type: 'text',
          content: '您的好友【Afan】',
          fontSize: 16,
          color: '#fff',
          textAlign: 'left',
          top: 33,
          left: 96,
          bolder: true
        },
        {
          type: 'text',
          content: '发现一件好货，邀请你一起0元免费拿！',
          fontSize: 15,
          color: '#563D20',
          textAlign: 'left',
          top: 59.5,
          left: 96
        },
        {
          type: 'image',
          url: '/images/food2.jpg',
          top: 136,
          left: 42.5,
          width: 290,
          height: 186,
          opacity: 70
        },
        {
          type: 'image',
          url: '/images/food1.jpg',
          top: 470,
          left: 85,
          width: 68,
          height: 68,
          borderRadius: true
        },
        {
          type: 'text',
          content: '正品MAC魅可口红礼盒生日唇膏小辣椒Chili西柚情人',
          fontSize: 16,
          lineHeight: 21,
          color: '#fff',
          textAlign: 'left',
          top: 336,
          left: 44,
          width: 287,
          MaxLineNumber: 2,
          breakWord: true,
          bolder: true
        },
        {
          type: 'text',
          content: '￥0.00',
          fontSize: 19,
          color: '#E62004',
          textAlign: 'left',
          top: 387,
          left: 44.5,
          bolder: true
        },
        {
          type: 'text',
          content: '原价:￥138.00',
          fontSize: 13,
          color: '#7E7E8B',
          textAlign: 'left',
          top: 391,
          left: 110,
          textDecoration: 'line-through'
        },
        {
          type: 'text',
          content: '长按识别图中二维码帮我砍个价呗~',
          fontSize: 14,
          color: '#383549',
          textAlign: 'left',
          top: 483,
          left: 165.5,
          lineHeight: 20,
          MaxLineNumber: 2,
          breakWord: true,
          width: 125
        },
        {
          type: 'rect',
          background: '#666',
          top: 10,
          left: 10,
          width: 20,
          height: 20,
          shadowBlur: 10,
          shadowColor: "rgba(255,255,255,1)"
        },
        ]
      }
    })
    console.log(this.data)
  },
  eventSave() {
    wx.saveImageToPhotosAlbum({
      filePath: this.data.shareImage,
      success(res) {
        wx.showToast({
          title: '保存图片成功',
          icon: 'success',
          duration: 2000
        })
      }
    })
  },
  eventGetImage(event) {
    console.log(event)
    wx.hideLoading()
    const {
      tempFilePath,
      errMsg
    } = event.detail
    if (errMsg === 'canvasdrawer:ok') {
      this.setData({
        shareImage: tempFilePath
      })
    }
  }

})