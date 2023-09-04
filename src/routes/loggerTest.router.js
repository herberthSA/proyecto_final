import express from "express";
import {test} from "../controller/loggerTest.controller.js";
export const loggerTest = express.Router()

loggerTest.get('/',test);