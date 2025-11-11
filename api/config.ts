import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

// export const config = {
//   ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
//   BDD: {
//     host: process.env.DB_HOST,
//     port: process.env.DB_PORT,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     bdname: process.env.DB_NAME,
//   },
// };

export const config = {
  ACCESS_TOKEN_SECRET: "EMMA123",
  BDD: {
    host: "dpg-d49nhoodl3ps739b9lcg-a.oregon-postgres.render.com",
    port: "5432",
    user: "tp04_ackermann_mathieu_bdd_user",
    password: "Bl3yUCbbWU7rRYMtEMe84pRbEr4Zw61j",
    bdname: "tp04_ackermann_mathieu_bdd",
  },
};

export default config;
