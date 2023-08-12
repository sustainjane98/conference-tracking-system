import { ApplicationTitle } from '@/components/common/application-title';
import { Metadata } from 'next';
import { TalkEntryForm } from '@/components/talks/form/talk-entry-form';
import { TalkProcessingArea } from '@/components/talks/talk-processing-area';
import { Namespaces } from '@/enums/i18n/namespaces.enum';
import { NextPageWithGlobalPageParams } from '@/types/app/common/global-page-params.type';
import { useTranslationServer } from '@/hooks/i18n/use-translation.server';

export const metadata: Metadata = {
  title: 'Conference Track Management',
};

const Home: NextPageWithGlobalPageParams = async ({
  lng,
}) => {
  const { t } = await useTranslationServer(lng, [
    Namespaces.COMMON,
    Namespaces.TALKS,
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
          <TalkEntryForm lng={lng} />
        </div>
        <div className="flex-1">
          <TalkProcessingArea />
        </div>
      </main>
    </>
  );
};
export default Home;
