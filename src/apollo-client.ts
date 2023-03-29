import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
    uri: "https://8c6b-124-109-45-157.ap.ngrok.io",
    cache: new InMemoryCache(),
  
});

export default client





