import express from 'express';
import volleyball from 'volleyball';
import cors from 'cors';
import { checkTokenSetUser, isLoggedIn} from './validation/validators.js';

const app = express();

//import routers
import { authRoute } from './routes/auth/index.js';
import { inspirationsRoute } from './routes/api/inspirations/inspirations.js';
import { likesRoute } from './routes/api/inspirations/likes.js';

//middleware
app.use(volleyball);
app.use(cors({
  origin: 'http://localhost:8080'
}));
app.use(express.json());
app.use(checkTokenSetUser);

app.get('/', (req, res) => {
  res.json({
    message: 'Backend is running!',
    user: req.user,
  });
});

//routes
app.use('/auth', authRoute);
app.use('/api/v1/inspirations', isLoggedIn, inspirationsRoute);
app.use('/api/v1/likes', isLoggedIn, likesRoute);

function notFound(req, res, next) {
  res.status(404);
  const error = new Error('Not Found - ' + req.originalUrl);
  next(error);
}

function errorHandler(error, req, res, next) {
  res.status(res.statusCode || 500);
  res.json({
    message: error.message,
    stack: error.stack
  });
  next();
}

app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log('Listening on port', port);
});