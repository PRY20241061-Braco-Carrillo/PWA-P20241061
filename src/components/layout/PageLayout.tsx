import {ReactNode} from 'react';
import LocaleSwitcher from './LocaleSwitcher';

type Props = {
  children?: ReactNode;
  title: string;
};

export default function PageLayout({children, title}: Props) {
  return (
    <>
      <div
        style={{
          padding: 24,
          lineHeight: 1.5,
          width: '100%',
        }}
      >
        
            <LocaleSwitcher />
        
          <h1>{title}</h1>
          {children}
          </div>  
        
    </>
  );
}