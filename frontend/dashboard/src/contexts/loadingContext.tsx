import React, { createContext, PropsWithChildren, useState } from 'react'
import { InitialLoadingStateType } from "../interfaces";

const initialState: InitialLoadingStateType = {
  loadingCount: 0,
  errorMessage: '',
  showLoading: () => {},
  hideLoading: () => {},
  showError: () => {},
  cleanError: () => {}
}

const LoadingContext = createContext<InitialLoadingStateType>(initialState);

const LoadingProvider: React.FC<PropsWithChildren<{ children: any }>> = ({ children }) => {

  const showLoading = () => {
    toggleLoading(prevState => {
      return {
        ...prevState,
        loadingCount: prevState.loadingCount + 1
      }
    })
  }

  const hideLoading = () => {
    toggleLoading(prevState => {
      return {
        ...prevState,
        loadingCount:
          prevState.loadingCount > 0 ? prevState.loadingCount - 1 : 0,
      }
    })
  }

  const showError = (message: string) => {
    toggleLoading(prevState => {
      return {
        ...prevState,
        loadingCount:
          prevState.loadingCount > 0 ? prevState.loadingCount - 1 : 0,
        errorMessage: message
      }
    })
  }

  const cleanError = (message: string) => {
    toggleLoading(prevState => {
      return {
        ...prevState,
        errorMessage: ''
      }
    })
  }

  const loadingState = {
    loadingCount: 0,
    errorMessage: '',
    showLoading,
    hideLoading,
    showError,
    cleanError,
  }

  const [loading, toggleLoading] = useState(loadingState);
  return (
    <LoadingContext.Provider value={loading}>
      {children}
    </LoadingContext.Provider>
  )
}

export { LoadingContext, LoadingProvider }
