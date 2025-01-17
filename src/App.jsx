import { Outlet } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import AuthProvider from "./components/AuthProvider/AuthProvider";
import { ToastContainer } from "react-toastify";


const App = () => {
  return (
    <AuthProvider>
      <header>
        <Navbar />
      </header>
      <main>
        <Outlet />
        <ToastContainer />
      </main>
      <Footer />
    </AuthProvider>
  );
};

export default App;
