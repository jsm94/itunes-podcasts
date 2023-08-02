import { createContext, useContext, useReducer } from "react";

export enum LoadingActionTypes {
  PUSH = "push",
  POP = "pop",
}

const initialState: boolean[] = [];

const loadingReducer = (state: boolean[], action: { type: string }) => {
  switch (action.type) {
    case LoadingActionTypes.PUSH: {
      return [...state, true];
    }
    case LoadingActionTypes.POP: {
      return [...state.slice(0, state.length - 1)];
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
};

const LoadingContext = createContext(initialState);

const LoadingDispatchContext = createContext((() => {}) as React.Dispatch<{
  type: string;
}>);

type LoadingProviderProps = {
  children: React.ReactNode;
};

export const LoadingProvider = ({ children }: LoadingProviderProps) => {
  const [state, dispatch] = useReducer(loadingReducer, initialState);

  return (
    <LoadingContext.Provider value={state}>
      <LoadingDispatchContext.Provider value={dispatch}>
        {children}
      </LoadingDispatchContext.Provider>
    </LoadingContext.Provider>
  );
};

export const useLoading = () => {
  return useContext(LoadingContext);
};

export const useLoadingDispatch = () => {
  return useContext(LoadingDispatchContext);
};
