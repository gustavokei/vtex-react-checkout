import React from 'react'
import { createRoot } from 'react-dom/client'
import ExampleComponent from './components/ExampleComponent'

const renderExampleComponent = () => {
  window.addEventListener('DOMContentLoaded', () => {
    const div = document.createElement('div')
    div.setAttribute('class', 'example-preact-component')
    document.querySelector('.cart-template')?.prepend(div)
    const root = createRoot(div)
    root.render(<ExampleComponent />)
  })
}

export default renderExampleComponent
