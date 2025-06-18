import React, { useState, useEffect } from 'react';

const HomePage: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [backendResponse, setBackendResponse] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  // ตรวจสอบสถานะการ Login เมื่อโหลดหน้าและเมื่อ localStorage เปลี่ยนแปลง
  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      setIsLoggedIn(true);
      try {
        const payloadBase64 = token.split('.')[1];
        const decodedPayload = JSON.parse(atob(payloadBase64));
        if (decodedPayload && decodedPayload.email) {
          setUserEmail(decodedPayload.email);
        }
      } catch (e) {
        console.error("Error decoding token:", e);
        setUserEmail('(ไม่สามารถอ่านอีเมลได้)');
      }
    } else {
      setIsLoggedIn(false);
      setUserEmail(null);
    }
  }, []);

  const handleLoginWithGoogle = () => {
    // Redirect ไปยัง NestJS Backend เพื่อเริ่มกระบวนการ Google OAuth
    window.location.href = 'http://localhost:3000/auth/google';
  };

  const handleGetProfile = async () => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      alert('คุณยังไม่ได้เข้าสู่ระบบ กรุณาเข้าสู่ระบบก่อน');
      setBackendResponse(null);
      setError('ไม่มี Token. กรุณาเข้าสู่ระบบ');
      return;
    }

    try {
      // เรียก Backend ผ่าน proxy ที่เราตั้งค่าไว้ใน vite.config.ts
      const response = await fetch('/api/auth/profile', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // แนบ JWT Token ไปกับ Header
        },
      });

      if (response.ok) {
        const data = await response.json();
        setBackendResponse(data);
        setError(null);
      } else if (response.status === 401) {
        // Token หมดอายุ หรือไม่ถูกต้อง
        localStorage.removeItem('accessToken'); // ลบ Token ที่หมดอายุออก
        setIsLoggedIn(false);
        setUserEmail(null);
        setBackendResponse(null);
        setError('ไม่ได้รับอนุญาต: Token ไม่ถูกต้องหรือไม่หมดอายุ กรุณาเข้าสู่ระบบใหม่');
        alert('Session หมดอายุ หรือ Token ไม่ถูกต้อง กรุณาเข้าสู่ระบบใหม่');
      } else {
        const errorData = await response.json();
        setBackendResponse(null);
        setError(`Error: ${response.status} - ${JSON.stringify(errorData, null, 2)}`);
      }
    } catch (err: any) { // ใช้ `any` หรือระบุ Type ให้ `err`
      setBackendResponse(null);
      setError(`เกิดข้อผิดพลาดในการเชื่อมต่อ: ${err.message || 'Unknown error'}`);
      console.error('Error fetching profile:', err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('accessToken'); // ลบ Token ออกจาก localStorage
    setIsLoggedIn(false);
    setUserEmail(null);
    setBackendResponse(null);
    setError(null);
    alert('ออกจากระบบเรียบร้อยแล้ว');
  };

  return (
    <div className="home-page">
      <h1>ทดสอบ NestJS OAuth & JWT (React/Vite)</h1>

      <div className="auth-status">
        <p>สถานะการเข้าสู่ระบบ: 
          <span style={{ color: isLoggedIn ? 'green' : 'red' }}>
            {isLoggedIn ? 'เข้าสู่ระบบแล้ว' : 'ไม่ได้เข้าสู่ระบบ'}
          </span>
        </p>
        {userEmail && <p className="user-email">(อีเมล: {userEmail})</p>}
      </div>

      <div className="button-group">
        {!isLoggedIn && (
          <button onClick={handleLoginWithGoogle} className="btn primary">
            เข้าสู่ระบบด้วย Google
          </button>
        )}
        {isLoggedIn && (
          <>
            <button onClick={handleGetProfile} className="btn">
              ดึงข้อมูลโปรไฟล์
            </button>
            <button onClick={handleLogout} className="btn secondary">
              ออกจากระบบ
            </button>
          </>
        )}
      </div>

      <div className="result-area">
        <h2>ผลลัพธ์จาก Backend:</h2>
        {backendResponse && (
          <pre>{JSON.stringify(backendResponse, null, 2)}</pre>
        )}
        {error && (
          <pre className="error-message">{error}</pre>
        )}
        {!backendResponse && !error && <p>ยังไม่มีข้อมูล</p>}
      </div>
    </div>
  );
};

export default HomePage;