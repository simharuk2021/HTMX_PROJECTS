import express from "express";

const app = express();

app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.listen(3000,()=>{
    console.log('Server listening on port 3000')
});
app.get('/get-price', async(req,res) => {
    
    const response = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd`)
    const prices = await response.json();
    console.log(prices)
    const bitcoinPrice = prices.bitcoin.usd;
    console.log(bitcoinPrice);
    res.send(`
        <h2>Bitcoin Price</h2>
        <ul class="list-group">
            <li class="list-group-item">USD: $${bitcoinPrice}</li>
        </ul>
    `);
});