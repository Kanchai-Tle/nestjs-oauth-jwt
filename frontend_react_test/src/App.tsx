import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/Homepage';
import AuthCallbackPage from './pages/AuthCallbackPage';
import './App.css'; // สำหรับ CSS ทั่วไป

function App() {
  return (
    <Router>
      <div className="app-container">
        <nav className="navbar">
          <Link to="/" className="nav-link">หน้าหลัก</Link>
          {/* สามารถเพิ่ม Link อื่นๆ ได้ในอนาคต */}
        </nav>
        <div className="content-area">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/auth/callback" element={<AuthCallbackPage />} />
            {/* เพิ่ม Route อื่นๆ เช่น /dashboard, /profile ได้ที่นี่ */}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;