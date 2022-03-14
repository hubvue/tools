const reflectOrigin = global.Reflect
const cleared = Symbol('clear')
let fakeReflect: unknown = undefined

Object.defineProperty(global, 'Reflect', {
  get: function get() {
    return fakeReflect === cleared ? reflectOrigin : fakeReflect
  }
})

export const clear = () => {
  fakeReflect = cleared
}
export const mockReflect = (reflect?: unknown) => {
  fakeReflect = reflect
}
