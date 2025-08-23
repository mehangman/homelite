import React, { useState, createContext, useContext, useEffect } from 'react';
import { Home, UtensilsCrossed, ShoppingCart, User, LogIn, LogOut, Sun, Moon, Bell, Search, ChevronDown, Trash2, PlusCircle, Edit, XCircle, Package, Truck, CheckCircle, MoreVertical, ShieldCheck, UserCog } from 'lucide-react';

// --- Mock Data ---
const mockSnacks = [
  { id: 1, name: 'Samosa', description: 'Crispy pastry filled with spiced potatoes and peas.', price: 2.50, image: 'https://placehold.co/400x300/f97316/ffffff?text=Samosa' },
  { id: 2, name: 'Dhokla', description: 'Savory steamed cake made from fermented rice and chickpea batter.', price: 3.00, image: 'https://placehold.co/400x300/fbbf24/ffffff?text=Dhokla' },
  { id: 3, name: 'Khandvi', description: 'Delicate rolls of gram flour cooked with yogurt and spices.', price: 4.50, image: 'https://placehold.co/400x300/f59e0b/ffffff?text=Khandvi' },
  { id: 4, name: 'Pani Puri', description: 'Hollow puri, filled with a mixture of flavored water, tamarind chutney, chili, chaat masala, potato, onion or chickpeas.', price: 5.00, image: 'https://placehold.co/400x300/eab308/ffffff?text=Pani+Puri' },
  { id: 5, name: 'Jalebi', description: 'Sweet, crispy, and chewy spirals of deep-fried batter soaked in syrup.', price: 4.00, image: 'https://placehold.co/400x300/d97706/ffffff?text=Jalebi' },
  { id: 6, name: 'Vada Pav', description: 'A deep-fried potato dumpling placed inside a bread bun.', price: 3.50, image: 'https://placehold.co/400x300/ca8a04/ffffff?text=Vada+Pav' },
];

const mockOrders = [
  { id: 'ORD101', customer: 'Alice Johnson', date: '2024-07-20', status: 'Delivered', total: 12.50, items: [mockSnacks[0], mockSnacks[1]], assignedTo: 'staff1' },
  { id: 'ORD102', customer: 'Bob Williams', date: '2024-07-21', status: 'Shipped', total: 9.00, items: [mockSnacks[2]], assignedTo: 'staff1' },
  { id: 'ORD103', customer: 'Charlie Brown', date: '2024-07-22', status: 'Packed', total: 15.00, items: [mockSnacks[3], mockSnacks[4]], assignedTo: 'staff2' },
  { id: 'ORD104', customer: 'Diana Prince', date: '2024-07-23', status: 'Ordered', total: 7.50, items: [mockSnacks[0], mockSnacks[0], mockSnacks[0]], assignedTo: 'staff2' },
];

const mockUsers = [
    { id: 'cust1', name: 'Alice Johnson', email: 'alice@example.com', role: 'customer', status: 'Active' },
    { id: 'admin1', name: 'Super Admin', email: 'admin@homelite.com', role: 'super-admin', status: 'Active' },
    { id: 'staff1', name: 'John Doe', email: 'john.doe@homelite.com', role: 'staff', status: 'Active' },
    { id: 'staff2', name: 'Jane Smith', email: 'jane.smith@homelite.com', role: 'staff', status: 'Inactive' },
];

