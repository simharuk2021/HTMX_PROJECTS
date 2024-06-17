import express from "express";

const app = express();

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post('/search', async (req, res) => {
    const searchTerm = req.body.search.toLowerCase();
    if (!searchTerm) {
        return res.send('<tr></tr>');
    }

    try {
        const response = await fetch (`https://jsonplaceholder.typicode.com/users`);
        const users = await response.json();

        const searchResults = users.filter((user) => {
            const name = user.name.toLowerCase();
            const email = user.email.toLowerCase();

            return name.includes(searchTerm) || email.includes(searchTerm);
        });

        const searchResultHtml = searchResults.map((user) =>
            `<tr>
                <td>${user.name}</td>
                <td>${user.email}</td>
            </tr>`).join('');

        res.send(searchResultHtml);
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).send("Error fetching users");
    }
});

app.listen(3000, () => {
    console.log('Server listening on port 3000');
});
