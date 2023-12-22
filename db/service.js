const {createError} = require('../error/custom-error.js');
const {show} = require('../debug/debug.js');

class Service {
    constructor(client) {
        this.collection = client.db().collection(process.env.COLLECTION_TASK);;
    }

    async get(id) {
        return await this.collection.findOne({ id });
    }

    async getAll() {
        return await this.collection.find({}).toArray();
    }

    async create(data) {
        if(!(await this.get(data.id))) {
            return await this.collection.insertOne(data);
        } else {
            throw createError(`task voi id = ${data.id} da ton tai`, 403);
        }
    }

    async update(data) {
        if((await this.get(data.id))) {
            return await this.collection.updateOne(
                { id: data.id},
                { $set: data }
            );
        } else {
            throw createError(`task voi id = ${data.id} khong ton tai`, 403);
        }
    }

    async delete(id) {
        if((await this.get(id))) {
            return await this.collection.deleteOne({ id });
        } else {
            throw createError(`khong ton tai task void id = ${id}`, 403);
        }
    }
}

module.exports = {
    Service,
};