import { Link, Outlet } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../contexts/CartContext";

const RootLayout = () => {
    const { getCartQuantity } = useContext(CartContext);

    return (
        <div>
            <nav>
                <Link to="/">Products</Link>
                <Link to="/cart">Cart  {getCartQuantity() > 0 && `(${getCartQuantity()})`} </Link>
            </nav>
            <main>
                <Outlet />
            </main>
        </div>
    );
};

export default RootLayout;