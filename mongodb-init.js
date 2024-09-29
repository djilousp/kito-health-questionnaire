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

db.questions.drop();
db.questionnaires.drop();

const questionIds = [];
for (let i = 1; i <= 6; i++) {
  const question = db.questions.insertOne({
    prompt: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet, dolorem! ${i}`,        
    answers: [
      { _id:ObjectId(),answerText: `Answer 1 for Question ${i}: Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet, dolorem!`, isCorrect: false, weight: 1 },
      { _id:ObjectId(),answerText: `Answer 2 for Question ${i}: Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet, dolorem!`, isCorrect: true, weight: 2 },
      { _id:ObjectId(),answerText: `Answer 3 for Question ${i}: Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet, dolorem!`, isCorrect: false, weight: 3 },
    ],
  });
  questionIds.push(question.insertedId);
}

db.questionnaires.insertOne({
  _id: ObjectId('66f8075c60f3d0e97604070f'),
  title: 'Sample Questionnaire',
  description: 'This is a sample questionnaire with six questions.',
  questions: questionIds,
});

// Verify the inserted data
print('Questions inserted:');
printjson(db.questions.find().toArray());
print('Questionnaire inserted:');
printjson(db.questionnaires.find().toArray());