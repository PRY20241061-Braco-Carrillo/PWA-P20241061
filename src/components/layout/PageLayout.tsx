import { ReactNode } from 'react';
import LocaleSwitcher from './LocaleSwitcher';

type Props = {
  children?: ReactNode;
  title: string;
};

export default function PageLayout({ children, title }: Props) {
  return (
    <div className="min-h-screen flex flex-col items-center p-6">
      <div className="w-full max-w-6xl flex justify-end mb-6">
        <LocaleSwitcher />
      </div>

      {/* Title */}
      <div className="w-full max-w-6xl text-center">
        <h1 className="text-2xl font-bold text-white mb-8">{title}</h1>
      </div>

      {/* Content */}
      <div className="w-full  p-8">
        {children}
      </div>
    </div>
  );
}
