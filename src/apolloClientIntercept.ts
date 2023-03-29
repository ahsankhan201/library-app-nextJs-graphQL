
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import { setContext } from 'apollo-link-context';
import { ApolloLink } from 'apollo-link';
import Cookies from 'js-cookie';
import {Oppo_Server_Url} from '../environment'

const httpLink:any = new HttpLink({
  uri:Oppo_Server_Url
  });

  const authLink = setContext((_, { headers }) => {
    const authToken = Cookies.get('token');
    const token = authToken?.replace(/"/g, "");
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : '',
      },
    };
  });

  const link :any= ApolloLink.from([authLink, httpLink]);

  const client = new ApolloClient({
    link,
    cache: new InMemoryCache(),
  });



export default client
