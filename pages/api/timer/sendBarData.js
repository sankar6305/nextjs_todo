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
    const result = await db.collection('TaskTimer').find({ user: user }).toArray();
    const labelweek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    const filledLast7Values = [];
    //sort based on date ascending order
    result.sort((a, b) => (a.date < b.date) ? 1 : -1);

    const firstDay = result[0]?.day || new Date().getDay();

    let index = labelweek.indexOf(firstDay);
    //console.log(index);
    
    for (let i = 0; i < 7; i++) {
        const value = result[i] || { count: 0 }; // Use 0 if no value found
        //console.log(value);
        value.day = labelweek[index];
        filledLast7Values.push(value);
        index = index - 1;
        if (index < 0) index = 6;
    }
    //reversing arra function in js
    filledLast7Values.reverse();
    //console.log(result);
    res.status(201).json(filledLast7Values);
    client.close();
}

export default HandleTask;   