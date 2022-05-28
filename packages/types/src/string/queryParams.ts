import { Split } from './split'

type SplitPart<T, P extends string> = T extends string ? Split<T, P>: []

type _QueryParams<T extends string, QueryElements extends any[] = SplitPart<SplitPart<T, '?'>[1], '&'>> = {
  [QueryElement in QueryElements[number]]: {
    [Key in Split<QueryElement, '='>[0]]: Split<QueryElement, '='>[1]
  }
}[QueryElements[number]]

// type A = QueryParams<'xxx?a=123&b=234'>

export type QueryParams<T extends string> = _QueryParams<T>
