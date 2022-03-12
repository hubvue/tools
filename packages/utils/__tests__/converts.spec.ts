import { toString } from '../src/converts'

describe('converts', () => {
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
})
