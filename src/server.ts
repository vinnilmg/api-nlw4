import express from 'express';

const app = express();

//routes
app.get('/', (request, response) => {
    return response.json({message: 'Hello world NLW04'});
})

app.post('/', (request, response) => {
    return response.json({message: 'Dados salvos.'});
})

app.listen(5050, () => console.log("Server is running!!")); //criar servidor