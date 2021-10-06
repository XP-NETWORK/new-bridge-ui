import { chains } from '../config'

export const NewElrondAccounts = {
  // Alice: {
  //   name: 'Alice',
  //   account: 'erd192jvkmmd6neqallnftgjyxpml5t7juktu38nlvq8ar7hqn4amy0sufrwer',
  //   key: `-----BEGIN PRIVATE KEY for erd192jvkmmd6neqallnftgjyxpml5t7juktu38nlvq8ar7hqn4amy0sufrwer-----
  //       ZjE4ODQwOGQ2YzJlYmRiZmQ3NDhjMDlkNTdjYzMxYTU5YzFmMmM0ZWI4ZTE2OTE1
  //       ZDdlZjNjYTYyOTM2NzY3MDJhYTRjYjZmNmRkNGYyMGVmZmYzNGFkMTIyMTgzYmZk
  //       MTdlOTcyY2JlNDRmM2ZiMDA3ZThmZDcwNGViZGQ5MWY=
  //       -----END PRIVATE KEY for erd192jvkmmd6neqallnftgjyxpml5t7juktu38nlvq8ar7hqn4amy0sufrwer-----`,
  // },
  // Bob: {
  //   name: 'Bob',
  //   account: 'erd1fj9q2y5x9laqk3w0c5tu837ht8klnrwzh6hxwum7ac5jeagu8qxscsaw8r',
  //   key: `-----BEGIN PRIVATE KEY for erd1fj9q2y5x9laqk3w0c5tu837ht8klnrwzh6hxwum7ac5jeagu8qxscsaw8r-----
  //       MGI1Y2FkOGRlOGUyZmE3OTJhZThhOTFkNTZlOWRhNWYyY2MzNDllYzIyYjVlMzll
  //       MGE0MjI1N2ExODFlZjE2ODRjOGEwNTEyODYyZmZhMGI0NWNmYzUxN2MzYzdkNzU5
  //       ZWRmOThkYzJiZWFlNjc3MzdlZWUyOTJjZjUxYzM4MGQ=
  //       -----END PRIVATE KEY for erd1fj9q2y5x9laqk3w0c5tu837ht8klnrwzh6hxwum7ac5jeagu8qxscsaw8r-----`,
  // },
  // Carol: {
  //   name: 'Carol',
  //   account: 'erd1j7jm5tugxv3tmd7s30zks2sf37te07yyralkv22xvw2a6fp453hsyvyd0q',
  //   key: `-----BEGIN PRIVATE KEY for erd1j7jm5tugxv3tmd7s30zks2sf37te07yyralkv22xvw2a6fp453hsyvyd0q-----
  //       MTdiYmNmMDRlYmQ0ZGE3ZGI4MTBjOTY3ZDk1ZjUwNmEwZGMxOWQ1YmI0ZDU0MTVi
  //       N2E4ODg2YTI1ZTFlZGI2ODk3YTViYTJmODgzMzIyYmRiN2QwOGJjNTY4MmEwOThm
  //       OTc5N2Y4ODQxZjdmNjYyOTQ2NjM5NWRkMjQzNWE0NmY=
  //       -----END PRIVATE KEY for erd1j7jm5tugxv3tmd7s30zks2sf37te07yyralkv22xvw2a6fp453hsyvyd0q-----`,
  // },
  // Daniel: {
  //   name: 'Daniel',
  //   account: 'erd1cf07h6ne48s505cua626vwhsyskamkv8fslfpccz0jre4mvm53ls5dwyk4',
  //   key: `-----BEGIN PRIVATE KEY for erd1cf07h6ne48s505cua626vwhsyskamkv8fslfpccz0jre4mvm53ls5dwyk4-----
  //       ZmRjNGNhOWM2MzMxZjI3MDUzNDJlOTU1Zjk1ZGNkNjgxZDcxNDIwNjhiZTFhZjVi
  //       MTI0MTExMGFmMGVkYTY4OWMyNWZlYmVhNzlhOWUxNDdkMzFjZWU5NWE2M2FmMDI0
  //       MmRkZGQ5ODc0YzNlOTBlMzAyN2M4NzlhZWQ5YmE0N2Y=
  //       -----END PRIVATE KEY for erd1cf07h6ne48s505cua626vwhsyskamkv8fslfpccz0jre4mvm53ls5dwyk4-----`,
  // },
  Eve: {
    name: 'Eve',
    account: 'erd1ld936834u3knmt8jx3xk2zjek7hk0ld0yfhg0ar3agxwck99c9kqd8lhlg',
    key: `-----BEGIN PRIVATE KEY for erd1ld936834u3knmt8jx3xk2zjek7hk0ld0yfhg0ar3agxwck99c9kqd8lhlg-----
        NDgzOWU0Yjk5MzY3MzQ2NjJkYTFiZWY5N2U5MjdjZTAzMTJhOGE4ODU4ZGI3NWFh
        ZDk2YjYzZmViZDYwNjc3M2ZiNGIxZDFlMzVlNDZkM2RhY2YyMzQ0ZDY1MGE1OWI3
        YWY2N2ZkYWYyMjZlODdmNDcxZWEwY2VjNThhNWMxNmM=
        -----END PRIVATE KEY for erd1ld936834u3knmt8jx3xk2zjek7hk0ld0yfhg0ar3agxwck99c9kqd8lhlg-----`,
  },
}

