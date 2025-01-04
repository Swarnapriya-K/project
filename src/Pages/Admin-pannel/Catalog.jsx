import { Outlet } from "react-router-dom";

const Catalog = () => {
  return (
    <div>
    
      <Outlet /> {/* Renders the nested routes */}
    </div>
  );
};

export default Catalog;
