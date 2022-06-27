import { toString, has, keys } from '../src/object'
import { clear, mockReflect } from '../__mocks__/reflect'

describe('object', () => {
  describe('toString', () => {
    const expectHandler = (value: unknown, target: string) => {
      expect(toString(value)).toBe(`[object ${target}]`)
    }
    test('The toString method should behave the same as Object.prototype.toString', () => {
      const tNumber = 1
      const tString = '1'
      const tBoolean = true
      const tNull = null
      const tUndefined = undefined
      const tSymbol = Symbol('test')
      const tArray = ['1']
      const tObject = {}
      const tPromise = Promise.resolve()
      const tFunction = () => {}
      const tAsyncFunction = async () => {}
      const tGeneratorFunction = function* () {}
      expectHandler(tNumber, 'Number')
      expectHandler(tString, 'String')
      expectHandler(tBoolean, 'Boolean')
      expectHandler(tNull, 'Null')
      expectHandler(tUndefined, 'Undefined')
      expectHandler(tSymbol, 'Symbol')
      expectHandler(tArray, 'Array')
      expectHandler(tObject, 'Object')
      expectHandler(tPromise, 'Promise')
      expectHandler(tFunction, 'Function')
      // jest cannot resolve async functions
      expectHandler(tAsyncFunction, 'Function')
      expectHandler(tGeneratorFunction, 'GeneratorFunction')
    })
  })

  describe('has', () => {
    const target = {
      'key': 123
    }
    test('The key should be present in the target is property', () => {
      expect(has(target, 'key')).toBe(true)
    })
    test('The key1 should not be present in the properties of target', () => {
      expect(has(target, 'key1')).toBe(false)
    })
    test('Reflect should be used normally when the environment does not support it', () => {
      mockReflect()
      expect(has(target, 'key')).toBe(true)
      clear()
    })
  })

  describe('keys', () => {
    const target = {
      'key': 123
    }
    test('The array length after keys processing should be consistent with the number of object attributes', () => {
      expect(keys(target).length).toBe(1)
    })
    test('The array processed by keys should be a collection of object attributes', () => {
      expect(keys(target)).toStrictEqual(['key'])
    })
  })
})
