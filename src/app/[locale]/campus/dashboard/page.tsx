import OrderList from "@/components/common/order/mock";
import { SearchBar } from "@/components/common/Search";
import ValidationTokenButton from "@/components/common/token/TokenValidation";
import "./styles.css"; // Asegúrate de que este archivo contenga los estilos necesarios

export default function Page() {
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
