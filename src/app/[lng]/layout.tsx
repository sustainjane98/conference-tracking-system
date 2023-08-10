import '../../styles/globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import classNames from 'classnames';
import { TalksContextProvider } from '@/components/talks/talks-context-provider';
import { dir } from 'i18next';
import { languages } from '@/config/i18n';
import { ReactNode } from 'react';

const inter = Inter({ subsets: ['latin'] });

export async function generateStaticParams() {
  return languages.map((lng) => ({ lng }));
}

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
  params: { lng },
}: {
  children: ReactNode;
  params: {
    lng: string;
  };
}) {
  return (
    <html
      lang={lng}
      dir={dir(lng)}
      className="w-full h-full"
    >
      <body
        className={classNames([
          inter.className,
          'w-full h-full p-4 flex flex-col',
        ])}
      >
        <TalksContextProvider>
          {children}
        </TalksContextProvider>
      </body>
    </html>
  );
}
