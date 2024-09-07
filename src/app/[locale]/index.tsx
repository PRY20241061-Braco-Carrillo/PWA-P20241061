'use client';

import PageLayout from '@/src/components/layout/PageLayout';
import { Session } from 'next-auth';
import { signIn, useSession } from 'next-auth/react';
import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';
import { useEffect } from 'react';
import ProtectedDashboardPage from '../../components/dashboard/page';

type Props = {
  session: Session | null;
};

export default function Index({ session: initialSession }: Props) {
  const { data: session, status } = useSession();
  const t = useTranslations('Index');
  const locale = useLocale();

  useEffect(() => {
    if (status === "unauthenticated" && !session) {
      signIn();
    }
  }, [status, session]);
  return (
    <PageLayout title={session ? t('title') : ''}>
      {session ? (
        <ProtectedDashboardPage />
      ) : (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center">
          <div className="p-6 bg-white shadow-lg rounded-lg max-w-md w-full">
            <p className="text-gray-700 text-xl font-semibold mb-4">
              {t('loggedOut')}
            </p>
            <Link className='text-black text-lg font-semibold' href={locale + '/login'}>{t('login')}</Link>

          </div>
        </div>
      )}
    </PageLayout>
  );
}
