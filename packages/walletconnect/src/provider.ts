import UniversalProvider from '@walletconnect/universal-provider';
import {
  type UniversalProviderOpts,
} from '@walletconnect/universal-provider';

// import QRCode from "qrcode";

const mymap = new Map<string, any>([
  [
    "wc@2:core:0.3//keychain",
    {
      "client_ed25519_seed": "31bdd1b828f5cffbf676309f561ea5c582bd434653c990ea63636e3fd07a5d37",
      "94bb4c3cfb7caffe2bddae3a67f7f90dccf3ed9a98bb3559b0ce9e8f84783261": "f5fdd13be7248effd1aa4ef824e587dfe9830a558263d5bc9fe62e966bb6626c",
      "3e12576ae55d4c05a71612b6868a59d0189805275e7504a853e35caec940db52": "626990589afc2e34746506fbf5dada940f5968ff332469c8c3c3e25a6b049e10",
      "afab6c01d17d5cc190713d678b3337a897eb4bb08ffa7740571f3ee29315b14a": "d044bac9ff3ba6c8da64400339148db4e9663ee95a0bfecf004fb704747b97a8"
    }
  ],
  [
    "wc@2:universal_provider:/namespaces",
    {
      "eip155": {
        "chains": [
          "eip155:80001"
        ],
        "methods": [
          "eth_sendTransaction",
          "eth_signTransaction",
          "eth_sign",
          "personal_sign",
          "eth_signTypedData"
        ],
        "events": [
          "accountsChanged",
          "chainChanged"
        ],
        "accounts": [
          "eip155:80001:0x5cFF5Be590c8285cB7cf3431C35CEBA403c17f24"
        ],
        "rpcMap": {}
      }
    }
  ],
  [
    "wc@2:universal_provider:/optionalNamespaces",
    {
      "eip155": {
        "methods": [
          "eth_sendTransaction",
          "eth_signTransaction",
          "eth_sign",
          "personal_sign",
          "eth_signTypedData"
        ],
        "chains": [
          "eip155:80001"
        ],
        "events": [
          "chainChanged",
          "accountsChanged"
        ],
        "rpcMap": {
          "80001": "https://rpc.walletconnect.com?chainId=eip155:80001&projectId=<your walletconnect project id>"
        }
      }
    }
  ],
  [
    "wc@2:core:0.3//pairing",
    [
      {
        "topic": "94bb4c3cfb7caffe2bddae3a67f7f90dccf3ed9a98bb3559b0ce9e8f84783261",
        "expiry": 1713733396,
        "relay": {
          "protocol": "irn"
        },
        "active": true,
        "peerMetadata": {
          "description": "Forkable web wallet for small/quick transactions.",
          "url": "https://punkwallet.io",
          "icons": [
            "https://punkwallet.io/punk.png"
          ],
          "name": "🧑‍🎤 PunkWallet.io"
        }
      }
    ]
  ],
  [
    "wc@2:core:0.3//subscription",
    [
      {
        "topic": "94bb4c3cfb7caffe2bddae3a67f7f90dccf3ed9a98bb3559b0ce9e8f84783261",
        "relay": {
          "protocol": "irn"
        },
        "id": "f3b880e225a3e85448daa29d6bee7da1e973e177d46811cb1de0ef754a2e8efe"
      },
      {
        "topic": "afab6c01d17d5cc190713d678b3337a897eb4bb08ffa7740571f3ee29315b14a",
        "relay": {
          "protocol": "irn"
        },
        "id": "1e51e53c31a1018de148538af0be2e75ad3178c3e96ab2f5b4d8dba4f03b5f5a"
      }
    ]
  ],
  [
    "wc@2:core:0.3//expirer",
    [
      {
        "target": "topic:94bb4c3cfb7caffe2bddae3a67f7f90dccf3ed9a98bb3559b0ce9e8f84783261",
        "expiry": 1713733396
      },
      {
        "target": "id:1711141385198077",
        "expiry": 1711141685
      },
      {
        "target": "topic:afab6c01d17d5cc190713d678b3337a897eb4bb08ffa7740571f3ee29315b14a",
        "expiry": 1711746196
      }
    ]
  ],
  [
    "wc@2:core:0.3//history",
    [
      {
        "id": 1711141396283430,
        "topic": "afab6c01d17d5cc190713d678b3337a897eb4bb08ffa7740571f3ee29315b14a",
        "request": {
          "method": "wc_sessionSettle",
          "params": {
            "relay": {
              "protocol": "irn"
            },
            "namespaces": {
              "eip155": {
                "chains": [
                  "eip155:80001"
                ],
                "methods": [
                  "eth_sendTransaction",
                  "eth_signTransaction",
                  "eth_sign",
                  "personal_sign",
                  "eth_signTypedData"
                ],
                "events": [
                  "accountsChanged",
                  "chainChanged"
                ],
                "accounts": [
                  "eip155:80001:0x5cFF5Be590c8285cB7cf3431C35CEBA403c17f24"
                ]
              }
            },
            "requiredNamespaces": {
              "eip155": {
                "methods": [
                  "eth_sendTransaction",
                  "eth_signTransaction",
                  "eth_sign",
                  "personal_sign",
                  "eth_signTypedData"
                ],
                "events": [
                  "accountsChanged",
                  "chainChanged"
                ],
                "chains": [
                  "eip155:80001"
                ]
              }
            },
            "optionalNamespaces": {
              "eip155": {
                "methods": [
                  "eth_sendTransaction",
                  "eth_signTransaction",
                  "eth_sign",
                  "personal_sign",
                  "eth_signTypedData"
                ],
                "chains": [
                  "eip155:80001"
                ],
                "events": [
                  "chainChanged",
                  "accountsChanged"
                ],
                "rpcMap": {
                  "80001": "https://rpc.walletconnect.com?chainId=eip155:80001&projectId=<your walletconnect project id>"
                }
              }
            },
            "pairingTopic": "94bb4c3cfb7caffe2bddae3a67f7f90dccf3ed9a98bb3559b0ce9e8f84783261",
            "controller": {
              "publicKey": "cb3a799c849f6fb80c832744137af07f835dd6b08a76bdde0cafa8cb00ec0f06",
              "metadata": {
                "description": "Forkable web wallet for small/quick transactions.",
                "url": "https://punkwallet.io",
                "icons": [
                  "https://punkwallet.io/punk.png"
                ],
                "name": "🧑‍🎤 PunkWallet.io"
              }
            },
            "expiry": 1711746196
          }
        },
        "expiry": 1713733397,
        "response": {
          "result": true
        }
      }
    ]
  ],
  [
    "wc@2:core:0.3//messages",
    {
      "94bb4c3cfb7caffe2bddae3a67f7f90dccf3ed9a98bb3559b0ce9e8f84783261": {
        "fca64d5a1cdf2148536d17e989c009615b610e52b33884862a9217e1bd08046f": "AF7uUc7okx7MQ9luaHk1sB66OCtmBczxlTAC+ecT2cHQTWkhONerpNEIYml9xYPxIOXsnV20yI2LnAs2icm1+z06pywhuJC7bjvoqnOs2q/SSP7cXX5jv2TaFnKms6HIqaHcVG9Eyu1DDlnKcvT6EDHr7D4wPkr0HzAWhVZe/s2f6VO7luwU6+AAG6NK86rVUCgMCOe3UQS25F7KomJ4KhAYGM78OURo3qCCet08zTrYKeFCgywyezYbWybOeXOTgLRwSzo30YbqW2jc9Sn7nYlgQasvLNO+y9wihjhzCESdJ/RFAq/5dcg3ZiR+CjuREPCI0scRRWhiUAfBySXuJkonBdKYrbjW3Acx4jVF3sCRhI6llE3odFehcXWWsQ0DDXpapz3i4LUz22PMZMA8A1pxlWUltVIXQNX3YEA2SyjzFFeowK1E6vctiMidJC4+nCs8YMrUoCx4wZ1cFsymM7knH0bFnqnxa8NHH7jYX0RE8c/m36Prm8k2U1WIjJw0/tchImYhhMaF7hprhl9hc5f0fUxBsHgM7dP4h7Kk61f/CqXjaZOelD8XbzabIOyfkGVBLnbYc/w/q1j7XcIWIE+fmefQpjA9eZI0VU6lMkOU0WbVc+CpimW6DNWjJLxhhuHQasCqkV2BjXwluRmB5rEIKWOBgm++wGFsNfK9a3f8rO3Y4Hfwh3PizsMc6pPY5qc5f9MuPUE0R3EdRiBperBQ7PswQo3zcEMhHLJLVVBfYYgl9LbSBspBRoogRYUbwM+drZ4Lsnmkg/WGDmmSwcwJOqtShBhzzW8Gj/x8ejpenTu19Chc+9xTH3OkOzNfnEtTlap+DZ4lpANcd2SuCbu2XZYmaWPR7zLbofEY3PxfM0c5tHyjN34eOk0EZ2VkLV6/N5V/IyIzeyn/5lmrBR9R1nmHverIxdsFKfVnoPVuCtm1IJvOaMDHS8ZKN1UNnOz6cHMeUVDQAlmm+kAQUe9OBsQcfNvlSKYlaJDGdILyOM0ocP1JWH7kwqWJwGI=",
        "2ff6534c3c42e505f3252840f214c5ffac14b96f24f39b0f752496a673f41d29": "AKBgqZGUKjFcM3dh3RdIGCcpgYpKmViFI/APnxG5GB0/N44X+t5qryZK9wG0wRNLyPu7s93YBi/0AFWEO2n/yOwPzP45UnSWjBOmcanxYfx3VlxYAkoqK79tIL5heC9ciyQ3prtPyf1y3HeVtubm5cCzGE5qYKOWHkaH34L0sPJ6ROOX4W0ntilJChqOihbPtCAaOECSnEgw3B7NSnqiIBDzAQH6SomGDrp4yjBjQaP0KG/9NSLYb2DMGkUXZyc0UeU="
      },
      "afab6c01d17d5cc190713d678b3337a897eb4bb08ffa7740571f3ee29315b14a": {
        "59e65d918069ca89fb2d5ea8bd54b4ad3b06b98ad173e3013347d8bde890c98d": "AFcqEPnLqcMYCvs1IVvaFWCtQkE3YTo9RrtznCVRhxiBb7EA61Bq/ZUpuK8YB7FLhUSTBazEdrgGC+hOnzL2U01eDZ2tXq/wlwzKraE4yeCePnh/q6+6zyHKncenZKe0HBMTvRSapgbfLzd/bwR4jlZQninSpmG6yQood73KPUjVK2UBV1j0VTKVf8ZLwHczV2d/rbE9yvkIWmU1TqjBKiiukrkonLzieIaJ3LPfZmskWnNQKnC66SxHic/SvQH9ivV1NYlVEiJCfGSvXBqoP/E0x2EjOrenmbtAOUy2w84XnLm219dIUda80g2k8awhqkYhKG01VvDNzprxQCZlepcW6J6zTSUg9N/eeS9pD/VEfPBITSeGxWm8bA6kk/7lw0YCqxjDTDOJWAvvPZVFqxicXwD2zXDZ7y5IoEV5b+zBb2UR00kN0NIYwTL1pCYUjSzWRM42PknI6dXn09FTE61etk+kn4RMWToQIfG+Le7cDhmcYlLE3w03b7dnSpS2tagShr1zZMEhtse3HolugiHpvdTYBRipz3HWXF2v4l6q4MuHBazfcjAzKlrXsXblCaifvbmgOG4BRReg80uf/rA9dw/Poxbnqrl9vRjPPxJux5GOjq3klcffLx5LfxGU8rrT9+JxTMVB/InIfOUTw7BcNF9o7+xMn40J/3irEqi8qHqfaxxDb1q00ZGZQfAvvXY50acykCkdIcG8tALQObqaNTW56ovhU7KQLB2BqiKsmP6XqIGeQlDLgFlLUpZaFbUO/qmxcZe8DFO4w1EgSAcibWGcEBSMvybZ8YEKwkANUlIsz+DqAGUehAJ2GGux2Q26H3qWr5/55IEpMCPNO0KpvVf5ZaDpYT+OtbgdrRUhf7iKJY+4eKLpc1dTUInVMHIpRszfePcP2A26nF4zoNxJjIof+FxzbbfDbYOqwXLyudCFdYqn91zhJF8dLa6unY90zA5je3jZYMXJ1S+EsE3shdKTXFtELIkC4rFSgQAK9aT57lK2GpSnPlmycwzy9vFLInC8azYuU//unr91kMmq8P662NyzMCkc4fJyW7YmgF0Cf+yqzpmBk0NL+4UibBfzvb1k4qMhmdfsk4SLGRIYieOWpUXXTBfMHRfg58eF2UuXRNC3DIcbq7lqzsx5OhbXtjy2LL2xCWdkmtNJSxF8HPTX86mEs8obhVRCyiPT4WQ53OAwZNn8fuOQhBLMNpPHtJxBB6F/dCi8kpRBp634yYXdnxyvrAn+1Klera7taatGdeWfxuT7yzJc/cxRbbcrLnUvol7F9pyIw0wtzeFhOEnGZn2zhMGv9Erhw3vPEGDI8VaPd5mSZoM6RxDkxbrO1WV8hf2AsS9DzfZfpZqZ+RS9BWXp4PU6klZ3TQb1FVL8vW1HG7qbK1ggDhNaydgYmDhztal3pHxh0ZNLDr7mwQIYT7KnnX7dwtQToa6bBnkM/UrLsV1V48sGpTXBfBWG+SHjb5Wz/m3dFEFWMY/6Fm+XXT0s4kzitaSf4aAoNdaddUG0b8Adl7rSSlKOk4NF8SNTXLxfX597q4P6g1tgrCXTDxdoc0gUUmBcAAGFommntQD/ZgF06ICHed0ncJDvqyz9yCO/mW2LaRD73okJA90L6+iWzu8nRdwkoLurwOb7ap3xSXpDnalkaNN4nhm7/AOMVChgz2QLm4CvUcriZNP33cNBAANNTGMbJZsbKIgKnF/g2V4rH/AUtzoXi8cjBfLzkGkWKUSpVTxoCBi7HQ==",
        "f98649ce9354afc72b79303401cdb4963b7aeb5c1f5cdfed07b95087da202681": "ANkf0gbTnlqdJ8QpPpCE36EZbUYOiVPYP9wJhw6U2STlqb2JAeuzhqu+AkvXz4IFqc4hAbY3ZMq/yn5d/2Ot0ttDRDTZtI3guMBEmJ0tuUbQHw=="
      }
    }
  ],
  [
    "wc@2:client:0.3//proposal",
    [
      {
        "id": 1711141385198077,
        "requiredNamespaces": {},
        "optionalNamespaces": {
          "eip155": {
            "methods": [
              "eth_sendTransaction",
              "eth_signTransaction",
              "eth_sign",
              "personal_sign",
              "eth_signTypedData"
            ],
            "chains": [
              "eip155:80001"
            ],
            "events": [
              "chainChanged",
              "accountsChanged"
            ],
            "rpcMap": {
              "80001": "https://rpc.walletconnect.com?chainId=eip155:80001&projectId=<your walletconnect project id>"
            }
          }
        },
        "relays": [
          {
            "protocol": "irn"
          }
        ],
        "proposer": {
          "publicKey": "3e12576ae55d4c05a71612b6868a59d0189805275e7504a853e35caec940db52",
          "metadata": {
            "name": "My Website",
            "description": "My Website Description",
            "url": "https://mywebsite.com",
            "icons": [
              "https://avatars.githubusercontent.com/u/37784886"
            ]
          }
        },
        "expiryTimestamp": 1711141685
      }
    ]
  ],
  [
    "wc@2:client:0.3//session",
    [
      {
        "topic": "afab6c01d17d5cc190713d678b3337a897eb4bb08ffa7740571f3ee29315b14a",
        "relay": {
          "protocol": "irn"
        },
        "expiry": 1711746196,
        "namespaces": {
          "eip155": {
            "chains": [
              "eip155:80001"
            ],
            "methods": [
              "eth_sendTransaction",
              "eth_signTransaction",
              "eth_sign",
              "personal_sign",
              "eth_signTypedData"
            ],
            "events": [
              "accountsChanged",
              "chainChanged"
            ],
            "accounts": [
              "eip155:80001:0x5cFF5Be590c8285cB7cf3431C35CEBA403c17f24"
            ]
          }
        },
        "acknowledged": true,
        "pairingTopic": "94bb4c3cfb7caffe2bddae3a67f7f90dccf3ed9a98bb3559b0ce9e8f84783261",
        "requiredNamespaces": {},
        "optionalNamespaces": {
          "eip155": {
            "methods": [
              "eth_sendTransaction",
              "eth_signTransaction",
              "eth_sign",
              "personal_sign",
              "eth_signTypedData"
            ],
            "chains": [
              "eip155:80001"
            ],
            "events": [
              "chainChanged",
              "accountsChanged"
            ],
            "rpcMap": {
              "80001": "https://rpc.walletconnect.com?chainId=eip155:80001&projectId=<your walletconnect project id>"
            }
          }
        },
        "controller": "cb3a799c849f6fb80c832744137af07f835dd6b08a76bdde0cafa8cb00ec0f06",
        "self": {
          "publicKey": "3e12576ae55d4c05a71612b6868a59d0189805275e7504a853e35caec940db52",
          "metadata": {
            "name": "My Website",
            "description": "My Website Description",
            "url": "https://mywebsite.com",
            "icons": [
              "https://avatars.githubusercontent.com/u/37784886"
            ]
          }
        },
        "peer": {
          "publicKey": "cb3a799c849f6fb80c832744137af07f835dd6b08a76bdde0cafa8cb00ec0f06",
          "metadata": {
            "description": "Forkable web wallet for small/quick transactions.",
            "url": "https://punkwallet.io",
            "icons": [
              "https://punkwallet.io/punk.png"
            ],
            "name": "🧑‍🎤 PunkWallet.io"
          }
        }
      }
    ]
  ]
]);

