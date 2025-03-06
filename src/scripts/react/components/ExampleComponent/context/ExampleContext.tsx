import React, { createContext, useContext, useState } from 'react'

const ExampleContext = createContext<any>({})

const ExampleProvider = ({ children }: any) => {
  const [exampleValue, setExampleValue] = useState('example context value')

  let value = {
    exampleValue,
    setExampleValue,
  }

  return (
    <ExampleContext.Provider value={value}>{children}</ExampleContext.Provider>
  )
}

export const useExample = (): any => {
  const context = useContext(ExampleContext)

  if (!context)
    throw new Error('useExample must be used within a ExampleProvider.')

  return context
}

export default ExampleProvider
