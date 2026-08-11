import mongoose from "mongoose";

interface ConnectionOptions {
    mongoURL: string,
    dbName: string,
}

export class MongoDataBase {

    static async connect(options: ConnectionOptions) {
        const {mongoURL, dbName} = options;

        try {

            await mongoose.connect(mongoURL, {
                dbName: dbName,
            });

            
            return true;
        } catch (error) {
            throw error;
        }
    }

}