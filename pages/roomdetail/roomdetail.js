const app = getApp();
const util = require("../../utils/util.js")

Page({

  data: {
    painting: {},
    shareImage: '',
    picture: false,
    width: app.systemInfo.screenWidth,
    height: app.systemInfo.screenHeight,
    service: [
      '加入我们', '一起玩游戏'
    ],
    selled: 20,
    storeName: '22.22咖啡店',
    goods: {
      guide: [{
          id: '01',
          name: '不可抗力',
          info: [
            '活动因不可抗力因素造成活动，将暂停活动举行'
          ],
        },
        {
          id: '02',
          name: '活动举行时间 - （超过时间则停止参与）',
          info: [
            '8:00-20:00',
          ],
        },
        {
          id: '03',
          name: '预约信息',
          info: [
            '活动当天预约，均为明天参与活动', '详情请留意个人信息的订单详情!'
          ],
        },
        {
          id: '04',
          name: '温馨提示',
          info: [
            '客户在参与活动前须确认好房间信息，以免给您带来不必要的损失。', '活动当中请遵循我们平台提供的活动方案', '为了保障您的安全, 请在规定地址活动！', '活动结束后 , 请在订单上反馈本次活动情况!'
          ],
        },
        {
          id: '05',
          name: '优惠规则',
          info: [
            '活动推广阶段 , 均免费支付房间定金', '推广朋友圈可以得到礼物哦!!'
          ],
        },
      ],
    }
  },
  //广告栏

  // eventDraw: function() {
  //   wx.showLoading({
  //     title: '分享海报制作中',
  //     mask: true
  //   })
  //   this.setData({
  //     picture: true,
  //     painting: {
  //       width: 375,
  //       height: 555,
  //       clear: true,
  //       views: [{
  //         type: 'image',
  //         url: '/images/logo.png',
  //         top: 0,
  //         left: 0,
  //         width: 375,
  //         height: 555
  //       },
  //       {
  //         type: 'roundrect',
  //         background: "#fff",
  //         top: 57.5,
  //         left: 88,
  //         width: 280,
  //         height: 25,
  //         radius: 10,
  //         shadowBlur: 10,
  //         shadowColor: "rgba(255,255,255,.5)"
  //       },
  //       {
  //         type: 'image',
  //         url: 'https://wx.qlogo.cn/mmhead/Q3auHgzwzM7v6mLlMiblTaIBuq8VYHVBj61wC69r1jfz4wvjicSsMnKg/0',
  //         top: 27.5,
  //         left: 29,
  //         width: 55,
  //         height: 55,
  //         borderRadius: true
  //       },
  //       {
  //         type: 'text',
  //         content: '您的好友【Afan】',
  //         fontSize: 16,
  //         color: '#fff',
  //         textAlign: 'left',
  //         top: 33,
  //         left: 96,
  //         bolder: true
  //       },
  //       {
  //         type: 'text',
  //         content: '发现一件好货，邀请你一起0元免费拿！',
  //         fontSize: 15,
  //         color: '#563D20',
  //         textAlign: 'left',
  //         top: 59.5,
  //         left: 96
  //       },
  //       {
  //         type: 'image',
  //         url: '/images/food2.jpg',
  //         top: 136,
  //         left: 42.5,
  //         width: 290,
  //         height: 186,
  //         opacity: 70
  //       },
  //       {
  //         type: 'image',
  //         url: '/images/food1.jpg',
  //         top: 470,
  //         left: 85,
  //         width: 68,
  //         height: 68,
  //         borderRadius: true
  //       },
  //       {
  //         type: 'text',
  //         content: '正品MAC魅可口红礼盒生日唇膏小辣椒Chili西柚情人',
  //         fontSize: 16,
  //         lineHeight: 21,
  //         color: '#fff',
  //         textAlign: 'left',
  //         top: 336,
  //         left: 44,
  //         width: 287,
  //         MaxLineNumber: 2,
  //         breakWord: true,
  //         bolder: true
  //       },
  //       {
  //         type: 'text',
  //         content: '￥0.00',
  //         fontSize: 19,
  //         color: '#E62004',
  //         textAlign: 'left',
  //         top: 387,
  //         left: 44.5,
  //         bolder: true
  //       },
  //       {
  //         type: 'text',
  //         content: '原价:￥138.00',
  //         fontSize: 13,
  //         color: '#7E7E8B',
  //         textAlign: 'left',
  //         top: 391,
  //         left: 110,
  //         textDecoration: 'line-through'
  //       },
  //       {
  //         type: 'text',
  //         content: '长按识别图中二维码帮我砍个价呗~',
  //         fontSize: 14,
  //         color: '#383549',
  //         textAlign: 'left',
  //         top: 483,
  //         left: 165.5,
  //         lineHeight: 20,
  //         MaxLineNumber: 2,
  //         breakWord: true,
  //         width: 125
  //       },
  //       {
  //         type: 'rect',
  //         background: '#666',
  //         top: 10,
  //         left: 10,
  //         width: 20,
  //         height: 20,
  //         shadowBlur: 10,
  //         shadowColor: "rgba(255,255,255,1)"
  //       },
  //       ]
  //     }
  //   })
  //   console.log(this.data)
  // },

  // eventGetImage(event) {
  //   console.log(event)
  //   wx.hideLoading()
  //   const {
  //     tempFilePath,
  //     errMsg
  //   } = event.detail
  //   if (errMsg === 'canvasdrawer:ok') {
  //     this.setData({
  //       shareImage: tempFilePath
  //     })
  //   }
  // },

  banner(event) {
    const that = this;
    const index = event.currentTarget.dataset.index;
    wx.previewImage({
      current: that.data.goods.photo[parseInt(index)], // 当前显示图片的链接，不填则默认为 urls 的第一张
      urls: that.data.goods.photo,
    })

  },
  gobuy(event) {

    var that = this;
    var wxData = "";

    var roomId = that.data.roomId;

    var openId = app.globalData.openId;

    var sendData = {
      body: "款项支付",
      orderOn: util.orderRoomId(),
      payNum: "1",
      openId: openId,
      refundFee: "0",
      roomId: roomId
    };

    wx: wx.request({
      url: app.globalData.urls + '/api/wxPay',
      data: sendData,
      header: {
        "token": app.globalData.token,
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'POST',
      dataType: 'json',
      responseType: 'text',
      success: function(res) {
        wxData = res.data.data;

        wx.request({
          url: app.globalData.urls + '/api/order/create',
          method: 'POST',
          header: {
            'token': app.globalData.token,
            'content-type': 'application/x-www-form-urlencoded'
          },
          data: sendData,
          success: function() {
            wx.requestPayment({
              timeStamp: wxData.timeStamp,
              nonceStr: wxData.nonceStr,
              package: wxData.package,
              signType: 'MD5',
              paySign: wxData.paySign,
              success: function(res) {
                wx.request({
                  url: app.globalData.urls + '/api/order/updatePayStatus',
                  data: {
                    roomId: roomId,
                    openId: openId
                  },
                  success: function(res) {
                    if (res.data.code == "0") {
                      wx.showToast({
                        title: '支付成功',
                        duration: 3000,

                      })
                    }

                    that.setData({
                      payStatus: 0
                    })

                  }
                })
              },
              fail: function(res) {
                console.log(res);
                if (res.errMsg == "requestPayment:fail cancel") {
                  wx.showToast({
                    title: '支付取消',
                    duration: 3000,
                    icon: "none"
                  })
                }
              }
            })
          }
        })
      }
    })
  },

  callPhone(event) {
    wx.makePhoneCall({
      phoneNumber: this.data.room.businessPo.businessPhone,
    })
  },
  location(event) {
    // const that = this;
    // wx.openLocation({
    //   latitude: that.data.latitude, // 纬度，范围为-90~90，负数表示南纬
    //   longitude: that.data.longitude, // 经度，范围为-180~180，负数表示西经
    //   scale: 28, // 缩放比例
    //   name: '这是那儿哦', // 位置名
    //   address: '当前位置定位...', // 地址的详细说明
    //   success: function(res) {
    //     // success
    //   },
    //   fail: function() {
    //     // fail
    //   },
    //   complete: function() {
    //     // complete
    //   }
    // })
  },
  onReady() {
    // const that = this;
    // console.log('onReady');
    // wx.getLocation({
    //   type: 'wgs84', // 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标
    //   success: function(res) {
    //     // success
    //     console.log(res);
    //     that.setData({
    //       latitude: res.latitude,
    //       longitude: res.longitude,
    //     })
    //   },
    // })
  },

  onLoad(options) {

    var that = this;

    var roomId = options.roomId;

    that.setData({
      roomId: roomId,
      addr: options.addr,
      latitude: options.latitude,
      longitude: options.longitude
    })

    that.initRoomDetail(roomId);
  },

  onShow(options) {

  },

  initRoomDetail: function(roomId) {
    var that = this;
    //roomId = 5357197;
    if (roomId) {
      wx.request({
        url: app.globalData.urls + '/api/room/getRoomDetail?roomId=' + roomId + '&openId=' + app.globalData.openId,
        success: function(res) {
          var sumPrice = 0;
          if (res.data.code == 0) {
            var carArrayJson = JSON.parse(res.data.data.room.carArray);
            for (var i = 0; i < carArrayJson.length; i++) {
              sumPrice = sumPrice + carArrayJson[i].price * carArrayJson[i].num
            }
            that.setData({
              carArrayJson: carArrayJson,
              photo: res.data.data.photo,
              room: res.data.data.room,
              sumPrice: sumPrice,
              payStatus: res.data.data.payStatus
            })
          }
        }
      })
    }
  },

  gofav: function(e) {
    var roomId = e.currentTarget.dataset.roomid;
    console.log(roomId)
  },

  refund: function() {

  }
})