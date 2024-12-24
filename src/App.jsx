import { useState, useEffect } from 'react'
import PropTypes from 'prop-types';
import './App.css'

const RenderName = (props) => {
  return <div>{props.name}</div>;
};

RenderName.propTypes = {
  name: PropTypes.string.isRequired,
};

const App = () => {
  const [heading, setHeading] = useState("Magnificent Monkeys");
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
      setHomeData(data);
    })
    .catch((error) => setError(error))
  }, [])

  const clickHandler = () => {
    setHeading("Radical Rhinos");
  };

  return (
    <>
      <button type="button" onClick={clickHandler}>
        Click Me
      </button>
      <h1>{heading}</h1>
      <h2>{homeData.title}</h2>
    </>
  );
};

export default App
