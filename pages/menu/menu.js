// pages/goods/goods.js

var pages = getCurrentPages();
var currPage = pages[pages.length -1];
var prevPge = pages[pages.length -2];

Page({
  data: {
    goods: [{
        "name": "咖啡/奶茶",
        "type": -1,
        "foods": [{
          "name": "手磨咖啡",
          "price": 16,
          "oldPrice": "20",
          "description": "纯正coffee",
          "address": "广州番禺区七号小镇G栋22.22",
          "sellCount": 229,
          "Count": 0,
          "rating": 100,
          "icon": "../../images/food1.jpg",
          "image": "../../images/food1.jpg"
        }, ]
      },
      {
        "name": "快餐/便餐",
        "type": 2,
        "foods": [{
          "name": "实惠快餐",
          "price": 15,
          "oldPrice": 20,
          "description": "聚众填肚子好地方",
          "address": "广州番禺区七号小镇A栋快客诚品",
          "sellCount": 17,
          "Count": 0,
          "rating": 100,
          "info": "",
          "icon": "../../images/food2.jpg",
          "image": "../../images/food2.jpg"
        }]
      },
    ],
    toView: '0',
    scrollTop: 100,
    foodCounts: 0,
    totalPrice: 0, // 总价格
    totalCount: 0, // 总商品数
    carArray: [],
    minPrice: 0, //起送價格
    payDesc: '',
    deliveryPrice: 0, //配送費
    fold: true,
    selectFoods: [{
      price: 20,
      count: 2
    }],
    cartShow: 'none',
    status: 0,
  },
  selectMenu: function(e) {
    var index = e.currentTarget.dataset.itemIndex;
    this.setData({
      toView: 'order' + index.toString()
    })
    console.log(this.data.toView);
  },
  //移除商品
  decreaseCart: function(e) {
    var index = e.currentTarget.dataset.itemIndex;
    var parentIndex = e.currentTarget.dataset.parentindex;
    this.data.goods[parentIndex].foods[index].Count--;
    var num = this.data.goods[parentIndex].foods[index].Count;
    var mark = 'a' + index + 'b' + parentIndex
    var price = this.data.goods[parentIndex].foods[index].price;
    var obj = {
      price: price,
      num: num,
      mark: mark,
      index: index,
      parentIndex: parentIndex
    };
    var carArray1 = this.data.carArray.filter(item => item.mark != mark);
    carArray1.push(obj);
    console.log(carArray1);
    this.setData({
      carArray: carArray1,
      goods: this.data.goods
    })
    this.calTotalPrice()
    this.setData({
      payDesc: this.payDesc(),
    })
    //关闭弹起
    var count1 = 0
    for (let i = 0; i < carArray1.length; i++) {
      if (carArray1[i].num == 0) {
        count1++;
      }
    }
    //console.log(count1)
    if (count1 == carArray1.length) {
      if (num == 0) {
        this.setData({
          cartShow: 'none'
        })
      }
    }
  },
  decreaseShopCart: function(e) {
    console.log('1');
    this.decreaseCart(e);
  },
  //添加到购物车
  addCart(e) {
    var index = e.currentTarget.dataset.itemIndex;
    var parentIndex = e.currentTarget.dataset.parentindex;
    this.data.goods[parentIndex].foods[index].Count++;
    var mark = 'a' + index + 'b' + parentIndex
    var price = this.data.goods[parentIndex].foods[index].price;
    var num = this.data.goods[parentIndex].foods[index].Count;
    var name = this.data.goods[parentIndex].foods[index].name;
    var obj = {
      price: price,
      num: num,
      mark: mark,
      name: name,
      index: index,
      parentIndex: parentIndex
    };
    var carArray1 = this.data.carArray.filter(item => item.mark != mark)
    carArray1.push(obj)
    console.log(carArray1);
    this.setData({
      carArray: carArray1,
      goods: this.data.goods
    })
    this.calTotalPrice();
    this.setData({
      payDesc: this.payDesc()
    })
  },
  addShopCart: function(e) {
    this.addCart(e);
  },
  //计算总价
  calTotalPrice: function() {
    var carArray = this.data.carArray;
    var totalPrice = 0;
    var totalCount = 0;
    for (var i = 0; i < carArray.length; i++) {
      totalPrice += carArray[i].price * carArray[i].num;
      totalCount += carArray[i].num
    }
    this.setData({
      totalPrice: totalPrice,
      totalCount: totalCount,
      //payDesc: this.payDesc()
    });
  },
  //差几元起送
  payDesc() {
    return '我已经选择好了';
  },
  //确定好后返回
  pay(e) {
    
    var carArray = this.data.carArray;
    let pages = getCurrentPages();
    let prePage = pages[pages.length - 2];

    prePage.setData({
      totalPrice : e.currentTarget.dataset.totalprice,
      carArray : JSON.stringify(carArray)  
    })

    //wx.setStorage('totalPrice', e.currentTarget.dataset.totalPrice)
    // window.alert('支付' + this.totalPrice + '元');
    wx.navigateBack({
      delta : 1
    })
  },
  //彈起購物車
  toggleList: function() {
    if (!this.data.totalCount) {
      return;
    }
    this.setData({
      fold: !this.data.fold,
    })
    var fold = this.data.fold
    //console.log(this.data.fold);
    this.cartShow(fold)
  },
  cartShow: function(fold) {
    console.log(fold);
    if (fold == false) {
      this.setData({
        cartShow: 'block',
      })
    } else {
      this.setData({
        cartShow: 'none',
      })
    }
    console.log(this.data.cartShow);
  },
  tabChange: function(e) {
    var showtype = e.target.dataset.type;
    this.setData({
      status: showtype,
    });
  },
  empty: function(e) {
    this.setData({
      totalCount: 0,
      carArray: [],
      cartShow: 'none',
      totalPrice: 0
    });
  },
  onLoad: function(options) {
    // 页面初始化 options为页面跳转所带来的参数
    this.setData({
      payDesc: this.payDesc()
    });
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
    wx.hideShareMenu();
  },
  onReady: function() {
    // 页面渲染完成
  },
  onShow: function() {
    // 页面显示
  },
  onHide: function() {
    // 页面隐藏
  },
  onUnload: function() {
    // 页面关闭
  }
})