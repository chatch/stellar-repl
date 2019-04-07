#!/usr/bin/env node
const fs = require('fs')
const path = require('path')
const ospath = require('ospath')
const repl = require('repl')

const sdk = require('stellar-sdk')
const HdWallet = require('stellar-hd-wallet')
const Qr = require('stellar-qr')

const Directory = require('./stellarterm-directory.json')

//
// sdk.Server handles for each network
//
const HORIZON_MAIN = 'https://horizon.stellar.org'
const HORIZON_TEST = 'https://horizon-testnet.stellar.org'
const HORIZON_LOCAL = 'http://localhost:8000'

const serverMain = new sdk.Server(HORIZON_MAIN, {allowHttp: false})
const serverTest = new sdk.Server(HORIZON_TEST, {allowHttp: false})
const serverLocal = new sdk.Server(HORIZON_LOCAL, {allowHttp: true})

// private network docker container: zulucrypto/stellar-integration-test-network
sdk.Networks.LOCALZULU = 'Integration Test Network ; zulucrypto'

const useMain = () => sdk.Network.usePublicNetwork()
const useTest = () => sdk.Network.usePublicNetwork()
const useLocalZulu = () =>
  sdk.Network.use(new sdk.Network(sdk.Networks.LOCALZULU))

//
// Wallets / Keychain Instances
//
const persistentWallet = () => {
  const seedFile = path.join(ospath.data(), 'stellar-repl.seed')
  if (!fs.existsSync(seedFile))
    fs.writeFileSync(seedFile, HdWallet.generateMnemonic())
  const seed = fs.readFileSync(seedFile)
  return HdWallet.fromMnemonic(seed.toString())
}
const walletPersist = persistentWallet()
const walletSession = HdWallet.fromMnemonic(HdWallet.generateMnemonic())

//
// Start the REPL!
//
const {context} = repl.start('> ')

//
// Add in all stellar-sdk / stellar-base exports, including:
//    Keypair, StrKey, xdr, sign
//    Server, Networks
//    Transaction, TransactionBuilder
//    ...
//
Object.assign(context, sdk) // all sdk exports available on first level
context.sdk = sdk // make available as 'sdk' also

//
// Add in server handles, various libraries, aliases.
//
Object.assign(context, {
  //
  // Horizon server handles
  //
  serverMain,
  m: serverMain,
  main: serverMain,

  serverTest,
  t: serverTest,
  test: serverTest,

  serverLocal,
  l: serverLocal,
  local: serverLocal,

  useMain,
  useTest,
  useLocalZulu,

  //
  // Stellar Directory (stellarterm-directory)
  //
  Directory,
  anchors: Directory.anchors,
  assets: Directory.assets,
  destinations: Directory.destinations,
  issuers: Directory.issuers,
  pairs: Directory.pairs,

  //
  // SEP-0005 HD Wallet API
  //
  HdWallet,
  generateMnemonic: HdWallet.generateMnemonic,
  fromMnemonic: HdWallet.fromMnemonic,
  fromSeed: HdWallet.fromSeed,

  //
  // SEP-0005 HD Wallet Instances
  //
  walletPersist,
  wp: walletPersist,
  walletSession,
  ws: walletSession,

  //
  // QR Code tools
  //
  Qr,
  qrWallets: Qr.wallets,
  getStellarLink: Qr.getStellarLink,
  getStellarQR: Qr.getStellarQR,

  //
  // Typo Aliases
  //
  KeyPair: sdk.Keypair,
  Strkey: sdk.StrKey,
})
