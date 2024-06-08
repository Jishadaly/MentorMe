  import React from 'react'
  import { BrowserRouter as Router ,Routes , Route , RouterProvider  } from 'react-router-dom'
  import { Toaster,  } from 'sonner'
  import router from './routes/router'
  import { Provider } from 'react-redux'
  import store from '@/redux/store'


  function App() {
    return (
      <Provider store={store}>
      <div>
        <Toaster position="top-center" richColors/>
        <RouterProvider router={router} />
      </div>
      </Provider>
    )
  }

  export default App;