require("dotenv").config();
const { MongoClient } = require("mongodb");

async function connectDb() {
  const uri = process.env.MONGODB_URI;
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  try {
    await client.connect();
    console.log("Connected to the database");
    // Puedes agregar más lógica aquí si necesitas trabajar con la base de datos
  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
  }
}

module.exports = connectDb;
