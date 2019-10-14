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
    member: -1,
    hasPassword: false,
    password: '',
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
    isPayPre: 1,
    k7: [{
      arr_guige02: '会员',
      guige_key02: 0,
      checked: "true"
    }, {
      arr_guige02: '非会员',
      guige_key02: 1
    }, {
      arr_guige02: '内部员工',
      guige_key02: 2
    }],
    m7: [{
      arr_select: '是',
      select_key: 0
    }, {
        arr_select: '否',
        select_key: 1,
        checked: "true"
    }],
    p7: [{
      arr_select: '是',
      select_key: 0,
    },{
        arr_select: '否',
        select_key: 1
    }],
    isPasswordOut: -1,
    validate: true
  },
  
  submit: function(e) {
    
    var that = this;
    that.data.validate = true
    console.log(that.data.validate)
    var formData = e.detail.value;
    var roomId = util.randomRoomId();
    var orderId = util.orderRoomId();
    var carArray = JSON.stringify(this.data.carArray);
   
    var wxData = "";
    wx.setStorageSync("formData", formData);
    console.log("f:" + formData.password)
    wx.setStorageSync("carArray", carArray);
    var formData = wx.getStorageSync("formData");
  
    var carArray = wx.getStorageSync("carArray");
    var time = formData.startDate + " " + formData.startTime;
    time = time.replace(/-/g, "\/")
    var end = formData.endDate + " " + formData.endTime;
    end = end.replace(/-/g, "\/")
    var address = formData.addressArea + "," + formData.addressDetail,
      address = address.replace(/,/g, "");
    
    if (formData.roomName == null || formData.roomName == '') {
      wx.showToast({
        title: '请输入房间名',
        mask: true,
      })
      that.data.validate = false;
      return
    }
    if (formData.roomTopic == null || formData.roomTopic == '') {
      wx.showToast({
        title: '请输入房间主题',
        mask: true,
      })
      that.data.validate = false;
      return
    }
    if (formData.roomType == null || formData.roomType == '') {
      wx.showToast({
        title: '请输入房间类型',
        mask: true,
      })
      that.data.validate = false;
      return
    }
    if (formData.addressDetail == null || formData.addressDetail == '') {
      wx.showToast({
        title: '请输入详细地址',
        mask: true,
      })
      that.data.validate = false;
      return
    }
    if (formData.roomVolume == null || formData.roomVolume == '') {
      wx.showToast({
        title: '请输入上限人数',
        mask: true,
      })
      that.data.validate = false;
      return
    }
    if (formData.endDate == formData.endDate && formData.endTime == formData.startTime) {
      wx.showToast({
        title: '请选择结束时间',
        mask: true,
      })
      that.data.validate = false;
      return
    }
    console.log("formData.roomVolume:" + formData.roomVolume)
    
    //校验备注
    if (formData.content != null && formData.content.length >= 10) {
      wx.showToast({
        title: '备注字数已超出',
        mask: true,
      })
      that.data.validate = false;
      return
    }
    /**if(that.data.member == -1){
      wx.showToast({
        title: '请选择会员',
        mask: true,
      })
      that.data.validate = false;
    }**/
    if (formData.password == null || formData.password == '') {
      wx.showToast({
        title: '请输入房间密码',
        mask: true,
      })
      that.data.validate = false;
      return
    }
    if (that.data.isPasswordOut == -1) {
      wx.showToast({
        title: '请选择是否公开密码',
        mask: true,
      })
      that.data.validate = false;
      return
    }
    if (formData.name == null || formData.name == '') {
      wx.showToast({
        title: '请输入姓名',
        mask: true,
      })
      that.data.validate = false;
      return
    }
    if (formData.mobile == null || formData.mobile == '') {
      wx.showToast({
        title: '请输入电话号码',
        mask: true,
      })
      that.data.validate = false;
      return
    }
    if (formData.email == null || formData.email == '') {
      wx.showToast({
        title: '请输入邮箱',
        mask: true,
      })
      that.data.validate = false;
      return
    }
    if (!(/(^[0-9]+$)/.test(formData.roomVolume))){
      wx.showToast({
        icon: 'none',
        title: '房间上限人数请输入数字',
        mask: true,
      })
      that.data.validate = false;
      return
    }else if(formData.roomVolume > 8 || formData.roomVolume < 2){
      wx.showToast({
        icon: 'none',
        title: '房间上限人数最多8人',
        mask: true,
      })
      that.data.validate = false;
      return
    }

    if (!(/(^[0-9]{5}$)/.test(formData.password))) {
      wx.showToast({
        icon: 'none',
        title: '请输入5位房间数字密码',
        mask: true,
      })
      that.data.validate = false;
      return
    }
    
    

    var payNum;
    var amount;
    if(that.data.isPayPre == 0){
      if (!(/(^[0-9]+$)/.test(formData.amount))) {
        wx.showToast({
          icon: 'none',
          title: '请输入正确数值买单金额',
          mask: true,
        })
        that.data.validate = false;
        return 
      } else if (formData.amount > that.data.totalPrice){
        wx.showToast({
          icon: 'none',
          title: '买单金额不能多于套餐价格',
          mask: true,
        })
        that.data.validate = false;
        return
      }
      payNum = (that.data.totalPrice + formData.amount * (formData.roomVolume-1))*100;
      amount: formData.amount
    }else{
      payNum = (that.data.totalPrice)*100;
      amount = 0
    }
    console.log("type:"+typeof(payNum)+''+payNum)
    if (that.data.validate) {
      wx: wx.request({
        url: app.globalData.urls + '/api/wxPay',
        data: {
          body: "活动参与支付押金",
          orderOn: orderId,
          payNum: '1',

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
                carArray: carArray,
                password: formData.password,
                isPasswordOut: that.data.isPasswordOut,
                isPayPre: that.data.isPayPre,
                amount: amount
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

  radioPay: function(e) {
    this.setData({
      isPayPre: e.currentTarget.dataset.id
    })
    if (this.data.isPayPre == 0 && this.data.totalPrice == 0){
      wx.showToast({
        title: '请先选择套餐',
        mask: true,
      })
      this.setData({
        isPayPre: 1,
        m7: this.data.m7
      })
    }
   
   
  },

  passwordRadio: function(e){
    console.log("bbb")
    this.setData({
      isPasswordOut: e.currentTarget.dataset.id
    })
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