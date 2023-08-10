import {
  FunctionComponent,
  PropsWithChildren,
} from 'react';

export interface ApplicationTitleProps
  extends PropsWithChildren {
  children: string;
}

export const ApplicationTitle: FunctionComponent<
  ApplicationTitleProps
> = ({ children }) => {
  return (
    <div className="flex justify-center">
      <h1
        className="font-medium text-3xl
      "
      >
        {children}
      </h1>
    </div>
  );
};
