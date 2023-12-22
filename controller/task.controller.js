const express = require('express');
const { show } = require('../debug/debug.js');
const { Connect } = require('../db/connect.js');
const { createError, APIError} = require('../error/custom-error.js');
const { Service } = require('../db/service.js');

const db_url = process.env.DATABASE_URL;

let getAllTask = async (req, res, next) => {
    try {
        const service = new Service(await Connect.getClient(db_url));
        const docs = await service.getAll();
        return res.send(docs);
    } catch (err) {
        return next(err);
    }
};

let createTask = async (req, res, next) => {
    try {
        const service = new Service(await Connect.getClient(db_url));
        const result = await service.create(req.body);
        return res.send(result);
    } catch (err) {
        return next(err);
    }
};

let getTaskById = async (req, res, next) => {
    try {
        const {id} = req.params;
        const service = new Service(await Connect.getClient(db_url));
        const result = await service.get(Number(id));
        return res.send(result);
    } catch (err) {
        return next(err);
    }
};

let deleteTaskById = async (req, res, next) => {
    try {
        const {id} = req.params;
        const service = new Service(await Connect.getClient(db_url));
        const result = await service.delete(Number(id));
        return res.send(result);
    } catch (err) {
        return next(err);
    }
};

let updateTask = async (req, res, next) => {
    try {
        const service = new Service(await Connect.getClient(db_url));
        const result = await service.update(req.body);
        return res.send(result);
    } catch (err) {
        return next(err);
    }
};

module.exports = {
    getAllTask,
    createTask,
    getTaskById,
    deleteTaskById,
    updateTask,
};