import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import path from 'path';
import helmet from 'helmet';
import cors from 'cors'

import express, { Request, Response, NextFunction } from 'express';
import { BAD_REQUEST } from 'http-status-codes';
import 'express-async-errors';

import BaseRouter from './routes';
import logger from '@shared/Logger';
import { cookieProps } from '@shared/constants';
import mongoose from 'mongoose';

import { ApolloServer } from 'apollo-server-express';
import resolvers from './graphql/resolvers';
import typeDefs from './graphql/typeDefs';


// Init express
const app = express();

mongoose.connect(`mongodb://root:example@203.151.50.101:27017/trining_init?authSource=admin`)
.then(() => {
    logger.info('mongodb connection');
}).catch((err) => {
    logger.error(`MongoDB cannot connect: ${err}`)
});

/************************************************************************************
 *                              Set basic express settings
 ***********************************************************************************/

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser(process.env.COOKIE_SECRET));

app.options('*', cors());
app.use(cors());

// Show routes called in console during development
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Security
if (process.env.NODE_ENV === 'production') {
    app.use(helmet());
}

// Add APIs
app.use('/api', BaseRouter);


// Add Apollo
const apolloServer = new ApolloServer(({
    resolvers,
    typeDefs,
}))
apolloServer.applyMiddleware({app, path: `/api/v1/library`});

// Print API errors
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    logger.error(err.message, err);
    return res.status(BAD_REQUEST).json({
        error: err.message,
    });
});



/************************************************************************************
 *                              Serve front-end content
 ***********************************************************************************/

const viewsDir = path.join(__dirname, 'views');
app.set('views', viewsDir);
const staticDir = path.join(__dirname, 'public');
app.use(express.static(staticDir));

app.get('/', (req: Request, res: Response) => {
    res.sendFile('login.html', {root: viewsDir});
});

app.get('/users', (req: Request, res: Response) => {
    const jwt = req.signedCookies[cookieProps.key];
    if (!jwt) {
        res.redirect('/');
    } else {
        res.sendFile('users.html', {root: viewsDir});
    }
});


// Export express instance
export default app;
