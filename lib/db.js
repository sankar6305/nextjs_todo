import { MongoClient } from "mongodb";

export async function connectToDatabase() {

    const connectionString = `mongodb+srv://${process.env.mongodb_username}:${process.env.mongodb_password}@${process.env.mongodb_clustername}.6efo2qj.mongodb.net/?retryWrites=true&w=majority`;

    const client = MongoClient.connect(connectionString);
    return client;
}
    