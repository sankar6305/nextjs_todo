import { connectToDatabase } from '../../../lib/db';



async function HandleTask(req, res) {
    if (req.method !== 'POST') return;
    console.log(req.body);
    const { user, duration, date, day } = req.body;
    const client = await connectToDatabase();
    //console.log(user);
    const db = client.db();
    const existingUser = await db.collection('Authentications').findOne({ email: user });

    if (!existingUser) {
        res.status(422).json({ message: 'User login First already!' });
        client.close();
        return;
    }

    const result = await db.collection('TaskTimer').find({ user: user }).toArray();
    var cnt = null;
    if (cnt = result.find(item => item.date === date)) {
        // add duration to existing duration
        const result2 = await db.collection('TaskTimer').updateOne(
            { user: user, date: date },
            { $set: { duration: duration + cnt.duration } }
        );
        res.status(201).json({ message: 'Task Updated by user!' });
    }
    else {
        const result2 = await db.collection('TaskTimer').insertOne({
            user: user,
            duration: duration,
            date: date,
            day: day,
        });
        res.status(201).json({ message: 'Task Added by user!' });
    }
    console.log("timer sent successfully");
    client.close()
}

export default HandleTask;