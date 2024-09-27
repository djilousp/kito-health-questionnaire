/* eslint-disable */
conn = new Mongo();
db = conn.getDB('admin');

db.createUser({
  user: 'kito_health',
  pwd: 'secret_Pass',
  roles: [
    { role: 'userAdminAnyDatabase', db: 'admin' },
    { role: 'readWriteAnyDatabase', db: 'admin' },
    { role: 'dbAdminAnyDatabase', db: 'admin' },
  ],
});
db = conn.getDB('kito_health_db');
db.createUser({
  user: 'kito_health',
  pwd: 'secret_Pass',
  roles: [],
});
db.grantRolesToUser('kito_health', [
  { role: 'readWrite', db: 'kito_health_db' },
]);
db.createCollection('delete_me');
