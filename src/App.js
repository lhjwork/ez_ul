import React, {useEffect} from "react";
import { useDispatch, useSelector } from 'react-redux';
import {
    BrowserRouter as Router,
    Route,
    Routes,
    Navigate,
} from 'react-router-dom';
import dayjs from 'dayjs';
import styled from 'styled-components';
import Main from "./page/MainPage";


const Center = styled.div`
    height: 100%;
    display: flex;
    flex: 1;
    flex-direction: row;
    margin-top: ${(props) =>
        props?.isLogin ? props.theme.componentSize.NAVHEIGHT : '0px'};
`;


function App() {

  const auth = useSelector((state) => state.auth);
  const { token, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const isAdmin = user?.type === 'admin';


  return (
    <Router>
      <Routes>
        <Route path="*" element={<Main/>}/>
      </Routes>
    </Router>
  );
}

export default App;
