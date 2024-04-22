db = db.getSiblingDB('mydb'); // This line equals SQL's "CREATE DATABASE IF NOT EXISTS mydb;"

db.createCollection('users', {
    validator: {
        $jsonSchema: {
            required: ['name', 'gender', 'created_date'],
            properties: {
                name: {
                    bsonType: 'string',
                    description: 'must be a string and is required'
                },
                gender: {
                    enum: ['Male', 'Female', 'Misc'],
                    description: 'Must be either Male, Female, or Misc'
                },
                created_date: {
                    bsonType: 'date',
                    description: 'must be a date and is required'
                }
            }
        }
    }
});
