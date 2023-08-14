import { FunctionComponent, PropsWithChildren } from 'react';

export const ErrorMessage: FunctionComponent<
  PropsWithChildren & { dataTestId?: string }
> = ({ children, dataTestId }) => {
  return (
    <p data-test-id={dataTestId} className="mt-2 text-sm text-red-600">
      {children}
    </p>
  );
};
