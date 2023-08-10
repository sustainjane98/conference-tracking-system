import { ApplicationTitle } from '@/components/common/application-title';
import { NextPage, Metadata } from 'next';
import { TalkEntryForm } from '@/components/talks/form/talk-entry-form';
import { TalkProcessingArea } from '@/components/talks/talk-processing-area';

export const metadata: Metadata = {
  title: 'Conference Track Management',
};

const Home: NextPage = () => {
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
