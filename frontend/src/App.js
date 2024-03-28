import GlobalStyle from "./styles/global";
import styled from "styled-components";
import Form from "./components/Form.js";
import Grid from "./components/Grid";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const Container = styled.div`
  width: 100%;
  max-width: 800px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const Title = styled.h2``;

function App() {
  const [devs, setDevs] = useState([]);
  const [onEdit, setOnEdit] = useState(null);

  const getDevs = async () => {
    try {
      const res = await axios.get("http://localhost:8080/developer");
      setDevs(res.data.developer.sort((a, b) => (a.name > b.name ? 1 : -1)));
      console.log(res.data);
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    getDevs();
  }, [setDevs]);

  return (
    <>
      <Container>
        <Title>DESENVOLVEDORES</Title>
        <Form onEdit={onEdit} setOnEdit={setOnEdit} getDevs={getDevs} />
        <Grid setOnEdit={setOnEdit} devs={devs} setDevs={setDevs} />
      </Container>
      <ToastContainer autoClose={3000} position={toast.POSITION.BOTTOM_LEFT} />
      <GlobalStyle />
    </>
  );
}

export default App;
