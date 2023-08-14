'use client';

import { FunctionComponent } from 'react';
import {
  TextInputProps,
  TextInput as TextInputBase,
} from 'flowbite-react/lib/esm/components/TextInput/TextInput';
import { useFormContext } from 'react-hook-form';
import { Label, LabelProps } from 'flowbite-react';
import { ErrorMessage } from './error-message';
import { DataTestIds } from '@conference-tracking-system/frontend/tests';

export const TextInput: FunctionComponent<
  TextInputProps & {
    label?: LabelProps;
  }
> = ({ label, ...props }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const errorMessage = errors?.[props.name as string]?.message as string;

  const { ref: registerRef, ...other } = register(props.name as string);

  return (
    <div>
      {label && (
        <Label
          {...label}
          htmlFor={label.htmlFor ?? props.id}
          value={label.value}
        />
      )}
      <TextInputBase {...props} {...other} ref={registerRef} />
      {errorMessage && (
        <ErrorMessage
          dataTestId={DataTestIds.INDEX.INPUT_ERROR(
            ((props as never)?.['data-test-id'] as string) ?? ''
          )}
        >
          {errorMessage}
        </ErrorMessage>
      )}
    </div>
  );
};
