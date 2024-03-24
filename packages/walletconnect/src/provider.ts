import Provider, { type UniversalProvider as UniversalProviderType } from '@walletconnect/universal-provider';
import { walletConnectStorage } from '@jhasuraj01/database';
import QRCode from "qrcode";

// Define the type for UniversalProvider
type UniversalProvider = InstanceType<typeof UniversalProviderType>;

const projectId = "30cf241710d5be377f18725ed5b9d1d2"

export async function getProvider(): Promise<UniversalProvider> {
  //  Initialize the provider
  const provider = await Provider.init({
    projectId,
    metadata: {
      name: "MultiSigX",
      description: "Multi-Signature Smart Contract Composer and Parser",
      url: "https://multisigx.jhasuraj.com",
      icons: ["https://avatars.githubusercontent.com/u/37784886"],
    },
    storage: walletConnectStorage,
  })

  return provider;
}

export async function connect(): Promise<UniversalProvider> {
    //  Initialize the provider
    const provider = await getProvider()

    provider.on("display_uri", async (uri: string) => {
      const qrImage = await QRCode.toString(uri, {
        type: "terminal",
        small: true,
        errorCorrectionLevel: "L",
      })
      console.log(uri);
      console.log(qrImage);
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
          chains: ['eip155:11155111'],
          events: ['chainChanged', 'accountsChanged'],
        }
      },
    })

  return provider;
}

export async function disconnect(): Promise<void> {
  //  Initialize the provider
  const provider = await getProvider()
  await provider.disconnect();
}

export async function getSession(): Promise<UniversalProvider['session'] | undefined> {
  const provider = await getProvider()
  return provider.session;
}
