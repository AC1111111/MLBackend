import mongoose from 'mongoose';
import { MongoClient } from "mongodb";

const uri = 'mongodb+srv://AdityaChanan:BroBrewBroing@cluster0.lmehr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

//Connect to MongoDB
const client = new MongoClient(uri);
let conn;
try {
    conn = await client.connect();
    console.log("Connected to MongoDB");
}
catch (e) {
    console.error(e);
}

let db = conn.db("PersonalisedFinance");

export default db;