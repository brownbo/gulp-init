const ua = navigator.userAgent
export const isIOS = /iphone|ipod|ipad/i.test(ua)
export const isAndroid = /android/i.test(ua)

export const iOSVersion = isIOS ? function () {
  let matchData = ua.match(/OS ([0-9]+)/)
  if (matchData) {
    return parseInt(matchData[1])
  } else {
    return null
  }
}() : null

export const isIphoneX = isIOS ? function () {
  let width = screen.width
  let height = screen.height
  if (width > height) {
    return width === 812 && height === 375
  } else {
    return height === 812 && width === 375
  }
}() : null

export const androidVersion = isAndroid ? function () {
  let matchData = ua.toLowerCase().match(/android\s([0-9\.]*)/)
  if (matchData) {
    return parseInt(matchData[1])
  } else {
    return null
  }
}() : null

export const  isSP= isIOS || isAndroid
