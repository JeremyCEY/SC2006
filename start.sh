#!/bin/bash

# Start backend
cd backend
npm run start &
# Start frontend
cd ../frontend/client
npm start