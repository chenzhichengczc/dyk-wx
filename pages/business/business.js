// pages/index/business.js
var util = require("../../utils/util.js");
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    color: '#00CACA',
    business_name: '',
    business_phone: '',
    business_qq: '',
    business_store: '',
    business_addr: '请选择店铺地址',
    business_message: '',
    latitude: '',
    longitude: '',
  },

  //获得经纬度并显示商家地址到页面
  getAddress: function (obj) {
    console.log("666");
    var that = this;
    wx.chooseLocation({
      success: function(res) {
        console.log("success");
        console.log(res);
        // var address = res.address.substring(3);
        // console.log(address);
        // if (address.substring(0,3) == "广州市"){
        //   address = address.substring(3);
        // }
        that.setData({
          business_addr: res.address,
          latitude: res.latitude,
          longitude: res.longitude,
        });
        console.log(that.data.business_addr);
        console.log(that.data.latitude);
        console.log(that.data.longitude);
        console.log("222");
      },
      fail: function () {
        console.log("fail");
        wx.getSetting({
          success: function(res) {
            console.log("success1");
            console.log(res);
            var status = res.authSetting;
            if(!status['scope.userLocation']){
              console.log(status['scope.userLocation']);
              console.log("未授权地址");
              wx.showModal({
                title: '是否授权当前位置',
                content: '需要获取您的地理位置，请确认授权，否则地图功能将无法使用',
                showCancel: false,
                success: function (tip){
                  console.log(tip);
                  if (tip.confirm){
                    wx.openSetting({//打开手机授权设置
                      success : function (res){
                        console.log(res);
                        if (res.authSetting["scope.userLocation"] === true){
                          wx.showToast({
                            title: '授权成功',
                            icon: 'success',
                            duration: 1000,
                          });
                          //授权成功之后，再调用chooseLocation选择地方
                          wx.chooseLocation({
                            success: function(res) {
                              console.log(res);

                              // var address = res.address.substring(3);
                              // console.log(address);
                              that.setData({
                                business_addr: res.address,
                                latitude: res.latitude,
                                longitude: res.longitude,
                              });
                              console.log(that.data.business_addr);
                              console.log(that.data.latitude);
                              console.log(that.data.longitude);
                              console.log("888");
                            },
                          })
                        }
                      }
                    })
                  } else {
                    wx.showToast({
                      title: '授权失败',
                      icon: 'success',
                      duration: 1000,
                    })
                  }
                },
                fail: function (){
                  wx.showToast({
                    title: '调用授权窗口失败',
                    icon: 'success',
                    duration: 1000,
                  })
                }
              })
            }
          },
          fail: function(){
            console.log("fail1");
            
          }
        });
        }
    })
  },

  //值改变时,将改变的值实时存入js的data，
  bindinput: function (e){
    console.log(e);
    switch(e.currentTarget.id){
      case "input_0":
        this.setData({
          business_name: e.detail.value,
        });
        break;
      case "input_1":
        // console.log(util.judgebusiness_phone(e.detail.value));
        // var value = e.detail.value.replace(/\D/g,'');
        // console.log(value);
        this.setData({
          business_phone: e.detail.value,
        });
        break;
      case "input_2":
        this.setData({
          business_qq: e.detail.value,
        });
        break;
      case "input_3":
        this.setData({
          business_store: e.detail.value,
        });
        break;
      case "textarea_0":
        this.setData({
          business_message: e.detail.value,
        });
        break;
    }
  },

  // //加盟人基本信息,聚焦时去除占位符，(如果有值则不去除，提高性能)
  // bindfoucs_inp: function (e) {
  //   var that = this;
  //   console.log(e);
  //   console.log(typeof (e.currentTarget.id));
  //   //判断4个输入框中的哪一个
  //   switch(e.currentTarget.id){
  //     case "input_0":
  //       if(that.data.business_name == ""){
  //         that.setData({
  //           pla_0: "",
  //         });
  //       }
  //       break;
  //     case "input_1":
  //       if (that.data.business_phone == "") {
  //         that.setData({
  //           pla_1: "",
  //         });
  //       }
  //       break;
  //     case "input_2":
  //       if (that.data.business_qq == "") {
  //         that.setData({
  //           pla_2: "",
  //         });
  //       }
  //       break;
  //     case "textarea_0":
  //       if (that.data.business_message == "") {
  //         that.setData({
  //           tex: "",
  //         });
  //         console.log(1);
  //       }
  //       break;
  //   }
  // },

  // //失去焦点，恢复占位符
  // bindblur: function (e){
  //   console.log(e);
  //   var that = this;
  //   switch(e.currentTarget.id){
  //     case "input_0":
  //       if(that.data.business_name == ""){
  //         that.setData({
  //           pla_0: "请输入姓名",
  //         });
  //       }
  //   }
  // },

  //提交表单
  submit: function (e){
    var that = this;
    if(this.data.business_name == ""){
      wx.showToast({
        title: '请输入姓名',
        icon: 'none',
        duration: 1000
      })
    } else if (this.data.business_phone == "") {
      wx.showToast({
        title: '请输入电话',
        icon: 'none',
        duration: 1000
      })
    } else if (this.data.business_qq == "") {
      wx.showToast({
        title: '请输入qq',
        icon: 'none',
        duration: 1000
      })
    } else if (this.data.bus == "") {
      wx.showToast({
        title: '请输入店名',
        icon: 'none',
        duration: 1000
      })
    } else if (this.data.business_addr == "请选择店铺地址") {
      wx.showToast({
        title: '请选择店铺地址',
        icon: 'none',
        duration: 1000
      })
    } else if (!(util.judgePhone(this.data.business_phone))){
      wx.showToast({
        title: '电话格式错误',
        icon: 'none',
        duration: 1000
      })
    } else if (!(util.judgeQQ(this.data.business_qq))){
      wx.showToast({
        title: 'qq格式错误',
        icon: 'none',
        duration: 1000
      })
    } else{
      wx.request({
        url: app.globalData.urls + '/api/join/insert',
        data: {
          business_name: that.data.business_name,
          business_phone: that.data.business_phone,
          business_qq: that.data.business_qq,
          business_store: that.data.business_store,
          business_addr: that.data.business_addr,
          business_message: that.data.business_message,
          latitude: that.data.latitude,
          longitude: that.data.longitude,
        },
        header: {
          "token": app.globalData.token,
          'content-type': 'application/x-www-form-urlencoded'
        },
        method: "POST",
        dataType: 'json',
        success: function (e) {
          console.log(e);
          console.log("成功");
        },
        fail: function (e){
          console.log(e);
          console.log("失败");
        }
      })
    }
    
  },

  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})

