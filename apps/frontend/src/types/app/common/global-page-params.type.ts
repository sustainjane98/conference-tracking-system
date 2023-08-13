import { NextPage } from 'next';
import { ReactNode } from 'react';

export type GlobalPageParams = {
  lng: string;
};

export type NextLayout<
  Props = NonNullable<unknown>,
  Params = NonNullable<unknown>,
  InitialProps = NonNullable<unknown>
> = NextPageWithGlobalPageParams<
  {
    children: ReactNode;
  } & Props,
  Params,
  InitialProps
>;

export type NextPageWithGlobalPageParams<
  Props = NonNullable<unknown>,
  Params = NonNullable<unknown>,
  InitialProps = NonNullable<unknown>
> = NextPage<{ params: GlobalPageParams & Params } & Props, InitialProps>;
