import Home from './pages/home/Home';
import Header from './components/header/Header';
import Navbar from './components/navbar/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Application from './pages/application/Application';
import Login from './pages/login/Login';
import Signup from './pages/signup/Signup';
import Contact from './pages/contact/Contact';
import StudentHome from './pages/studentHome/StudentHome';
import Status from './pages/status/Status';
import Bmhome from './pages/bmhome/Bmhome';
import Bmhead from './components/bmhead/Bmhead';
import { History } from './pages/history/History';
import Pending from './pages/pending/Pending';
import Admin from './components/admin/Admin';
import Adhome from './pages/adhome/Adhome';
import BmList from './components/bmlist/BmList';




function App() {
  return (
  <>
    <Router>

      <Routes>

        <Route path="/" element={<> <Navbar/><Home /></>} />
        <Route path="/login" element={< ><Navbar/><Login  /> </>} />
        <Route path="/signup" element={<> <Navbar/><Signup  /> </>} />
        <Route path="/contact" element={<> <Navbar/><Contact  /> </>} />
        <Route path="/application" element={<> <Header/><Application /> </>} />
        <Route path="/studenthome" element={<> <Header/><StudentHome /> </>} />
        <Route path="/status" element={<> <Header/><Status /> </>} />
        <Route path="/bm" element={<> <Bmhead /><Bmhome /></>} />
        <Route path="/history" element={<> <Bmhead /><History /></>} />
        <Route path="/pending" element={<> <Bmhead /><Pending /></>} />  
        <Route path="/admin" element={<> <Admin/> <Adhome /></>} />
        <Route path="/bmlist" element={<> <Admin /><BmList /></>} />

      </Routes>
      
    </Router>
  </>
  );
}

export default App;
