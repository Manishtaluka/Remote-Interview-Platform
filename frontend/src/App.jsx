import './App.css'
import { Show, SignInButton,  UserButton } from '@clerk/react'

function App() {
  return (
    <>
    <h1>WELCOME TO THE M'S APP</h1>
      <header>
        <SignedOut>
          <SignInButton mode="modal">
          <button>Login</button>

          </SignInButton>
          
         </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </header>
    </>
  )
}

export default App