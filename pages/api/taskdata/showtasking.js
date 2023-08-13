import { connectToDatabase } from '../../../lib/db';

async function HandleTask(req, res) {
    if (req.method !== 'POST') return;
    const { user } = req.body;
    const client = await connectToDatabase();
    //console.log(user);
    const db = client.db();
    const existingUser = await db.collection('Authentications').findOne({ email: user });

    if (!existingUser) {
        res.status(422).json({ message: 'User login First already!' });
        client.close();
        return;
    }
    const result = await db.collection('TaskData').find({ user:user }).toArray();

    //console.log(result);
    res.status(201).json(result);
    client.close();
}

export default HandleTask;   