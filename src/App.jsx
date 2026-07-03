import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import MAS from './pages/MAS'
import BlacksmithKYC from './pages/BlacksmithKYC'
import PeaktopEngineering from './pages/PeaktopEngineering'
import StoneForGold from './pages/StoneForGold'
import MyPassionApp from './pages/MyPassionApp'
import PawSwipe from './pages/PawSwipe'
import Prudential from './pages/Prudential'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mas" element={<MAS />} />
        <Route path="/blacksmith-kyc" element={<BlacksmithKYC />} />
        <Route path="/peaktop-engineering" element={<PeaktopEngineering />} />
        <Route path="/stone-for-gold" element={<StoneForGold />} />
        <Route path="/mypassion-app" element={<MyPassionApp />} />
        <Route path="/pawswipe" element={<PawSwipe />} />
        <Route path="/prudential" element={<Prudential />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
