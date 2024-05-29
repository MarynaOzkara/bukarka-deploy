import React, { FC, ReactNode } from "react";

interface ProviderProps {
  children: ReactNode;
}

type Provider = FC<ProviderProps>;

const combineProviders = (...providers: Provider[]): Provider => {
  return providers.reduce(
    (Combined, Provider) => {
      return ({ children }: ProviderProps) => (
        <Combined>
          <Provider>{children}</Provider>
        </Combined>
      );
    },
    ({ children }: ProviderProps) => <>{children}</>
  );
};

export default combineProviders;
