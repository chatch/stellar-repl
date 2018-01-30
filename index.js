#!/usr/bin/env node
const repl = require('repl')

const sdk = require('stellar-sdk')
const Directory = require('stellarterm-directory')
const HdWallet = require('stellar-hd-wallet')
const Qr = require('stellar-qr')

//
// sdk.Server handles for each network
//
const HORIZON_MAIN = 'https://horizon.stellar.org'
const HORIZON_TEST = 'https://horizon-testnet.stellar.org'
const HORIZON_LOCAL = 'http://localhost:8000'

const serverMain = new sdk.Server(HORIZON_MAIN, {allowHttp: false})
const serverTest = new sdk.Server(HORIZON_TEST, {allowHttp: false})
const serverLocal = new sdk.Server(HORIZON_LOCAL, {allowHttp: true})

//
// Start the REPL!
//
const {context} = repl.start('> ')

//
// Add in all stellar-sdk / stellar-base exports, including:
//    Keypair, StrKey, xdr, sign
//    Server, Networks
//    Transaction, TransactionBuilder
//    ....
//
Object.assign(context, sdk)

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

  //
  // Stellar Directory (stellarterm-directory)
  //
  Directory,
  anchors: Directory.anchors,
  assets: Directory.assets,

  //
  // SEP-0005 HD Wallets
  //
  HdWallet,
  generateMnemonic: HdWallet.generateMnemonic,
  fromMnemonic: HdWallet.fromMnemonic,
  fromSeed: HdWallet.fromSeed,

  //
  // QR Code tools
  //
  Qr,
  wallets: Qr.wallets,
  getStellarLink: Qr.getStellarLink,
  getStellarQR: Qr.getStellarQR,

  //
  // Typo Aliases
  //
  KeyPair: sdk.Keypair,
  Strkey: sdk.StrKey,
})
