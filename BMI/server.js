import express from "express";

const app = express();

app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));
app.use(express.json());


app.post('/calculate', async(req,res) => {
    const height = parseFloat(req.body.height);
    const weight = parseFloat(req.body.weight);
    const bmi = weight/(height*height);

    res.send(`
    <p> Height of ${height} & Weight of ${weight} gives you a BMi of ${bmi.toFixed(2)}</p>
    `);
});

app.listen(3000,()=>{
    console.log('Server listening on port 3000')
});