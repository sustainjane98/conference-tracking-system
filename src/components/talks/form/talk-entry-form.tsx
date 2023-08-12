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
import { GlobalPageParams } from '@/types/app/common/global-page-params.type';
import { Namespaces } from '@/enums/i18n/namespaces.enum';
import { useTranslationClient } from '@/hooks/i18n/use-translation-client.hook';
import { Translations } from '@/enums/i18n/translation.enum';
import TalksService from '@/services/talks.service';
import { useConferenceContext } from '@/hooks/talks/use-conference-context';

const talksValidationSchema = yup
  .object({
    talk: yup.string().required().talk(),
  })
  .required();

export interface TalkEntryFormData {
  talk: string;
}

export const TalkEntryForm: FunctionComponent<
  GlobalPageParams
> = ({ lng }) => {
  const { t } = useTranslationClient(lng, [
    Namespaces.TALKS,
  ]);

  const { register, handleSubmit, reset } =
    useForm<TalkEntryFormData>({
      resolver: yupResolver(talksValidationSchema),
    });

  const conferenceContext = useConferenceContext();

  const onSubmit: SubmitHandler<TalkEntryFormData> = async (
    { talk: talkString },
    event,
  ) => {
    event?.preventDefault();
    const talkService = new TalksService();
    const talk = await talkService.extractTitleAndDuration(
      talkString,
    );

    if (!talk) return;

    conferenceContext.addTalk(talk);
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
          value={t(Translations.TALKS.INSERT_APPOINTMENT)}
        />
        <TextInput
          {...register('talk')}
          id="talk"
          className="mb-4"
          placeholder={t(
            Translations.TALKS
              .WRITING_FAST_TESTS_AGAINST_ENTERPRISE_RAILS_60_MIN,
          )}
          required
          type="text"
        />
      </div>
      <Button type="submit">
        {t(Translations.TALKS.CLICK)}
      </Button>
    </form>
  );
};
