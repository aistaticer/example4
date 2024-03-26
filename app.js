const express = require('express');
const app = express();
const port = 3000;

app.get('/recipes', (req, res) => {
	console.log('Received a GET request to /recipes');
  res.json({ message: 'Recipes will be shown here' });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
