import React, { useEffect } from 'react'
import { RouterProvider, useNavigate } from 'react-router-dom'
import { Toaster, } from 'sonner'
import router from './routes/router'
import { Provider, useDispatch } from 'react-redux'
import { store, persister } from './redux/store'
import { PersistGate } from 'redux-persist/integration/react'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import io from 'socket.io-client'

const stripePromise = loadStripe(import.meta.env.VITE_STRIP_PUBLISHED_KEY);
// const socket = io(import.meta.env.VITE_SOCKET_SERVER_URL);

const App = () => {
  // useEffect(() => {
  //   socket.connect();
  //   return () => {
  //     socket.disconnect();
  //     console.log('Socket disconnected');
  //   };
  // }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persister}>
        <Elements stripe={stripePromise}>
          <Toaster position="top-center"/>
            <RouterProvider router={router}/>
        </Elements>
      </PersistGate>
    </Provider>
  )
}

export default App;
