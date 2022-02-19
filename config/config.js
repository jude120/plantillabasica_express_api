require('dotenv').config();
module.exports = {
  "development": {
    "username":process.env.BDUSER_DEV,
    "password": process.env.BDPASSWORD_DEV ==='' || process.env.BDPASSWORD_DEV==='NULL'  ? null : process.env.BDPASSWORD_DEV ,
    "database": process.env.BDNAME_DEV,
    "port":process.env.BDPORT_DEV,
    "host": process.env.BDHOST_DEV,
    "dialect": process.env.BDDIALECT_DEV,
    "logging": false,
    "pool": {
      "max": 100,
      "min": 0,
      "acquire": 1000000,
      "idle": 200000
    }
  },
  "test": {
    "username":process.env.BDUSER_TEST,
    "password": process.env.BDPASSWORD_TEST,
    "database": process.env.BDNAME_TEST,
    "port":process.env.BDPORT_TEST,
    "host": process.env.BDHOST_TEST,
    "dialect": process.env.BDDIALECT_TEST,
    "logging": false,
    "pool": {
      "max": 100,
      "min": 0,
      "acquire": 1000000,
      "idle": 200000
    }
  },
  "production": {
    "username":process.env.BDUSER_PROD,
    "password": process.env.BDPASSWORD_PROD,
    "database": process.env.BDNAME_PROD,
    "port":process.env.BDPORT_PROD,
    "host": process.env.BDHOST_PROD,
    "dialect": process.env.BDDIALECT_PROD,
    "logging": false,
    "pool": {
      "max": 100,
      "min": 0,
      "acquire": 1000000,
      "idle": 200000
    }
  }
}