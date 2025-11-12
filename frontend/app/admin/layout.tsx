// @ts-ignore: side-effect CSS import without type declarations
import './admin.css';
import Header from './compoments/Header';
import Sidebar from './compoments/Sidebar';


export const metadata = {
  title: "Admin | Benzen",
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return ( 
    <div className="min-h-screen bg-gray-100 py-10">
      <Sidebar />

      <div className="flex-1 ml-64 mt-16 p-6 py-10">
        <Header />
        <main>{children}</main>
      </div>
    </div>
    
  );
}
