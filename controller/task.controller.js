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
        return next('co loi xay ra trong qua trinh get all task', 500);
    }
};

let createTask = async (req, res, next) => {
    try {
        const service = new Service(await Connect.getClient(db_url));
        const result = await service.create(req.body);
        if(result instanceof APIError) {
            return next(result.message, result.status_code);
        }
        return res.send(result);
    } catch (err) {
        return next('co loi xay ra trong qua trinh create task', 500);
    }
};

let getTaskById = async (req, res, next) => {
    try {
        const {id} = req.params;
        const service = new Service(await Connect.getClient(db_url));
        const result = await service.get(Number(id));
        if(result instanceof APIError) {
            return next(result.message, result.status_code);
        }
        return res.send(result);
    } catch (err) {
        return next('co loi xay ra trong qua trinh get task by id', 500);
    }
};

let deleteTaskById = async (req, res, next) => {
    try {
        const {id} = req.params;
        const service = new Service(await Connect.getClient(db_url));
        const result = await service.delete(Number(id));
        if(result instanceof APIError) {
            return next(result.message, result.status_code);
        }
        return res.send(result);
    } catch (err) {
        return next('co loi xay ra trong qua trinh delete task by id', 500);
    }
};

let updateTask = async (req, res, next) => {
    try {
        const service = new Service(await Connect.getClient(db_url));
        const result = await service.update(req.body);
        if(result instanceof APIError) {
            return next(result.message, result.status_code);
        }
        return res.send(result);
    } catch (err) {
        return next('co loi xay ra trong qua trinh update task', 500);
    }
};

module.exports = {
    getAllTask,
    createTask,
    getTaskById,
    deleteTaskById,
    updateTask,
};