// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';

// export default defineConfig({
  //   resolve: {
//   plugins: [react()],
//     alias: {
//       '@': '/src',
//       '@material-ui/core': '@material-ui/core/esm',
//     },
//   },
// });


// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src',
      '@material-ui/core': '@material-ui/core', // Remove the "/esm" part
    },
  },
});
