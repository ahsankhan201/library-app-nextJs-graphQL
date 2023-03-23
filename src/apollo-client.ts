import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
    uri: " https://ab33-124-109-45-157.au.ngrok.io/graphql",
    cache: new InMemoryCache(),
});

export default client