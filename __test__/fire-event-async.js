import {fireEvent, waitFor} from '@testing-library/dom'

const fireEventAsync = {}

Object.entries(fireEvent).reduce((obj, [key, val]) => {
  obj[key] = async (...args) => {
    const ret = val(...args)
    await waitFor(
      () =>
        new Promise(r =>
          setTimeout(() => {
            return r()
          }, 0),
        ),
    )
    return ret
  }
  return obj
}, fireEventAsync)

export {fireEventAsync}
