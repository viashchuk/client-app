import { Link, Outlet } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../contexts/CartContext";
import cartIcon from '../assets/cart.svg'

const RootLayout = () => {
    const { getCartQuantity, getCartTotal } = useContext(CartContext);

    return (
        <div>
            <header className="grid grid-cols-3 gap-6 py-2 px-6 items-center border-b border-gray-200">
                <div className="grow">
                    <Link to="/" className="font-semibold text-[#fc6a32] text-2xl">Coffee Shop</Link>
                </div>
                <div className="text-center">
                    <Link to="/" className="transition duration-200 hover:text-[#fc6a32] font-medium">Produkty</Link>
                </div>
                <div className="grow flex justify-end">
                    <Link to="/cart" className="flex items-center gap-2 font-medium group rounded-xl p-1.5 hover:bg-gray-100">
                        <span className="bg-black rounded-xl w-10 h-10 flex items-center justify-center relative">
                            <img src={cartIcon} className="w-5 relative" alt="Cart" />
                            {getCartQuantity() > 0 &&
                                <span className="absolute -top-1.5 -right-1.5 bg-[#fc6a32] w-5 h-5 flex items-center justify-center rounded-full text-white text-sm"
                                    data-testid="cart-quantity">
                                    {getCartQuantity()}
                                </span>
                            } 
                            <span></span>
                        </span>
                        <span data-testid="cart-total">{getCartTotal()} <span className="text-sm font-normal">zł</span></span>
                    </Link>
                </div>
            </header>
            <main className="px-6 max-w-7xl mx-auto py-10">
                <Outlet />
            </main>
        </div>
    );
};

export default RootLayout;