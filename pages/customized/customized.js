const app = getApp();
const util = require("../../utils/util.js")
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

    array: ['请选择房间类型', '聊天', '游戏', '推广', '招聘', '合伙人'],
    objectArray: [{
        id: 0,
        name: '请选择房间类型'
      },
      {
        id: 1,
        name: '聊天'
      },
      {
        id: 2,
        name: '游戏'
      },
      {
        id: 3,
        name: '推广'
      },
      {
        id: 4,
        name: '招聘'
      },
      {
        id: 5,
        name: '合伙人'
      }
    ],
    roomTypeIndex: 0,
    startDate: '',
    startTime: '08:00',
    startPickerStartDate: '',
    startPickerEndDate: '',
    endDate: '',
    endTime: '08:00',
    endPickerStartDate: '',
    endPickerEndDate: '',
    region: ['广东省', '广州市', '番禺区'],
    customItem: '全部',
    totalPrice: 0,
    carArray: [],
    k7: [{
      arr_guige02: '会员',
      guige_key02: 0
    }, {
      arr_guige02: '非会员',
      guige_key02: 1
    }, {
      arr_guige02: '内部员工',
      guige_key02: 1
    }],
    validate: true
  },
  
  submit: function(e) {
    
    var that = this;
    console.log(that.data.validate)
    var formData = e.detail.value;
    var roomId = util.randomRoomId();
    var orderId = util.orderRoomId();
    var carArray = JSON.stringify(this.data.carArray);

    var wxData = "";

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
    if ('0000/00/00 00:00' === time || '0000/00/00 00:00' === end) {
      wx.showToast({
        title: '请输入举行时间',
        mask: true,
      })
      that.data.validate = false;
    }
    console.log("formData.roomVolume:" + formData.roomVolume)
    if (formData.roomVolume == null || formData.roomVolume == '') {
      wx.showToast({
        title: '请输入上限人數',
        mask: true,
      })
      that.data.validate = false;
    }
    //校验备注
    if (formData.content != null && formData.content.length >= 10) {
      wx.showToast({
        title: '备注字数已超出',
        mask: true,
      })
      that.data.validate = false;
    }
    if (that.data.validate) {
      wx: wx.request({
        url: app.globalData.urls + '/api/wxPay',
        data: {
          body: "活动参与支付押金",
          orderOn: orderId,
          payNum: "1",
          openId: app.globalData.openId,
          roomId: roomId,
          refundFee: "0"
        },
        header: {
          "token" : app.globalData.token,
          'content-type': 'application/x-www-form-urlencoded'
        },
        method: 'POST',
        dataType: 'json',
        responseType: 'text',
        success: function(res) {
          wxData = res.data.data;
          if (res.data.code == 0) {
            wx.request({
              url: app.globalData.urls + '/api/room/insert',
              data: {
                openId: app.globalData.openId,
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
                "token" : app.globalData.token,
                'content-type': 'application/x-www-form-urlencoded' // 默认值
              },
              method: "post",
              success: function(e) {
                // 生成预付款单
                wx.requestPayment({
                  timeStamp: wxData.timeStamp,
                  nonceStr: wxData.nonceStr,
                  package: wxData.package,
                  signType: 'MD5',
                  paySign: wxData.paySign,
                  success: function (res) {
                    wx.switchTab({
                      url: '/pages/index/index',
                    })
                  }
                })
              }
            })
          }
        },
        fail: function(res) {
          console.log("--------fail--------");
        },
        complete: function(res) {},
      })
    }

  },

  checkRemark: function(e) {
      var that = this;
      var content = e.detail.value;
      if(content != null && content.length >= 300){
        wx.showToast({
          title: '字数已超出',
          mask: true
        })
        that.data.validate = false;
      }else{
        that.data.validate = true;
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
    debugger
    //回调字符串转JSON对象
    if (this.data.carArray != null && typeof (this.data.carArray) == 'string'){
      var carArray = JSON.parse(this.data.carArray);
      console.log(carArray.length)
      for (let i = 0; i < carArray.length; i++) {
        console.log(carArray[i].name)
      }
      this.setData({
        carArray: carArray
      });
      
    }
    
    if ((new Date()).getHours() <= 18) {
      var year = (new Date()).getFullYear()
      var month = (new Date()).getMonth() +1
      var day = (new Date()).getDate() +1
      
      var pickerStartDate = [year, month, day].map(this.formatNumber).join('-') + ''
      var pickerEndDate = [year, month, day].map(this.formatNumber).join('-') + ''
      this.setData({
        startDate: pickerStartDate,
        startPickerStartDate: pickerStartDate,
        endDate: pickerEndDate,
        endPickerStartDate: pickerEndDate
      })
    } else {
      var year = (new Date()).getFullYear()
      var month = (new Date()).getMonth() + 1
      var day = (new Date()).getDate() + 2
      
      var pickerStartDate = [year, month, day].map(this.formatNumber).join('-') + ''
      var pickerEndDate = [year, month, day].map(this.formatNumber).join('-') + ''
      this.setData({
        startDate: pickerStartDate,
        startPickerStartDate: pickerStartDate, 
        endDate: pickerEndDate,
        endPickerStartDate: pickerEndDate
      })
    }
  },

  formatNumber: function(n){
    n = n.toString()
    return n[1] ? n : '0' + n
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
    console.log(e.detail.value)
    this.setData({
      startDate: e.detail.value,
      endDate: e.detail.value,
      endPickerStartDate: e.detail.value,
      endPickerEndDate: e.detail.value
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