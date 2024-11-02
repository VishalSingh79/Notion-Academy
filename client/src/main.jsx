import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import {Provider} from "react-redux"
import {configureStore} from "@reduxjs/toolkit";
import rootReducer from "../src/reducers.js"

const store = configureStore({
  reducer:rootReducer
})

createRoot(document.getElementById('root')).render(
   
    <Provider store={store}>
      <BrowserRouter>
         <App />
         <ToastContainer
            position="top-center"  
            autoClose={1000}       
            hideProgressBar={false} 
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover={false}
          />
      </BrowserRouter>    
    </Provider> 

)
