import UniversalProvider from '@walletconnect/universal-provider';
// import {
//   type UniversalProviderOpts,
// } from '@walletconnect/universal-provider';

import { walletConnectStorage } from '@jhasuraj01/database'

// import QRCode from "qrcode";

// const storage: UniversalProviderOpts['storage'] = {
//   getKeys: async () => {
//     const keys = await walletConnectStorage.getKeys();
//     console.log("getKeys", JSON.stringify(keys, null, 2))
//     return keys
//   },
//   getEntries: async () => {
//     const entries = await walletConnectStorage.getEntries();
//     console.log('getEntries', JSON.stringify(entries, null, 2))
//     return entries
//   },
//   getItem: async (_key: string) => {
//     const value = await walletConnectStorage.getItem(_key);
//     console.log('getItem', JSON.stringify({_key, value}, null, 2))
//     return value;
//   },
//   setItem: async (_key: string, _value: any) => {
//     console.log('setItem', JSON.stringify({_key, _value}, null, 2))
//     await walletConnectStorage.setItem(_key, _value);
//   },
//   removeItem: async (_key: string) => {
//     console.log('removeItem', JSON.stringify({_key}, null, 2))
//     await walletConnectStorage.removeItem(_key);
//   }
// }

export async function getProvider(): Promise<any> {
  //  Initialize the provider
  const provider = await UniversalProvider.init({
    projectId: "dae05286227a336f1b4acd6cfa9d2dc2",
    metadata: {
      name: "My Website",
      description: "My Website Description",
      url: "https://mywebsite.com",
      icons: ["https://avatars.githubusercontent.com/u/37784886"],
    },
    // client: undefined, // optional instance of @walletconnect/sign-client,
    storage: walletConnectStorage,
  })

  return provider;
}

export async function connect() {
  return await new Promise<any>(async (resolve, _reject) => {

    //  Initialize the provider
    const provider = await getProvider()

    provider.on("display_uri", (uri: string) => {
      console.log(uri);
      // QRCode.toString(uri, {
      //   type: "terminal",
      //   small: true,
      //   errorCorrectionLevel: "L",
      // }).then((qrImage: any) => {
      //   console.log(qrImage);
      // });
    });

    //  create sub providers for each namespace/chain
    await provider.connect({
      optionalNamespaces: {
        eip155: {
          methods: [
            'eth_sendTransaction',
            'eth_signTransaction',
            'eth_sign',
            'personal_sign',
            'eth_signTypedData'
          ],
          chains: ['eip155:80001'],
          events: ['chainChanged', 'accountsChanged'],
          rpcMap: {
            80001:
              'https://rpc.walletconnect.com?chainId=eip155:80001&projectId=dae05286227a336f1b4acd6cfa9d2dc2'
          }
        }
      },
    })

    resolve(provider.session)
  })
}

export async function disconnect() {
  //  Initialize the provider
  const provider = await getProvider()
  await provider.disconnect();
}

export async function getSession(): Promise<any> {
  const provider = await getProvider()
  return provider.session;
}
