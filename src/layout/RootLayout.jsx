import { Link, Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <div>
      <nav>
        <Link to="/">Products</Link>
        <Link to="/cart">Cart</Link>
      </nav>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default RootLayout;