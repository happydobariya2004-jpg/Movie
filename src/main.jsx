import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
// import App from './App.jsx'
import { createBrowserRouter,RouterProvider, } from "react-router-dom"
import Home from './Home.jsx'
import Movies from './Movies.jsx'
import Series from './Series.jsx'
import Categories from './Categories.jsx'
import Login from './Login.jsx'


 let allRout=createBrowserRouter([
  {
    path:'/',
    element:<Home/>
  },
  {
    path:'/Movies',
    element:<Movies/>
  },
  {
    path:'Series',
    element:<Series/>
  },
  {
  path:'Categories',
  element:<Categories/>
  },
  {
    path:'/login',
    element:<Login/>
  }
 ])


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={allRout}>

    </RouterProvider>
  </StrictMode>,
)
