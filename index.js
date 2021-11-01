const express = require('express')
const { MongoClient } = require('mongodb');
const cors = require("cors")
const app = express()
const port = process.env.PORT || 5000;


app.use(cors())
app.use(express.json())



const uri = "mongodb+srv://assignment-11:g3YApkFAPxlJ0f0v@cluster0.tgpgy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
async function run() {


    try {


        await client.connect();

        const database = client.db("assignment-11");

        const usersCollection = database.collection("datas");
        app.get("/users", async (req, res) => {
            const cursor = usersCollection.find({});
            const users = await cursor.toArray()
            res.send(users)

        })
        app.post("/users", async (req, res) => {
            const newUser = req.body
            const result = await usersCollection.insertOne(newUser);
            console.log(`A document was inserted with the _id: ${result.insertedId}`);

            console.log("hitting the post", req.body);
            res.json(result)
        })
        app.get("/users/:id", (req, res) => {
            const id = req.params.id
            res.send(database[id])
        })




        //Post Api



        app.delete('/orders/:id', (req, res) => {
            let movie_id = new mongodb.ObjectID(req.body._id);
            database.db.collection('movies').remove({ _id: req.params[movie_id] }).then((deleteMovie) => {
                res.send(deleteMovie);
            })
        })





    } finally {

        // await client.close();

    }

}

run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('Hello World!')
})


app.listen(port, () => {
    console.log(`Running port at ${port}`)
})