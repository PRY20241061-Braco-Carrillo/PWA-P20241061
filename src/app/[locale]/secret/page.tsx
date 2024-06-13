'use client';

import PageLayout from '@/src/components/layout/PageLayout';
import {useTranslations} from 'next-intl';

export default function Secret() {
  const t = useTranslations('Secret');

  return (
    <PageLayout title={t('title')}>
      <p>{t('description')}</p>
      <h1>Hola</h1>
    </PageLayout>
  );
}