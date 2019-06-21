var express = require('express')
var app = express()
var bodyParser = require('body-parser')
const axios = require('axios')
var request = require("request")

var urlsupply = "http://explorer.cointogo.io/ext/getmoneysupply";
var urlblocks = "http://explorer.cointogo.io/api/getblockcount";
var urlprice = "https://api.coingecko.com/api/v3/coins/cointogo";
var telegrambot = "https://api.telegram.org/bot<TELEGRAM-TOKEN>/sendMessage";
var supplybody;
var blocksbody;
var pricesbody;
var marketcapbody;
var volumebody;


app.use(bodyParser.json()) // for parsing application/json
app.use(
  bodyParser.urlencoded({
    extended: true
  })
) // for parsing application/x-www-form-urlencoded

//This is the route the API will call
app.post('/new-message', function(req, res) {
  const { message } = req.body

  //Each message contains "text" and a "chat" object, which has an "id" which is the chat id

  if (message.text.startsWith('/supply')) {
      request({
        url: urlsupply,
        json: true
      }, function (error, response, body) {

          if (!error && response.statusCode === 200 && body != 'undefined') {
            supplybody = body; // Print the json response

            axios
            .post(
              telegrambot,
              {
                chat_id: message.chat.id,
                text: '' + supplybody + ' 2GOs'
              }
            )
            .then(response => {
              // We get here if the message was successfully posted
              console.log('Message posted')
              res.end('ok')
            })
            .catch(err => {
              // ...and here if it was not
              console.log('Error :', err)
              res.end('Error :' + err)
            })
          }
      })

     

      }

      if (message.text.startsWith('/maxsupply')) {
        axios
        .post(
          telegrambot,
          {
            chat_id: message.chat.id,
            text: '126.000.000 2GOs'
          }
        )
        .then(response => {
          // We get here if the message was successfully posted
          console.log('Message posted')
          res.end('ok')
        })
        .catch(err => {
          // ...and here if it was not
          console.log('Error :', err)
          res.end('Error :' + err)
        })
    }

    if (message.text.startsWith('/blocks')) {
        request({
          url: urlblocks,
          json: true
        }, function (error, response, body) {
      
            if (!error && response.statusCode === 200) {
              blocksbody = body; // Print the json response

              axios
              .post(
                telegrambot,
                {
                  chat_id: message.chat.id,
                  text: blocksbody
                }
              )
              .then(response => {
                // We get here if the message was successfully posted
                console.log('Message posted')
                res.end('ok')
              })
              .catch(err => {
                // ...and here if it was not
                console.log('Error :', err)
                res.end('Error :' + err)
              })
            }
        })
        
    }

    if (message.text.startsWith('/info')) {
     
      axios
        .post(
          telegrambot,
          {
            chat_id: message.chat.id,
            text: 'You can ask me some questions like: \r\n' +
            '/start    - Main Page \r\n' +
            '/info    - Info About me \r\n' +
            '/help    - Help Page \r\n' +
            '/supply  - CoinSupply \r\n' +
            '/maxsupply  - MaxCoinSupply \r\n' +
            '/blocks  - AmountOfBlocks \r\n' +
            '/price  - 2GO Price \r\n' +
            '/marketcap  - Market-Cap \r\n' +
            '/volume  - Total-Volume \r\n'
          }
        )
        .then(response => {
          // We get here if the message was successfully posted
          console.log('Message posted')
          res.end('ok')
        })
        .catch(err => {
          // ...and here if it was not
          console.log('Error :', err)
          res.end('Error :' + err)
        })
      }

      if (message.text.startsWith('/help')) {
        
        axios
          .post(
            telegrambot,
            {
              chat_id: message.chat.id,
              text: 'You can typ in a following command to get the information: \r\n' +
              '/start    - Main Page \r\n' +
              '/info    - Info About me \r\n' +
              '/help    - Help Page \r\n' +
              '/supply  - CoinSupply \r\n' +
              '/maxsupply  - MaxCoinSupply \r\n' +
              '/blocks  - AmountOfBlocks \r\n' +
              '/price  - 2GO Price \r\n' +
              '/marketcap  - Market-Cap \r\n' +
              '/volume  - Total-Volume \r\n'
            }
          )
          .then(response => {
            // We get here if the message was successfully posted
            console.log('Message posted')
            res.end('ok')
          })
          .catch(err => {
            // ...and here if it was not
            console.log('Error :', err)
            res.end('Error :' + err)
          })
        }

      if (message.text.startsWith('/start')) {
        
        axios
          .post(
            telegrambot,
            {
              chat_id: message.chat.id,
              text: 'Hello I am CoinToGo Bot. \r\n' +
              'You can ask me some questions like: \r\n' +
              '/info    - Info About me \r\n' +
              '/help    - Help Page \r\n' +
              '/supply  - CoinSupply \r\n' +
              '/maxsupply  - MaxCoinSupply \r\n' +
              '/blocks  - AmountOfBlocks \r\n' +
              '/price  - 2GO Price \r\n' +
              '/marketcap  - Market-Cap \r\n' +
              '/volume  - Total-Volume \r\n' +
              'More information can be found here: \r\n' +
              'Website: http://cointogo.io/ \r\n'
            }
          )
          .then(response => {
            // We get here if the message was successfully posted
            console.log('Message posted')
            res.end('ok')
          })
          .catch(err => {
            // ...and here if it was not
            console.log('Error :', err)
            res.end('Error :' + err)
          })
        }


        if (message.text.startsWith('/price')) {
          request({
            url: urlprice,
            json: true
          }, function (error, response, body) {
        
              if (!error && response.statusCode === 200) {
                pricesbody = body; // Print the json response

                axios
                .post(
                  telegrambot,
                  {
                    chat_id: message.chat.id,
                    text: Math.round(JSON.stringify(pricesbody.market_data.current_price.eur) * 100) / 100 + ' € \r\n' +
                    Math.round(JSON.stringify(pricesbody.market_data.current_price.usd) * 100) / 100 + ' $ \r\n' +
                    Math.round(JSON.stringify(pricesbody.market_data.current_price.btc) * 100000000) / 100000000 + ' BTC'
                  }
                )
                .then(response => {
                  // We get here if the message was successfully posted
                  console.log('Message posted')
                  res.end('ok')
                })
                .catch(err => {
                  // ...and here if it was not
                  console.log('Error :', err)
                  res.end('Error :' + err)
                })
              }
          })
          
      }
      
      if (message.text.startsWith('/marketcap')) {
        request({
          url: urlprice,
          json: true
        }, function (error, response, body) {
      
            if (!error && response.statusCode === 200) {
              marketcapbody = body; // Print the json response

              axios
              .post(
                telegrambot,
                {
                  chat_id: message.chat.id,
                  text: Math.round(JSON.stringify(marketcapbody.market_data.market_cap.eur) * 100) / 100 + ' € \r\n' +
                  Math.round(JSON.stringify(marketcapbody.market_data.market_cap.usd) * 100) / 100 + ' $ \r\n' +
                  Math.round(JSON.stringify(marketcapbody.market_data.market_cap.btc) * 100000000) / 100000000 + ' BTC'
                }
              )
              .then(response => {
                // We get here if the message was successfully posted
                console.log('Message posted')
                res.end('ok')
              })
              .catch(err => {
                // ...and here if it was not
                console.log('Error :', err)
                res.end('Error :' + err)
              })
            }
        })
        
    }


    if (message.text.startsWith('/volume')) {
      request({
        url: urlprice,
        json: true
      }, function (error, response, body) {
    
          if (!error && response.statusCode === 200) {
            volumebody = body; // Print the json response

            axios
            .post(
              telegrambot,
              {
                chat_id: message.chat.id,
                text: Math.round(JSON.stringify(volumebody.market_data.total_volume.eur) * 100) / 100 + ' € \r\n' +
                Math.round(JSON.stringify(volumebody.market_data.total_volume.usd) * 100) / 100 + ' $ \r\n' +
                Math.round(JSON.stringify(volumebody.market_data.total_volume.btc) * 100000000) / 100000000 + ' BTC'
              }
            )
            .then(response => {
              // We get here if the message was successfully posted
              console.log('Message posted')
              res.end('ok')
            })
            .catch(err => {
              // ...and here if it was not
              console.log('Error :', err)
              res.end('Error :' + err)
            })
          }
      })
  }
    else{
      return res.end()
    }
     
})

// Finally, start our server
app.listen(3000, function() {
  console.log('Telegram app listening on port 3000!')
})