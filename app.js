// функция вычисления числа фибоначчи
const fibonachi = require("./fibo.js");
// для базы данных sqlite
var sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database("mydb.db", err => {
  if (err) return console.error(err.message);
  console.log("Подключение к базе данных => OK");
});

// express
const express = require('express')
const app = express()
const port = 3000
// для обработки post-запросов с json
const jsonParser = express.json();

app.use(express.static('public'));

// отображение главной страницы
app.get('/', (req, res) => {
  res.sendFile(__dirname + "/page.html");
})

// тут логика работы сервера при получении формы от клиента
app.post("/count", jsonParser, function (request, response) {
  // неудачный запрос
  if(!request.body) return response.sendStatus(400);
  // тут получаем искомое число
  num = parseInt(request.body.userInput);
  result = fibonachi.nearestFib(num)
  // кладем число в базу данных
  db.run(`INSERT INTO numbers (num) VALUES (${result})`, err => {
    if (err) {
      return console.error(err.message);
    }
  });
  // возвращаем число клиенту 
  response.json(result);
});

// запуск сервера
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})