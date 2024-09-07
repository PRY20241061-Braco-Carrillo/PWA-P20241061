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

const DashboardPage = () => {
  const { data: session } = useSession();
  const userRole = session?.user?.data?.roles;

  const [searchQuery, setSearchQuery] = useState("");
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
    if (query) {
      setSearchQuery(query);
    } else {
      refetch();
    }
  };

  return (
    <OrderProvider>
      <div className="page-container">
        <div className="header gap-6">
          {session?.user?.data?.roles === "ROLE_WAITER" && (
            <SearchBar onSearch={handleSearch} />
          )}
          {session?.user?.data?.roles === "ROLE_WAITER" && (
            <ValidationTokenButton />
          )}
        </div>
        <div className="content">
          {searchQuery.trim() && searchResult ? (
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
          ) : (
            <OrderListWrapper userRole={userRole!} />
          )}
        </div>
      </div>
    </OrderProvider>
  );
};

export default DashboardPage;
