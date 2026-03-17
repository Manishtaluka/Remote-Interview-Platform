import './App.css'
import { Show, SignInButton, SignUpButton, UserButton } from '@clerk/react'

function App() {
  return (
    <>
    <h1>WELCOME TO THE M'S APP</h1>
      <header>
        <Show when="signed-out">
          <SignInButton mode="modal">
          <button >
          Login 

          </button>

          </SignInButton>
          
        </Show>
        <Show when="signed-in">
          <UserButton />
        </Show>
      </header>
    </>
  )
}

export default App