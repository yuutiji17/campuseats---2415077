import { Outlet } from 'react-router'
import Header from './Header.jsx'
import Footer from './Footer.jsx'

// Shared frame for every page. <Outlet /> is where the current page appears.
function Layout() {
  return (
    <>
      <Header />
      <main className="container">
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

export default Layout
