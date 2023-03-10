require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const mongoose = require('mongoose');
const dbConnection = require('./config/dbConnect');
const verifyJWT = require('./middlewares/verifyJWT');
const cookieParser = require('cookie-parser');
const credentials = require('./middlewares/credentials');
const PORT = process.env.PORT || 5000;


// Connect to database
dbConnection();

app.use(credentials);
// app.use(cors());
app.use(cors(corsOptions));    //remove cors after development and let your backend be solely accessed from your frontend (react app). In case of multiple client apps accessing your backend, use a whitelist with cors. This is especially useful for this site since email and website have diffrent domains.
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());


app.use('/api', require('./routes/api'));


app.use('/refresh-token', require('./routes/refreshTokenRoute'));
app.use(verifyJWT);
app.use('/admin', require('./config/serverRoutes/allowedOriginsRoutes'));
// app.use('/web', require('./routes/web'));



// Stay connected

mongoose.connection.once('open', () => {
  console.log('Database connection established.');
  app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
});