const NewParachainAccounts = {
  Alice_Stash: {
    name: 'Alice_Stash',
    account: '5GNJqTPyNqANBkUVMN1LPPrxXnFouWXoe2wNSmmEoLctxiZY',
    key: '//Alice//stash', // TODO: Cache it
  },
  Bob: {
    name: 'Bob',
    account: '5FHneW46xGXgs5mUiveU4sbTyGBzmstUspZC92UhjJM694ty',
    key: '//Bob',
  },
  Bob_Stash: {
    name: 'Bob_Stash',
    account: '5HpG9w8EBLe5XCrbczpwq5TSXvedjrBGCwqxK1iQ7qUsSWFc',
    key: '//Bob//stash',
  },
}

export const Web3Accounts = {
  ACC1: {
    name: 'ACC1',
    account: '0x50aCEC08ce70aa4f2a8ab2F45d8dCd1903ea4E14',
    key: '0xbaedb25b3352638942e80aa3dbc2d54f2bab423849cce21a73c164f0c21103c8',
  },
  ACC2: {
    name: 'ACC2',
    account: '0xae87208a5204B6606d3AB177Be5fdf62267Cd499',
    key: '0xd32cb8a5e3541a3d4c33d7e0669371a4b5b5738400e85239760e51b67fb9207b',
  },
  ACC3: {
    name: 'ACC3',
    account: '0x5002258315873AdCbdEF25a8E71C715A4f701dF5',
    key: '0x03b1091c3158ec4a38185fb65a8f2159650396aa6efd3dec5b0fddd44375a0b1',
  },
}

export const Web3AccountsCut = {
  ACC1: {
    name: 'ACC1',
    account: '0x50aCEC08ce70aa4f2a8ab2F45d8dCd1903ea4E14',
    key: '0xbaedb25b3352638942e80aa3dbc2d54f2bab423849cce21a73c164f0c21103c8',
  },
  ACC3: {
    name: 'ACC3',
    account: '0x5002258315873AdCbdEF25a8E71C715A4f701dF5',
    key: '0x03b1091c3158ec4a38185fb65a8f2159650396aa6efd3dec5b0fddd44375a0b1',
  },
}

export const TronAccs = {
  // ACC1: {
  //   name: 'ACC1',
  //   account: 'TJuG3kvmGBDxGyUPBbvKePUjbopLurtqSo',
  //   key: '991EE549C12DA5EC5AF246FB0733A334CB918D3A28D91DC4FEA19BAB7D3FFA8A',
  // },
  ACC2: {
    name: 'ACC2',
    account: 'TN9bHXEWditocT4Au15mgm7JM56XBnRCvm',
    key: 'f34cd09de7cd40e0cbaa8c36a85e8964b66e0db1ccc795b8c38773b834fca2b4',
  },
  ACC3: {
    name: 'ACC3',
    account: 'TRHLhivxVogGhtxKn6sC8UF2Fr3WBdaT8N',
    key: '98f6e6bf29e10e69871ed9e9271b8af704bbbd7ff86f2b2952ebdac1a5dc1cb8'
  }
}

export const PredefinedAccounts = Object.fromEntries([
  [chains[0], Web3Accounts],
  [chains[1], NewElrondAccounts],
  [chains[2], Web3Accounts],
  [chains[3], Web3Accounts],
  [chains[4], Web3AccountsCut],
  [chains[5], Web3Accounts],
  [chains[6], Web3AccountsCut],
  [chains[7], TronAccs],
])
