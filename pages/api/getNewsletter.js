// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

const ethers = require("ethers");
const { Web3Service, WalletService } = require("@unlock-protocol/unlock-js");

const networks = {
  4: {
    unlockAddress: "0x259Fa13a7A8CB437744D38D70018C4CeA6E6c5D8",
    provider: "https://rinkeby.infura.io/v3/1381d263cc1e495ba23f032a93ec59b5",
  },
};

const provider = new ethers.providers.JsonRpcProvider(networks["4"].provider);

// Create a wallet.
// This one should have a little bit of rinkeby eth but please send more if you use it!

// Brahma WILL UPDATED THIS WALLET TO USE THE WALLET FROM THE FRONTEND
const wallet = new ethers.Wallet.fromMnemonic(
  "deliver maximum helmet soccer elevator various guide swift motor awful weapon transfer",
  "m/44'/60'/0'/0/1"
);

const signer = wallet.connect(provider);

const recipient = "0xA7ECeb54421E7cBF3D22b7375a5E2B93a8f61359";

// This is the lock for the newsletter
let lockAddress = "0x259Fa13a7A8CB437744D38D70018C4CeA6E6c5D8";

// This function is used to check if a user has hasAccess to a newsletter (a lock)
const doesUserHaveAccessToLock = async (recipient) => {
  const walletService = new WalletService(networks);

  // Connect to a provider with a signer
  await walletService.connect(provider, signer);

  try {
    console.log("recipient", recipient);
    // const recipient = recipients.pop();

    if (!recipient) {
      return false;
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
    // doesUserHaveAccessToLock(recipient);
  }
};

const grantNextKey = async (walletService, recipients, done) => {
  try {
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

  grantNextKey(walletService, recipients, () => {
    process.exit();
  });
}

// doesUserHaveAccessToLock();
// grantUserKey();

module.exports = async (req, res) => {
  console.log("hello");
  const { owner } = req.query;
  if (!owner) {
    return res.status(403).json({ failed: true });
  }

  let hasAccess = await doesUserHaveAccessToLock(owner);
  // console.log("hasAccess", hasAccess);
  // hasAccess.hasAccess = true;

  res.status(200).json(hasAccess);
};
