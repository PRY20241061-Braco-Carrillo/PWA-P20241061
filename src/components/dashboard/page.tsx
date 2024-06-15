"use client";


import { SearchBar } from '@/src/components/common/Search';
import ValidationTokenButton from '@/src/components/common/token/TokenValidation';
import { useSession } from "next-auth/react";
import './styles.css';
import OrderList from '../common/order/OrderList';


const DashboardPage = () => {
  const { data: session } = useSession();



  return (
    <div className="page-container">
      <h1>{JSON.stringify(session?.user?.data)}</h1>
      <div className="header">
        
        <SearchBar />
        {session?.user?.data?.roles === 'ROLE_WAITER' && <ValidationTokenButton />}
      </div>
      <div className="content">
        <OrderList />
      </div>
    </div>
  );
};

export default DashboardPage;