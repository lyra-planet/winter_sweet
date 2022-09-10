import React, { useState } from "react";
import Toggle from "react-toggle";
import "react-toggle/style.css"
import "./index.css"
import {useMediaQuery} from 'react-responsive'
import { useEffect } from "react"
import { useContext } from "react";
import { ThemeContext } from "../../context";
 const DarkModeToggle: React.FC = (props) => {
  const ctx = useContext(ThemeContext) || {}
  const [state = {}, dispatch = null] = ctx
  const [isDark, setIsDark] = useState(false);
  useMediaQuery(
    {
      query: '(prefers-color-scheme: dark)',
    },
    undefined,
    (isSystemDark: boolean) => setIsDark(isSystemDark)
  );
    useEffect(()=>{
      if(isDark){    
        localStorage.setItem("theme", "dark");
        dispatch({
          type: 'changeTheme',
          val: 'dark'
        })
      }else{
        localStorage.setItem("theme", "light");
        dispatch({
          type: 'changeTheme',
          val: 'light'
        })
      }
    },[isDark])
      
  return (
    <Toggle
      className="dark-mode-toggle"
      checked={isDark}
      onChange={({ target }) => setIsDark(target.checked)}
      icons={{ checked: "🌙", unchecked: "🔆" }}
      aria-label="Dark mode toggle"
    />
  );
};

export default DarkModeToggle
