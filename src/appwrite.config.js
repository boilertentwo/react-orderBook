import { Client, Account, Databases, Avatars } from 'appwrite';

const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('66532c270006d5d87245');

export const account = new Account(client)

export const userDatabase = new Databases(client)

export const avatar = new Avatars(client)

export default client