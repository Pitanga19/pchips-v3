// pchips-v3/server/index.ts

import express, { Request, Response } from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import logger from 'morgan';
import initDatabase from '../db/initDatabase';

const PORT: number = parseInt(process.env.PORT || '3000');

// ---------------- MAIN INIT   -------------------------------- //
const app = express();              // Initialize express app
const server = createServer(app);   // Create http server
const io = new Server(server);      // Create web socket server

// ---------------- MIDDLEWARES -------------------------------- //
app.use(logger('dev'));             // Dev morgan logger
app.use(express.static('client'));  // Use statics files
app.use(express.json());            // Require & response json

// ---------------- ROUTES  ------------------------------------ //
// Simple main page using static files
app.get('/', (req: Request, res: Response) => {
    res.status(200).sendFile(process.cwd() + '/client/index.html');
});

// ---------------- SOCKETS ------------------------------------ //
// Simple connection socket
io.on('connection', (socket) => {
    console.log('A user has connected');
    
    socket.on('disconnect', () => {
        console.log('A user has disconnected');
    });
});

// ---------------- SERVER  ------------------------------------ //
initDatabase()  // Initialize database
    .then(() => {
        console.log('Database initialized succesfully')
        
        server.listen(PORT, () => { // Initialize server when database is ready
            console.log(`Server is running on http://localhost:${PORT}\n`);
        });
    })
    .catch((error) => {
        console.error(`Error while initializing the database: ${error}\n`);
        process.exit(1); // Stop server if database error found
    });