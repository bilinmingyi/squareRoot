/* 从诊所复制带来需要保存的代码 */
import vue from 'vue'
var appRoot = ''
/* 从诊所复制带来需要保存的代码 */

var printRendering = function(type, dataObj, vue, fn) {
  var typeList = {
    patientHistory: 1,
    herbalRecipe: 2,
    westernRecipe: 3,
    textRecipe: 4,
    examineRecipe: 5,
    treatRecipe: 6,
    textApply: 7,
    examineApply: 8,
    treatApply: 9,
    materialRecipe: 10,
    registration: 11,
    chargeBill: 12,
    chargeList: 13,
    warehouseRecipet: 14
  }
  var self = this
  this.type = type
  this.dataObj = dataObj
  this.template = {
    pageContent: {
      header: [],
      middler: [],
      footer: []
    },
    sizeType: 'A5',
    pageHeight: 210,
    pageWidth: 148,
    printType: 1
  }
  this.fn = fn ? fn : function() {}

  var borderMap = {
    none: 'border: none;',
    top: 'border-top: 1px solid #000;',
    bottom: 'border-bottom: 1px solid #000;',
    all: 'border: 1px solid #000;'
  }

  this.formatData = function() {
    switch (this.type) {
      case 'patientHistory':
        var examination,
          examinatioStr = ''
        if (this.dataObj['$体格检查'] == '') {
          examinatioStr = ''
        } else {
          examination = JSON.parse(this.dataObj['$体格检查'])
          ;(examination.bloodpressure_num1 || examination.bloodpressure_num2) &&
            (examinatioStr +=
              '血压' +
              examination.bloodpressure_num1 +
              '/' +
              examination.bloodpressure_num2 +
              'mmHg，')
          examination.bloodglucose &&
            (examinatioStr += '血糖' + examination.bloodglucose + 'mg/ml，')
          examination.trioxypurine &&
            (examinatioStr += '尿酸' + examination.trioxypurine + 'umol/L，')
          examination.heartrate &&
            (examinatioStr += '心率' + examination.heartrate + '次/分，')
          examination.breathe &&
            (examinatioStr += '呼吸' + examination.breathe + '次/分，')
          examination.animalheat &&
            (examinatioStr += '体温' + examination.animalheat + '℃，')
          examination.weight &&
            (examinatioStr += '体重' + examination.weight + 'kg，')
          examination.info &&
            (examinatioStr += (examinatioStr ? '\n' : '') + examination.info)
        }
        this.dataObj['$体格检查'] = examinatioStr

        break
      case 'herbalRecipe':
        var itemList = JSON.parse(JSON.stringify(this.dataObj['$中药列表']))
        var itemStr = '<div style="width: 100%;height: auto;clear: both;">'
        itemList.forEach(function(med) {
          itemStr +=
            '<div style="float: left;width: 33.3%;line-height: 24px;"><span style="margin-right: 8px;">' +
            med.name +
            '</span><span style="margin-right: 8px;">' +
            med.num +
            med.unit +
            '</span><span>' +
            med.usage +
            '</span></div>'
        })
        itemStr += '</div>'
        this.dataObj['$中药列表'] = itemStr

        var examination,
          examinatioStr = ''
        if (this.dataObj['$体格检查'] == '') {
          examinatioStr = ''
        } else {
          examination = JSON.parse(this.dataObj['$体格检查'])
          ;(examination.bloodpressure_num1 || examination.bloodpressure_num2) &&
            (examinatioStr +=
              '血压' +
              examination.bloodpressure_num1 +
              '/' +
              examination.bloodpressure_num2 +
              'mmHg，')
          examination.bloodglucose &&
            (examinatioStr += '血糖' + examination.bloodglucose + 'mg/ml，')
          examination.trioxypurine &&
            (examinatioStr += '尿酸' + examination.trioxypurine + 'umol/L，')
          examination.heartrate &&
            (examinatioStr += '心率' + examination.heartrate + '次/分，')
          examination.breathe &&
            (examinatioStr += '呼吸' + examination.breathe + '次/分，')
          examination.animalheat &&
            (examinatioStr += '体温' + examination.animalheat + '℃，')
          examination.weight &&
            (examinatioStr += '体重' + examination.weight + 'kg，')
          examination.info &&
            (examinatioStr += (examinatioStr ? '\n' : '') + examination.info)
        }
        this.dataObj['$体格检查'] = examinatioStr

        break
      case 'westernRecipe':
        var isWest = this.dataObj['$成药列表'] ? 1 : 0
        var itemList = this.dataObj['$成药列表']
          ? JSON.parse(JSON.stringify(this.dataObj['$成药列表']))
          : JSON.parse(JSON.stringify(this.dataObj['$产品列表']))
        var itemStr = '<div style="width: 100%;height: auto;">'
        if (isWest == 1) {
          itemList.forEach(function(med, index) {
            itemStr +=
              '<div style="line-height: 24px;display: flex;">' +
              '<div style="margin-right: 8px">' +
              (index + 1) +
              '、</div>' +
              '<div>' +
              '<div><span style="margin-right: 15px;">' +
              med.name +
              '</span>' +
              '<span style="margin-right: 15px">' +
              med.spec +
              '</span>' +
              '<span style="margin-right: 15px;">' +
              med.num +
              med.unit +
              '</span></div>' +
              '<div style="margin-left: 15px;">用法：<span style="margin-right: 8px;">' +
              med.dose_once +
              '</span><span style="margin-right: 8px;">' +
              med.usage +
              '</span><span style="margin-right: 8px;">' +
              med.frequency +
              '</span><span style="margin-right: 8px;">' +
              (med.days ? '×' + med.days + '天' : '') +
              '</span></div>' +
              '</div>' +
              '</div>'
          })
        } else {
          itemList.forEach(function(med, index) {
            itemStr +=
              '<div style="line-height: 24px;display: flex;">' +
              '<div style="margin-right: 8px">' +
              (index + 1) +
              '、</div>' +
              '<div>' +
              '<div><span style="margin-right: 15px;">' +
              med.name +
              '</span>' +
              '<span style="margin-right: 15px">' +
              med.spec +
              '</span>' +
              '<span style="margin-right: 15px;">' +
              med.num +
              med.unit +
              '</span></div>' +
              '<div style="margin-left: 15px;">说明：</div>' +
              med.remark +
              '</div>' +
              '</div>'
          })
        }

        itemStr += '</div>'
        if (isWest == 1) {
          this.dataObj['$成药列表'] = itemStr
        } else {
          this.dataObj['$产品列表'] = itemStr
        }

        var examination,
          examinatioStr = ''
        if (this.dataObj['$体格检查'] == '') {
          examinatioStr = ''
        } else {
          examination = JSON.parse(this.dataObj['$体格检查'])
          ;(examination.bloodpressure_num1 || examination.bloodpressure_num2) &&
            (examinatioStr +=
              '血压' +
              examination.bloodpressure_num1 +
              '/' +
              examination.bloodpressure_num2 +
              'mmHg，')
          examination.bloodglucose &&
            (examinatioStr += '血糖' + examination.bloodglucose + 'mg/ml，')
          examination.trioxypurine &&
            (examinatioStr += '尿酸' + examination.trioxypurine + 'umol/L，')
          examination.heartrate &&
            (examinatioStr += '心率' + examination.heartrate + '次/分，')
          examination.breathe &&
            (examinatioStr += '呼吸' + examination.breathe + '次/分，')
          examination.animalheat &&
            (examinatioStr += '体温' + examination.animalheat + '℃，')
          examination.weight &&
            (examinatioStr += '体重' + examination.weight + 'kg，')
          examination.info &&
            (examinatioStr += (examinatioStr ? '\n' : '') + examination.info)
        }
        this.dataObj['$体格检查'] = examinatioStr

        break
      case 'materialRecipe':
        var itemList = JSON.parse(JSON.stringify(this.dataObj['$材料列表']))
        var itemStr = '<div style="width: 100%;height: auto;>'
        itemList.forEach(function(med, index) {
          itemStr +=
            '<div style="line-height: 24px;">' +
            '<span style="margin-right: 8px;">' +
            (index + 1) +
            '、</span><span style="margin-right: 30px;">' +
            med.name +
            '</span><span style="margin-right:30px;">' +
            med.num +
            med.unit +
            '</span><span>' +
            med.remark +
            '</span>' +
            '</div>'
        })
        itemStr += '</div>'
        this.dataObj['$材料列表'] = itemStr

        var examination,
          examinatioStr = ''
        if (this.dataObj['$体格检查'] == '') {
          examinatioStr = ''
        } else {
          examination = JSON.parse(this.dataObj['$体格检查'])
          ;(examination.bloodpressure_num1 || examination.bloodpressure_num2) &&
            (examinatioStr +=
              '血压' +
              examination.bloodpressure_num1 +
              '/' +
              examination.bloodpressure_num2 +
              'mmHg，')
          examination.bloodglucose &&
            (examinatioStr += '血糖' + examination.bloodglucose + 'mg/ml，')
          examination.trioxypurine &&
            (examinatioStr += '尿酸' + examination.trioxypurine + 'umol/L，')
          examination.heartrate &&
            (examinatioStr += '心率' + examination.heartrate + '次/分，')
          examination.breathe &&
            (examinatioStr += '呼吸' + examination.breathe + '次/分，')
          examination.animalheat &&
            (examinatioStr += '体温' + examination.animalheat + '℃，')
          examination.weight &&
            (examinatioStr += '体重' + examination.weight + 'kg，')
          examination.info &&
            (examinatioStr += (examinatioStr ? '\n' : '') + examination.info)
        }
        this.dataObj['$体格检查'] = examinatioStr

        break
      case 'treatRecipe':
        var itemList = JSON.parse(JSON.stringify(this.dataObj['$治疗项目列表']))
        var itemStr = '<div style="width: 100%;height: auto;>'
        itemList.forEach(function(med, index) {
          itemStr +=
            '<div style="line-height: 24px;">' +
            '<span style="margin-right: 8px;">' +
            (index + 1) +
            '、</span><span style="margin-right: 20px;">' +
            med.name +
            '</span>' +
            '<span style="margin-right: 20px;">' +
            med.num +
            '次</span>' +
            '<span>' +
            (med.remark ? '备注：' + med.remark : '') +
            '</span>' +
            '</div>'
        })
        this.dataObj['$治疗项目列表'] = itemStr

        var examination,
          examinatioStr = ''
        if (this.dataObj['$体格检查'] == '') {
          examinatioStr = ''
        } else {
          examination = JSON.parse(this.dataObj['$体格检查'])
          ;(examination.bloodpressure_num1 || examination.bloodpressure_num2) &&
            (examinatioStr +=
              '血压' +
              examination.bloodpressure_num1 +
              '/' +
              examination.bloodpressure_num2 +
              'mmHg，')
          examination.bloodglucose &&
            (examinatioStr += '血糖' + examination.bloodglucose + 'mg/ml，')
          examination.trioxypurine &&
            (examinatioStr += '尿酸' + examination.trioxypurine + 'umol/L，')
          examination.heartrate &&
            (examinatioStr += '心率' + examination.heartrate + '次/分，')
          examination.breathe &&
            (examinatioStr += '呼吸' + examination.breathe + '次/分，')
          examination.animalheat &&
            (examinatioStr += '体温' + examination.animalheat + '℃，')
          examination.weight &&
            (examinatioStr += '体重' + examination.weight + 'kg，')
          examination.info &&
            (examinatioStr += (examinatioStr ? '\n' : '') + examination.info)
        }
        this.dataObj['$体格检查'] = examinatioStr

        break
      case 'textRecipe':
        var itemList = JSON.parse(JSON.stringify(this.dataObj['$检验项目列表']))
        var itemStr = '<div style="width: 100%;height: auto;>'
        itemList.forEach(function(med, index) {
          itemStr +=
            '<div style="line-height: 24px;">' +
            '<span style="margin-right: 8px;">' +
            (index + 1) +
            '、</span><span style="margin-right: 20px;">' +
            med.name +
            '</span>' +
            '<span style="margin-right: 20px;">' +
            (med.sample ? '标本：' + med.sample : '') +
            '</span>' +
            '<span>' +
            (med.remark ? '备注：' + med.remark : '') +
            '</span>' +
            '</div>'
        })
        this.dataObj['$检验项目列表'] = itemStr

        var examination,
          examinatioStr = ''
        if (this.dataObj['$体格检查'] == '') {
          examinatioStr = ''
        } else {
          examination = JSON.parse(this.dataObj['$体格检查'])
          ;(examination.bloodpressure_num1 || examination.bloodpressure_num2) &&
            (examinatioStr +=
              '血压' +
              examination.bloodpressure_num1 +
              '/' +
              examination.bloodpressure_num2 +
              'mmHg，')
          examination.bloodglucose &&
            (examinatioStr += '血糖' + examination.bloodglucose + 'mg/ml，')
          examination.trioxypurine &&
            (examinatioStr += '尿酸' + examination.trioxypurine + 'umol/L，')
          examination.heartrate &&
            (examinatioStr += '心率' + examination.heartrate + '次/分，')
          examination.breathe &&
            (examinatioStr += '呼吸' + examination.breathe + '次/分，')
          examination.animalheat &&
            (examinatioStr += '体温' + examination.animalheat + '℃，')
          examination.weight &&
            (examinatioStr += '体重' + examination.weight + 'kg，')
          examination.info &&
            (examinatioStr += (examinatioStr ? '\n' : '') + examination.info)
        }
        this.dataObj['$体格检查'] = examinatioStr

        break
      case 'examineRecipe':
        var itemList = JSON.parse(JSON.stringify(this.dataObj['$检查项目列表']))
        var itemStr = '<div style="width: 100%;height: auto;>'
        itemList.forEach(function(med, index) {
          itemStr +=
            '<div style="line-height: 24px;">' +
            '<span style="margin-right: 8px;">' +
            (index + 1) +
            '、</span><span style="margin-right: 20px;">' +
            med.name +
            '</span>' +
            '<span style="margin-right: 20px;">' +
            (med.position ? '部位：' + med.position : '') +
            '</span>' +
            '<span>' +
            (med.remark ? '备注：' + med.remark : '') +
            '</span>' +
            '</div>'
        })
        this.dataObj['$检查项目列表'] = itemStr

        var examination,
          examinatioStr = ''
        if (this.dataObj['$体格检查'] == '') {
          examinatioStr = ''
        } else {
          examination = JSON.parse(this.dataObj['$体格检查'])
          ;(examination.bloodpressure_num1 || examination.bloodpressure_num2) &&
            (examinatioStr +=
              '血压' +
              examination.bloodpressure_num1 +
              '/' +
              examination.bloodpressure_num2 +
              'mmHg，')
          examination.bloodglucose &&
            (examinatioStr += '血糖' + examination.bloodglucose + 'mg/ml，')
          examination.trioxypurine &&
            (examinatioStr += '尿酸' + examination.trioxypurine + 'umol/L，')
          examination.heartrate &&
            (examinatioStr += '心率' + examination.heartrate + '次/分，')
          examination.breathe &&
            (examinatioStr += '呼吸' + examination.breathe + '次/分，')
          examination.animalheat &&
            (examinatioStr += '体温' + examination.animalheat + '℃，')
          examination.weight &&
            (examinatioStr += '体重' + examination.weight + 'kg，')
          examination.info &&
            (examinatioStr += (examinatioStr ? '\n' : '') + examination.info)
        }
        this.dataObj['$体格检查'] = examinatioStr

        break
      case 'textApply':
        var examination,
          examinatioStr = ''
        if (this.dataObj['$体格检查'] == '') {
          examinatioStr = ''
        } else {
          examination = JSON.parse(this.dataObj['$体格检查'])
          ;(examination.bloodpressure_num1 || examination.bloodpressure_num2) &&
            (examinatioStr +=
              '血压' +
              examination.bloodpressure_num1 +
              '/' +
              examination.bloodpressure_num2 +
              'mmHg，')
          examination.bloodglucose &&
            (examinatioStr += '血糖' + examination.bloodglucose + 'mg/ml，')
          examination.trioxypurine &&
            (examinatioStr += '尿酸' + examination.trioxypurine + 'umol/L，')
          examination.heartrate &&
            (examinatioStr += '心率' + examination.heartrate + '次/分，')
          examination.breathe &&
            (examinatioStr += '呼吸' + examination.breathe + '次/分，')
          examination.animalheat &&
            (examinatioStr += '体温' + examination.animalheat + '℃，')
          examination.weight &&
            (examinatioStr += '体重' + examination.weight + 'kg，')
          examination.info &&
            (examinatioStr += (examinatioStr ? '\n' : '') + examination.info)
        }
        this.dataObj['$体格检查'] = examinatioStr
        break
      case 'examineApply':
        var examination,
          examinatioStr = ''
        if (this.dataObj['$体格检查'] == '') {
          examinatioStr = ''
        } else {
          examination = JSON.parse(this.dataObj['$体格检查'])
          ;(examination.bloodpressure_num1 || examination.bloodpressure_num2) &&
            (examinatioStr +=
              '血压' +
              examination.bloodpressure_num1 +
              '/' +
              examination.bloodpressure_num2 +
              'mmHg，')
          examination.bloodglucose &&
            (examinatioStr += '血糖' + examination.bloodglucose + 'mg/ml，')
          examination.trioxypurine &&
            (examinatioStr += '尿酸' + examination.trioxypurine + 'umol/L，')
          examination.heartrate &&
            (examinatioStr += '心率' + examination.heartrate + '次/分，')
          examination.breathe &&
            (examinatioStr += '呼吸' + examination.breathe + '次/分，')
          examination.animalheat &&
            (examinatioStr += '体温' + examination.animalheat + '℃，')
          examination.weight &&
            (examinatioStr += '体重' + examination.weight + 'kg，')
          examination.info &&
            (examinatioStr += (examinatioStr ? '\n' : '') + examination.info)
        }
        this.dataObj['$体格检查'] = examinatioStr
        break
      case 'treatApply':
        var examination,
          examinatioStr = ''
        if (this.dataObj['$体格检查'] == '') {
          examinatioStr = ''
        } else {
          examination = JSON.parse(this.dataObj['$体格检查'])
          ;(examination.bloodpressure_num1 || examination.bloodpressure_num2) &&
            (examinatioStr +=
              '血压' +
              examination.bloodpressure_num1 +
              '/' +
              examination.bloodpressure_num2 +
              'mmHg，')
          examination.bloodglucose &&
            (examinatioStr += '血糖' + examination.bloodglucose + 'mg/ml，')
          examination.trioxypurine &&
            (examinatioStr += '尿酸' + examination.trioxypurine + 'umol/L，')
          examination.heartrate &&
            (examinatioStr += '心率' + examination.heartrate + '次/分，')
          examination.breathe &&
            (examinatioStr += '呼吸' + examination.breathe + '次/分，')
          examination.animalheat &&
            (examinatioStr += '体温' + examination.animalheat + '℃，')
          examination.weight &&
            (examinatioStr += '体重' + examination.weight + 'kg，')
          examination.info &&
            (examinatioStr += (examinatioStr ? '\n' : '') + examination.info)
        }
        this.dataObj['$体格检查'] = examinatioStr
        break
      case 'registration':
        break
      case 'chargeBill':
        var priceStr = this.dataObj['$应收金额大写'].toFixed(2).toString()
        var chinaNum = [
          '零',
          '壹',
          '贰',
          '叁',
          '肆',
          '伍',
          '陆',
          '柒',
          '捌',
          '玖'
        ]
        var chinaUnit = [
          '分',
          '角',
          '元',
          '拾',
          '佰',
          '仟',
          '万',
          '拾',
          '佰',
          '仟'
        ]
        var resultList = []
        for (var i = 0; i < priceStr.length; i++) {
          if (priceStr[i] != '.') {
            resultList.unshift(chinaNum[priceStr[i]])
          }
        }
        var itemStr = ''
        resultList.forEach(function(item, index) {
          itemStr =
            '<span>' +
            item +
            '</span>' +
            '<span style="opacity:' +
            this.template.printType +
            ';">' +
            resultList[index] +
            '</span>' +
            itemStr
        })

        itemStr = '<div style="letter-spacing: 12px">' + itemStr + '</div>'
        this.dataObj['$应收金额大写'] = itemStr
        break
      case 'chargeList':
        var itemList = JSON.parse(JSON.stringify(this.dataObj['$药品清单']))
        var itemStr =
          '<div>' +
          '<section style="display: flex;margin-bottom: 5px;">' +
          '<div style="flex: 5;-ms-flex: 5;-webkit-flex: 5;padding-right: 2px;">名称</div>' +
          '<div style="flex: 3;-ms-flex: 3;-webkit-flex: 3;padding-right: 2px;">规格</div>' +
          '<div style="flex: 2;-ms-flex: 2;-webkit-flex: 2;padding-right: 2px;">数量</div>' +
          '<div style="flex: 2;-ms-flex: 2;-webkit-flex: 2;padding-right: 2px;">金额</div>' +
          '</section>'
        itemList.forEach(function(med) {
          itemStr +=
            '<div style="display: flex;margin-bottom: 5px">' +
            '<div style="flex: 5;-ms-flex: 5;-webkit-flex: 5;padding-right: 2px;">' +
            med.name +
            '</div>' +
            '<div style="flex: 3;-ms-flex: 3;-webkit-flex: 3;padding-right: 2px;">' +
            med.spec +
            '</div>' +
            '<div style="flex: 2;-ms-flex: 2;-webkit-flex: 2;padding-right: 2px;">' +
            med.num +
            med.unit +
            '</div>' +
            '<div style="flex: 2;-ms-flex: 2;-webkit-flex: 2;padding-right: 2px;">' +
            med.sale_price * med.stock_cost +
            '</div>' +
            '</div>'
        })
        itemStr += '</div>'
        this.dataObj['$药品清单'] = itemStr

        break
      case 'warehouseRecipet':
        var itemData = JSON.parse(JSON.stringify(this.dataObj['$入库药品列表']))
        var itemStr =
          '<table style="border-collapse: collapse;border-spacing: 0;empty-cells: show;width: 97%;margin: 0 auto;font-size: 14px;">' +
          '<thead style="text-align: center;background: #fff;border-bottom: 1px solid #000;">' +
          '<tr>' +
          '<th style="padding: 6px 0;font-weight: bold;">药品名称</th>' +
          (itemData.recipeType == 1
            ? '<th style="padding: 6px 0;font-weight: bold;">药品类别</th>'
            : '') +
          (itemData.recipeType == 2
            ? '<th style="padding: 6px 0;font-weight: bold;">生产产家</th>'
            : '') +
          '<th style="padding: 6px 0px;font-weight: bold;">规格</th>' +
          '<th style="padding: 6px 0px;font-weight: bold;">零售价</th>' +
          '<th style="padding: 6px 0px;font-weight: bold;">采购价</th>' +
          '<th style="padding: 6px 0px;font-weight: bold;">采购数量</th>' +
          '</tr>' +
          '</thead>' +
          '<tbody style="text-align: center">'
        itemData.forEach(function(med) {
          itemStr +=
            '<tr style="background: #FFFFFF;border-bottom: 1px solid #ccc;">' +
            '<td style="padding:3px 7px;">' +
            (med.clinicAliasName ? med.clinicAliasName : med.name) +
            '</td>' +
            (itemData.recipeType == 1
              ? '<td style="padding:3px 7px;">' + med.category + '</td>'
              : '') +
            (itemData.recipeType == 2
              ? '<td style="padding:3px 7px;">' + med.vender + '</td>'
              : '') +
            '<td style="padding:3px 7px;">' +
            med.spec +
            '</td>' +
            '<td style="padding:3px 7px;">' +
            med.salePrice +
            '</td>' +
            '<td style="padding:3px 7px;">' +
            med.costPrice +
            '</td>' +
            '<td style="padding:3px 7px;">' +
            med.num +
            '</td></tr>'
        })
        itemStr += '</tbody></table>'

        this.dataObj['$入库药品列表'] = itemStr
        break
    }
  }
  this.render = function() {
    // 插入style样式
    var resultStr =
      '<div id="print-template"><style id="print-style">.displayFlex {display: -webkit-box;display: -ms-flexbox;display: -webkit-flex;display: flex;word-wrap: break-word;}' +
      '.justify-content-center {-webkit-box-pack: center;-ms-flex-pack: center;-webkit-justify-content: center;justify-content: center;}' +
      '.justify-content-flex-end {-webkit-box-pack: end;-ms-flex-pack: end;-webkit-justify-content: flex-end;justify-content: flex-end;}' +
      '.justify-content-flex-start {-webkit-box-pack: start;-ms-flex-pack: start;-webkit-justify-content: flex-start;justify-content: flex-start;}' +
      '.align-items-flex-start {-webkit-box-align: start;-ms-flex-align: start;-webkit-align-items: flex-start;align-items: flex-start;}' +
      '.align-items-flex-end {-webkit-box-align: end;-ms-flex-align: end;-webkit-align-items: flex-end;align-items: flex-end;}' +
      '.align-items-center {-webkit-box-align: center;-ms-flex-align: center;-webkit-align-items: center;align-items: center;}' +
      '</style>'

    //页眉部分渲染
    resultStr += '<div class="print-header">'
    this.template.pageContent.header.forEach(function(line) {
      resultStr +=
        '<div class="displayFlex align-items-flex-start" style="' +
        borderMap[line.border] +
        'min-height: 5px;">'
      line.cellList.forEach(function(cell) {
        resultStr +=
          '<div class="displayFlex justify-content-' +
          cell.justifyContent +
          ' align-items-' +
          cell.alignItems +
          '" style="flex: ' +
          cell.flex +
          ';">'
        cell.itemContent.forEach(function(content, contentIndex) {
          resultStr +=
            content.type == 'image'
              ? '<img src="' +
                content.url +
                '" height="' +
                content.height +
                '" width="' +
                content.width +
                '">'
              : '<span style="white-space: pre-wrap;line-height: 120%;flex: ' +
                (['$中药列表', '$入库药品列表'].indexOf(content.value) >= 0
                  ? '1;'
                  : contentIndex == cell.itemContent.length - 1
                  ? 'unset;'
                  : '0 0 auto;') +
                'font-size: ' +
                content.fontSize +
                ';color: ' +
                content.color +
                ';font-weight: ' +
                content.fontWeight +
                ';">' +
                content.key +
                content.value +
                '</span>'
        })
        resultStr += '</div>'
      })
      resultStr += '</div>'
    })
    resultStr += '</div>'

    //内容模块渲染
    resultStr += '<div class="print-middle">'
    this.template.pageContent.middler.forEach(function(line) {
      resultStr +=
        '<div class="displayFlex align-items-flex-start" style="' +
        borderMap[line.border] +
        'min-height: 5px;">'
      line.cellList.forEach(function(cell) {
        resultStr +=
          '<div class="displayFlex justify-content-' +
          cell.justifyContent +
          ' align-items-' +
          cell.alignItems +
          '" style="flex: ' +
          cell.flex +
          ';">'
        cell.itemContent.forEach(function(content, contentIndex) {
          resultStr +=
            content.type == 'image'
              ? '<img src="' +
                content.url +
                '" height="' +
                content.height +
                '" width="' +
                content.width +
                '">'
              : '<span style="white-space: pre-wrap;line-height: 120%;flex: ' +
                (['$中药列表', '$入库药品列表'].indexOf(content.value) >= 0
                  ? '1;'
                  : contentIndex == cell.itemContent.length - 1
                  ? 'unset;'
                  : '0 0 auto;') +
                'font-size: ' +
                content.fontSize +
                ';color: ' +
                content.color +
                ';font-weight: ' +
                content.fontWeight +
                ';">' +
                content.key +
                content.value +
                '</span>'
        })
        resultStr += '</div>'
      })
      resultStr += '</div>'
    })
    resultStr += '</div>'

    //页脚部分渲染
    resultStr += '<div class="print-footer">'
    this.template.pageContent.footer.forEach(function(line) {
      resultStr +=
        '<div class="displayFlex align-items-flex-start" style="' +
        borderMap[line.border] +
        'min-height: 5px;">'
      line.cellList.forEach(function(cell) {
        resultStr +=
          '<div class="displayFlex justify-content-' +
          cell.justifyContent +
          ' align-items-' +
          cell.alignItems +
          '" style="flex: ' +
          cell.flex +
          ';">'
        cell.itemContent.forEach(function(content, contentIndex) {
          resultStr +=
            content.type == 'image'
              ? '<img src="' +
                content.url +
                '" height="' +
                content.height +
                '" width="' +
                content.width +
                '">'
              : '<span style="white-space: pre-wrap;line-height: 120%;flex: ' +
                (['$中药列表', '$入库药品列表'].indexOf(content.value) >= 0
                  ? '1;'
                  : contentIndex == cell.itemContent.length - 1
                  ? 'unset;'
                  : '0 0 auto;') +
                'font-size: ' +
                content.fontSize +
                ';color: ' +
                content.color +
                ';font-weight: ' +
                content.fontWeight +
                ';">' +
                content.key +
                content.value +
                '</span>'
        })
        resultStr += '</div>'
      })
      resultStr += '</div>'
    })
    resultStr += '</div>'

    resultStr += '</div>'

    // 做占位符替换
    Object.keys(this.dataObj).forEach(function(key) {
      resultStr = resultStr.replace(
        new RegExp('\\' + key, 'gm'),
        self.dataObj[key]
      )
    })
    // 回调函数执行
    this.fn(resultStr, this.template.pageWidth, this.template.pageHeight)
  }
  // 获取打印模板
  vue
    .post(appRoot + '/clinicmng/print/list', {
      type: typeList[type],
      not_use_default: 1,
      is_default: 0
    })
    .then(function(respone) {
      var res = respone.data
      if (res.code === 1000) {
        if (res.data.length !== 0) {
          self.template = JSON.parse(res.data[0].printContent)
          self.formatData()
          self.render()
        }
      } else {
        installModal('打印失败3，请重试！')
      }
    })
    .catch(function(error) {
      console.log(error)
      installModal('打印失败2，请重试！')
    })
}

