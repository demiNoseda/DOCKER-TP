import express from "express";
import nano from "nano";
import cors from "cors";

const app = express();
const couchdbUrl = process.env.COUCHDB_URL;
const nanoClient = nano(couchdbUrl);

// Verificar y crear la base de datos 'mydb' si no existe
async function ensureDatabaseExists(dbName) {
  try {
    const dbList = await nanoClient.db.list();
    if (!dbList.includes(dbName)) {
      await nanoClient.db.create(dbName);
      console.log(`Database ${dbName} created.`);
    } else {
      console.log(`Database ${dbName} already exists.`);
    }
  } catch (err) {
    console.error(`Error ensuring database ${dbName}:`, err);
  }
}

ensureDatabaseExists("mydb");

const db = nanoClient.db.use("mydb");

app.use(cors());
app.use(express.json());

app.post("/insert", async (req, res) => {
  try {
    const result = await db.insert(req.body);
    res.status(200).send(result);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.get("/random-insert", async (req, res) => {
  try {
    const doc = { name: "Random", value: Math.random() };
    const result = await db.insert(doc);
    res.status(200).send(result);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.get("/", async (req, res) => {
  res.status(200).send("Server is running");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
