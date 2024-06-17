import express from "express";

const app = express();

app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.listen(3000,()=>{
    console.log('Server listening on port 3000')
});

app.post('/email', async(req,res) => {
    const submittedEmail=req.body.email;
    const emailRegex =  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if(emailRegex.test(submittedEmail)){
        return res.send(`
        <div class="mb-3" hx-target="this" hx-swap="outerHTML">
        <label class ="form-label">Email address</label>
            <input type="email" class="form-control" name="email" hx-post="/email" value="${submittedEmail}">
            <div class="alert alert-success" role="alert">
                This email is valid
            </div>
        </div>`
    )
    }
    else{
        return res.send(
            `<div class="mb-3" hx-target="this" hx-swap="outerHTML">
            <label class ="form-label">Email address</label>
                <input type="email" class="form-control" name="email" hx-post="/email" value="${submittedEmail}">
                <div class="alert alert-danger" role="alert">
                    Please enter a valid email address
                </div>
            </div>`
        )
    }
});