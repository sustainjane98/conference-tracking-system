import '../../styles/globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import classNames from 'classnames';
import { ConferenceContextProvider } from '../../components/talks/conference-context-provider';
import { dir } from 'i18next';
import { languages } from '../../config/i18n';
import { NextLayout } from '../../types/app/common/global-page-params.type';

const inter = Inter({ subsets: ['latin'] });

export async function generateStaticParams() {
  return languages.map((lng) => ({ lng }));
}

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

const RootLayout: NextLayout = ({ children, params: { lng } }) => {
  return (
    <html
      lang={lng}
      dir={dir(lng)}
      className="w-full h-full max-w-[1920px] mx-auto"
    >
      <body
        className={classNames([
          inter.className,
          'w-full h-full p-4 flex flex-col',
        ])}
      >
        <ConferenceContextProvider>{children}</ConferenceContextProvider>
      </body>
    </html>
  );
};

export default RootLayout;
