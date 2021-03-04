require('dotenv').config()

const db_username = process.env.DB_USERNAME
const db_password = process.env.DB_PASSWORD
const db_database = process.env.DB_DATABASE
const db_host = process.env.DB_HOST
db_url = process.env.DATABAE_URL
const config ={
  development: {
    username: "root",
    password: null,
    database: "mobile_wallet",
    host: "127.0.0.1",
    dialect: "mysql",
    operatorsAliases: 0
  },
  test: {
    username: "root",
    password: null,
    database: "database_test",
    host: "127.0.0.1",
    dialect: "mysql",
    operatorsAliases: 0
  },
  production: {
    // username: db_username,
    // password: db_password,
    // database: db_database,
    // host: db_host,
    // dialect: "mysql",
    // operatorsAliases: 0
    use_env_variable = db_url
  }
}
module.exports=config