"use client";

import { SearchBar } from "@/src/components/common/Search";
import ValidationTokenButton from "@/src/components/common/token/TokenValidation";
import { useSession } from "next-auth/react";
import OrderListWrapper from "../common/order/OrderListWrapper";
import "./styles.css";
import { useOrderByTableNumber } from "@/src/api/domain/orders/useOrderByTableNumber";
import OrderCard from "../common/order/OrderCard";
import { useState } from "react";
import { useOrders } from "@/src/api/domain/orders/useOrder";
import { OrderProvider } from "../common/order/OrderContext";
import Spinner from "@/src/components/ui/spinner";

const DashboardPage = () => {
  const { data: session } = useSession();
  const userRole = session?.user?.data?.roles;

  const [searchQuery, setSearchQuery] = useState("");
  const [shouldShowOrders, setShouldShowOrders] = useState(true); 

  const {
    data: searchResult,
    isLoading: isSearchLoading,
    error: searchError,
  } = useOrderByTableNumber(searchQuery);

  const {
    data: orders,
    isLoading: isOrdersLoading,
    error: ordersError,
    refetch,
  } = useOrders();

  const handleSearch = (query: string) => {
    setSearchQuery(query);

    if (query.trim()) {
      setShouldShowOrders(false);
    } else {
      setShouldShowOrders(true); 
      refetch(); 
    }
  };

  return (
    <OrderProvider>
      <div className="page-container">
        <div className="header gap-6">
          {session?.user?.data?.roles === "ROLE_WAITER" && (
            <>
              <SearchBar onSearch={handleSearch} />
              <ValidationTokenButton />
            </>
          )}
        </div>
        <div className="content">
          {isSearchLoading || isOrdersLoading ? (
            <div className="flex justify-center items-center h-screen">
              <Spinner />
            </div>
          ) : searchQuery.trim() && searchResult ? (
            <OrderCard
              orderId={searchResult.data.orderId}
              orderStatus={searchResult.data.orderStatus}
              tableNumber={searchResult.data.tableNumber}
              forTable={searchResult.data.forTable}
              orderRequestDate={new Date(searchResult.data.orderRequestDate).toLocaleString()}
              totalPrice={searchResult.data.totalPrice}
              userRole={userRole!}
              orderRequestId={searchResult.data.orderRequestId}
            />
          ) : searchQuery.trim() && !searchResult && !isSearchLoading ? (
            <p className="text-center text-gray-500">{`No se encontró mesa con el código ${searchQuery}`}</p>
          ) : shouldShowOrders ? (
            <OrderListWrapper userRole={userRole!} />
          ) : null}

          {searchError && <p className="text-center text-red-500">{`Error: ${searchError.message}`}</p>}
          {ordersError && <p className="text-center text-red-500">{`Error: ${ordersError.message}`}</p>}
        </div>
      </div>
    </OrderProvider>
  );
};

export default DashboardPage;
