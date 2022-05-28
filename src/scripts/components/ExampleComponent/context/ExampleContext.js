import React, { createContext, useState } from 'react'
export const ExampleContext = createContext()

const ExampleProvider = ({ children }) => {
  const [exampleValue, setExampleValue] = useState('example context value')

  let value = {
    exampleValue,
    setExampleValue,
  }
  return (
    <ExampleContext.Provider value={value}>{children}</ExampleContext.Provider>
  )
}

export default ExampleProvider
