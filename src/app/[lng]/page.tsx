import { ApplicationTitle } from '@/components/common/application-title';
import { NextPage, Metadata } from 'next';
import { TalkEntryForm } from '@/components/talks/form/talk-entry-form';
import { TalkProcessingArea } from '@/components/talks/talk-processing-area';
import { useTranslationHook } from '@/hooks/use-translation.hook';
import { Namespaces } from '@/enums/i18n/namespaces.enum';

export const metadata: Metadata = {
  title: 'Conference Track Management',
};

const Home: NextPage = async (
  props,
  { lng }: { lng: string },
) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { t } = await useTranslationHook(lng, [
    Namespaces.COMMON,
    Namespaces.INDEX,
  ]);

  return (
    <>
      <header>
        <ApplicationTitle>
          {metadata.title as string}
        </ApplicationTitle>
      </header>
      <main className="flex flex-1 gap-x-4 p-4">
        <div className="flex-1">
          <TalkEntryForm />
        </div>
        <div className="flex-1">
          <TalkProcessingArea />
        </div>
      </main>
    </>
  );
};
export default Home;
