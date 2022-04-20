import { Routes, Route } from "react-router-dom";
import Main from "./components/Main";
import EditForm from "./components/EditForm";
import "./App.scss";

const App = () => {
  return (

    <Routes>
      <Route path='/' element={<Main />} />

      <Route path='/edit:editId' element={<EditForm />} />
    </Routes>
    
  );
};

export default App;
