const express = require("express");

const app = express();

// get faz a leitura, neste caso o / e a rota da url, e o res é a reposta, q no caso ali vai aparecer na tela o hello word.
app.get("/", (req, res) => {
  res.send("Hello, word!");
});

const PORT = 3333;
app.listen(PORT, () => console.log(`Server is running on Port ${PORT}`));
