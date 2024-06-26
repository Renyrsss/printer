import { useState } from 'react'
import Main from './components/main/main';
import SignaturePad from './components/SignaturePad/SignaturePad';
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [signature, setSignature] = useState(null);

  const handleEnd = (signature) => {
    setSignature(signature);
  };
  return (
    <>
      <Main />

    </>
  )
}

export default App
