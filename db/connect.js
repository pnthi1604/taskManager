const express = require('express');
const { show } = require('../debug/debug.js');
const { MongoClient } = require('mongodb');
const {createError} = require('../error/custom-error.js');

class Connect {
    static getClient = async (uri) => {
        if(!this.client) {
            this.client = new MongoClient(uri, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            });
            await this.client.connect();
        }
        return this.client;
    }
}

module.exports = {
    Connect,
};
    