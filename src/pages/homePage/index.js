import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import CustomButton from '../../components/customButton';

const HomePage = () => {
    const [user, setUser] = useState("")

    const navigate = useNavigate();

    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem("user")))
        
    }, [])

    const handleOnClick = async () => {
        localStorage.removeItem("authToken");
        localStorage.removeItem("user");
        navigate("/")
    }
    
    

  return (
    <div className="sign-wrapper">
    <div style={{fontWeight: "700", fontSize: "24px"}}>Welcome {user.fullName}</div>
    <p>you are logged in</p>
    <CustomButton text="logout" onClick={handleOnClick} />
    </div>
  )
}

export default HomePage