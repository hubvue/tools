import { clear, mockUserAgent } from 'jest-useragent-mock'
import { getUA, isBrowser, isAlipay, isSpecificPlatform } from '../src/env'

describe('env', () => {
  const clearUA = () => {
    afterEach(() => {
      clear()
    })
  }
  const browserUA = 'Mozilla/5.0 (iPhone; CPU iPhone OS 10_3_1 like Mac OS X) AppleWebKit/603.1.30 (KHTML, like Gecko) Version/10.0 Mobile/14E304 Safari/602.1'
  const alipayUA = 'Mozilla/5.0 (Linux; U; Android 10; zh-CN; H9493 Build/52.1.A.3.49) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/69.0.3497.100 UWS/3.21.0.169 Mobile Safari/537.36 AlipayChannelId/5136 UCBS/3.21.0.169_200731162109 NebulaSDK/1.8.100112 Nebula AlipayDefined(nt:WIFI,ws:411|0|3.5,ac:sp) AliApp(AP/10.2.0.8026) AlipayClient/10.2.0.8026 Language/zh-Hans useStatusBar/true isConcaveScreen/false Region/CN NebulaX/1.0.0 Ariver/1.0.0'
  
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
    test('The result of the isBrowser method should be true in the browser environment', () => {
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
    test('Should result in true on unspecified platforms', () => {
      mockUserAgent(browserUA)
      const alipayReg = /AlipayClient/i
      expect(isSpecificPlatform(alipayReg)).toBe(false)
    })
  })
})
