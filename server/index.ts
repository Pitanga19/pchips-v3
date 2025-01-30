import express, { Request, Response } from 'express';

const PORT = parseInt(process.env.PORT || '3000');

const app = express();

// ROUTES
app.get('/', (req: Request, res: Response) => {
    res.status(200).send('<h1>Poker Chips app</h1>');
});

// SERVER
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});