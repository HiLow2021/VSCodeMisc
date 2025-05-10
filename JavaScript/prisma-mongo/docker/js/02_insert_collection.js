db = db.getSiblingDB('mydb');

db.users.insertMany([
    {
        name: '山田太郎',
        gender: 'Male',
        created_date: new Date()
    },
    {
        name: '鈴木花子',
        gender: 'Female',
        created_date: new Date()
    }
]);
