// pchips-v3/server/index.ts

import express, { Request, Response } from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import logger from 'morgan';
import initDatabase from '../db/initDatabase';
import { AuthRoutes, authTest } from '../src/auth/authIndex';
import { RelationRoutes, relationTest } from '../src/relation/relationIndex';
import { RoomRoutes, roomTest } from '../src/room/roomIndex';

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
app.use('/api/auth', AuthRoutes);           // Register, LogIn, Recover pass, Update user
app.use('/api/relation', RelationRoutes);   // Friend requests, friends, blocks
app.use('/api/room', RoomRoutes);         // Rooms management, members, list

// ---------------- SOCKETS ------------------------------------ //
// Simple connection socket
io.on('connection', (socket) => {
    console.log('[index.ts] A user has connected');
    
    socket.on('disconnect', () => {
        console.log('[index.ts] A user has disconnected');
    });
});

// ---------------- SERVER  ------------------------------------ //
initDatabase()  // Initialize database
    .then(async () => {
        console.log('[index.ts] Database initialized successfully');
        
        server.listen(PORT, () => { // Initialize server when database is ready
            console.log(`[index.ts] Server is running on http://localhost:${PORT}\n`);
        });

        await authTest();
        await relationTest();
        await roomTest();
    })
    .catch((error) => {
        console.error(`Error while initializing the database: ${error}\n`);
        process.exit(1); // Stop server if database error found
    });