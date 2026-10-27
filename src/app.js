const express = require('express');
const { notFoundHandler, errorHandler } = require('./middlewares/errorHandler');

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ status: 'success', message: 'OpenJob API berjalan' });
});

app.use('/users', require('./routes/users'));
app.use('/authentications', require('./routes/authentications'));
app.use('/companies', require('./routes/companies'));
app.use('/categories', require('./routes/categories'));
app.use('/jobs', require('./routes/jobs'));
app.use('/applications', require('./routes/applications'));
app.use('/bookmarks', require('./routes/bookmarks'));
app.use('/profile', require('./routes/profile'));

app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;
