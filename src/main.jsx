import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import styles from './index.module.css'
import { routes } from './router/routes.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const router = createBrowserRouter(routes);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
