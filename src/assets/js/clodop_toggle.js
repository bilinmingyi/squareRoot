/**
 *  @title 打印工具的JS处理方法
 *  @param dom 需要打印的DOM 或者html dom结点 要求有3个结点 第一个是style样式 第二个页眉 第三个是内容 第四个是内容
 *  A5 148*210  A4 210*297 (mm)
 *  @params printParams 一个打印参数的对象
 *  {
 *    "pageHeight":'纸张的高度',
 *    "pageWidth": '纸张的宽度'
 *    printMargin:'打印边距(默认是10(mm 不写单位))',
 *    topToC:'页眉离内容的距离(默认是10px)', // 暂时为0
 *    cToBottom:'内容离页脚的距离(默认是10px)',// 暂时为0
 *  }
 *  px单位固定换算关系如下,与像素类似但不是一个概念，也不受显示影响：
 *  1in(英寸)=2.54cm(厘米)=25.4mm(毫米)=72pt(磅)=96px
 */

/* 从诊所复制带来需要保存的代码 */
var appRoot = '/yzshis'
import vue from 'vue'
/* 从诊所复制带来需要保存的代码 */

function clodopToggle(dom, printParams) {
  try {
    if (LODOP.webskt && LODOP.webskt.readyState == 1) {
      //打印初始化
      LODOP.PRINT_INIT('')
      installModal('预览界面正在打开，请稍等一会.')
      //获取打印内容结点
      var DOM = renderDom(dom, 'render')
      var commonStyle = DOM.children[0]
      var header = DOM.children[1]
      var content = DOM.children[2]
      var footer = DOM.children[3]
      // return
      var dpi = 96
      var initMargin = {
        top: (6 * dpi) / 25.4,
        bottom: (6 * dpi) / 25.4,
        left: (6 * dpi) / 25.4,
        right: (6 * dpi) / 25.4
      }

      //
      var printMargin = JSON.parse(JSON.stringify(initMargin))

      //默认是A5纸
      var pageWidth = 148
      var pageHeight = 210
      var pageType = 'A5'
      //打印参数
      if (printParams) {
        printMargin = printParams.printMargin
          ? filterMargin(printParams.printMargin, dpi)
          : JSON.parse(JSON.stringify(initMargin))
        pageHeight = printParams.pageHeight || 210
        pageWidth = printParams.pageWidth || 148
      }
      if (pageWidth == 148 && pageHeight == 210) {
        pageType = 'A5'
      } else if (pageWidth == 210 && pageHeight == 297) {
        pageType = 'A4'
      } else {
        pageType = pageWidth + 'x' + pageHeight
      }
      var printPage = getPrintPage(pageType)
      if (printPage != '') {
        LODOP.SET_PRINT_PAGESIZE(0, '', '', printPage)
      }
      //初始化打印的值 真正的打印区域 减去左右两边大约3mm得边距
      var initHeight = ((pageHeight - 8) * dpi) / 25.4
      var initWidth = ((pageWidth - 8) * dpi) / 25.4
      var headerObj = {
          top: '',
          left: '',
          width: '',
          height: '',
          content: ''
        },
        contentObj = {
          top: '',
          left: '',
          width: '',
          height: '',
          content: ''
        },
        footerObj = {
          top: '',
          left: '',
          width: '',
          height: '',
          content: ''
        }
      var headerH = getHeight(header, initWidth, printMargin),
        contentH = getHeight(content, initWidth, printMargin),
        footerH = getHeight(footer, initWidth, printMargin)

      //页眉信息
      headerObj.top = printMargin.top
      headerObj.left = printMargin.left
      headerObj.width = 'RightMargin:' + printMargin.right
      headerObj.height = Math.ceil((headerH / initHeight) * 100) + 1 + '%'
      headerObj.content = getContent(header, commonStyle)
      //页脚信息 位置偏上 所以+1

      footerObj.top =
        Math.floor((1 - (footerH + printMargin.bottom) / initHeight) * 100) -
        1 +
        '%'
      footerObj.left = printMargin.left
      footerObj.width = 'RightMargin:' + printMargin.right
      footerObj.height = (footerH / initHeight) * 100 + 2 + '%'
      footerObj.content = getContent(footer, commonStyle)

      //主要内容信息
      contentObj.top = couterCotentTop(headerH, printMargin, initHeight)
      contentObj.left = printMargin.left
      contentObj.width = 'RightMargin:' + printMargin.right
      contentObj.height = couterContentH(
        headerH,
        footerH,
        printMargin,
        initHeight
      )
      contentObj.content = getContent(content, commonStyle)
      //  LODOP.SET_SHOW_MODE('HIDE_PBUTTIN_PREVIEW', true) //隐藏打印机的功能
      if (headerH != 0) {
        // //页眉的内容
        LODOP.ADD_PRINT_HTM(
          headerObj.top,
          headerObj.left,
          headerObj.width,
          headerObj.height,
          headerObj.content
        )
        LODOP.SET_PRINT_STYLEA(0, 'ItemType', 1) //页眉项，每页输出
      }
      // 主要内容
      LODOP.ADD_PRINT_HTM(
        contentObj.top,
        contentObj.left,
        contentObj.width,
        contentObj.height,
        contentObj.content
      )
      if (footerH != 0) {
        // //页脚项，每页输出
        LODOP.ADD_PRINT_HTM(
          footerObj.top,
          footerObj.left,
          footerObj.width,
          footerObj.height,
          footerObj.content
        )
        LODOP.SET_PRINT_STYLEA(0, 'ItemType', 1)
      }
      LODOP.SET_PRINT_STYLEA(0, 'TextNeatRow', 1) //行对齐
      LODOP.PREVIEW()
      renderDom(dom, 'delete')
    } else {
      // websocket 未成功链接
      installModal('正在连接云打印功能，请稍等一下再操作.', 1000)
    }
  } catch (error) {
    if (
      error
        .toString()
        .toLocaleUpperCase()
        .indexOf('LODOP') > -1
    ) {
      CheckIsInstall()
    } else {
      installModal('打印失败,请查看打印模板设置是否正确!', 1500)
      console.log(error)
    }
  }
  function filterMargin(params, dpi) {
    return {
      top:
        Number(params.top - 4) <= 0 ? 0 : (Number(params.top - 4) * dpi) / 25.4,
      bottom:
        Number(params.bottom - 4) <= 0
          ? 0
          : (Number(params.bottom - 4) * dpi) / 25.4,
      left:
        Number(params.left - 4) <= 0
          ? 0
          : (Number(params.left - 4) * dpi) / 25.4,
      right:
        Number(params.right - 4) <= 0
          ? 0
          : (Number(params.right - 4) * dpi) / 25.4
    }
  }

  //获取打印纸张类型
  function getPrintPage(type) {
    var printPage = LODOP.GET_PAGESIZES_LIST(-1, ',')
    var printPageArr = printPage.split(',')
    for (var i = 0; i < printPageArr.length; i++) {
      if (printPageArr[i] === type) {
        return printPageArr[i]
      }
    }
    //若没有完全相等纸张，再遍历去括号的纸张
    for (var i = 0; i < printPageArr.length; i++) {
      var temp = printPageArr[i].split('(')[0].trim()
      if (temp === type) {
        return printPageArr[i]
      }
    }
    return ''
  }

  //检测是否安装
  function CheckIsInstall() {
    var LODOP = undefined
    try {
      var LODOP = getCLodop()
    } catch (err) {}
    if (!LODOP && document.readyState !== 'complete') {
      installModal('正在连接云打印功能，请稍等一下再操作.', 1000)
      return
    }
    if (!LODOP) {
      PromptInstall()
      return
    } else {
      if (CLODOP.CVERSION < '3.0.9.1') {
        PromptInstall()
      }
      if (oEMBED && oEMBED.parentNode) oEMBED.parentNode.removeChild(oEMBED)
      if (oOBJECT && oOBJECT.parentNode) oOBJECT.parentNode.removeChild(oOBJECT)
    }
  }
  // 渲染DOM结点
  function renderDom(str, type) {
    var _div = document.createElement('div')
    _div.style.position = 'relative'
    _div.style.left = '-9999px'
    _div.style.top = '-1000px'
    // _div.style = 'position:relative;left:500px;'
    _div.id = 'printRenderDOM'
    if (type === 'render') {
      document.body.appendChild(_div)
      _div.innerHTML = str
      var dom_temp = _div.childNodes
      for (var i = 0, len = dom_temp.length; i < len; i++) {
        if (dom_temp[i].nodeType === 1) {
          return dom_temp[i]
        }
      }
      return
    } else {
      try {
        var dom = document.getElementById('printRenderDOM')
        document.body.removeChild(dom)
      } catch (err) {}
    }
  }
  //打印提示
  function PromptInstall() {
    vue.prototype.$Modal.confirm({
      title:
        '<div style="font-weight:600;font-size:17px;">您本地没有安装打印服务，您要安装吗?</div>',
      content:
        '<div style="height:30px;font-size:15px;">1、打印服务仅仅是一个控件,您可放心安装使用。</div>' +
        '<div style="height:30px;font-size:15px;">2、安装成功后,请刷新浏览器即可使用打印功能。</div>',
      width: '450px',
      onOk: function() {
        window.location.href =
          appRoot +
          '/public/static/js/clodop_Toggle/CLodop_Setup_for_Win32NT_https_3.092Extend.exe'
      },
      cancelText: '取消'
    })
  }

  // 获取DOM加载后的高度
  function getHeight(dom, pageWidth2, printMargin) {
    dom.style.width = pageWidth2 - printMargin.left - printMargin.right + 'px' //获取纸张的宽度 求其内容的高度
    // console.log(dom.style.width)
    // 避免页眉页脚不设的时候为0
    if (window.getComputedStyle(dom).height.indexOf('px') > -1) {
      return Number(window.getComputedStyle(dom).height.split('px')[0])
    } else {
      return 0
    }
  }
  //公共初始化内容
  function getContent(dom, commonStyle) {
    var styleCSS = '<style>' + commonStyle.innerHTML + '</style>'
    return (
      styleCSS +
      "<body style='margin:0;word-wrap: break-word;word-break: break-all;overflow: hidden;margin-bottom:0;'>" +
      dom.innerHTML +
      '</body>'
    )
  }
  // 计算主要内容到头部距离
  function couterCotentTop(headerH, printMargin, initHeight) {
    return headerH == 0
      ? printMargin.top
      : Math.ceil(((headerH + printMargin.top) / initHeight) * 100) + 1 + '%'
  }
  function couterContentH(headerH, footerH, printMargin, initHeight) {
    var tfHeight = footerH + headerH
    if (headerH == 0 && footerH == 0) {
      return 'BottomMargin:' + printMargin.bottom
    }
    var reducePercent = 4
    if (footerH == 0) {
      reducePercent = 1
    }
    if (headerH == 0) {
      reducePercent = 2
    }
    return (
      Math.floor(
        (1 - (tfHeight + printMargin.top + printMargin.bottom) / initHeight) *
          100
      ) -
      reducePercent +
      '%'
    )
  }
  //自定义提示框
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
}

function initCLodop() {
  //不适用needCLodop判断 强制所有浏览器用clodop
  var src1 = 'http://localhost:8000/CLodopfuncs.js?priority=0.8'
  var src2 = 'http://localhost:18000/CLodopfuncs.js?priority=0.6'
  var src3 = 'https://localhost:8443/CLodopfuncs.js?priority=1'
  var src4 = 'https://localhost:8444/CLodopfuncs.js?priority=0'
  // var initArr = [src1, src2, src3, src4] //测试环境
  var initArr = [src3, src4]
  var head =
    document.head ||
    document.getElementsByTagName('head')[0] ||
    document.documentElement
  for (var i = 0; i < initArr.length; i++) {
    var oscript = document.createElement('script')
    oscript.src = initArr[i]
    head.insertBefore(oscript, head.firstChild)
  }
  var CLodopIsLocal = !!(src1 + src2).match(/\/\/localho|\/\/127.0.0./i)
}
initCLodop()
/* 从诊所复制带来需要保存的代码 */
export default clodopToggle
/* 从诊所复制带来需要保存的代码 */
