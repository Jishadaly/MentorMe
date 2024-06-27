  import React from 'react'
  import { BrowserRouter as Router ,Routes , Route , RouterProvider  } from 'react-router-dom'
  import { Toaster,  } from 'sonner'
  import router from './routes/router'
  import { Provider } from 'react-redux'
  import store from '@/redux/store'
  import { Elements } from '@stripe/react-stripe-js'
  import { loadStripe } from '@stripe/stripe-js'
  const strip =  loadStripe(import.meta.env.VITE_STRIP_PUBLISHED_KEY);


  function App() {
    
    return (
      <Provider store={store}>
        <Elements stripe={strip}>
      {/* <div> */}
        <Toaster position="top-center" richColors/>
        <RouterProvider router={router} />
      {/* </div> */}
      </Elements>
      </Provider>
    )
  }

  export default App;