/**
 * @desc 处方打印渲染函数，包括申请单
 *
 * @param {Object} vue    // vue对象，用于请求
 * @param {Object} recipe // 当前处方对象
 * @param {Object} order // 订单对象
 * @param {function} fn // 回调函数，可接受参数为（str: 返回模板字符串, width: 模板的宽度, height: 模板的高度）
 * @param {number} therapyIndex // 诊疗项目申请单索引值，有传值打印申请单，无传值打印处方单
 *
 * @example
 * printRecipe(vue, recipe, order, fn, therapyIndex)    //
 */

function printRecipe(vue, recipe, order, fn, therapyIndex) {
  var form = new FormData()
  fn = fn ? fn : function() {}
  form.append('patientId', order.patient_id)
  Promise.all([
    vue.post(appRoot + '/treatmng/patient/detail', form),
    vue.post(appRoot + '/clinicmng/user/doctorInfo', { id: order.doctor_id }),
    vue.post(appRoot + '/clinic/info')
  ])
    .then(function(respone) {
      if (
        respone[0].data.code == 1000 &&
        respone[1].data.code == 1000 &&
        respone[2].data.code == 1000
      ) {
        var patient = respone[0].data.data
        var doctor = respone[1].data.data
        var clinic = respone[2].data.data

        var commonVar = {
          $机构名称: clinic.name,
          $机构地址:
            clinic.city_name +
            '市' +
            clinic.county_name +
            '区' +
            clinic.address,
          $服务热线: clinic.customer_phone,
          $打印时间: new Date().format('yyyy-MM-dd hh:mm'),
          $年: new Date(order.create_time).format('yyyy'),
          $月: new Date(order.create_time).format('MM'),
          $日: new Date(order.create_time).format('dd'),
          $时: new Date(order.create_time).format('hh'),
          $分: new Date(order.create_time).format('mm'),
          $医保卡号: order.yb_card_no,
          $就诊订单号: order.order_seqno,
          $费别:
            order.pay_category == 1 && order.yb_pay_flag == 1 ? '医保' : '自费',
          $患者姓名: order.patient_name,
          $患者年龄: order.patient_age,
          $患者性别:
            order.patient_sex == 0
              ? '未知'
              : order.patient_sex == 1
              ? '男'
              : '女',
          $患者电话: order.patient_mobile,
          $患者地址:
            patient.province_name +
            '省' +
            patient.city_name +
            '市' +
            patient.county_name +
            '区' +
            patient.address,
          $医生姓名: order.doctor_name,
          $医生科室: doctor.department,
          $主诉: order.chief_complaint,
          $现病史: order.present_illness,
          $既往史: patient.past_history,
          $过敏史: patient.allergic_history,
          $个人史: patient.personal_history,
          $家族史: patient.family_history,
          $预防接种史: patient.prophylactic_history,
          $体格检查: order.examination,
          $辅助检查: order.auxiliary_examination,
          $中医诊断: order.diagnosis,
          $初步诊断: order.diagnosis_xy,
          $治疗处理: order.treat_advice,
          $运动建议: order.sport_advice,
          $膳食建议: order.dietary_advice,
          $病历号: order.order_seqno,
          $处方订单号:
            new Date(order.create_time).format('yyyyMMdd') +
            order.order_seqno.slice(-6),
          $处方金额: order.recipe_list[0].price,
          $医嘱: order.recipe_list[0].doctor_remark
        }

        switch (recipe.recipe_type) {
          case 1:
            return new printRendering(
              'herbalRecipe',
              Object.assign({}, commonVar, {
                $中药列表: recipe.herbal_list,
                $中药类型: recipe.category == 1 ? '饮片' : '颗粒',
                $中药剂数: recipe.dosage,
                $中药频次: recipe.frequency,
                $中药用法: recipe.usage,
                $中药用量: recipe.dose_once || recipe.eachDose
              }),
              vue,
              fn
            )
            break
          case 2:
            return new printRendering(
              'westernRecipe',
              Object.assign({}, commonVar, {
                $成药列表: recipe.western_list
              }),
              vue,
              fn
            )
            break
          case 3:
            return new printRendering(
              'westernRecipe',
              Object.assign({}, commonVar, {
                $产品列表: recipe.product_list
              }),
              vue,
              fn
            )
            break
          case 4:
            switch (recipe.therapy_type) {
              case 1:
                if (therapyIndex !== undefined && therapyIndex !== null) {
                  return new printRendering(
                    'treatApply',
                    Object.assign({}, commonVar, {
                      $项目名称: recipe.therapy_list[therapyIndex].name,
                      $执行次数: recipe.therapy_list[therapyIndex].num,
                      $备注: recipe.therapy_list[therapyIndex].remark,
                      $处方金额: (
                        recipe.therapy_list[therapyIndex].price *
                        recipe.therapy_list[therapyIndex].num
                      ).toFixed(2)
                    }),
                    vue,
                    fn
                  )
                } else {
                  return new printRendering(
                    'treatRecipe',
                    Object.assign({}, commonVar, {
                      $治疗项目列表: recipe.therapy_list
                    }),
                    vue,
                    fn
                  )
                }
                break
              case 2:
                if (therapyIndex !== undefined && therapyIndex !== null) {
                  return new printRendering(
                    'textApply',
                    Object.assign({}, commonVar, {
                      $项目名称: recipe.therapy_list[therapyIndex].name,
                      $标本: recipe.therapy_list[therapyIndex].sample,
                      $备注: recipe.therapy_list[therapyIndex].remark,
                      $处方金额: (
                        recipe.therapy_list[therapyIndex].price *
                        recipe.therapy_list[therapyIndex].num
                      ).toFixed(2)
                    }),
                    vue,
                    fn
                  )
                } else {
                  return new printRendering(
                    'textRecipe',
                    Object.assign({}, commonVar, {
                      $检验项目列表: recipe.therapy_list
                    }),
                    vue,
                    fn
                  )
                }
                break
              case 3:
                if (therapyIndex !== undefined && therapyIndex !== null) {
                  return new printRendering(
                    'examineApply',
                    Object.assign({}, commonVar, {
                      $项目名称: recipe.therapy_list[therapyIndex].name,
                      $部位: recipe.therapy_list[therapyIndex].position,
                      $检查目的: recipe.therapy_list[therapyIndex].remark,
                      $处方金额: (
                        recipe.therapy_list[therapyIndex].price *
                        recipe.therapy_list[therapyIndex].num
                      ).toFixed(2)
                    }),
                    vue,
                    fn
                  )
                } else {
                  return new printRendering(
                    'examineRecipe',
                    Object.assign({}, commonVar, {
                      $检查项目列表: recipe.therapy_list
                    }),
                    vue,
                    fn
                  )
                }
                break
            }
            break
          case 6:
            return new printRendering(
              'materialRecipe',
              Object.assign({}, commonVar, {
                $材料列表: recipe.product_list
              }),
              vue,
              fn
            )
            break
        }
      } else {
        installModal('打印失败1，请重试！')
      }
    })
    .catch(function(error) {
      console.log(error)
    })
}

