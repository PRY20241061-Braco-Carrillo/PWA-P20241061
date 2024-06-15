'use client';

import PageLayout from '@/src/components/layout/PageLayout';
import { Session } from 'next-auth';
import { useLocale, useTranslations } from 'next-intl';

import Link from 'next/link';
import ProtectedDashboardPage from '../../components/dashboard/page';


type Props = {
  session: Session | null;
};

export default function Index({ session }: Props) {
  const t = useTranslations('Index');
  const locale = useLocale();


  return (
    <PageLayout title={t('title')}>
      {session ? (
        <ProtectedDashboardPage />
      ) : (
        <>
          <p>{t('loggedOut')}</p>
          <Link href={locale + '/login'}>{t('login')}</Link>
        </>
      )}
      
    </PageLayout>
  );
}
