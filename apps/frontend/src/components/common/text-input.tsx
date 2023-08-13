'use client';

import { forwardRef, ForwardRefExoticComponent } from 'react';
import { TextInputProps } from 'flowbite-react/lib/esm/components/TextInput/TextInput';
import { useFormContext } from 'react-hook-form';
import mergeRefs from 'merge-refs';
import { Label, LabelProps } from 'flowbite-react';
import { ErrorMessage } from './error-message';

export const TextInput: ForwardRefExoticComponent<
  TextInputProps & {
    label?: LabelProps;
  } & import('react').RefAttributes<HTMLInputElement>
> = forwardRef(({ label, ...props }, ref) => {
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
      <TextInput {...props} {...other} ref={mergeRefs(registerRef, ref)} />
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </div>
  );
});
TextInput.displayName = 'TextInput';
