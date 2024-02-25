export function parseTimeDif(t0, t1 = 'now') {
  const tFrom = new Date(t0.replace(/[/.]/g, '-'))
  var tTo = new Date(t1.replace(/[/.]/g, '-'))
  tTo = isNaN(tTo) ? new Date() : tTo
  var millisecond = Math.floor((tTo - tFrom) / 1000)

  // total days
  var allDay = Math.floor(millisecond / (24 * 60 * 60))

  // different from getYear()
  const startYear = tFrom.getUTCFullYear()
  const endYear = tTo.getUTCFullYear()
  const startMonth = tFrom.getMonth() + 1
  const endMonth = tTo.getMonth() + 1
  const startDay = tFrom.getDate()
  const endDay = tTo.getDate()

  // how many leap years
  var leapYear = 0
  for (var i = startYear; i < endYear; i++) {
    if (isLeapYear(i)) {
      leapYear++
    }
  }

  // how many years
  var year = Math.floor((allDay - leapYear * 366) / 365 + leapYear)
  // how many months
  var month = endMonth - startMonth
  if (month < 0) {
    month = 12 + month
  }
  // how many days
  var day = endDay - startDay
  const bigMonths = [1, 3, 5, 7, 8, 10, 12]
  if (day < 0) {
    month--
    if (startMonth === 2) {
      day = (isLeapYear(tFrom) ? 29 : 28) - startDay + endDay
    } else if (bigMonths.indexOf(startMonth) !== 1) {
      day = 31 - startDay + endDay
    } else {
      day = 30 - startDay + endDay
    }
  }
  // remainer (second)
  var remainder = millisecond % (24 * 60 * 60)
  // how many hours
  var hour = Math.floor(remainder / (60 * 60))
  // how many minutes
  var minute = Math.floor(remainder % (60 * 60) / 60)
  // how many seconds
  var second = remainder - hour * 60 * 60 - minute * 60
  // return
  return { 'y': year, 'm': month, 'd': day, 'h': hour, 'n': minute, 's': second, 'dd': allDay, 'ms': millisecond }
}
function isLeapYear(year) {
  return (year % 4 === 0 && year % 100 !== 0) || (year % 100 === 0 && year % 400 === 0)
}
export function formatTimeDif2(d, f, sep) {
  // d: i18n string dict with keys 'y', 'm', 'd', 'h', 'n', 's'
  // f: numeric dict with keys 'y', 'm', 'd', 'h', 'n', 's'
  // sep: i18n string to concat time diff parts
  var ret
  if (d['y'] === 0) {
    if (d['m'] === 0) {
      if (d['d'] === 0) {
        if (d['h'] === 0) {
          if (d['n'] === 0) {
            ret = f['s']
          } else {
            ret = f['n'] + (d['s'] > 0 ? sep + f['s'] : '')
          }
        } else {
          ret = f['h'] + (d['n'] > 0 ? sep + f['n'] : '')
        }
      } else {
        ret = f['d'] + (d['h'] > 0 ? sep + f['h'] : '')
      }
    } else {
      ret = f['m'] + (d['d'] > 0 ? sep + f['d'] : '')
    }
  } else {
    ret = f['y'] + (d['m'] > 0 ? sep + f['m'] : '')
  }
  return ret
}
export function countEmptyArrInArr(arr) {
  // used in array within array
  var n = 0
  for (var i = 0; i < arr.length; i++) {
    if (Array.isArray(arr[i]) && arr[i].length === 0) {
      n++
    }
  }
  return n
}
export function enc(s) {
  // encode char
  var ret = window.encodeURIComponent(s)
  return window.btoa(ret)
}
export function dec(s) {
  // decode char
  var ret = window.atob(s)
  return window.decodeURIComponent(ret)
}
export function detectDevice() {
  // detect device using userAgent
  const ua = window['navigator']['userAgent'] || window['navigator']['vendor'] || window['opera']
  const osPtn = {
    'iOS': 'iPhone|iPod|iPad', 'Android': 'Android', 'Windows': 'Windows', 'Linux': 'Linux', 'X11': 'Nix',
    'Mac': 'Mac'
  }
  // mobile?
  let isMobile = (/iPhone|iP[ao]d|Silk|Android|BlackBerry|BB10|PlayBook|Opera Mini|IEMobile|WebOS|Lumia/).test(ua)
  let isTablet = (/iPad|PlayBook|Tablet/).test(ua) || ((/Android/).test(ua) && !(/Mobile/).test(ua))
  // WeChat?
  let isWechat = (/MicroMessenger/).test(ua)
  // OS
  let osFlag = ''
  for (let k in osPtn) {
    let re = new RegExp(osPtn[k])
    if (re.test(ua)) {
      osFlag = k
      break
    }
  }
  return { 'isMobile': isMobile, 'isTablet': isTablet, 'isWechat': isWechat, 'OS': osFlag }
}
