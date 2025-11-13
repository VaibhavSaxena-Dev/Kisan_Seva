/**
 * Test Backend Server Connection
 * Run: node test-server.js
 */

import http from 'http';

const testBackend = () => {
  const options = {
    hostname: 'localhost',
    port: 5000,
    path: '/api/health',
    method: 'GET',
    timeout: 3000
  };

  const req = http.request(options, (res) => {
    let data = '';

    res.on('data', (chunk) => {
      data += chunk;
    });

    res.on('end', () => {
      console.log('✅ Backend Server is RUNNING!');
      console.log('Status Code:', res.statusCode);
      console.log('Response:', data);
      process.exit(0);
    });
  });

  req.on('error', (error) => {
    console.log('❌ Backend Server is NOT RUNNING');
    console.log('Error:', error.message);
    console.log('\nTo start the server, run:');
    console.log('  cd server');
    console.log('  npm run dev');
    process.exit(1);
  });

  req.on('timeout', () => {
    req.destroy();
    console.log('❌ Connection timeout - Server may not be running');
    process.exit(1);
  });

  req.end();
};

testBackend();

