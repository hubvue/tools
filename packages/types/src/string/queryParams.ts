import { Split } from './split'
import { Merge } from '../union'

type _SplitPart<T, P extends string> = T extends string ? Split<T, P>: []

type _QueryParams<T extends string, QueryElements extends any[] = _SplitPart<_SplitPart<T, '?'>[1], '&'>> = {
  [QueryElement in QueryElements[number]]: {
    [Key in Split<QueryElement, '='>[0]]: Split<QueryElement, '='>[1]
  }
}[QueryElements[number]]



/**
 * @description Resolve URL parameters
 * @param T
 */
export type QueryParams<T extends string> = Merge<_QueryParams<T>>
