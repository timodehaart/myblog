const express = require('express');
const app = express();
const blogRoutes = require('./routes/blogRoutes');
const db = require('./database');

app.use(express.static(__dirname + '/public'));

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => res.redirect('/blogs'));
app.use('/blogs', blogRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
