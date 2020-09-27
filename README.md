# kcachable

Easily create cachable values of any type that can be saved/loaded at any times

## Install

```bash
npm i kcachable
```

## Usage

```typescript
import { Cachable } from 'kcachable'

const value: string = null    // Value to init with (optional)
const defaultValue = 'string' // Value to use if init-value is null and there is no value saved yet
const saveIfNotExists = false  // save enw value (init-value or defaultValue) there is no value saved yet
const cVal = new Cachable('myVal.json', value, defaultValue, saveIfNotExists)

console.log(cVal.value)
cVal.value = 'newString'
cVal.save()
```
