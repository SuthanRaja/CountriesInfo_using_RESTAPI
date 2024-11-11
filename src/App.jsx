import React from 'react'
import Navbar from './Components/Header/Navbar'
import { ThemeProvider } from './Components/theme-provider'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './Components/Pages/Home'
import CountryInfo from './Components/Pages/CountryInfo'

const App = () => {
  return (
    <>
      <BrowserRouter>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/country/:countryName" element={<CountryInfo />} />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </>
  )
}

export default App