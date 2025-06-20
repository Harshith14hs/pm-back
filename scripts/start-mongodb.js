const { spawn } = require('child_process');
const path = require('path');

// Check if MongoDB is installed
const isMongoInstalled = () => {
  return new Promise((resolve) => {
    const check = spawn('where', ['mongod']);
    check.on('close', (code) => {
      resolve(code === 0);
    });
  });
};

// Check if MongoDB is running
const isMongoRunning = () => {
  return new Promise((resolve) => {
    const check = spawn('tasklist');
    let output = '';
    check.stdout.on('data', (data) => {
      output += data.toString();
    });
    check.on('close', () => {
      resolve(output.includes('mongod.exe'));
    });
  });
};

// Start MongoDB if not running
const startMongo = async () => {
  try {
    const installed = await isMongoInstalled();
    if (!installed) {
      console.error('MongoDB is not installed on your system.');
      console.error('Please install MongoDB from: https://www.mongodb.com/try/download/community');
      console.error('After installation, make sure to add MongoDB to your system PATH.');
      process.exit(1);
    }

    const isRunning = await isMongoRunning();
    if (isRunning) {
      console.log('MongoDB is already running');
      return;
    }

    console.log('Starting MongoDB...');
    const mongoProcess = spawn('mongod', ['--dbpath', path.join(path.resolve(), '../data/db')]);

    mongoProcess.stdout.on('data', (data) => {
      console.log(`MongoDB: ${data}`);
    });

    mongoProcess.stderr.on('data', (data) => {
      console.error(`MongoDB Error: ${data}`);
    });

    mongoProcess.on('close', (code) => {
      console.log(`MongoDB process exited with code ${code}`);
    });

    // Wait a bit for MongoDB to start
    await new Promise(resolve => setTimeout(resolve, 2000));
    console.log('MongoDB started successfully');
  } catch (error) {
    console.error('Error starting MongoDB:', error);
    process.exit(1);
  }
};

startMongo(); 