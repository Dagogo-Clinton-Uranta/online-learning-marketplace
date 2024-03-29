// db.js
import Dexie from 'dexie';

const db = new Dexie('savedCourses');
db.version(1).stores({
  savedCourses: '++id, courseName', // Primary key and indexed props
});


export default db