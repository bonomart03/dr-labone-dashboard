import { useLocation, BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Toaster } from 'sonner';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import GoldenBackground from './components/GoldenBackground';
import Multiverso from './pages/Multiverso';
import Museo from './pages/Museo';
import Inicio from './pages/Inicio';
import Admin from './pages/Admin';
import ArchivoGta from './pages/ArchivoGta';
import Login from './pages/Login';

const pageVariants = {
  initial: { opacity: 0, y: 16 },
  enter:   { opacity: 1, y: 0,  transition: { duration: 0.35, ease: [0.25, 0.1, 0.25, 1] } },
  exit:    { opacity: 0, y: -8, transition: { duration: 0.2,  ease: 'easeIn' } },
};

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        variants={pageVariants}
        initial="initial"
        animate="enter"
        exit="exit"
      >
        <Routes location={location}>
          <Route path="/"            element={<Inicio />} />
          <Route path="/multiverso"  element={<Multiverso />} />
          <Route path="/archivo-gta" element={<ArchivoGta />} />
          <Route path="/museo"       element={<Museo />} />
          <Route path="/admin"       element={<Admin />} />
          <Route path="/login"       element={<Login />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
};

function App() {
  return (
    <Router>
      <div style={{ backgroundColor: '#09090b', minHeight: '100vh', fontFamily: 'sans-serif', position: 'relative' }}>

        {/* Canvas de fondo — detrás de todo */}
        <GoldenBackground />

        <Toaster richColors position="top-right" />

        {/* z-index > 0 para estar sobre el canvas */}
        <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <Navbar />
          <main style={{ flex: 1 }}>
            <AnimatedRoutes />
          </main>
          <Footer />
        </div>

      </div>
    </Router>
  );
}

export default App;
