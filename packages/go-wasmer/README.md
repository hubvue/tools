# go-wasmer

Run Go projects in nodejs and browser environments by way of WebAssembly.

### Install

```shell
// pnpm
pnpm add @cckim/go-wasmer
//yarn
yarn add @cckim/go-wasmer
// npm
npm install @cckim/go-wasmer
```

### Usage

```ts
import { runWasm } from '@cckim/go-wasmer';
runWasm('./add.wasm', [1, 2])
  .then(res => console.log(res))
// 3
```

