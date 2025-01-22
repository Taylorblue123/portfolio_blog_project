const express = require('express');
const app = express();
const cors = require('cors');
const { default: mongoose } = require('mongoose');
const User = require('./models/User');
const bcrypt = require('bcryptjs'); // 使用 bcryptjs
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const fs = require('fs');
const Post = require('./models/Post');

const salt = bcrypt.genSaltSync(10);
const secret = 'ascfqeafcaecfqa';

app.use(cors({ credentials: true, origin: 'https://host-5kkf.onrender.com:3000' }));
app.use(express.json());
app.use(cookieParser());

mongoose.connect('mongodb+srv://taylorblue123:qwert123456@cluster0.c4clt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');

app.use('/uploads', express.static( __dirname  + '/uploads'));

app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  try {
    const userDoc = await User.create({
      username,
      password: bcrypt.hashSync(password, salt)
    });
    res.status(200).json(userDoc);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.post('/admin', async (req, res) => {
  const { username, password } = req.body;
  const userDoc = await User.findOne({ username });
  if (!userDoc) {
    return res.status(400).json({ message: "User not found" });
  }

  bcrypt.compare(password, userDoc.password, (err, result) => {
    if (result) {
      //login in
      jwt.sign({ username, id: userDoc._id }, secret, {}, (err, token) => {
        if (err) throw err;
        res.status(200).cookie('token', token).json({
          id: userDoc._id,
          username,
        });
      });
    } else {
      res.status(400).json({ message: "Login Failed" });
    }
  });
});

app.get('/profile', (req, res) => {
  const { token } = req.cookies;
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }
  jwt.verify(token, secret, {}, (err, info) => {
    if (err) {
      return res.status(401).json({ message: 'Token invalid' });
    }
    res.json(info);
  });
})

app.post('/logout', (req, res) => {
  res.cookie('token', '').json('ok');
});

app.post('/posts', upload.single('cover'), async (req, res) => {
  const { originalname, path } = req.file;
  const parts = originalname.split('.');
  const ext = parts[parts.length - 1];
  const newPath = path + '.' + ext;
  fs.renameSync(path, newPath);

  
  const { token } = req.cookies;
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }
  jwt.verify(token, secret, {}, async (err, info) => {
    if (err) {
      return res.status(401).json({ message: 'Token invalid' });
    }
    const { title, summary, content } = req.body;
    const author = info.id;
    try {
      const postDoc = await Post.create({
        title,
        summary,
        content,
        cover: newPath,
        author
      });
      console.log(postDoc);
      res.status(200).send('ok');
    } catch (error) {
      res.status(400).json({ message: error.message });
    }

  })});

app.put('/post', upload.single('cover'), async (req, res) => {
  let newPath = null;
  if (req.file) {
    const { originalname, path } = req.file;
    const parts = originalname.split('.');
    const ext = parts[parts.length - 1];
    const newPath = path + '.' + ext;
    fs.renameSync(path, newPath);
  }

  const { token } = req.cookies;
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }
  jwt.verify(token, secret, {}, async (err, info) => {
    if (err) {
      return res.status(401).json({ message: 'Token invalid' });
    }
    const { id, title, summary, content } = req.body;
    const PostDoc = await Post.findById(id);
    const isAuthor = PostDoc.author.toString() === info.id;
    if (!isAuthor) {
      return res.status(400).json({ message: "You are not the author" });
    }
    try {
      await Post.findByIdAndUpdate(id, {
        title,
        summary,
        content,
        cover: newPath ? newPath : PostDoc.cover,
      });
      res.status(200).send('ok');
    } catch (error) {
      res.status(400).json({ message: error.message });

}})});

app.delete('/post', async (req, res) => {
  const { token } = req.cookies;
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }
  jwt.verify(token, secret, {}, async (err, info) => {
    if (err) {
      return res.status(401).json({ message: 'Token invalid' });
    }
    const { id } = req.body;
    const PostDoc = await Post.findById(id);
    const isAuthor = PostDoc.author.toString() === info.id;
    if (!isAuthor) {
      return res.status(400).json({ message: "You are not the author" });
    }
    try {
      await Post.findByIdAndDelete(id);
      const path = __dirname + '/' + PostDoc.cover;
      //delete the file from local disk
      fs.unlink(path, (err) => {
        if (err) {
          console.error('Failed to delete file:', err);
          return res.status(500).json({ message: 'Failed to delete file' });
        }
        res.status(200).send('ok');
      });  
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
});

app.get("/posts", async (req, res) => {
  res.json(await Post.find()
    .populate('author')
    .sort({ createdAt: -1 })
  );
});


app.get("/post/:id", async (req, res) => {
  const { id } = req.params;
  res.json(await Post.findById(id).populate('author', ['username']));
});


app.listen(4000, () => {
  console.log('Server is running on port 4000');
});