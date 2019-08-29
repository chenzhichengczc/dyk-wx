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

module.exports = {
  formatTime: formatTime,
  randomRoomId: randomRoomId,
  orderRoomId: orderRoomId
}