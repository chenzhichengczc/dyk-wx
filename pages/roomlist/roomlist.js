const app = getApp();

Page({

  data: {
    selectedNav: '00',
    width: app.systemInfo.windowWidth,
    showspinner: false,
    nearby: [{
        name: '附近（智能范围）',
        id: 'a01',
      },
      {
        name: '500米',
        id: 'a02',
      },
      {
        name: '1000米',
        id: 'a03',
      },
      {
        name: '2000米',
        id: 'a04',
      },
      {
        name: '5000米',
        id: 'a05',
      },
    ],
    sort: [{
        name: '全部',
        id: 'b00'
      },
      {
        name: '婚礼策划',
        id: 'b01'
      },
      {
        name: '婚纱摄影',
        id: 'b02'
      },
      {
        name: '婚宴酒店',
        id: 'b03'
      },
      {
        name: '婚礼用车',
        id: 'b04'
      },
      {
        name: '婚礼用品',
        id: 'b05'
      },
      {
        name: '金银首饰',
        id: 'b06'
      },
    ],
    rank: [{
        name: '智能排序',
        id: 'c00',
      },
      {
        name: '离我最近',
        id: 'c01',
      },
      {
        name: '人气最高',
        id: 'c02',
      },
      {
        name: '评价最好',
        id: 'c03',
      },
      {
        name: '人均最低',
        id: 'c04',
      },
      {
        name: '人均最高',
        id: 'c05',
      },
    ],
    spinners: [],
    roomlist: [{
        name: '仁和春天酒店·婚宴',
        photo: 'http://p0.meituan.net/wedding/d577b0c3f3f5c382f7b33ed0d54366843826610.jpg%40630w_380h_1e_1c_1l%7Cwatermark%3D0',
        star: 4.4,
        price: '1599元/桌起',
        buztype: '星级酒店',
        km: '1.6km',
      }
    ]
  },

  onLoad : function(){

    var that = this;

    wx.request({
      url: app.globalData.urls + '/api/room/list',
      success : function(res){
        console.log(res)
        if(res.data.code == 0){
          that.setData({
            //roomlist: res.data.data
          })
        }
        
      }
    })

  },

  navitation(event) {
    let id = event.currentTarget.dataset.id;
    const that = this;
    console.log(id);
    if (id == that.data.selectedNav) {
      id = '00';
      that.setData({
        showspinner: false,
      })
    } else {
      that.setData({
        showspinner: true,
      })
    }
    console.log(id);
    that.setData({
      selectedNav: id,
    })
    let temps = that.data.spinners;
    if (id == '02') {
      temps = that.data.sort;
    } else if (id == '03') {
      temps = that.data.rank;
    } else if (id == '01') {
      temps = that.data.nearby;
    }
    that.setData({
      spinners: temps,
    })
  },

  spinnerclick(event) {
    const that = this;
    that.setData({
      showspinner: false,
    })
  },

  storelick(event) {
    const that = this;
    wx.navigateTo({
      url: '../roomdetail/roomdetail',
    })
  }
})