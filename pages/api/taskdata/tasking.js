import { connectToDatabase } from '../../../lib/db';


function getDateWithoutTime(date) {
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // Adding 1 because months are zero-based
    const day = date.getDate();
    
    // Create a string in the format "YYYY-MM-DD"
    const formattedDate = `${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}`;
    
    return formattedDate;
}

async function HandleTask(req, res) {
    if (req.method !== 'POST') return;
    const { name, message, user, startDate, endDate } = req.body;
    console.log(req.body);
    const client = await connectToDatabase();
    console.log(user);
    const db = client.db();
    const existingUser = await db.collection('Authentications').findOne({ email: user });

    if (!existingUser) {
        res.status(422).json({ message: 'User login First already!' });
        client.close();
        return;
    }

    const res12 = await db.collection('TaskData').insertOne({
        user: user,
        name: name,
        message: message,
        StartTime: startDate,
        EndTime: endDate,
    });


    const date = new Date();
    const datewith = getDateWithoutTime(date);

    const result1 = await db.collection('TaskTimer').find({ user: user }).toArray();
    const labelweek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    var cnt = null;
    if (cnt = result1.find(item => item.date === datewith)) {
        console.log("already exisisting one means update it");
        // add duration to existing duration
        const alcnt = cnt.count;
        const result2 = await db.collection('TaskTimer').updateOne(
            { user: user, date: datewith },
            { $set: { count: 1 + parseInt(cnt.count, 10) } }
        );
        res.status(201).json({ message: 'Task Updated by user!' });
    }
    else {
        const result2 = await db.collection('TaskTimer').insertOne({
            user: user,
            date: getDateWithoutTime(date),
            day: labelweek[date.getDay()],
            count : 1,
        });
        res.status(201).json({ message: 'Task Added by user!' });
    }
    console.log("timer sent successfully");
    client.close()
    //get the data with the results of counts on the day
    //const result = await db.collection('TaskTimer').find({ user: user }).toArray();
    console.log(name);
    //res.status(201).json({ message: 'Task Created by user!' });
}

export default HandleTask;
