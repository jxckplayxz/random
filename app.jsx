import React, { useState, useEffect, useMemo } from 'react';
import { Home, Settings, Package, Menu, X, CheckCircle } from 'lucide-react';

// Mock data structure
const initialProducts = [
  { id: 1, name: "Gemini Pro Laptop", category: "Electronics", price: 1800, stock: 5 },
  { id: 2, name: "Quantum Coffee Mug", category: "Kitchenware", price: 25, stock: 45 },
  { id: 3, name: "AI Keyboard", category: "Accessories", price: 120, stock: 15 },
];

/**
 * Global application state management using simple useState for page routing
 */
const PageEnums = {
    DASHBOARD: 'dashboard',
    PRODUCTS: 'products',
    SETTINGS: 'settings'
};

// --- Sub-Components ---

const ProductCard = ({ product }) => (
    <div className="bg-white p-4 rounded-xl shadow-lg hover:shadow-xl transition duration-300 border border-gray-100 flex flex-col">
        <h3 className="text-lg font-semibold text-gray-800 truncate mb-1">{product.name}</h3>
        <p className="text-sm text-indigo-600 font-medium mb-2">{product.category}</p>
        <div className="flex justify-between items-center mt-auto pt-2 border-t border-gray-50">
            <span className="text-xl font-bold text-green-600">${product.price.toFixed(2)}</span>
            <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                product.stock > 10 ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
            }`}>
                {product.stock} in stock
            </span>
        </div>
    </div>
);

const DashboardPage = ({ products }) => {
    const totalProducts = products.length;
    const totalValue = useMemo(() => 
        products.reduce((sum, p) => sum + (p.price * p.stock), 0), 
        [products]
    );

    return (
        <div className="space-y-6">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-4">Dashboard Overview</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-indigo-500">
                    <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-500">Total Products</p>
                        <Package className="h-6 w-6 text-indigo-500" />
                    </div>
                    <p className="text-3xl font-bold text-gray-900 mt-1">{totalProducts}</p>
                </div>
                
                <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-green-500">
                    <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-500">Inventory Value</p>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M8.433 7.412C9.79 6.225 11.233 5.5 12.5 5.5c1.47 0 2.5.58 3.5 1.5s2.5 2.5 2.5 2.5V11c0 .552-.448 1-1 1h-2c-.552 0-1-.448-1-1v-.5c0-.828-.672-1.5-1.5-1.5-.945 0-1.748.558-2.227 1.341l-.224-.134c.05-.03.1-.06.15-.09A4.457 4.457 0 0012.5 8c.767 0 1.48.243 2.083.672l.067-.04.052-.03c.092-.054.187-.105.286-.156C13.565 6.477 12.28 6 11 6c-1.353 0-2.613.585-3.6 1.63L8.433 7.412zM5 14a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z" />
                        </svg>
                    </div>
                    <p className="text-3xl font-bold text-gray-900 mt-1">${totalValue.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
                </div>
                
                <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-yellow-500">
                    <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-500">Low Stock Items</p>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M8.257 3.328a1 1 0 011.486 0l5.857 6.442a1 1 0 01-.743 1.63H3.143a1 1 0 01-.743-1.63l5.857-6.442z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <p className="text-3xl font-bold text-gray-900 mt-1">{products.filter(p => p.stock < 10).length}</p>
                </div>
            </div>

            <h3 className="text-2xl font-bold text-gray-800 pt-4">Recent Activity</h3>
            <div className="bg-white p-6 rounded-xl shadow-lg">
                <ul className="space-y-3">
                    <li className="flex items-center text-gray-700"><CheckCircle className="h-5 w-5 text-green-500 mr-2" /> 5 units of AI Keyboard added to stock.</li>
                    <li className="flex items-center text-gray-700"><CheckCircle className="h-5 w-5 text-green-500 mr-2" /> Quantum Coffee Mug restock alert dismissed.</li>
                    <li className="flex items-center text-gray-700"><CheckCircle className="h-5 w-5 text-green-500 mr-2" /> Price update successful for Gemini Pro Laptop.</li>
                </ul>
            </div>
        </div>
    );
};

const ProductsPage = ({ products }) => {
    return (
        <div className="space-y-6">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-4">Product Catalog ({products.length})</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
};

const SettingsPage = () => {
    const [isSaved, setIsSaved] = useState(false);

    const handleSave = () => {
        setIsSaved(true);
        setTimeout(() => setIsSaved(false), 3000);
    };

    return (
        <div className="space-y-8 bg-white p-8 rounded-xl shadow-lg">
            <h2 className="text-3xl font-extrabold text-gray-900">Application Settings</h2>
            
            <div className="space-y-4">
                <label className="block text-sm font-medium text-gray-700">Notification Email</label>
                <input 
                    type="email" 
                    defaultValue="admin@app.com"
                    className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm p-3 border focus:border-indigo-500 focus:ring-indigo-500"
                    placeholder="Enter email for alerts"
                />
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <label htmlFor="analytics" className="text-sm font-medium text-gray-700">Enable Analytics Tracking</label>
                <input 
                    type="checkbox" 
                    id="analytics" 
                    defaultChecked 
                    className="h-6 w-12 rounded-full appearance-none bg-gray-300 transition duration-200 ease-in-out checked:bg-indigo-600 focus:ring-2 focus:ring-indigo-500 relative cursor-pointer"
                    style={{ WebkitAppearance: 'none', MozAppearance: 'none' }}
                />
            </div>

            <div className="pt-4 border-t border-gray-100">
                <button 
                    onClick={handleSave}
                    className={`px-6 py-3 rounded-xl font-semibold transition duration-300 flex items-center justify-center ${
                        isSaved 
                            ? 'bg-green-500 text-white' 
                            : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg'
                    }`}
                >
                    {isSaved ? (
                        <CheckCircle className="h-5 w-5 mr-2" />
                    ) : (
                        <Settings className="h-5 w-5 mr-2" />
                    )}
                    {isSaved ? 'Settings Saved!' : 'Save Changes'}
                </button>
            </div>
        </div>
    );
};

const SideNavItem = ({ page, currentPage, icon: Icon, label, setPage, isMobile }) => {
    const isActive = currentPage === page;
    const baseClasses = "flex items-center w-full py-3 px-4 rounded-xl transition duration-200";
    const activeClasses = "bg-indigo-600 text-white shadow-md";
    const inactiveClasses = "text-gray-600 hover:bg-gray-100";

    const handleClick = () => {
        setPage(page);
    };

    return (
        <button 
            onClick={handleClick} 
            className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}
        >
            <Icon className="h-6 w-6 mr-3" />
            <span className={isMobile ? "text-lg" : "text-base"}>{label}</span>
        </button>
    );
};


// --- Main App Component ---

const App = () => {
    const [currentPage, setCurrentPage] = useState(PageEnums.DASHBOARD);
    const [products] = useState(initialProducts); // Static data for this example
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    // Determines which page component to render based on the current state
    const renderPage = () => {
        switch (currentPage) {
            case PageEnums.DASHBOARD:
                return <DashboardPage products={products} />;
            case PageEnums.PRODUCTS:
                return <ProductsPage products={products} />;
            case PageEnums.SETTINGS:
                return <SettingsPage />;
            default:
                return <DashboardPage products={products} />;
        }
    };
    
    // Function to handle page change and close sidebar on mobile
    const handleSetPage = (page) => {
        setCurrentPage(page);
        setIsSidebarOpen(false); // Close menu on mobile after selection
    };

    const navItems = [
        { page: PageEnums.DASHBOARD, icon: Home, label: 'Dashboard' },
        { page: PageEnums.PRODUCTS, icon: Package, label: 'Products' },
        { page: PageEnums.SETTINGS, icon: Settings, label: 'Settings' },
    ];

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col lg:flex-row antialiased">
            
            {/* 1. Mobile Header & Menu Toggle */}
            <header className="lg:hidden bg-white shadow-md p-4 flex justify-between items-center sticky top-0 z-20">
                <h1 className="text-xl font-bold text-indigo-700">Inventory App</h1>
                <button 
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition"
                    aria-label="Toggle Menu"
                >
                    {isSidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
            </header>

            {/* 2. Sidebar (Desktop/Mobile overlay) */}
            <aside 
                className={`fixed inset-y-0 left-0 z-30 transform ${
                    isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                } lg:translate-x-0 transition-transform duration-300 ease-in-out bg-white w-64 p-4 shadow-2xl lg:shadow-xl lg:sticky lg:top-0 lg:h-screen flex flex-col`}
            >
                <div className="flex items-center justify-between lg:justify-start mb-8 h-16">
                    <h1 className="text-2xl font-extrabold text-indigo-700">Inventory<span className="text-indigo-400">Hub</span></h1>
                    <button 
                        onClick={() => setIsSidebarOpen(false)} 
                        className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 lg:hidden"
                    >
                        <X className="h-6 w-6" />
                    </button>
                </div>
                
                <nav className="flex-grow space-y-2">
                    {navItems.map(item => (
                        <SideNavItem 
                            key={item.page}
                            page={item.page}
                            currentPage={currentPage}
                            icon={item.icon}
                            label={item.label}
                            setPage={handleSetPage}
                            isMobile={isSidebarOpen} // Pass mobile state for styling adjustments
                        />
                    ))}
                </nav>

                <div className="mt-auto pt-4 border-t border-gray-100 text-sm text-gray-400">
                    <p>User ID: <span className="font-mono text-gray-600">USR-2025-DEV</span></p>
                    <p>&copy; 2024 Inventory App</p>
                </div>
            </aside>

            {/* 3. Main Content Area */}
            <main className="flex-1 p-4 sm:p-8 lg:p-10 overflow-y-auto">
                {renderPage()}
            </main>
            
            {/* Overlay for mobile menu */}
            {isSidebarOpen && (
                <div 
                    onClick={() => setIsSidebarOpen(false)} 
                    className="fixed inset-0 bg-black opacity-50 z-20 lg:hidden"
                ></div>
            )}
        </div>
    );
};

export default App;

