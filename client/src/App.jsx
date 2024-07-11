  import React from 'react'
  import { RouterProvider } from 'react-router-dom'
  import { Toaster,  } from 'sonner'
  import router from './routes/router'
  import { Provider } from 'react-redux'
  import { store , persister } from './redux/store'
  import { PersistGate } from 'redux-persist/integration/react'
  import { Elements } from '@stripe/react-stripe-js'
  import { loadStripe } from '@stripe/stripe-js'
  const strip =  loadStripe(import.meta.env.VITE_STRIP_PUBLISHED_KEY);


  function App() {

    return (
     <Provider store={store}>
      <PersistGate loading={null}  persistor={persister}>
        <Elements stripe={strip}>
           <Toaster position="top-center"  />
           <RouterProvider router={router} />
        </Elements>
      </PersistGate>
    </Provider>
    )
  }

  export default App;