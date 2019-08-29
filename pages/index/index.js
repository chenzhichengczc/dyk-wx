//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    width: app.systemInfo.windowWidth,
    height: app.systemInfo.windowHeight,
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
    }

  },
  goodDetail(event) {
    wx.navigateTo({
      url: '',
    })
  }

})