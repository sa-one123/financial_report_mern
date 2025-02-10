import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";


const client = new ApolloClient({
  link: new HttpLink({
    uri:import.meta.env.VITE_GRAPHQL_URL,
    credentials: "include",  // Ensures cookies and headers are sent correctly
    headers: {
      "Access-Control-Allow-Origin": "*"
    }
  }),
  cache: new InMemoryCache()
});


export default client;