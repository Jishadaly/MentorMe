import express, { Application} from 'express';
import { configureExpress } from './config/expressConfig';
import userRouter from './frameworks/webserver/routes/userRoute';
import adminRouter from './frameworks/webserver/routes/adminRoute';

const app:Application = express();
const port = 3000;

app.use(express.json());
configureExpress(app)

app.use(userRouter)
app.use(adminRouter)




app.listen(port, () => {
  console.log(`Backend server is running on http://localhost:${port}`);
});

// setup ngrok
const ngrok = require('@ngrok/ngrok');

(async function () {
  const listener = await ngrok.forward({ addr: port, authtoken_from_env: true });
  console.log(`Ingress established at: ${listener.url()}`);
})();


