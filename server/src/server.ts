import express, { Application} from 'express';
import { configureExpress } from './config/expressConfig';
import userRouter from './frameworks/webserver/routes/userRoute';
import adminRouter from './frameworks/webserver/routes/adminRoute';
import blogRouter from './frameworks/webserver/routes/blogRoute';

const app:Application = express();
const port = 3000;

app.use(express.json());
configureExpress(app)

app.use(userRouter)
app.use(adminRouter)
app.use('/api/user',blogRouter)




app.listen(port, () => {
  console.log(`Backend server is running on http://localhost:${port}`);
});