/**
 * @desc 病历打印渲染函数
 *
 * @param {Object} vue    // vue对象，用于请求
 * @param {Object} order // 订单对象
 * @param {function} fn // 回调函数，可接受参数为（str: 返回模板字符串, width: 模板的宽度, height: 模板的高度）
 *
 * @example
 * printReport(vue, order, fn)    //
 */
function printReport(vue, order, fn) {
  var form = new FormData()
  fn = fn ? fn : function() {}
  form.append('patientId', order.patient_id)
  Promise.all([
    vue.post(appRoot + '/treatmng/patient/detail', form),
    vue.post(appRoot + '/clinicmng/user/doctorInfo', { id: order.doctor_id }),
    vue.post(appRoot + '/clinic/info')
  ])
    .then(function(respone) {
      if (
        respone[0].data.code == 1000 &&
        respone[1].data.code == 1000 &&
        respone[2].data.code == 1000
      ) {
        var patient = respone[0].data.data
        var doctor = respone[1].data.data
        var clinic = respone[2].data.data

        var commonVar = {
          $机构名称: clinic.name,
          $机构地址:
            clinic.city_name +
            '市' +
            clinic.county_name +
            '区' +
            clinic.address,
          $服务热线: clinic.customer_phone,
          $打印时间: new Date().format('yyyy-MM-dd hh:mm'),
          $年: new Date(order.create_time).format('yyyy'),
          $月: new Date(order.create_time).format('MM'),
          $日: new Date(order.create_time).format('dd'),
          $时: new Date(order.create_time).format('hh'),
          $分: new Date(order.create_time).format('mm'),
          $就诊订单号: order.order_seqno,
          $费别:
            order.pay_category == 1 && order.yb_pay_flag == 1 ? '医保' : '自费',
          $患者姓名: order.patient_name,
          $患者年龄: order.patient_age,
          $患者性别:
            order.patient_sex == 0
              ? '未知'
              : order.patient_sex == 1
              ? '男'
              : '女',
          $患者电话: order.patient_mobile,
          $患者地址:
            patient.province_name +
            '省' +
            patient.city_name +
            '市' +
            patient.county_name +
            '区' +
            patient.address,
          $医生姓名: order.doctor_name,
          $医生科室: doctor.department,
          $主诉: order.chief_complaint,
          $现病史: order.present_illness,
          $既往史: patient.past_history,
          $过敏史: patient.allergic_history,
          $个人史: patient.personal_history,
          $家族史: patient.family_history,
          $预防接种史: patient.prophylactic_history,
          $体格检查: order.examination,
          $辅助检查: order.auxiliary_examination,
          $中医诊断: order.diagnosis,
          $初步诊断: order.diagnosis_xy,
          $治疗处理: order.treat_advice,
          $运动建议: order.sport_advice,
          $膳食建议: order.dietary_advice,
          $病历号: order.order_seqno
        }
        return new printRendering('patientHistory', commonVar, vue, fn)
      } else {
        installModal('打印失败1，请重试！')
      }
    })
    .catch(function(error) {
      installModal('网络出错，请重试！')
      console.log(error)
    })
}

