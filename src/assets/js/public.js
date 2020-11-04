function deepClone (data) {
    var leg = Object.prototype.toString.call(data).toString().length // 6月30号改的类型判断
    var type = Object.prototype.toString.call(data).toString().slice(8, leg - 1)
    // var type = typeof (data) //第一版的类型判断
    var obj
    if (type === 'Array') {
      obj = []
    } else if (type === 'Object') {
      obj = {}
    } else {
      // 不再具有下一层次
      return data
    }
    if (type === 'Array') {
      for (var i = 0, len = data.length; i < len; i++) {
        obj.push(deepClone(data[i]))
      }
    } else if (type === 'Object') {
      for (var key in data) {
        obj[key] = deepClone(data[key])
      }
    }
    return obj
  }

  export default function (Vue) {
    // 添加全局API
    Vue.prototype.$public = {
      deepClone,
    }
  }