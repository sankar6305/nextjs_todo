import { connectToDatabase } from '../../../lib/db';

async function HandleTask(req, res) {
    if (req.method !== 'POST') return;
    const { name, message, user } = req.body;
    const client = await connectToDatabase();
    console.log(user);
    const db = client.db();
    const existingUser = await db.collection('Authentications').findOne({ email: user });

    if (!existingUser) {
        res.status(422).json({ message: 'User login First already!' });
        client.close();
        return;
    }
    const result = await db.collection('TaskData').insertOne({
        name: name,
        mesage: message,
        user: user
    });
    console.log(name);
    res.status(201).json({ message: 'Task Created by user!' });
}

export default HandleTask;