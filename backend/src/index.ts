import express from "express";
import dotenv from "dotenv";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import cors from "cors"
import serviceRoutes from './routes/serviceRoute'
import { connectDB } from "./config/db";
import bodyParser from "body-parser";
import typeDefs from "./graphql/schema";
import resolvers from "./graphql/resolvers";

dotenv.config()

const app = express();
const port = process.env.PORT;

// ✅ Fix CORS issue by allowing frontend domain
app.use(
  cors({
    origin: "*", // Change this to your frontend domain for better security
    credentials: true,
    methods: ["GET", "POST", "OPTIONS"]
  })
);

app.use(express.json());
app.use(bodyParser.json())

interface MyContext {
  req: express.Request;
  res: express.Response;
}
  
const startServer = async () => {
    // ✅ Apollo Server with Correct Context
    const graphqlServer = new ApolloServer({
      typeDefs,
      resolvers,
    });
  
    await graphqlServer.start(); // Ensure server is started before applying middleware
    await connectDB(); // Connect to DB before starting Express
  
    // ✅ Use Correct Express Middleware Typing
    app.use('/api/products', serviceRoutes);
    
    const GRAPHQL_ENDPOINT = process.env.GRAPHQL_ENDPOINT || "/graphql";

    app.use(
      GRAPHQL_ENDPOINT,
      expressMiddleware(graphqlServer, {
        context: async ({ req, res }): Promise<MyContext> => ({ req, res }),
      }) as express.RequestHandler
    );
  
    app.listen(port, () => {
      console.log(`🚀 Server is running on http://localhost:${port}`);
    });
  };
  

startServer().catch((error)=>{
    console.error(`Error starting server: ${error}`)
});