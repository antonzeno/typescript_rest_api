import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import mongoose from 'mongoose';
import router from './router';

const app = express();

app.use(
    cors({
        credentials: true,
    })
);

app.use(compression());  // Use compression middleware to compress responses
app.use(cookieParser());  // Use cookie-parser middleware to parse cookies
app.use(bodyParser.json());  // Use body-parser middleware to parse JSON request bodies

const server = http.createServer(app);

server.listen(8080, () => {
    console.log('Server running on port 8080');
});

const MONGO_URL = 'mongodb+srv://anton:anton@cluster0.lcs8cgp.mongodb.net/?retryWrites=true&w=majority';

mongoose.Promise = Promise;
mongoose.connect(MONGO_URL);
mongoose.connection.on('error', (error: Error) => console.log(error));


app.use('/', router());