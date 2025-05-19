//it is a protectective container responsible for protecting pages on all routes by wrapping alll routes inside this component.
//also the jsx file name and component function name can be different.  


import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export default function Protected({children, authentication = true}) {
    const navigate = useNavigate()
    const [loader,setLoader] = useState(true)
    const authStatus = useSelector(state=>state.auth.status)
    useEffect(()=>{
        if(authentication && authStatus !== authentication){
            navigate("/login")
        }else if(!authentication && authStatus !== authentication){
            navigate("/")
        }
        setLoader(false)
    },
    
    [authStatus,navigate,authentication])
  return loader ? <h1>Loading...</h1> : <>{children}</>
}

