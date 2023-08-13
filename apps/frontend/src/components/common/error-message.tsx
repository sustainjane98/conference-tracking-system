import { FunctionComponent, PropsWithChildren } from 'react';

export const ErrorMessage: FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  return <p className="mt-2 text-sm text-red-600">{children}</p>;
};