function printWarehouse(vue, order, itemsJson, StoragePrice, fn) {
  vue
    .post(appRoot + '/clinic/info')
    .then(function(respone) {
      var res = respone.data
      if (res.code === 1000) {
        var clinic = res.data
        var recipeList = {
          '1': '中药',
          '2': '中成西药',
          '3': '产品',
          '4': '诊疗',
          '5': '附加',
          '6': '材料'
        }
        return new printRendering(
          'warehouseRecipet',
          {
            $机构名称: clinic.name,
            $机构地址:
              clinic.city_name +
              '市' +
              clinic.county_name +
              '区' +
              clinic.address,
            $服务热线: clinic.customer_phone,
            $打印时间: new Date().format('yyyy-MM-dd hh:mm'),
            $年: new Date(order.createTime).format('yyyy'),
            $月: new Date(order.createTime).format('MM'),
            $日: new Date(order.createTime).format('dd'),
            $时: new Date(order.createTime).format('hh'),
            $分: new Date(order.createTime).format('mm'),
            $入库订单编号: order.orderSeqno,
            $入库药品类型: recipeList[order.recipeType],
            $入库人员: order.creator,
            $入库订单金额: StoragePrice,
            $入库供应商: order.providerName,
            $入库备注: order.memo,
            $入库药品列表: itemsJson
          },
          vue,
          fn
        )
      } else {
        installModal('打印失败1，请重试！')
      }
    })
    .catch(function(error) {
      installModal('网络出错，请重试！')
      console.log(error)
    })
}
/* 从诊所复制带来需要保存的代码 */
function installModal(content) {
  vue.prototype.$Message.config({
    top: '150',
    duration: 0
  })
  vue.prototype.$Message.info({
    content: '<span style="font-size:16px;">' + content + '</span>',
    top: '550',
    duration: 1.5
  })
}

export { printRendering, printReport }
/* 从诊所复制带来需要保存的代码 */
