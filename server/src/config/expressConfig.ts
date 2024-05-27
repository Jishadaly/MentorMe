import { Express , Application } from "express";

import bodyParser from 'express';
import { connectToDb } from "./dbConfig";

  export function configureExpress(app:Application):void{
     app.use(bodyParser.json());
     app.use(bodyParser.urlencoded({extended:true}))

     connectToDb()
  }
