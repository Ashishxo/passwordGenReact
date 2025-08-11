import { useState, useCallback, useEffect, useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

function App() {
  const [length, setLength] = useState(8)
  const [charAllowed, setCharAllowed] = useState(false)
  const [numAllowed, setNumAllowed] = useState(false)
  const [password, setPassword] = useState("")

  const passRef = useRef(null)

  const passwordGenerator = useCallback(()=>{
    let pass=""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if(numAllowed) str += "0123456789"
    if(charAllowed) str += "!@#$%^&*-_~"

    for(let i = 1; i<=length;i++){
      let temp = Math.floor(Math.random() * str.length) + 1
      let char = str.charAt(temp)
      pass += char

      
    }
    setPassword(pass)

  }, [length, charAllowed, numAllowed, setPassword])

  useEffect(()=>{passwordGenerator()}, [length, numAllowed, charAllowed])

  const copyToClipboard = useCallback(()=>{
    passRef.current?.select()
    window.navigator.clipboard.writeText(password)
  }, [password])


  return (
    <>
      <div className='flex justify-center w-full h-screen bg-[rgb(13,17,23)] items-center'>
          <div className='flex flex-col justify-center w-[45%]'>
            <div className='w-full bg-[rgb(22,27,34)] px-5 py-5 rounded-3xl shadow-2xl'> 
              <input readOnly value={password} placeholder='password' ref={passRef} type="text" className='bg-[rgb(65,71,78)] px-5 py-2 inset-x-0 w-5/6 inline rounded-l-3xl text-white outline-none shadow-xl' />
              <button className='duration-200 px-3 py-2 rounded-r-3xl bg-gradient-to-r from-[#8A2387] via-[#E94057] to-[#F27121] text-[#ccc] hover:from-[#b02aa9] hover:via-[#f73c55] hover:to-[#ff8b43] shadow-xl w-1/6  active:from-[#8A2387] active:via-[#E94057] active:to-[#F27121]' onClick={copyToClipboard}>Chopy</button>

              <input type="range" className='mt-8 ml-4 bg-[rgb(65,71,78)] h-2 rounded-full accent-purple-600 cursor-pointer' style={{WebkitAppearance:"none"}} min={6} max={25} value={length} onChange={(e)=>{setLength(parseInt(e.target.value))}}/>
              <label className='text-white ml-3'>Length: {length}</label>

              <input type="checkbox"  className='ml-3 w-4 scale-125 translate-y-[2px] accent-purple-600 text-black' defaultChecked={numAllowed} onChange={()=>{setNumAllowed((prev)=> !prev)}}  />
              <label className='ml-3 text-white'>Numbers</label>

              <input type="checkbox" className='ml-3 w-4 scale-125 translate-y-[2px] accent-purple-600 text-black' defaultChecked={charAllowed} onChange={()=>{setCharAllowed((prev)=> !prev)}}  />
              <label className='ml-3 text-white'>Special Characters</label>
            </div>
          </div>
      </div>
    </>
  )
}

export default App
