import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const AuthCallbackPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [status, setStatus] = useState<string>('กำลังประมวลผลการเข้าสู่ระบบ...');

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get('token'); // ดึง token จาก URL query string

    if (token) {
      localStorage.setItem('accessToken', token); // เก็บ Token ไว้ใน localStorage
      setStatus('เข้าสู่ระบบสำเร็จ! กำลังเปลี่ยนเส้นทาง...');
      console.log('JWT Token ได้รับและถูกเก็บใน localStorage');

      // หน่วงเวลาเล็กน้อยก่อน Redirect ไปหน้าหลัก
      setTimeout(() => {
        navigate('/'); // เปลี่ยนไปหน้าหลัก (HomePage)
      }, 1000);
    } else {
      setStatus('ไม่พบ Token! การเข้าสู่ระบบล้มเหลว หรือถูกยกเลิก');
      console.error('ไม่พบ Token ใน URL!');
      // หน่วงเวลาเล็กน้อยก่อน Redirect กลับไปหน้าหลัก
      setTimeout(() => {
        navigate('/'); // กลับไปหน้าหลัก (HomePage)
      }, 3000);
    }
  }, [location, navigate]); // Dependencies for useEffect

  return (
    <div className="callback-page">
      <h1>{status}</h1>
      <p>กรุณารอสักครู่ คุณจะถูกเปลี่ยนเส้นทางไปหน้าหลักโดยอัตโนมัติ</p>
    </div>
  );
};

export default AuthCallbackPage;