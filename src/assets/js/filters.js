const fullTime = val => {
  var dateObj = new Date(Number(val))
  var year = dateObj.getFullYear()
  var month =
    dateObj.getMonth() + 1 > 9
      ? (dateObj.getMonth() + 1).toString()
      : '0' + (dateObj.getMonth() + 1).toString()
  var date =
    dateObj.getDate() > 9
      ? dateObj.getDate().toString()
      : '0' + dateObj.getDate().toString()
  var hour =
    dateObj.getHours() > 9
      ? dateObj.getHours().toString()
      : '0' + dateObj.getHours().toString()
  var minutes =
    dateObj.getMinutes() > 9
      ? dateObj.getMinutes().toString()
      : '0' + dateObj.getMinutes().toString()

  return year + '/' + month + '/' + date + '  ' + hour + ':' + minutes
}

/* 计算年龄 */
const calcAge = t => {
  if (t == null) return ''
  var today = new Date()
  var born = new Date(t)

  if (born > today.getTime()) {
    return -1
  }
  var age = today.getFullYear() - born.getFullYear()
  if (
    today.getMonth() * 100 +
      today.getDate() -
      (born.getMonth() * 100 + born.getDate()) <
    0
  ) {
    age -= 1
    if (age < 0) {
      age = 0
    }
  }
  return age
}

/**
 * @desc 字典查询函数
 *
 * @param {Array} dict    // {code: CODE, name: NAME}
 * @param {String | Number} code
 * @return {ALL} name
 *
 * @example
 * codeToName([{code: a, name: 'this is a'}], 'a')    // 'this is a'
 */

const codeToName = (dict, code) => {
  var dict = dict || []
  for (var i = 0, len = dict.length; i < len; i++) {
    if (dict[i].code === code) {
      return dict[i].name
    }
  }
  return null
}

/* 解析性别 */
const parseSex = sexVal => {
  var dict = [
    { code: 0, name: '保密' },
    { code: 1, name: '男' },
    { code: 2, name: '女' }
  ]
  return codeToName(dict, sexVal)
}

/**
 * @desc： Format price.
 * @param {String} price
 * @param {String} currency
 * @param {Number} decimals
 * @return {String}
 *
 * @example priceFormat('12345.67890', '$', 3)    // '$12,345.679'
 */
const priceFormat = (price, currency, decimals) => {
  price = parseFloat(price)
  if ((!price && price !== 0) || !isFinite(price)) return ''
  currency = currency != null ? currency : '￥'
  decimals = decimals != null ? decimals : 2
  var sign = price < 0 ? '-' : ''
  var str = Math.abs(price).toFixed(decimals)
  var _int = decimals ? str.slice(0, -1 - decimals) : ''
  var _float = decimals ? str.slice(-1 - decimals) : ''
  var i = _int.length % 3
  var head = i > 0 ? _int.slice(0, i) + (_int.length > 3 ? ',' : '') : ''
  var mid = _int.slice(i).replace(/(\d{3})(?=\d)/g, '$1,')
  return sign + currency + head + mid + _float
}

/**
 * @desc: Date format
 * @param {Date | Number} date
 * @param {string} fmt 目标字符串格式,默认：yyyy-MM-dd hh:mm:ss
 * @returns {string} 返回格式化后的日期字符串
 *
 * @example
 * dateFormat(0, "yyyy年MM月dd日 第q季度")    // "1970年01月01日 第1季度"
 *
 * @support:
 * yyyy：年
 * q: 季度
 * MM：月
 * dd：日
 * hh: 时
 * mm：分
 * ss：秒
 * S：毫秒
 */
const dateFormat = function(date, fmt) {
  if (!Date.prototype.Format) {
    Object.defineProperty(Date.prototype, 'Format', {
      enumerable: false,
      configurable: false,
      writable: false,
      value: function(fmt) {
        var f = fmt != null ? fmt : 'yyyy-MM-dd hh:mm:ss'
        var o = {
          'q+': Math.floor((this.getMonth() + 3) / 3), // 季度
          'M+': this.getMonth() + 1, // 月份
          'd+': this.getDate(), // 日
          'h+': this.getHours(), // 时
          'm+': this.getMinutes(), // 分
          's+': this.getSeconds(), // 秒
          S: this.getMilliseconds() //毫秒
        }
        if (/(y+)/.test(f)) {
          f = f.replace(
            RegExp.$1,
            (this.getFullYear() + '').substr(4 - RegExp.$1.length)
          )
        }
        for (var k in o) {
          if (new RegExp('(' + k + ')').test(f)) {
            f = f.replace(
              RegExp.$1,
              RegExp.$1.length == 1
                ? o[k]
                : ('00' + o[k]).substr(('' + o[k]).length)
            )
          }
        }
        return f
      }
    })
  }
  let d = Date.prototype.isPrototypeOf(date) ? date : new Date(date)
  return d.getTime() === d.getTime() ? d.Format(fmt) : ''
}

const recipeType = (val, data, type) => {
  var typeList = [
    { code: 1, name: '中药处方' },
    { code: 2, name: '中成药西药' },
    { code: 3, name: '产品处方' },
    { code: 4, name: '诊疗项目' },
    { code: 5, name: '附加服务' },
    { code: 6, name: '材料处方' }
  ]
  var result = typeList.filter(item => {
    return item.code === val
  })
  if (val == 1) {
    if (data.category == 1) {
      return '中药饮片'
    } else if (data.category == 2) {
      return '配方颗粒'
    }
  } else if (val == 3) {
    if (type == 6) {
      return '营养处方'
    } else {
      return '产品处方'
    }
  } else if (val == 4) {
    if (data.type == 1) {
      return '治疗处方'
    } else if (data.type == 2) {
      return '检验处方'
    } else if (data.type == 3) {
      return '检查处方'
    }
  }
  return result[0].name
}

const productCategory = val => {
  var categoryList = [
    { code: 1, name: '中药协定方' },
    { code: 2, name: '养生产品' },
    { code: 3, name: '医疗器械' }
  ]
  var result = categoryList.filter(item => {
    return item.code === val
  })
  if (result.length === 0) {
    return ''
  } else {
    return result[0].name
  }
}
const therapyType = val => {
  var therapyTypeList = [
    { code: 1, name: '治疗' },
    { code: 2, name: '检验' },
    { code: 3, name: '检查' },
    { code: 4, name: '其他' }
  ]
  var result = therapyTypeList.filter(item => {
    return item.code === val
  })
  if (result.length === 0) {
    return ''
  } else {
    return result[0].name
  }
}
module.exports = {
  fullTime,
  recipeType,
  calcAge,
  parseSex,
  priceFormat,
  dateFormat,
  productCategory,
  therapyType
}
