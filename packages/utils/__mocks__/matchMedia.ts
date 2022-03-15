const realMatchMedia = window.matchMedia

const matchMediaHandler = (matches = true) => {
  return jest.fn().mockImplementation(query => ({
    matches,
    media: query,
    onchange: null,
    addListener: jest.fn(), // Deprecated
    removeListener: jest.fn(), // Deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  }))
}

export const mockMatchMedia = (matches: boolean = true) => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: matchMediaHandler(matches)
  })
}

export const clear = () => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: realMatchMedia
  })
}
