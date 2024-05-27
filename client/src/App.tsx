import React from 'react'
import { BrowserRouter as Router ,Routes , Route  } from 'react-router-dom'
import Signup from './pages/user/Signup'


function App() {
  return (
    <div>
      <Router>
         <Routes>
            <Route path='/signUp' element={<Signup/>} />
            
         </Routes>
      </Router>
    </div>
  )
}

export default App
