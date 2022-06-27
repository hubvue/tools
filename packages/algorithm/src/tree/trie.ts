export type TrieNode = {
  count: number
  prefix: number
  nextNode: TrieNode[]
}

interface Trier {
  insert(): number
}

export const createTire = (): Trier => {
  return {} as Trier
}

const trie = createTire()
trie.insert()
