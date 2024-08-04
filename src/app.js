// app.js
import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import authRoutes from './routes/auth.routes.js';
import clientRoutes from './routes/client.routes.js'; 
import patientRoutes from './routes/patient.routes.js';
import adminRoutes from './routes/admin.routes.js';
import hospitalizationRoutes from './routes/hospitalization.routes.js';
import hospedajeRoutes from './routes/hospedaje.routes.js'; 

import { isAuth, isAdmin, isVeterinarian, isAdminOrVeterinarian } from './middlewares/auth.middleware.js';

const app = express();

const allowedOrigins = [
  'http://localhost:5173',
  'https://new-betel-app.vercel.app',
  'https://newbetelapp-production.up.railway.app'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization']
}));

app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => res.json({ message: "Welcome to my API" }));
app.use("/api", authRoutes);

app.use("/api/admin", isAuth, isAdmin, adminRoutes);
app.use("/api/veterinario", isAuth, isAdminOrVeterinarian, clientRoutes, patientRoutes, hospitalizationRoutes, hospedajeRoutes); 

app.use((err, req, res, next) => {
  res.status(500).json({
    status: "error",
    message: err.message,
  });
});

export default app;









