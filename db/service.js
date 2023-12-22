const {createError} = require('../error/custom-error.js');
const {show} = require('../debug/debug.js');

class Service {
    constructor(client) {
        this.collection = client.db().collection(process.env.COLLECTION_TASK);;
    }

    async get(id) {
        const result = await this.collection.findOne({ id });
        return result;
    }

    async getAll() {
        let result = await this.collection.find({}).toArray();
        return result;
    }

    async create(data) {
        let result;
        if(!(await this.get(data.id))) {
            result = await this.collection.insertOne(data);
            show({result});
        } else {
            result = createError(`task voi id = ${data.id} da ton tai`, 403);
        }
        return result;
    }

    async update(data) {
        let result;
        if((await this.get(data.id))) {
            result = await this.collection.updateOne(
                { id: data.id},
                { $set: data }
            );
        } else {
            result = await this.create(data);
        }
        return result;
    }

    async delete(id) {
        let result;
        if((await this.get(id))) {
            result = await this.collection.deleteOne({ id });
        } else {
            result = createError(`khong ton tai task void id = ${id}`, 403);
        }
        return result;
    }
}

module.exports = {
    Service,
};