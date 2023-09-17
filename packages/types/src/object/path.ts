/**
 * @description Get the full path to an object's accessible properties
 * @param T Object
 */
export type Path<T extends object> = _Path<T>

type _Path<T, P extends string = '', R extends string[] = []> = 
  T extends object 
    ? {
      [K in keyof T]: K extends string | number
        ? P extends ''
          ? _Path<T[K], `${K}`, [...R, `${K}`]>
          : _Path<T[K], `${P}.${K}`, [...R, `${P}.${K}`]>
        : never
    }[keyof T]
    : R[number]
