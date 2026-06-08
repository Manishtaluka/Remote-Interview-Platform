import {Navigate,Route, Routes} from 'react-router'
import {SignInButton, SignOutButton, UserButton,useUser } from '@clerk/clerk-react'
import HomePage from './pages/HomePage'
import {Toaster} from "react-hot-toast"
import ProblemsPage from './pages/ProblemsPage'
import DashboardPage from './pages/DashboardPage'
import ProblemPage from './pages/ProblemPage'
function App() {
  const {isSignedIn,isLoaded} = useUser();
  if(!isLoaded) return null;//this will get rid of flickering effect
  return (
    <>
    <Routes>
      
      
      <Route path="/" element={!isSignedIn ? <HomePage /> : <Navigate to={"/dashboard"} /> } />
      <Route path="/dashboard" element={isSignedIn ? <DashboardPage /> : <Navigate to={"/"} /> } />
    
    
      <Route path="/problems" element={ isSignedIn?<ProblemsPage />:<Navigate to={"/"}/> } />
      <Route path="/problem/:id" element={ isSignedIn?<ProblemPage />:<Navigate to={"/"}/> } />
    </Routes>
    <Toaster toastOptions={{duration: 4000}}/>
    </>
  )
}

export default App