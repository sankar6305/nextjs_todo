import { connectToDatabase } from '../../../lib/db';
import { ObjectId } from 'mongodb';

async function HandleTask(req, res) {
    if (req.method !== 'POST') return;
    const { id, user } = req.body;
    const client = await connectToDatabase();
    console.log(id);
    const db = client.db();
    const existingUser = await db.collection('Authentications').findOne({ email: user });

    if (!existingUser) {
        res.status(422).json({ message: 'User login First already!' });
        client.close();
        return;
    }
    console.log("we are authenticated user only");
    const result = await db.collection('TaskData').deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 1) {
      console.log('Document deleted successfully');
    } else {
      console.log('Document not found');
    }

    //console.log(result);
    res.status(201).json(result);
    client.close();
    
}

export default HandleTask;