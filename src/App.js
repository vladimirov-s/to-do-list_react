import React from 'react';
import { Routes, Route, useNavigate, useParams } from 'react-router-dom';
import Main from './components/Main';
import './App.scss';
import EditForm from './components/EditForm'

const App = () => {
  const params = useParams();
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path='/edit:editId' element={<EditForm />} />
    </Routes>
  );
}

export default App;
