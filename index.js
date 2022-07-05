const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');

const app = express();

connectDB();

app.use(cors());

app.use(express.json({extended: true}));

const PORT = process.env.PORT || 3500; 

app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/repartidores', require('./routes/repartidores'));
app.use('/api/clientes', require('./routes/clientes'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/auth/repartidor', require('./routes/authRepartidor'));

app.listen(PORT, '0.0.0.0',  () => {
    console.log(`El servidor esta funcionando en el puerto ${PORT}`);
});




