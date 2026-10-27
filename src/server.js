require('dotenv').config();

const app = require('./app');

const host = process.env.HOST || 'localhost';
const port = process.env.PORT || 3000;

app.listen(port, host, () => {
  console.log(`OpenJob API berjalan di http://${host}:${port}`);
});
