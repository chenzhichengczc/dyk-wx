var map = require('./amap-wx.js')

function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}



function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

//生成房间号
const randomRoomId = rId => {
  return Math.floor(Math.random() * 100000000);
}

//生成订单号
const orderRoomId = oId => {
  return Math.floor(Math.random() * 100000000);
}

//电话正则-提交时
function judgePhone(phone) {
  var regex = /^1[3456789]\d{9}$/;
  return regex.test(phone);
}

//电话正则-值改变时
// function judgePhoneRealtime(phone) {
//   var regex = /^1[3456789]\d{9}$/;
//   return regex.test(phone);
// }

//qq正则-提交时
function judgeQQ(qq){
  var regex = /^[1-9][0-9]{4,10}$/;
  return regex.test(qq);
}

//qq正则-值改变时
// function judgeQQRealtime(qq) {
//   var regex = /^[1-9][0-9]{4,10}$/;
//   return regex.test(qq);
// }

module.exports = {
  formatTime: formatTime,
  randomRoomId: randomRoomId,
  orderRoomId: orderRoomId,
  judgePhone: judgePhone,
  judgeQQ: judgeQQ,
}



