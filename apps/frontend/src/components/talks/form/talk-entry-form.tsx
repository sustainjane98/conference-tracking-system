'use client';

import { FunctionComponent } from 'react';
import { Button } from 'flowbite-react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import '../../../extensions/yup/talks.valdation.extension';
import { yupResolver } from '@hookform/resolvers/yup';
import type { GlobalPageParams } from '../../../types/app/common/global-page-params.type';
import { Namespaces } from '../../../enums/i18n/namespaces.enum';
import { useTranslationClient } from '../../../hooks/i18n/use-translation-client.hook';
import { Translations } from '../../../enums/i18n/translation.enum';
import TalksService from '../../../services/talks.service';
import { useConferenceContext } from '../../../hooks/talks/use-conference-context';
import { DataTestIds } from '@conference-tracking-system/frontend/tests';
import { TextInput } from '../../common/text-input';

const talksValidationSchema = yup
  .object({
    talk: yup.string().required().talk(),
  })
  .required();

export interface TalkEntryFormData {
  talk: string;
}

export const TalkEntryForm: FunctionComponent<GlobalPageParams> = ({ lng }) => {
  const { t } = useTranslationClient(lng, [Namespaces.TALKS]);

  const { register, handleSubmit, reset, ...otherFormValues } =
    useForm<TalkEntryFormData>({
      resolver: yupResolver(talksValidationSchema),
    });

  const conferenceContext = useConferenceContext();

  const onSubmit: SubmitHandler<TalkEntryFormData> = async (
    { talk: talkString },
    event
  ) => {
    event?.preventDefault();
    const talkService = new TalksService();
    const talk = await talkService.extractTitleAndDuration(talkString);

    if (!talk) return;

    conferenceContext.addTalk(talk);
    reset();
  };

  return (
    <FormProvider
      register={register}
      reset={reset}
      handleSubmit={handleSubmit}
      {...otherFormValues}
    >
      <form
        className="flex flex-1 flex-col justify-center items-center h-full"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="block w-full mb-8">
          <TextInput
            label={{
              htmlFor: 'talk',
              value: t(Translations.TALKS.INSERT_APPOINTMENT),
            }}
            {...register('talk')}
            data-test-id={DataTestIds.INDEX.TALK_ENTRY_INPUT}
            id="talk"
            name={'talk'}
            placeholder={t(
              Translations.TALKS
                .WRITING_FAST_TESTS_AGAINST_ENTERPRISE_RAILS_60_MIN
            )}
            required
            type="text"
          />
        </div>
        <Button
          data-test-id={DataTestIds.INDEX.TALK_ENTRY_SUBMIT}
          type="submit"
        >
          {t(Translations.TALKS.CLICK)}
        </Button>
      </form>
    </FormProvider>
  );
};
