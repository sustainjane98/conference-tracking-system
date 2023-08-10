import React, {
  FunctionComponent,
  PropsWithChildren,
  useState,
} from 'react';

export interface TalksContext {}

export type TalksContextWithSetter = TalksContext | {};

const initalData: TalksContext = {};

const initalDataWithSetter: TalksContextWithSetter = {
  ...initalData,
};

export const TalksContext =
  React.createContext<TalksContextWithSetter>(
    initalDataWithSetter,
  );

export const TalksContextProvider: FunctionComponent<
  PropsWithChildren
> = ({ children }) => {
  const [talksContextState, _] =
    useState<TalksContext>(initalData);

  return (
    <TalksContext.Provider value={talksContextState}>
      {children}
    </TalksContext.Provider>
  );
};
