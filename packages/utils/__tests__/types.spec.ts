import {
  isDef,
  isUndef,
  isNull,
  isNullable,
  isNumber,
  isString,
  isBoolean,
  isPrimitive,
  isSymbol,
  isArray,
  isObject,
  isDate,
  isRegExp,
  isError,
  isPromise,
  isPromiseLike,
  isFunction,
  isAsyncFn,
  isGeneratorFn,
  isDummyValue,
  isRealValue
} from '../src/types'

describe('types', () => {
  describe('isDef', () => {
    test('The result should be false for undefined types', () => {
      expect(isDef(undefined)).toBe(false)
    })
    test('The result should be true for non-undefined types', () => {
      expect(isDef(1)).toBe(true)
    })
  })
  describe('isUndef', () => {
    test('The result should be true for undefined types', () => {
      expect(isUndef(undefined)).toBe(true)
    })
    test('The result should be false for non-undefined types', () => {
      expect(isUndef(1)).toBe(false)
    })
  })
  describe('isNull', () => {
    test('The result should be true for null types', () => {
      expect(isNull(null)).toBe(true)
    })
    test('The result should be false for non-null types', () => {
      expect(isNull(1)).toBe(false)
    })
  })
  describe('isNullable', () => {
    test('The result should be true for undefined types', () => {
      expect(isNullable(undefined)).toBe(true)
    })
    test('The result should be true for null types', () => {
      expect(isNullable(null)).toBe(true)
    })
    test('The result should be false for non-nullable types', () => {
      expect(isNullable(1)).toBe(false)
    })
  })
  describe('isNumber', () => {
    test('The result should be true for number types', () => {
      expect(isNumber(1)).toBe(true)
    })
    test('The result should be false for non-number types', () => {
      expect(isNumber('1')).toBe(false)
    })
  })
  describe('isString', () => {
    test('The result should be true for string types', () => {
      expect(isString('abc')).toBe(true)
    })
    test('The result should be false for non-string types', () => {
      expect(isString(1)).toBe(false)
    })
  })
  describe('isBoolean', () => {
    test('The result should be true for boolean types', () => {
      expect(isBoolean(true)).toBe(true)
    })
    test('The result should be false for non-boolean types', () => {
      expect(isBoolean(1)).toBe(false)
    })
  })
  describe('isPrimitive', () => {
    test('The result should be true for undefined types', () => {
      expect(isPrimitive(undefined)).toBe(true)
    })
    test('The result should be true for null types', () => {
      expect(isPrimitive(null)).toBe(true)
    })
    test('The result should be true for number types', () => {
      expect(isPrimitive(1)).toBe(true)
    })
    test('The result should be true for string types', () => {
      expect(isPrimitive('1')).toBe(true)
    })
    test('The result should be true for boolean types', () => {
      expect(isPrimitive(true)).toBe(true)
    })
    test('The result should be false for non-primitive types', () => {
      expect(isPrimitive([])).toBe(false)
    })
  })
  describe('isSymbol', () => {
    test('The result should be true for symbol types', () => {
      expect(isSymbol(Symbol())).toBe(true)
    })
    test('The result should be false for non-symbol types', () => {
      expect(isSymbol(1)).toBe(false)
    })
  })
  describe('isArray', () => {
    test('The result should be true for array types', () => {
      expect(isArray([])).toBe(true)
    })
    test('The result should be false for non-array types', () => {
      expect(isArray({})).toBe(false)
    })
  })
  describe('isObject', () => {
    test('The result should be true for object types', () => {
      expect(isObject({})).toBe(true)
    })
    test('The result should be false for non-object types', () => {
      expect(isObject([])).toBe(false)
    })
  })
  describe('isDate', () => {
    test('The result should be true for Date types', () => {
      expect(isDate(new Date())).toBe(true)
    })
    test('The result should be false for non-Date types', () => {
      expect(isDate({})).toBe(false)
    })
  })
  describe('isRegExp', () => {
    test('The result should be true for RegExp types', () => {
      expect(isRegExp(/abc/)).toBe(true)
    })
    test('The result should be false for non-RegExp types', () => {
      expect(isRegExp({})).toBe(false)
    })
  })
  describe('isError', () => {
    test('The result should be true for Error types', () => {
      expect(isError(new Error())).toBe(true)
    })
    test('The result should be false for non-Error types', () => {
      expect(isError({})).toBe(false)
    })
  })
  describe('isPromise', () => {
    test('The result should be true for promise types', () => {
      expect(isPromise(Promise.resolve())).toBe(true)
    })
    test('The result should be false for non-promise types', () => {
      expect(isPromise({})).toBe(false)
    })
  })
  describe('isPromiseLike', () => {
    test('The result should be true for promise types', () => {
      expect(isPromiseLike(Promise.resolve())).toBe(true)
    })
    test('The result should be true for PromiseLike types', () => {
      const promiseLike = {
        then() {}
      }
      expect(isPromiseLike(promiseLike)).toBe(true)
    })
    test('The result should be false for non-PromiseLike types', () => {
      expect(isPromiseLike({})).toBe(false)
    })
  })
  describe('isFunction', () => {
    test('The result should be true for function types', () => {
      expect(isFunction(() => {})).toBe(true)
    })
    test('The result should be false for non-function types', () => {
      expect(isFunction({})).toBe(false)
    })
  })
  describe('isAsyncFn', () => {
    test('The result should be true for async function types', () => {
      // jest cannot resolve async functions
      expect(isAsyncFn(async () => {})).toBe(false)
    })
    test('The result should be false for non-async function types', () => {
      expect(isAsyncFn(() => {})).toBe(false)
    })
  })
  describe('isGeneratorFn', () => {
    test('The result should be true for generator function types', () => {
      expect(isGeneratorFn(function*(){})).toBe(true)
    })
    test('The result should be false for non-generator function types', () => {
      expect(isGeneratorFn(() => {})).toBe(false)
    })
  })
  describe('isDummyValue', () => {
    test('The result should be true for \'\' value', () => {
      expect(isDummyValue('')).toBe(true)
    })
    test('The result should be true for 0 value', () => {
      expect(isDummyValue(0)).toBe(true)
    })
    test('The result should be true for undefined value', () => {
      expect(isDummyValue(undefined)).toBe(true)
    })
    test('The result should be true for null value', () => {
      expect(isDummyValue(null)).toBe(true)
    })
    test('The result should be true for false value', () => {
      expect(isDummyValue(false)).toBe(true)
    })
    test('The result should be true for NaN value', () => {
      expect(isDummyValue(NaN)).toBe(true)
    })
    test('The result should be false for real value', () => {
      expect(isDummyValue(1)).toBe(false)
    })
  })
  describe('isRealValue', () => {
    test('The result should be true for 1 value', () => {
      expect(isRealValue(1)).toBe(true)
    })
    test('The result should be false for dummy value', () => {
      expect(isGeneratorFn(() => {})).toBe(false)
    })
  })
})
