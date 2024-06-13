import express, { Application} from 'express';
import { configureExpress } from './config/expressConfig';
import userRouter from './frameworks/webserver/routes/userRoute';
import adminRouter from './frameworks/webserver/routes/adminRoute';

const app:Application = express();
const port = 3000;


configureExpress(app)
app.use(userRouter)
app.use(adminRouter)


app.listen(port, () => {
  console.log(`Backend server is running on http://localhost:${port}`);
});