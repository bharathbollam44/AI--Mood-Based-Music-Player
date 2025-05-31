// test-faceapi.js
import * as faceapi from 'face-api.js'; // Use import syntax

try {
  console.log('face-api.js imported successfully in Node.js!');
  // You can also try to log a part of it to be sure
  console.log('faceapi.nets:', faceapi.nets); // This will show part of the object
} catch (error) {
  console.error('Failed to import face-api.js in Node.js:', error);
}