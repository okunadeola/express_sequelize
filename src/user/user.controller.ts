import { Request, Response } from "express";
import { FilterUserQueryInput, LoginInput, RegisterInput } from "./user.schema";
import UserModel from "./user.model";
import token from "../token";
import bcrypt from 'bcrypt';



export const registerController = async (
  req: Request<{}, {}, RegisterInput>,
  res: Response
) => {
  try {
    const { username, email, password, isMale } = req.body;


    const hash = await bcrypt.hash(password, 10);

    const newuser = await UserModel.create({
        username, email, password: hash, isMale
    });

    const accessToken = token.createToken(newuser.toJSON());

    res.status(201).json({
      status: "success",
      data: {
        newuser,
        accessToken
      },
    });
  } catch (error: any) {
    if (error.name === "SequelizeUniqueConstraintError") {
      return res.status(409).json({
        status: "failed",
        message: "User with that email already exists",
      });
    }

    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};





export const loginController = async (
  req: Request<{}, {}, LoginInput>,
  res: Response
) => {
  try {
    const { email, password  } = req.body;

    const result = await UserModel.findOne(
      {
        where: {
          email
        },
      }
    );

    if(!result){
        return  res.status(400).json({
            status: "error",
            message: 'user not find',
          });
    }

    const data = result?.toJSON() 

    if(!(await bcrypt.compare(password, data.password))){
        return  res.status(403).json({
            status: "error",
            message: 'invalid email or password',
          });
    }

    
    const accessToken = token.createToken(data);

    res.status(200).json({
      status: "success",
      data: {
        accessToken,
        data
      },
    });
  } catch (error: any) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};






export const findAllUsersController = async (
  req: Request<{}, {}, {}, FilterUserQueryInput>,
  res: Response
) => {
  try {
    const page = parseInt((req.query.page || 1).toString());
    const limit =  parseInt((req.query.limit || 10).toString());
    const skip = (page - 1) * limit;




    const totalCount = await UserModel.count()
    const users = await UserModel.findAll({ limit, offset: skip });

    res.status(200).json({
      status: "success",
      results: users.length,
      users,
      nextPgae:(page * limit)<= totalCount ? page + 1 : null
    });
  } catch (error: any) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};


