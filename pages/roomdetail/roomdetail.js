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

  eventDraw: function() {
    wx.request({
      url: 'https://api.weixin.qq.com/wxa/getwxacode?access_token=' + app.globalData.token,
      method : 'POST',
      header:{
        'content-type': 'application/x-www-form-urlencoded',
      },      
      data : {
 
      },
      success : function(e){
        console.log(e)
      }
    })
  },

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
              sumPrice = sumPrice + carArrayJson[i].price * carArrayJson[i].num - res.data.data.room.amount
            }
            that.setData({
              carArrayJson: carArrayJson,
              photo: res.data.data.photo,
              room: res.data.data.room,
              sumPrice: sumPrice,
              amount: res.data.data.room.amount,
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