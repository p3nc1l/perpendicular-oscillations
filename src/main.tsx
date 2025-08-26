import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { HashRouter, Routes, Route } from 'react-router'

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HashRouter>
      <Routes>
        <Route path='/' element={ <App /> } />
        <Route path='en' element={ <App lang='en' /> } />
        <Route path='hu' element={ <App lang='hu' /> } />
      </Routes>
    </HashRouter>
  </StrictMode>,
)
