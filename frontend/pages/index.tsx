import Head from 'next/head';
import Link from 'next/link';
import Layout from '@/components/Layout';
import { useTranslation } from 'react-i18next';
import { ArrowRightIcon } from '@heroicons/react/24/solid';

export default function Home() {
  const { t } = useTranslation();

  return (
    <>
      <Head>
        <title>{t('home_title')}</title>
      </Head>

      <Layout>
        <section className="flex flex-col items-center justify-center text-center py-24 px-4">
          <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 leading-tight mb-6">
            {t('home_heading')} <span className="text-primary">{t('elegance')}</span>
          </h1>
          <p className="text-gray-600 text-lg md:text-xl mb-10 max-w-2xl">
            {t('home_subtext')}
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/login">
              <button className="bg-primary text-white px-6 py-3 rounded-xl font-semibold shadow-md hover:bg-primary-dark transition duration-300 flex items-center gap-2">
                {t('login')} <ArrowRightIcon className="w-5 h-5" />
              </button>
            </Link>
            <Link href="/signup">
              <button className="border border-primary text-primary px-6 py-3 rounded-xl font-semibold hover:bg-primary-light hover:text-white shadow-md transition duration-300">
                {t('register')}
              </button>
            </Link>
          </div>
        </section>
      </Layout>
    </>
  );
}
