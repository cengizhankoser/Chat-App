const express = require('express');
const http = require('http');
const { Server } = require("socket.io");
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const User = require('./userModel'); // userModel.js dosyasını içe aktarın

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static('public'));
app.use(bodyParser.json());

// MongoDB'ye bağlanma kodu
const url = 'mongodb+srv://cengizhankoserr:DreY7Fk744oSbMZX@movielens.oaqf0tu.mongodb.net/';

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB\'ye başarıyla bağlandı.');
  })
  .catch(err => {
    console.error('MongoDB bağlantısı başarısız oldu: ', err);
  });

// Kullanıcı kaydını işleyin
app.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = new User({ username, password });
        await user.save();
        res.status(200).send('Kullanıcı kaydedildi.');
    } catch (error) {
        console.error('Kullanıcı kaydı hatası:', error);
        res.status(500).send('Kullanıcı kaydedilirken bir hata oluştu.');
    }
});


io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });

    socket.on('chat message', (msg) => {
        console.log('message: ' + msg);
    });

    socket.broadcast.emit('hi');

    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
    });
});


app.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        console.log(username)
        console.log(password)
        // Kullanıcıyı MongoDB veritabanında arayın
        const user = await User.findOne({ username, password });
        
        if (user) {
            // Kullanıcı bulundu, giriş başarılı
            res.status(200).send('Giriş başarılı.');
        } else {
            // Kullanıcı bulunamadı, giriş başarısız
            res.status(401).send('Giriş başarısız. Kullanıcı adı veya şifre hatalı.');
        }
    } catch (error) {
        console.error('Giriş hatası:', error);
        res.status(500).send('Giriş sırasında bir hata oluştu.');
    }
});


server.listen(3000, () => {
    console.log('listening on *:3000');
});
