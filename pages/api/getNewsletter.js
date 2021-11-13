// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

const ethers = require("ethers");
const { Web3Service, WalletService } = require("@unlock-protocol/unlock-js");
// const { rinkeby, xdai } = require("@unlock-protocol/networks");

const interfaceABI = [
  {
    constant: true,
    inputs: [],
    name: "expirationDuration",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "address[]",
        name: "_recipients",
        type: "address[]",
      },
      {
        internalType: "uint256[]",
        name: "_expirationTimestamps",
        type: "uint256[]",
      },
      {
        internalType: "address[]",
        name: "_keyManagers",
        type: "address[]",
      },
    ],
    name: "grantKeys",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
];

const networks = {
  4: {
    unlockAddress: "0x259Fa13a7A8CB437744D38D70018C4CeA6E6c5D8",
    provider: "https://rinkeby.infura.io/v3/1381d263cc1e495ba23f032a93ec59b5",
  },
  // 100: {
  //   unlockAddress: xdai.unlockAddress,
  //   provider: xdai.provider,
  // },
};

const provider = new ethers.providers.JsonRpcProvider(networks["4"].provider);

// Create a wallet.
// This one should have a little bit of rinkeby eth but please send more if you use it!
const wallet = new ethers.Wallet.fromMnemonic(
  "deliver maximum helmet soccer elevator various guide swift motor awful weapon transfer",
  "m/44'/60'/0'/0/1"
);

const signer = wallet.connect(provider);

const recipients = ["0xA7ECeb54421E7cBF3D22b7375a5E2B93a8f61359"];
const membersOnly = async (walletService, recipients, done) => {
  try {
    const lockAddress = "0x259Fa13a7A8CB437744D38D70018C4CeA6E6c5D8";
    const recipient = recipients.pop();
    if (!recipient) {
      return done();
    }

    const web3Service = new Web3Service(networks);
    // Check if they have a valid key!
    const expiration = await web3Service.getKeyExpirationByLockForOwner(
      lockAddress,
      recipient,
      4
    );

    const now = Math.floor(new Date().getTime() / 1000);

    if (expiration > now) {
      console.log(`${recipient} has a key!`);
      return { hasAccess: true };
    }
    console.log(`${recipient} does not have a key!`);
    return { hasAccess: false };
  } catch (error) {
    console.error(error);
    membersOnly(walletService, recipients, done);
  }
};

// Initializing the cors middleware
// const { membersOnly } = configureUnlock(
//   {
//     yieldPaywallConfig: () => {
//       return {
//         locks: {
//           '0x259Fa13a7A8CB437744D38D70018C4CeA6E6c5D8': {
//             network: 4,
//           },
//         },
//       }
//     },
//     getUserEthereumAddress: async (request) => {
//       return request.cookies.userAddress
//     },
//     updateUserEthereumAddress: async (
//       request,
//       response,
//       address,
//     ) => {
//       response.cookie('userAddress', address)
//     },
//   },
//   app
// )
// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
function runMiddleware(req, res, fn) {
  console.log("fn", fn);
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
}

async function checkIfUserHasKey(req, res) {
  const walletService = new WalletService(networks);

  // Connect to a provider with a signer
  await walletService.connect(provider, signer);

  let hasAccess = await membersOnly(walletService, recipients, () => {
    console.log("finished Middleware Excecution");
  });

  console.log("hasAccess", hasAccess);
  // Run the middleware
  // await runMiddleware(
  //   req,
  //   res,
  //   await membersOnly(walletService, recipients, () => {
  //     console.log("finished Middleware Excecution");
  //   })
  // );

  // Rest of the API logic
  // res.json({ message: "Hello Everyone!" });
}

const grantNextKey = async (walletService, recipients, done) => {
  try {
    const lockAddress = "0x259Fa13a7A8CB437744D38D70018C4CeA6E6c5D8";
    const recipient = recipients.pop();
    if (!recipient) {
      return done();
    }

    const web3Service = new Web3Service(networks);

    // Check if they have a valid key!
    const expiration = await web3Service.getKeyExpirationByLockForOwner(
      lockAddress,
      recipient,
      4
    );
    const now = Math.floor(new Date().getTime() / 1000);

    if (expiration > now) {
      console.log(`${recipient} has a key!`);
      return grantNextKey(walletService, recipients, done);
    }
    console.log(`${recipient} does not have a key!`);

    await walletService.grantKey(
      {
        lockAddress,
        recipient,
      },
      (error, hash) => {
        // This is the hash of the transaction!
        console.log({ recipient, hash });
      }
    );
    process.exit();
    // grantNextKey(walletService, recipients, done)
  } catch (error) {
    console.error(error);
    // grantNextKey(walletService, recipients, done)
  }
};

async function grantUserKey(req, res) {
  const walletService = new WalletService(networks);

  // Connect to a provider with a signer
  await walletService.connect(provider, signer);

  const lockAddress = "0x259Fa13a7A8CB437744D38D70018C4CeA6E6c5D8";
  await walletService.purchaseKey(
    {
      lockAddress,
    },
    (error, hash) => {
      // This is the hash of the transaction!
      console.log({ hash });
    }
  );

  // const lock = new ethers.Contract(
  //   "0x259Fa13a7A8CB437744D38D70018C4CeA6E6c5D8",
  //   interfaceABI,
  //   signer
  // );

  // walletService.purchaseKey({
  //   lockAddress: "",
  //   owner: "",
  //   keyPrice: "",
  //   erc20Address: "",
  //   referrer: "",
  // });

  // const duration = await lock.expirationDuration();

  // const expiration = Math.floor(
  //   new Date().getTime() / 1000 + duration.toNumber()
  // );
  // const expirations = recipients.map((_) => expiration);
  // const managers = recipients.map(
  //   (_) => "0x96772a11d49516630fbb9d2a92647ca7ebefa1ce"
  // );

  // console.log("hello: ", recipients, expirations, recipients);

  // const tx = await lock.grantKeys(recipients, expirations, recipients);

  // console.log("tx", tx);

  // console.log("lock", lock);

  grantNextKey(walletService, recipients, () => {
    process.exit();
  });
}

// checkIfUserHasKey();
// grantUserKey();

// export default handler;

module.exports = async (req, res) => {
  console.log("hello");
  const { owner } = req.query;
  if (!owner) {
    return res.status(403).json({ failed: true });
  }

  let hasAccess = checkIfUserHasKey();
  console.log("hasAccess", hasAccess);
  // const fetchAgent = new MediaFetchAgent(process.env.NEXT_PUBLIC_NETWORK_ID);

  // const tokens = await FetchStaticData.fetchUserOwnedNFTs(
  //   fetchAgent,
  //   {
  //     collectionAddress: process.env.NEXT_PUBLIC_TARGET_CONTRACT_ADDRESS || "",
  //     userAddress: owner,
  //     limit: 200,
  //     offset: 0,
  //   },
  //   true
  // );
  res.status(200).json(hasAccess);
};
