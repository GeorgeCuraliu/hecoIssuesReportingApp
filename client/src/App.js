import logo from './logo.svg';
import {Route, Router, Routes} from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import LoginPage from './Login/login.js';
import Header from './GlobalComponents/header';
import Main from './MainPage/main';
import Inventory from './Inventory/inventory';
import MachineList from './machineList/machineList';
import ProblemList from './ProblemList/problemList';
import Registry from './Registry/registry';
import Admin from './admin/admin';
function App() {
  return (
    
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<Main/>} />
        <Route path="/inventory" element={<Inventory/>}/>
        <Route path="/machineList" element={<MachineList/>}/>
        <Route path="/problemList" element={<ProblemList/>}/>
        <Route path="/registry" element={<Registry/>}/>
        <Route path="/admin" element={<Admin/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