const storage: UniversalProviderOpts['storage'] = {
  getKeys: async () => {
    console.log("getKeys")
    return Promise.resolve(Array.from(mymap.keys()));
  },
  getEntries: async () => {
    console.log('getEntries')
    return Promise.resolve(Array.from(mymap));
  },
  getItem: (_key: string) => {
    console.log('getItem', {_key})
    return Promise.resolve(mymap.get(_key))
  },
  setItem: (_key: string, _value: any) => {
    console.log('setItem', {_key, _value})
    mymap.set(_key, _value)
    return Promise.resolve()
  },
  removeItem: (_key: string) => {
    console.log('removeItem', {_key})
    mymap.delete(_key)
    return Promise.resolve()
  }
}

export function init() {
  return new Promise<any>(async (resolve, _reject) => {

    //  Initialize the provider
    const provider = await UniversalProvider.init({
      projectId: "dae05286227a336f1b4acd6cfa9d2dc2",
      metadata: {
        name: "My Website",
        description: "My Website Description",
        url: "https://mywebsite.com",
        icons: ["https://avatars.githubusercontent.com/u/37784886"],
      },
      client: undefined, // optional instance of @walletconnect/sign-client,
      storage: storage,
    })

    // provider.on("display_uri", (uri: string) => {
    //   console.log(uri);
    //   QRCode.toString(uri, {
    //     type: "terminal",
    //     small: true,
    //     errorCorrectionLevel: "L",
    //   }).then((qr: any) => {
    //     console.log(qr);
    //   });
    // });

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
              'https://rpc.walletconnect.com?chainId=eip155:80001&projectId=<your walletconnect project id>'
          }
        }
      },
      pairingTopic: '94bb4c3cfb7caffe2bddae3a67f7f90dccf3ed9a98bb3559b0ce9e8f84783261', // optional topic to connect to
      // skipPairing: true // optional to skip pairing ( later it can be resumed by invoking .pair())
    })

    // await provider.pair('')

    resolve(provider)

  })
}

export async function getProvider(): Promise<any> {
  const provider = await init()
  console.log('+++++++++++++++ DATABASE +++++++++++++++')
  console.log(JSON.stringify(Array.from(mymap), null, 2));
  console.log('+++++++++++++++ DATABASE +++++++++++++++')
  return provider.session;
}
