import './admin.css';
import Header from './compoments/Header';
import Sidebar from './compoments/Sidebar';
import ProductTable from './compoments/ProductTable';

export const metadata = {
  title: "Admin | Benzen",
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return ( 
    <body>
        
        <main className='flex'>{children}</main>
        <Header />
        <Sidebar />
        <ProductTable />
    </body>
    
  );
}
