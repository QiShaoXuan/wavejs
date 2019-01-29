export function getColor(): Array<string> {
  return ['rgba(162,237,246,.2)', 'rgba(31,166,196,.2)', 'rgba(13,71,130,.2)']
}


export function colorHex(color:string):string {
  var that = color
  //十六进制颜色值的正则表达式
  var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/
  // 如果是rgb颜色表示
  if (/^(rgb|RGB)/.test(that)) {
    var aColor = that.replace(/(?:\(|\)|rgb|RGB)*/g, "").split(",")
    var strHex = "#"
    for (var i = 0; i < aColor.length; i++) {
      var hex = Number(aColor[i]).toString(16)
      if (hex.length < 2) {
        hex = '0' + hex
      }
      strHex += hex
    }
    if (strHex.length !== 7) {
      strHex = that
    }
    return strHex
  } else if (reg.test(that)) {
    var aNum = that.replace(/#/, "").split("")
    if (aNum.length === 6) {
      return that
    } else if (aNum.length === 3) {
      var numHex = "#"
      for (var i = 0; i < aNum.length; i += 1) {
        numHex += (aNum[i] + aNum[i])
      }
      return numHex
    }
  }
  return that
}

export function colorRgb(color:string,opacity:number):string {
  var sColor = color.toLowerCase()
  //十六进制颜色值的正则表达式
  var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/
  // 如果是16进制颜色
  if (sColor && reg.test(sColor)) {
    if (sColor.length === 4) {
      var sColorNew = "#"
      for (var i = 1; i < 4; i += 1) {
        sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1))
      }
      sColor = sColorNew
    }
    //处理六位的颜色值
    var sColorChange = []
    for (var i = 1; i < 7; i += 2) {
      sColorChange.push(parseInt("0x" + sColor.slice(i, i + 2)))
    }
    return `rgba(${sColorChange.join(",")},${opacity})`
  }
  return sColor
}
