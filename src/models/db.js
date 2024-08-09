const { MongoClient, ObjectId} = require("mongodb");

let singleton;

async function connect()
{

    if(singleton) return singleton;

    const client = new MongoClient(process.env.DB_HOST);
    await client.connect();

    singleton = client.db(process.env.DB);
    return singleton;

}

let findAll = async(collection) =>
{
    const db = await connect();
    return await db.collection(collection).find().toArray();
}

async function insertOne(collection,objeto)
{
const db = await connect();
return db.collection(collection).insertOne(objeto);

}
/*
let findOne = async (collection, _id)=>{
    const db = await connect();
    let obj= await db.collection(collection).find({'_id':new ObjectId(_id)}).toArray();
    if(obj)
      return obj[0];
    return false;
  }
  
  
  let updateOne= async (collection, object, param)=>{
    const db = await connect();
    let result= await db.collection(collection).updateOne(param, { $set: object} );
    return result;
  }
  

*/

module.exports = {findAll, insertOne};