import express from 'express'

const app = express()

const port = 3000

// app.get("/", (req, res) =>{
//     res.send("I love sanina azaz")
// })

// app.get("/ice-tea", (req, res) =>{
//     res.send("Ill get a good internship and job and propose to her for her dads phone no.")
// })

// app.get("/twitter", (req, res) =>{
//     res.send("ill get a job")
// })

// app.get("/money", (req, res) =>{
//     res.send("ill have to make money")
// })
//accept some data from the user
app.use(express.json())

// storing the data in an array
let teaData = []

let nextId = 1

//add a new tea
//POST /teas  -> creating a new tea
//GET /teas -> listing all the teas
//GET /teas/:id -> getting a single tea
app.post('/teas', (req, res) => {
    //from the req.body i want to extract name and price
    const { name, price } = req.body
    //creating a new object to store in my database
    const newTea = { id: nextId++, name, price }
    teaData.push(newTea)
    res.status(201).send(newTea)

})

// get all the teas
//listing all the teas
app.get('/teas', (req, res) => {
    res.status(200).send(teaData)
})

//get a tea by id
//getting a single tea
app.get('/teas/:id', (req, res) => {
    const tea = teaData.find(t => t.id === parseInt(req.params.id)) //req comes from url so use params, instead of req.body
    if (!tea) {
        return res.status(404).send('tea not found')
    }
    res.status(200).send(tea)
})

//update tea
/**
 * This is also called BUSINESS LOGIC
 * PUT /teas/:id  -> updating a tea
 * Request body -> {name, price}
 * Response -> 200 OK + updated tea object
 * if the tea with the given id is not found -> 404 Not Found
 * if the request body is invalid -> 400 Bad Request
 * 
 */
app.put('/teas/:id', (req, res) => {
    //grabbing the id
    //finding the tea
    const tea = teaData.find(t => t.id === parseInt(req.params.id))
    if (!tea) {
        return res.status(404).send('tea not found')
    }
    //what data i want to update
    const { name, price } = req.body
    tea.name = name
    tea.price = price

    res.send(200).send(tea)
})

//delete a tea
app.delete('/teas/:id', (req, res) => {
    const index = teaData.findIndex(t => t.id === parseInt(req.params.id))
    if (index === -1) {
        return res.status(404).send('tea not found')
    }
    teaData.splice(index, 1)
    return res.status(204).send('deleted')
})

app.listen(port, () => {
    console.log(`server is running on port: ${port}...`)

});