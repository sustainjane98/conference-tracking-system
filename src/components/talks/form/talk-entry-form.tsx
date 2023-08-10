'use client';

import { FunctionComponent } from 'react';
import {
  Button,
  Label,
  TextInput,
} from '@/components/common/flowbite-react';
import { SubmitHandler, useForm } from 'react-hook-form';

export interface TalkEntryFormData {
  talk: string;
}

export const TalkEntryForm: FunctionComponent = () => {
  const { register, handleSubmit } =
    useForm<TalkEntryFormData>();

  const onSubmit: SubmitHandler<TalkEntryFormData> = (
    data,
    event,
  ) => {
    event?.preventDefault();

    console.log(data);
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
