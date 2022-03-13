import { clear, mockUserAgent } from 'jest-useragent-mock'
import { browserUA, alipayUA, androidUA, douyinUA, iosUA, ipadUA, qqUA, wxworkUA, macosUA, windowsUA, wechatUA } from '../__mocks__/ua'
import {
  getUA,
  isBrowser,
  isAlipay,
  isSpecificPlatform,
  isWechat,
  isAndroid,
  isDouyin,
  isIos,
  isPad,
  isQQ,
  isWechatWork,
  isMacos,
  isWindows
} from '../src/env'

describe('env', () => {
  const clearUA = () => {
    afterEach(() => {
      clear()
    })
  }
  describe('getUA', () => {
    clearUA()

    let windowSpy: jest.SpyInstance
    beforeEach(() => {
      windowSpy = jest.spyOn(window, 'window', 'get')
    })
    afterEach(() => {
      windowSpy.mockRestore()
    })

    test('The getUA method should work properly in a browser environment', () => {
      mockUserAgent(browserUA)
      expect(getUA()).toBe(browserUA)
    })
    test('The getUA method should not work properly in non-browser environments', () => {
      windowSpy.mockImplementation(() => undefined)
      expect(getUA()).toBe(false)
    })
  })

  describe('isBrowser', () => {
    let windowSpy: jest.SpyInstance
    beforeEach(() => {
      windowSpy = jest.spyOn(window, 'window', 'get')
    })
    afterEach(() => {
      windowSpy.mockRestore()
    })

    test('The result of the isBrowser method should be true in the browser environment', () => {
      expect(isBrowser()).toBe(true)
    })
    test('The result of the isBrowser method should be false in the non-browser environment', () => {
      windowSpy.mockImplementation(() => undefined)
      expect(isBrowser()).toBe(false)
    })
  })

  describe('isAlipay', () => {
    clearUA()
    test('should result in true on the Alipay platform', () => {
      mockUserAgent(alipayUA)
      expect(isAlipay()).toBe(true)
    })
    test('Should result in false on non-Alipay platforms', () => {
      mockUserAgent(browserUA)
      expect(isAlipay()).toBe(false)
    })
  })

  describe('isSpecificPlatform', () => {
    clearUA()
    test('Should result in true on the specified platform', () => {
      mockUserAgent(alipayUA)
      const alipayReg = /AlipayClient/i
      expect(isSpecificPlatform(alipayReg)).toBe(true)
    })
    test('Should result in false on unspecified platforms', () => {
      mockUserAgent(browserUA)
      const alipayReg = /AlipayClient/i
      expect(isSpecificPlatform(alipayReg)).toBe(false)
    })
  })

  describe('isWechat', () => {
    clearUA()
    test('Should result in true on the Wechat platform', () => {
      mockUserAgent(wechatUA)
      expect(isWechat()).toBe(true)
    })
    test('Should result in false on non-Wechat platforms', () => {
      mockUserAgent(browserUA)
      expect(isWechat()).toBe(false)
    })
  })

  describe('isAndroid', () => {
    clearUA()
    test('Should result in true on the Android platform', () => {
      mockUserAgent(androidUA)
      expect(isAndroid()).toBe(true)
    })
    test('Should result in false on non-Android platforms', () => {
      mockUserAgent(browserUA)
      expect(isAndroid()).toBe(false)
    })
  })

  describe('isDouyin', () => {
    clearUA()
    test('Should result in true on the Douyin platform', () => {
      mockUserAgent(douyinUA)
      expect(isDouyin()).toBe(true)
    })
    test('Should result in false on non-Douyin platforms', () => {
      mockUserAgent(browserUA)
      expect(isDouyin()).toBe(false)
    })
  })

  describe('isIos', () => {
    clearUA()
    test('Should result in true on the IOS platform', () => {
      mockUserAgent(iosUA)
      expect(isIos()).toBe(true)
    })
    test('Should result in false on non-IOS platforms', () => {
      mockUserAgent(androidUA)
      expect(isIos()).toBe(false)
    })
  })

  describe('isPad', () => {
    clearUA()
    test('Should result in true on the iPad platform', () => {
      mockUserAgent(ipadUA)
      expect(isPad()).toBe(true)
    })
    test('Should result in false on non-iPad platforms', () => {
      mockUserAgent(browserUA)
      expect(isPad()).toBe(false)
    })
  })

  describe('isQQ', () => {
    clearUA()
    test('Should result in true on the QQ platform', () => {
      mockUserAgent(qqUA)
      expect(isQQ()).toBe(true)
    })
    test('Should result in false on non-QQ platforms', () => {
      mockUserAgent(browserUA)
      expect(isQQ()).toBe(false)
    })
  })

  describe('isWechatWork', () => {
    clearUA()
    test('Should result in true on the Wechat Work platform', () => {
      mockUserAgent(wxworkUA)
      expect(isWechatWork()).toBe(true)
    })
    test('Should result in false on non-Wechat Work platforms', () => {
      mockUserAgent(browserUA)
      expect(isWechatWork()).toBe(false)
    })
  })

  describe('isMacos', () => {
    clearUA()
    test('Should result in true on the Macos platform', () => {
      mockUserAgent(macosUA)
      expect(isMacos()).toBe(true)
    })
    test('Should result in false on non-Macos platforms', () => {
      
      mockUserAgent(windowsUA)
      expect(isMacos()).toBe(false)
    })
  })

  describe('isWindows', () => {
    clearUA()
    test('Should result in true on the Windows platform', () => {
      mockUserAgent(windowsUA)
      expect(isWindows()).toBe(true)
    })
    test('Should result in false on non-Windows platforms', () => {
      mockUserAgent(browserUA)
      expect(isWindows()).toBe(false)
    })
  })
})
