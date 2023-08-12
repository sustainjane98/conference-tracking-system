import { NextPage } from 'next';

export type GlobalPageParams = {
  lng: string;
};

type NextPageTypes = 'Page' | 'Layout';

export type NextPageWithGlobalPageParams<
  Type extends NextPageTypes = 'Page',
  Props = {},
  Params = {},
  InitialProps = {},
> = NextPage<
  Type extends 'Page'
    ? GlobalPageParams & Props & Params
    : Type extends 'Layout'
    ? { params: GlobalPageParams & Params } & Props
    : never,
  InitialProps
>;
