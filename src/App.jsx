import { Routes, Route } from 'react-router-dom'
import BigBoard from './components/BigBoard'
import PlayerProfile from './components/PlayerProfile'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<BigBoard />} />
      <Route path="/player/:id" element={<PlayerProfile />} />
    </Routes>
  )
}