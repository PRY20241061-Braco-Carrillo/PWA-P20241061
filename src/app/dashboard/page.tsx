import OrderList from "@/src/components/common/order/mock";
import { SearchBar } from "@/src/components/common/Search";
import ValidationTokenButton from "@/src/components/common/token/TokenValidation";
import "./styles.css"; 

export default function DashboardPage() {
  return (
    <div className="page-container">
      <div className="header">
        <SearchBar />
        <ValidationTokenButton />
      </div>
      <div className="content">
        <OrderList />
      </div>
    </div>
  );
}
