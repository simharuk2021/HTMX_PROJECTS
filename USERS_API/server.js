import express from "express";

const app = express();

app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.listen(3000,()=>{
    console.log('Server listening on port 3000')
});

app.get('/users', async(req,res) => {
    setTimeout(async() => {
    const limit = +req.query.limit||10;
    const response = await fetch(`https://jsonplaceholder.typicode.com/users?_limit=${limit}`)
    const users = await response.json()
    res.send(`
        <h2>Users</h2>
        <ul class ="list-group">
        ${users.map((user) =>`<li class = "list-group-item">${user.name}</li>`).join("")}
        </ul>`);
    }, 2000)
});