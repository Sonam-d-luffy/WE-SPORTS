import { BrowserRouter , Routes , Route } from 'react-router-dom'
import './App.css'
import Home from './Pages/Home'
import HostLogin from './Pages/HostLogin'
import GamerLogin from './Pages/GamerLogin'
import TournamentUpload from './Pages/TournamentUpload'
import HostTournaments from './Pages/HostTournaments'
import AddGames from './Pages/AddGames'
import HostPage from './Pages/HostPage'
import Tournaments from './Pages/Tournaments'
import Hosts from './Pages/Hosts'
import Games from './Pages/Games'
import BookSlots from './Pages/BookSlots'
import HostGames from './Pages/HostGames'
import HostBooking from './Pages/HostBooking'
import Otp from './Pages/Otp'
import GamerBookings from './Pages/GamerBookings'

function App() {

  return (
    <BrowserRouter>
<Routes>
  <Route path='/' element={<Home/>}/>
  <Route path='/hostLogin' element={<HostLogin/>}/>
  <Route path='/gamerLogin' element={<GamerLogin/>}/>
  <Route path='/otp-verify' element={<Otp/>}/>
  <Route path='/uploadTournament' element={<TournamentUpload/>}/>
  <Route path='/hostPage' element={<HostPage/>}/>
  <Route path='/tournaments' element={<Tournaments/>}/>
  <Route path='/hosts' element={<Hosts/>}/>
  <Route path='/:tournamentId/:gameId/bookslots' element={<BookSlots/>}/>
  <Route path='/hostTournament' element={<HostTournaments/>}/>
  <Route path='/:tournamentId/uploadGames' element={<AddGames/>}/>
  <Route path='/:tournamentId/yourgames' element={<Games/>}/>
  <Route path='/:tournamentId/hostgames' element={<HostGames/>}/>
  <Route path='/:tournamentId/:gameId/bookings' element={<HostBooking/>}/>
  <Route path='/:gamerId/bookings' element={<GamerBookings/>}/>
</Routes>
    </BrowserRouter>
  )
}

export default App
