import React, { useContext, createContext, useState } from 'react'

//define the interface for the context
interface AuthPageContextValue {
  showLogin: boolean
  setShowLogin: React.Dispatch<React.SetStateAction<boolean>>
}
//define the provider interface
interface AuthPageContextProviderProps {
  children: JSX.Element | JSX.Element[]
}

//set a default value with the correct types
const AuthPageContext = createContext<AuthPageContextValue>({
  showLogin: false,
  setShowLogin: () => {},
})

const useAuthPageContext = () => {
  const context = useContext(AuthPageContext)
  return context
}

const AuthPageContextProvider = ({
  children,
}: AuthPageContextProviderProps) => {
  const [showLogin, setShowLogin] = useState(true)

  return (
    <AuthPageContext.Provider value={{ showLogin, setShowLogin }}>
      {children}
    </AuthPageContext.Provider>
  )
}

export { useAuthPageContext, AuthPageContextProvider }
