import { useState, useEffect, createContext} from 'react'
import { Outlet } from "react-router-dom";
import PropTypes from 'prop-types';
import './App.css'
import Navbar from "./components/Navbar/Navbar";
import Footer from './components/Footer/Footer';
import AuthProvider from './components/AuthProvider/AuthProvider';

const RenderName = (props) => {
  return <div>{props.name}</div>;
};

RenderName.propTypes = {
  name: PropTypes.string.isRequired,
};

const App = () => {
  const [homeData, setHomeData] = useState();
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8080/')
    .then((response) => {
      if (response.status >= 400) {
        throw new Error("server error");
      }
      return response.json();
    })
    .then((data) => {
      console.log(data)
      setHomeData(data.title);
    })
    .catch((error) => setError(error))
  }, [])


  if (error) return <p>Network error innit</p>

  return (
    <AuthProvider>
      <header>
        <Navbar />
      </header>
      <main>
          <Outlet />
      </main>
      <Footer />
    </AuthProvider>
  );
};

export default App
