'use client';

import { FunctionComponent } from 'react';
import {
  Button,
  Label,
  TextInput,
} from '@/components/common/flowbite-react';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import '@/extensions/yup/talks.valdation.extension';
import { yupResolver } from '@hookform/resolvers/yup';

const talksValidationSchema = yup
  .object({
    talk: yup.string().required().talk(),
  })
  .required();

export interface TalkEntryFormData {
  talk: string;
}

export const TalkEntryForm: FunctionComponent = () => {
  const { register, handleSubmit, reset } =
    useForm<TalkEntryFormData>({
      resolver: yupResolver(talksValidationSchema),
    });

  const onSubmit: SubmitHandler<TalkEntryFormData> = (
    data,
    event,
  ) => {
    event?.preventDefault();
    console.log(data);
    reset();
  };

  return (
    <form
      className="flex flex-1 flex-col justify-center items-center h-full"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="mb-2 block w-full">
        <Label
          htmlFor="talk"
          value="Termin eingeben"
        />
        <TextInput
          {...register('talk')}
          id="talk"
          className="mb-4"
          placeholder="Writing Fast Tests Against Enterprise Rails 60min"
          required
          type="text"
        />
      </div>
      <Button type="submit">Click me</Button>
    </form>
  );
};