// --- Authentication Context ---
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // null, { role: 'customer' }, { role: 'staff' }, { role: 'super-admin' }
  const [theme, setTheme] = useState('light');

  const login = (role) => {
    const userCredentials = mockUsers.find(u => u.role === role);
    setUser(userCredentials);
  };
  const logout = () => setUser(null);
  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  return (
    <AuthContext.Provider value={{ user, login, logout, theme, toggleTheme }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

// --- Reusable UI Components ---

const Card = ({ children, className = '' }) => (
  <div className={`bg-white dark:bg-gray-800 shadow-lg rounded-xl overflow-hidden transition-transform duration-300 hover:scale-105 ${className}`}>
    {children}
  </div>
);

const Button = ({ children, onClick, className = '', variant = 'primary', ...props }) => {
  const baseClasses = 'px-4 py-2 rounded-lg font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-900 flex items-center justify-center gap-2';
  const variants = {
    primary: 'bg-orange-500 text-white hover:bg-orange-600 focus:ring-orange-500',
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 focus:ring-gray-500',
    danger: 'bg-red-500 text-white hover:bg-red-600 focus:ring-red-500',
    ghost: 'bg-transparent text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
  };
  return (
    <button onClick={onClick} className={`${baseClasses} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};

const Modal = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md m-4">
                <div className="p-4 border-b dark:border-gray-700 flex justify-between items-center">
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-white">{title}</h3>
                    <Button variant="ghost" onClick={onClose} className="p-1 h-auto"><XCircle size={24} /></Button>
                </div>
                <div className="p-6">
                    {children}
                </div>
            </div>
        </div>
    );
};


const Input = ({ id, type = 'text', placeholder, ...props }) => (
  <input
    id={id}
    type={type}
    placeholder={placeholder}
    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
    {...props}
  />
);

const Select = ({ children, ...props }) => (
    <select {...props} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
        {children}
    </select>
);


// --- Layout Components ---

const Navbar = ({ setPage }) => {
  const { user, logout, theme, toggleTheme } = useAuth();

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <a href="#" onClick={() => setPage('home')} className="flex-shrink-0 flex items-center gap-2 text-orange-500">
              <UtensilsCrossed size={28} />
              <span className="font-bold text-2xl">Home Lite</span>
            </a>
          </div>
          <div className="hidden md:flex items-center space-x-4">
             <a href="#" onClick={() => setPage('home')} className="text-gray-600 dark:text-gray-300 hover:text-orange-500 px-3 py-2 rounded-md text-sm font-medium">Home</a>
             <a href="#" onClick={() => setPage('about')} className="text-gray-600 dark:text-gray-300 hover:text-orange-500 px-3 py-2 rounded-md text-sm font-medium">About Us</a>
             <a href="#" onClick={() => setPage('contact')} className="text-gray-600 dark:text-gray-300 hover:text-orange-500 px-3 py-2 rounded-md text-sm font-medium">Contact</a>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={toggleTheme} className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>
            <button className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 relative">
              <Bell size={20} />
              <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white dark:ring-gray-800"></span>
            </button>
            {user && user.role === 'customer' && (
              <Button onClick={() => setPage('cart')} variant="ghost">
                <ShoppingCart size={20} />
                <span className="ml-1 hidden sm:inline">Cart</span>
                <span className="ml-2 bg-orange-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">3</span>
              </Button>
            )}
            {user ? (
              <div className="relative group">
                <button className="flex items-center gap-2 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
                  <User size={20} />
                  <span className="hidden sm:inline font-medium">{user.name}</span>
                  <ChevronDown size={16} />
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-50 hidden group-hover:block">
                  <a href="#" onClick={() => setPage(user.role.includes('admin') || user.role === 'staff' ? 'dashboard' : 'account')} className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">My Account</a>
                  <a href="#" onClick={() => { logout(); setPage('home'); }} className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">Logout</a>
                </div>
              </div>
            ) : (
              <Button onClick={() => setPage('login')}>
                <LogIn size={18} /> Login
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

const Footer = ({ setPage }) => (
  <footer className="bg-gray-100 dark:bg-gray-900 border-t dark:border-gray-800 mt-auto">
    <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Home Lite</h3>
          <p className="mt-2 text-gray-600 dark:text-gray-400">Traditional Taste, Modern Touch.</p>
        </div>
        <div>
          <h4 className="font-semibold text-gray-700 dark:text-gray-200">Quick Links</h4>
          <ul className="mt-2 space-y-1">
            <li><a href="#" onClick={() => setPage('home')} className="text-gray-600 dark:text-gray-400 hover:text-orange-500">Home</a></li>
            <li><a href="#" onClick={() => setPage('about')} className="text-gray-600 dark:text-gray-400 hover:text-orange-500">About Us</a></li>
            <li><a href="#" onClick={() => setPage('contact')} className="text-gray-600 dark:text-gray-400 hover:text-orange-500">Contact</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-gray-700 dark:text-gray-200">Legal</h4>
          <ul className="mt-2 space-y-1">
            <li><a href="#" onClick={() => setPage('privacy')} className="text-gray-600 dark:text-gray-400 hover:text-orange-500">Privacy Policy</a></li>
            <li><a href="#" onClick={() => setPage('terms')} className="text-gray-600 dark:text-gray-400 hover:text-orange-500">Terms of Service</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-gray-700 dark:text-gray-200">Follow Us</h4>
          {/* Social media icons would go here */}
        </div>
      </div>
      <div className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-4 text-center text-sm text-gray-500 dark:text-gray-400">
        &copy; {new Date().getFullYear()} Home Lite. All rights reserved.
      </div>
    </div>
  </footer>
);

// --- Page Components ---

const HomePage = ({ setPage, setSelectedSnack }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const filteredSnacks = mockSnacks.filter(snack =>
    snack.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      {/* Hero Section */}
      <section className="bg-orange-50 dark:bg-gray-800 py-20 md:py-32">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-800 dark:text-white">Home Lite</h1>
          <p className="mt-4 text-lg md:text-xl text-gray-600 dark:text-gray-300">Traditional Taste, Modern Touch</p>
        </div>
      </section>

      {/* Snack Listing */}
      <main className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Our Snacks</h2>
          <div className="relative w-full md:w-1/3">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <Input
              type="text"
              placeholder="Search for a snack..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
          {filteredSnacks.map(snack => (
            <Card key={snack.id}>
              <img src={snack.image} alt={snack.name} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white">{snack.name}</h3>
                <p className="text-gray-600 dark:text-gray-400 mt-1">${snack.price.toFixed(2)}</p>
                <div className="mt-4 flex gap-2">
                    <Button onClick={() => { setSelectedSnack(snack); setPage('snack-detail'); }} className="w-full">View Details</Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </main>
    </>
  );
};

const SnackDetailPage = ({ snack, setPage }) => (
  <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
    <Button onClick={() => setPage('home')} variant="secondary" className="mb-8">
        &larr; Back to Snacks
    </Button>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
      <div>
        <img src={snack.image} alt={snack.name} className="w-full h-auto rounded-lg shadow-lg object-cover" />
      </div>
      <div>
        <h1 className="text-4xl font-bold text-gray-800 dark:text-white">{snack.name}</h1>
        <p className="text-2xl font-semibold text-orange-500 my-4">${snack.price.toFixed(2)}</p>
        <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">{snack.description}</p>
        <Button className="mt-8 text-lg w-full sm:w-auto">
          <ShoppingCart size={20} /> Add to Cart
        </Button>
      </div>
    </div>
  </div>
);

const CartPage = ({ setPage }) => (
    <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-8 text-gray-800 dark:text-white">Your Cart</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                {[mockSnacks[0], mockSnacks[2], mockSnacks[4]].map((item, index) => (
                    <div key={index} className="flex items-center justify-between py-4 border-b dark:border-gray-700 last:border-b-0">
                        <div className="flex items-center gap-4">
                            <img src={item.image} alt={item.name} className="w-20 h-20 rounded-md object-cover"/>
                            <div>
                                <h3 className="font-semibold text-lg text-gray-800 dark:text-white">{item.name}</h3>
                                <p className="text-gray-500 dark:text-gray-400">${item.price.toFixed(2)}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <p className="font-semibold text-gray-800 dark:text-white">${item.price.toFixed(2)}</p>
                            <Button variant="ghost" className="text-red-500 hover:bg-red-100 dark:hover:bg-red-900/50 p-2 h-auto">
                                <Trash2 size={20}/>
                            </Button>
                        </div>
                    </div>
                ))}
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md h-fit">
                <h2 className="text-xl font-bold mb-4 border-b pb-4 dark:border-gray-700 text-gray-800 dark:text-white">Order Summary</h2>
                <div className="space-y-2">
                    <div className="flex justify-between text-gray-600 dark:text-gray-300">
                        <span>Subtotal</span>
                        <span>$11.00</span>
                    </div>
                    <div className="flex justify-between text-gray-600 dark:text-gray-300">
                        <span>Tax</span>
                        <span>$0.99</span>
                    </div>
                    <div className="flex justify-between font-bold text-lg text-gray-800 dark:text-white pt-2 border-t dark:border-gray-700">
                        <span>Total</span>
                        <span>$11.99</span>
                    </div>
                </div>
                <Button className="w-full mt-6 text-lg">Proceed to Checkout</Button>
            </div>
        </div>
    </div>
);

const OrderTrackingPage = ({ setPage }) => {
    const order = mockOrders[2];
    const statuses = ['Ordered', 'Packed', 'Shipped', 'Delivered'];
    const currentStatusIndex = statuses.indexOf(order.status);

    const getStatusColor = (index) => {
        if (index < currentStatusIndex) return 'bg-green-500';
        if (index === currentStatusIndex) return 'bg-orange-500';
        return 'bg-gray-300 dark:bg-gray-600';
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'Ordered': return <PlusCircle className="text-white" />;
            case 'Packed': return <Package className="text-white" />;
            case 'Shipped': return <Truck className="text-white" />;
            case 'Delivered': return <CheckCircle className="text-white" />;
            default: return null;
        }
    };

    return (
        <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold mb-2 text-gray-800 dark:text-white">Order Tracking</h1>
            <p className="text-gray-600 dark:text-gray-400 mb-8">Order ID: {order.id}</p>

            <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
                <div className="relative">
                    <div className="absolute left-0 top-4 bottom-4 w-1 bg-gray-200 dark:bg-gray-700 rounded-full" style={{ left: '1.125rem' }}></div>
                    <div className="absolute left-0 top-4 w-1 bg-orange-500 rounded-full" style={{ left: '1.125rem', height: `${(currentStatusIndex / (statuses.length - 1)) * 100}%` }}></div>
                    
                    <div className="space-y-12">
                        {statuses.map((status, index) => (
                            <div key={status} className="flex items-center gap-6">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center z-10 ${getStatusColor(index)}`}>
                                    {getStatusIcon(status)}
                                </div>
                                <div>
                                    <h3 className={`font-bold text-lg ${index <= currentStatusIndex ? 'text-gray-800 dark:text-white' : 'text-gray-400 dark:text-gray-500'}`}>{status}</h3>
                                    <p className={`text-sm ${index <= currentStatusIndex ? 'text-gray-600 dark:text-gray-300' : 'text-gray-400 dark:text-gray-500'}`}>
                                        {index === 0 && 'Your order has been placed.'}
                                        {index === 1 && 'Your order is being prepared.'}
                                        {index === 2 && 'Your order is on its way.'}
                                        {index === 3 && 'Your order has been delivered.'}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};


const AccountPage = ({ setPage }) => (
  <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
    <h1 className="text-3xl font-bold mb-8 text-gray-800 dark:text-white">My Account</h1>
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Past Orders</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b dark:border-gray-700">
              <th className="p-3">Order ID</th>
              <th className="p-3">Date</th>
              <th className="p-3">Total</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {mockOrders.slice(0, 2).map(order => (
              <tr key={order.id} className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                <td className="p-3 font-medium text-orange-600 dark:text-orange-400 cursor-pointer" onClick={() => setPage('tracking')}>{order.id}</td>
                <td className="p-3 text-gray-600 dark:text-gray-300">{order.date}</td>
                <td className="p-3 text-gray-600 dark:text-gray-300">${order.total.toFixed(2)}</td>
                <td className="p-3">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        order.status === 'Delivered' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                        order.status === 'Shipped' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
                        order.status === 'Packed' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                        'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
                    }`}>
                        {order.status}
                    </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

const LoginPage = ({ setPage }) => {
  const { login } = useAuth();
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-8rem)] bg-gray-50 dark:bg-gray-900">
      <div className="w-full max-w-md p-8 space-y-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white">Login</h2>
        <p className="text-center text-gray-600 dark:text-gray-400">Select a role to simulate login.</p>
        <div className="space-y-4">
          <Button className="w-full text-lg" onClick={() => { login('customer'); setPage('home'); }}>
            <User size={20} /> Login as Customer
          </Button>
          <Button className="w-full text-lg" variant="secondary" onClick={() => { login('staff'); setPage('dashboard'); }}>
            <UserCog size={20} /> Login as Staff Member
          </Button>
          <Button className="w-full text-lg" variant="secondary" onClick={() => { login('super-admin'); setPage('dashboard'); }}>
            <ShieldCheck size={20} /> Login as Super Admin
          </Button>
        </div>
      </div>
    </div>
  );
};

// --- Static Pages ---
const StaticPage = ({ title, content }) => (
    <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">{title}</h1>
            <div className="prose dark:prose-invert max-w-none text-gray-600 dark:text-gray-300">
                {content}
            </div>
        </div>
    </div>
);

const AboutPage = () => <StaticPage title="About Us" content={<p>Welcome to Home Lite, where we bring the authentic taste of traditional Indian snacks to your doorstep with a modern touch. Our mission is to preserve the rich culinary heritage of India while making these beloved treats accessible to everyone, everywhere.</p>} />;
const ContactPage = () => <StaticPage title="Contact Us" content={<p>Have questions? We'd love to hear from you. Reach out to us at contact@homelite.com or call us at (123) 456-7890.</p>} />;
const PrivacyPolicyPage = () => <StaticPage title="Privacy Policy" content={<p>Your privacy is important to us. This privacy statement explains the personal data Home Lite processes, how Home Lite processes it, and for what purposes.</p>} />;
const TermsPage = () => <StaticPage title="Terms of Service" content={<p>Please read these terms of service carefully before using Our Service. Your access to and use of the Service is conditioned on Your acceptance of and compliance with these Terms.</p>} />;


// --- Staff Dashboard Components ---
const DashboardLayout = ({ children }) => (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
        <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8">
            {children}
        </div>
    </div>
);

const Dashboard = ({ setPage }) => {
    const { user } = useAuth();
    
    if (user?.role === 'super-admin') {
        return <SuperAdminDashboard setPage={setPage} />;
    }
    if (user?.role === 'staff') {
        return <StaffDashboard setPage={setPage} />;
    }
    // Fallback or redirect if role is not recognized
    useEffect(() => {
        if (!user) setPage('login');
    }, [user, setPage]);
    
    return null;
};

const StaffDashboard = () => {
    const assignedOrders = mockOrders.filter(o => o.assignedTo === 'staff1');
    return (
        <DashboardLayout>
            <h1 className="text-3xl font-bold mb-8 text-gray-800 dark:text-white">Staff Dashboard</h1>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">My Assigned Orders</h2>
                <DashboardTable orders={assignedOrders} isStaff={true} />
            </div>
        </DashboardLayout>
    );
};

const SuperAdminDashboard = ({setPage}) => {
    const [currentTab, setCurrentTab] = useState('orders');
    
    const tabs = [
        { id: 'orders', label: 'Manage Orders', icon: <Package size={18} /> },
        { id: 'snacks', label: 'Manage Snacks', icon: <UtensilsCrossed size={18} /> },
        { id: 'users', label: 'Manage Users', icon: <UserCog size={18} /> },
    ];

    return (
        <DashboardLayout>
            <h1 className="text-3xl font-bold mb-4 text-gray-800 dark:text-white">Super Admin Dashboard</h1>
            <div className="border-b border-gray-200 dark:border-gray-700 mb-6">
                <nav className="-mb-px flex space-x-6" aria-label="Tabs">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setCurrentTab(tab.id)}
                            className={`${
                                currentTab === tab.id
                                    ? 'border-orange-500 text-orange-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:border-gray-500'
                            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2`}
                        >
                            {tab.icon} {tab.label}
                        </button>
                    ))}
                </nav>
            </div>
            
            {currentTab === 'orders' && <ManageOrders />}
            {currentTab === 'snacks' && <ManageSnacks />}
            {currentTab === 'users' && <ManageUsers />}
        </DashboardLayout>
    );
};

const ManageOrders = () => (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white">All Orders</h2>
        </div>
        <DashboardTable orders={mockOrders} />
    </div>
);

const ManageSnacks = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingSnack, setEditingSnack] = useState(null);

    const handleEdit = (snack) => {
        setEditingSnack(snack);
        setIsModalOpen(true);
    };

    const handleAddNew = () => {
        setEditingSnack(null);
        setIsModalOpen(true);
    };
    
    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-800 dark:text-white">Snack Catalog</h2>
                <Button onClick={handleAddNew}><PlusCircle size={18} /> Add New Snack</Button>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        <tr className="border-b dark:border-gray-700">
                            <th className="p-3">Name</th>
                            <th className="p-3">Price</th>
                            <th className="p-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {mockSnacks.map(snack => (
                            <tr key={snack.id} className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                                <td className="p-3 font-medium text-gray-800 dark:text-gray-100">{snack.name}</td>
                                <td className="p-3 text-gray-600 dark:text-gray-300">${snack.price.toFixed(2)}</td>
                                <td className="p-3 flex gap-2">
                                    <Button variant="ghost" className="p-2 h-auto" onClick={() => handleEdit(snack)}><Edit size={16} /></Button>
                                    <Button variant="ghost" className="text-red-500 p-2 h-auto"><Trash2 size={16} /></Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <SnackEditModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} snack={editingSnack} />
        </div>
    );
};

const SnackEditModal = ({ isOpen, onClose, snack }) => (
    <Modal isOpen={isOpen} onClose={onClose} title={snack ? 'Edit Snack' : 'Add New Snack'}>
        <form className="space-y-4">
            <div>
                <label htmlFor="snackName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Snack Name</label>
                <Input id="snackName" type="text" defaultValue={snack?.name || ''} placeholder="e.g., Samosa" />
            </div>
            <div>
                <label htmlFor="snackPrice" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Price</label>
                <Input id="snackPrice" type="number" step="0.01" defaultValue={snack?.price || ''} placeholder="e.g., 2.50" />
            </div>
            <div>
                <label htmlFor="snackDesc" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
                <textarea id="snackDesc" rows="3" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 dark:bg-gray-700 dark:border-gray-600" defaultValue={snack?.description || ''}></textarea>
            </div>
            <div className="flex justify-end gap-3 pt-4">
                <Button type="button" variant="secondary" onClick={onClose}>Cancel</Button>
                <Button type="submit" onClick={(e) => { e.preventDefault(); onClose(); }}>{snack ? 'Save Changes' : 'Add Snack'}</Button>
            </div>
        </form>
    </Modal>
);

const ManageUsers = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingUser, setEditingUser] = useState(null);

    const handleEdit = (user) => {
        setEditingUser(user);
        setIsModalOpen(true);
    };

    const handleAddNew = () => {
        setEditingUser(null);
        setIsModalOpen(true);
    };

    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-800 dark:text-white">User Accounts</h2>
                <Button onClick={handleAddNew}><PlusCircle size={18} /> Create New User</Button>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        <tr className="border-b dark:border-gray-700">
                            <th className="p-3">Name</th>
                            <th className="p-3">Email</th>
                            <th className="p-3">Role</th>
                            <th className="p-3">Status</th>
                            <th className="p-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {mockUsers.map(user => (
                            <tr key={user.id} className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                                <td className="p-3 font-medium text-gray-800 dark:text-gray-100">{user.name}</td>
                                <td className="p-3 text-gray-600 dark:text-gray-300">{user.email}</td>
                                <td className="p-3 text-gray-600 dark:text-gray-300 capitalize">{user.role.replace('-', ' ')}</td>
                                <td className="p-3">
                                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${user.status === 'Active' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'}`}>
                                        {user.status}
                                    </span>
                                </td>
                                <td className="p-3 flex gap-2">
                                    <Button variant="ghost" className="p-2 h-auto" onClick={() => handleEdit(user)}><Edit size={16} /></Button>
                                    <Button variant="ghost" className="text-red-500 p-2 h-auto"><Trash2 size={16} /></Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <UserEditModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} user={editingUser} />
        </div>
    );
};

const UserEditModal = ({ isOpen, onClose, user }) => (
    <Modal isOpen={isOpen} onClose={onClose} title={user ? 'Edit User' : 'Create New User'}>
        <form className="space-y-4">
            <div>
                <label htmlFor="userName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
                <Input id="userName" type="text" defaultValue={user?.name || ''} placeholder="John Doe" />
            </div>
            <div>
                <label htmlFor="userEmail" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email Address</label>
                <Input id="userEmail" type="email" defaultValue={user?.email || ''} placeholder="user@example.com" />
            </div>
            <div>
                <label htmlFor="userRole" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Role</label>
                <Select id="userRole" defaultValue={user?.role || 'customer'}>
                    <option value="customer">Customer</option>
                    <option value="staff">Staff</option>
                    <option value="super-admin">Super Admin</option>
                </Select>
            </div>
            <div className="flex justify-end gap-3 pt-4">
                <Button type="button" variant="secondary" onClick={onClose}>Cancel</Button>
                <Button type="submit" onClick={(e) => { e.preventDefault(); onClose(); }}>{user ? 'Save Changes' : 'Create User'}</Button>
            </div>
        </form>
    </Modal>
);


const DashboardTable = ({ orders, isStaff = false }) => (
    <div className="overflow-x-auto">
        <table className="w-full text-left">
            <thead>
                <tr className="border-b dark:border-gray-700">
                    <th className="p-3">Order ID</th>
                    <th className="p-3">Customer</th>
                    <th className="p-3">Date</th>
                    <th className="p-3">Total</th>
                    <th className="p-3">Status</th>
                    <th className="p-3">Actions</th>
                </tr>
            </thead>
            <tbody>
                {orders.map(order => (
                    <tr key={order.id} className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                        <td className="p-3 font-medium text-orange-600 dark:text-orange-400">{order.id}</td>
                        <td className="p-3 text-gray-600 dark:text-gray-300">{order.customer}</td>
                        <td className="p-3 text-gray-600 dark:text-gray-300">{order.date}</td>
                        <td className="p-3 text-gray-600 dark:text-gray-300">${order.total.toFixed(2)}</td>
                        <td className="p-3">
                            <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                                order.status === 'Delivered' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                                order.status === 'Shipped' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
                                order.status === 'Packed' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                                'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
                            }`}>
                                {order.status}
                            </span>
                        </td>
                        <td className="p-3">
                            <StatusUpdater order={order} isStaff={isStaff} />
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);

const StatusUpdater = ({ order, isStaff }) => {
    const [currentStatus, setCurrentStatus] = useState(order.status);
    const statuses = ['Ordered', 'Packed', 'Shipped', 'Delivered'];
    const staffStatuses = ['Shipped', 'Delivered'];
    const availableStatuses = isStaff ? staffStatuses : statuses;

    return (
        <div className="relative inline-block text-left">
            <select
                value={currentStatus}
                onChange={(e) => setCurrentStatus(e.target.value)}
                className="appearance-none bg-transparent border border-gray-300 dark:border-gray-600 rounded-md py-1 pl-3 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                disabled={currentStatus === 'Delivered'}
            >
                {availableStatuses.map(status => (
                    <option key={status} value={status} disabled={statuses.indexOf(status) < statuses.indexOf(currentStatus)}>
                        {status}
                    </option>
                ))}
            </select>
            <ChevronDown size={16} className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400" />
        </div>
    );
};


// --- Main App Component ---
function App() {
  const [page, setPage] = useState('home'); // home, snack-detail, cart, login, dashboard, etc.
  const [selectedSnack, setSelectedSnack] = useState(null);
  const { user } = useAuth();
  
  // Route protection
  useEffect(() => {
    const isStaffPage = page === 'dashboard';
    const isCustomerPage = ['cart', 'account', 'tracking'].includes(page);

    if (isStaffPage && (!user || !['staff', 'super-admin'].includes(user.role))) {
        setPage('login');
    }
    if (isCustomerPage && (!user || user.role !== 'customer')) {
        setPage('login');
    }
  }, [page, user]);


  const renderPage = () => {
    switch (page) {
      case 'home':
        return <HomePage setPage={setPage} setSelectedSnack={setSelectedSnack} />;
      case 'snack-detail':
        return <SnackDetailPage snack={selectedSnack} setPage={setPage} />;
      case 'cart':
        return <CartPage setPage={setPage} />;
      case 'tracking':
        return <OrderTrackingPage setPage={setPage} />;
      case 'account':
        return <AccountPage setPage={setPage} />;
      case 'login':
        return <LoginPage setPage={setPage} />;
      case 'dashboard':
        return <Dashboard setPage={setPage} />;
      case 'about':
        return <AboutPage />;
      case 'contact':
        return <ContactPage />;
      case 'privacy':
        return <PrivacyPolicyPage />;
      case 'terms':
        return <TermsPage />;
      default:
        return <HomePage setPage={setPage} setSelectedSnack={setSelectedSnack} />;
    }
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 min-h-screen flex flex-col font-sans">
      <Navbar setPage={setPage} />
      <div className="flex-grow">
        {renderPage()}
      </div>
      <Footer setPage={setPage} />
    </div>
  );
}

// Wrap App in AuthProvider for context to work
const AppWrapper = () => (
  <AuthProvider>
    <App />
  </AuthProvider>
);

// In a real CRA/Vite app, you'd export App and render AppWrapper in index.js
// For this self-contained example, we export the wrapped version.
export default AppWrapper;
