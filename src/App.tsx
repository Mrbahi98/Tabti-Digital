import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import GamePage from './pages/GamePage';
import SuccessPage from './pages/SuccessPage';

function App() {
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden bg-zinc-950">
      {/* Background ambient effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-600/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none"></div>
      
      <Navbar />
      <main className="flex-grow z-10">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/game/:slug" element={<GamePage />} />
          <Route path="/success" element={<SuccessPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
