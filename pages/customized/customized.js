
Page({
  /*
   * 页面的初始数据
   */
  data: {

    type: 1,

    city1: [],
    city2: [],
    bgend: [],
    num1: 3,
    num2: 0,

    array: ['请选择房间类型', '饭局', '牌局', '酒局', '手游'],
    objectArray: [{
        id: 0,
        name: '请选择房间类型'
      },
      {
        id: 1,
        name: '饭局'
      },
      {
        id: 2,
        name: '牌局'
      },
      {
        id: 3,
        name: '酒局'
      },
      {
        id: 4,
        name: '手游'
      }
    ],
    roomTypeIndex: 0,
    startDate: '0000-00-00',
    startTime: '00:00',
    endDate: '0000-00-00',
    endTime: '00:00',
    region: ['广东省', '广州市', '番禺区'],
    customItem: '全部',
    totalPrice: 0,
    carArray: '[{}]',
    k7: [{
      arr_guige02: '会员',
      guige_key02: 0
    }, {
      arr_guige02: '非会员',
      guige_key02: 1
    }, {
      arr_guige02: '内部员工',
      guige_key02: 1
    }]
  },

  submit: function(e) {
    var validate = true;
    var that = this;
    var formData = e.detail.value;
    var roomId = util.randomRoomId();
    var orderId = util.orderRoomId();
    var carArray = JSON.stringify(this.data.carArray);

    wx.setStorageSync("formData", formData);
    wx.setStorageSync("carArray", carArray);
    var formData = wx.getStorageSync("formData");
    var carArray = wx.getStorageSync("carArray");
    var time = formData.startDate + " " + formData.startTime;
    time = time.replace(/-/g, "\/")
    var end = formData.endDate + " " + formData.endTime;
    end = end.replace(/-/g, "\/")
    var address = formData.addressArea + "," + formData.addressDetail,
      address = address.replace(/,/g, "");
    if ('0000/00/00 00:00' === time || '0000/00/00 00:00' === end){
      wx.showToast({
        title: '请输入举行时间',
        mask: true,
      })
      validate = false;
    }
    console.log("formData.roomVolume:" + formData.roomVolume)
    if (formData.roomVolume == null || formData.roomVolume == '') {
      wx.showToast({
        title: '请输入上限人數',
        mask: true,
      })
      validate = false;
    }
    console.log(validate)
    if(validate){
      wx: wx.request({
        url: 'https://www.gzjckc.cn/wxPay',
        data: {
          body: "活动参与支付押金",
          orderOn: orderId,
          payNum: "10",
          openId: getApp().globalData.openId,
          roomId: roomId,
          refundFee: "0"
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        method: 'POST',
        dataType: 'json',
        responseType: 'text',
        success: function (res) {
          var data = res.data.data;
          // 生成预付款单
          wx.requestPayment({
            timeStamp: data.timeStamp,
            nonceStr: data.nonceStr,
            package: data.package,
            signType: 'MD5',
            paySign: data.paySign,
            success: function (res) {
              if (res.errMsg == "requestPayment:ok") {

                wx.request({
                  url: 'https://www.gzjckc.cn/wx/room/insert',
                  data: {
                    openId: getApp().globalData.openId,
                    id: roomId,
                    roomName: formData.roomName,
                    roomTopic: formData.roomTopic,
                    roomType: formData.roomType,
                    totalPrice: formData.totalPrice,
                    address: address,
                    roomVolume: formData.roomVolume,
                    startTime: time,
                    endTime: end,
                    roomDescribtion: formData.content,
                    name: formData.name,
                    phone: formData.mobile,
                    email: formData.email,
                    member: 1,
                    carArray: carArray
                  },
                  header: {
                    'content-type': 'application/x-www-form-urlencoded' // 默认值
                  },
                  method: "post",
                  success: function (e) {
                    if (e.data.code == 0) {
                      wx.showToast({
                        title: '审核已经提交',
                        mask: true,
                        duration: 2000,
                        success: function () {
                          setTimeout(function () {
                            wx.navigateTo({
                              url: '../index/index',
                            })
                          }, 2000);
                        }
                      })
                    } else {
                      wx.showToast({
                        title: "服务器异常,稍后再试",
                        icon: "none",
                        mask: true,
                        duration: 2000,
                        success: function () {
                          setTimeout(function () {
                            wx.navigateTo({
                              url: '../index/index',
                            })
                          }, 2000);
                        }
                      })
                    }
                  }
                })
              }
            }
          })

        },
        fail: function (res) {
          console.log("--------fail--------");
        },
        complete: function (res) { },
      })
    }
    
  },


  selectMeal: function() {
    wx.navigateTo({
      url: '/pages/menu/menu',
    })
  },

  reselect: function() {
    this.setData({
      totalPrice: 0
    })
    wx.navigateTo({
      url: '/pages/menu/menu',
    })
  },

  onLoad: function(options) {
    wx.hideShareMenu({

    })
  },



  onShow: function() {
    
  },
  // 点击下拉列表
  optionTap(e) {
    let Index = e.currentTarget.dataset.index; //获取点击的下拉列表的下标
    this.setData({
      index: Index,
      selectShow: !this.data.selectShow
    });
  },

  bindPickerChange: function(e) {
    this.setData({
      roomTypeIndex: e.detail.value
    })
  },
  bindDateChange: function(e) {
    this.setData({
      startDate: e.detail.value
    })
  },
  bindTimeChange: function(e) {
    this.setData({
      startTime: e.detail.value
    })
  },
  bindEndDateChange: function(e) {
    this.setData({
      endDate: e.detail.value
    })
  },
  bindEndTimeChange: function(e) {
    this.setData({
      endTime: e.detail.value
    })
  },
  bindRegionChange: function(e) {
    this.setData({
      region: e.detail.value
    })
  },


  onShareAppMessage: function(res) {
    wx.hideShareMenu();
  }
})