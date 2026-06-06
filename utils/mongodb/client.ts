import { MongoClient } from 'mongodb'

const uri = process.env.MONGODB_URI
const dbName = process.env.MONGODB_DB || 'fastdev'

if (!uri) {
  throw new Error('MONGODB_URI manquant dans .env.local')
}

// On reutilise la meme connexion entre les appels (evite d'en ouvrir trop)
let clientPromise: Promise<MongoClient>

declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined
}

if (!global._mongoClientPromise) {
  const client = new MongoClient(uri)
  global._mongoClientPromise = client.connect()
}
clientPromise = global._mongoClientPromise

export async function getDb() {
  const client = await clientPromise
  return client.db(dbName)
}