# stellar-repl

[![NPM Package](https://img.shields.io/npm/v/stellar-repl.svg?style=flat-square)](https://www.npmjs.org/package/stellar-repl)

Node based REPL for Stellar.

## Features

* APIs
  * [stellar-sdk](https://www.npmjs.com/package/stellar-sdk) / [stellar-base](https://www.npmjs.com/package/stellar-base) (all exports - StrKey, Server, Transaction, etc.)
  * [stellar-hd-wallet](https://www.npmjs.com/package/stellar-hd-wallet) (HdWallet, generateMnemonic, fromMnemonic, fromSeed)
  * [stellar-qr](https://www.npmjs.com/package/stellar-qr) (Qr, getStellarLink, getStellarQR, qrWallets)
* StellarTerm Directory
  * [stellarterm-directory](https://www.npmjs.com/package/stellarterm-directory) (Directory, assets, anchors, destinations, issuers, pairs)
* Horizon server handles (sdk.Server instances)
  * serverMain (Aliases: m, main)
  * serverTest (Aliases: t, test)
  * serverLocal (Aliases: l, local)
* Wallet / Keychains (see [stellar-hd-wallet](https://www.npmjs.com/package/stellar-hd-wallet))
  * walletSession (Aliases: ws) - a wallet generated on REPL start
  * walletPersist (Aliases: wp) - a wallet persistent over REPL sessions (same keys available each time)
* Autocomplete - hit tab twice to see what's available

## Get Started

```
npm i -g stellar-repl
> stlr
stlr> ....
```

## TODO

* Save REPL history (#1)
* Support await on Promises (#2)
