/** @jsx h */
import '@testing-library/jest-dom/extend-expect'
import * as Preact from 'preact'
import {h} from 'preact'
import {fireEventAsync} from './fire-event-async'
import {getQueriesForElement, fireEvent, waitFor} from '@testing-library/dom'

/**
 * {
  "plugins": [
    ["transform-react-jsx", { "pragma": "h" }]
  ]
}
 */
class Counter extends Preact.Component {
  state = {count: 0}
  increment = () => this.setState(({count}) => ({count: count + 1}))
  render() {
    return (
      <div>
        <button onClick={this.increment}>{this.state.count}</button>
      </div>
    )
  }
}

function render(ui) {
  const container = document.createElement('div')
  Preact.render(ui, container)
  return {
    container,
    ...getQueriesForElement(container),
  }
}

test('renders a counter', async () => {
  const {getByText} = render(<Counter />)
  const counter = getByText('0')
  fireEvent.click(counter)
  await waitFor(() => expect(counter).toHaveTextContent('1'))

  fireEvent.click(counter)
  await waitFor(() => expect(counter).toHaveTextContent('2'))

  await fireEventAsync.click(counter)
  expect(counter).toHaveTextContent('3')
})
