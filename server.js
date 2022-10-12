const setting = require('./settings.json')
module.exports = async (client) => {
  if (setting.express){
  const express = require('express');
  const app = express();
  const port = 8080;
  app.all('/', (req, res) => {  
  res.send(`Express Activated`);
  res.end();
  });
  app.listen(port, () => client.logger(`Bot running on http://localhost:${port}`));
  }
}