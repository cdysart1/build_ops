import React from 'react';
import ReactDOM from 'react-dom';
import AWSAppSyncClient, { defaultDataIdFromObject } from 'aws-appsync';
import { ApolloProvider } from 'react-apollo';
import { Rehydrated } from 'aws-appsync-react';
import './index.css';
import * as serviceWorker from './serviceWorker';
import Routes from './routes';

const client = new AWSAppSyncClient({
  url: 'https://vdokubjrx5ffnkkhqm52nnecpm.appsync-api.us-east-2.amazonaws.com/graphql',
  region: 'us-east-2',
  auth: {
    type: 'API_KEY',
    apiKey: 'da2-cplyrkju2jhszdiq4zw65ebq5y',
  },
  disableOffline: true,
  cacheOptions: {
    dataIdFromObject: (obj) => {
      let id = defaultDataIdFromObject(obj);

      if (!id) {
        const { __typename: typename } = obj;
        switch (typename) {
          case 'Comment':
            return `${typename}:${obj.commentId}`;
          default:
            return id;
        }
      }

      return id;
    }
  }
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <Rehydrated>
      <Routes />
    </Rehydrated>
  </ApolloProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
