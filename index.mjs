import express from 'express';
import cors from 'cors';
import user from './routes/user.mjs';
import errorHandler from './middleware/errors.mjs';

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());


//Include API routes
app.use('/api', user);

app.use(errorHandler);

app.listen(port, () => {
    console.log(`listening on port ${port}`);
})