import express from "express";
import nano from "nano";
import cors from "cors";

const app = express();
const couchdbUrl =
  process.env.COUCHDB_URL || "http://admin:admin@localhost:5984";
const nanoClient = nano(couchdbUrl);


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

async function initializeDatabases() {
  const specialDbs = [
    "_users",
    "_replicator",
    "_global_changes",
    "_up",
    "mydb",
  ];
  for (const dbName of specialDbs) {
    await ensureDatabaseExists(dbName);
  }
}

initializeDatabases();

const db = nanoClient.db.use("mydb");

app.use(cors());
app.use(express.json());

app.post("/insert", async (req, res) => {
  try {
    const result = await db.insert(req.body);
    res.status(200).send({ ...result, ...req.body });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.get("/random-insert", async (req, res) => {
  try {
    const doc = { data: generateRandomString(10) };
    const result = await db.insert(doc);
    res.status(200).send({ ...result, ...doc });
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


function generateRandomString(length) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}
