# Changelog
All notable changes to this project will be documented in this file.

## Unreleased
### Chores
- [[`dfbe9b3`](https://github.com/wgumenyuk/test/commit/dfbe9b362432794db2f6f1ec6118389fd39c546b)] - add `cliff.toml`
- [[`2902036`](https://github.com/wgumenyuk/test/commit/2902036d98080435a034a82a6df69b6ebdd1e10a)] - install `git-cliff`
- [[`b696d2c`](https://github.com/wgumenyuk/test/commit/b696d2c1cc90889949e763b2a210f4be42ebf4de)] - remove `strict` from `.swcrc`
- [[`028a7de`](https://github.com/wgumenyuk/test/commit/028a7de6cd2d03ba6faa6c1c42ec24aff6dcbb45)] - update all dependencies
- [[`3fd718f`](https://github.com/wgumenyuk/test/commit/3fd718f30bcd29b7b41ff48ad2cdda7afda81b6a)] - remove `outDir` from `tsconfig.json`
- [[`2bdbf25`](https://github.com/wgumenyuk/test/commit/2bdbf25f24662a3a6a83f67e7b4e8c1b017f2c62)] - fix build script
- [[`264e65a`](https://github.com/wgumenyuk/test/commit/264e65af15186469695df4aae32a6cb5b5c158a5)] - update `build` script
- [[`014649d`](https://github.com/wgumenyuk/test/commit/014649dea1dd990f251d4d181f04f4ebb2fcc5fa)] - add `.env.example`
- [[`3628120`](https://github.com/wgumenyuk/test/commit/362812040b88f6b50e4f8be0f2deb788697e5f28)] - update `.gitignore`
- [[`808323d`](https://github.com/wgumenyuk/test/commit/808323dd874ae20d8465bfd9a15acb0474a718a1)] - install `dotenv`
- [[`854161f`](https://github.com/wgumenyuk/test/commit/854161fd606af40fc81748702994b8e89ac6f18d)] - install `pino-pretty`
- [[`bad62a0`](https://github.com/wgumenyuk/test/commit/bad62a037c3f323cfb658b9376c25a9e0062a98f)] - uninstall `module-alias`
- [[`094b88e`](https://github.com/wgumenyuk/test/commit/094b88eb1fa225df705762ab6ef9fb0dc0d2866b)] - install `pino`
- [[`0eda53e`](https://github.com/wgumenyuk/test/commit/0eda53e714312f03481035a48068d39fa8176f7c)] - uninstall `@uelgum/logger`
- [[`ebd8aa8`](https://github.com/wgumenyuk/test/commit/ebd8aa8ea65de53cfcd65a451cb3b84549bd6714)] - add `.swcrc`
- [[`696e4d4`](https://github.com/wgumenyuk/test/commit/696e4d45929720e1201b60d5057a8487afbc4d73)] - switch to `swc` and `tsc-alias`
- [[`3b0699f`](https://github.com/wgumenyuk/test/commit/3b0699fb432215ca98403dc0dbc38a8146ab4060)] - switch to pnpm

### Features
- [[`276ac40`](https://github.com/wgumenyuk/test/commit/276ac4081264b63b6c3d86d977c6070ffcb427a6)] - add `commandName` check
- [[`a25d199`](https://github.com/wgumenyuk/test/commit/a25d19971438ca8aad91c9f841dda49905019884)] - improve error log
- [[`e401bc1`](https://github.com/wgumenyuk/test/commit/e401bc130a803a6f5d3cd93dde897e59591cafa2)] - use new logger and config

### Fixes
- [[`5196699`](https://github.com/wgumenyuk/test/commit/51966990ed323f54baf3e15541d30d801dd8e822)] - use new config
- [[`7d623ed`](https://github.com/wgumenyuk/test/commit/7d623ed63c7c0fb3c3d54beff21df8a1ef01b557)] - use new logger and config
- [[`d90816d`](https://github.com/wgumenyuk/test/commit/d90816d138b3dee714f2a3dda2dcc82ff318e0d6)] - add `!` to constants

### Refactor
- [[`36dcf08`](https://github.com/wgumenyuk/test/commit/36dcf0839d10aac1d218213ab758a1ceb5371907)] - use `Promise.all()` in `start()` method
- [[`df3a56a`](https://github.com/wgumenyuk/test/commit/df3a56ab1cefc00530b2de55e560ea3398d43349)] - use `path.join()`
- [[`9fbb4dc`](https://github.com/wgumenyuk/test/commit/9fbb4dca61c1de283e5bc35a25b6c21ca24f58c6)] - switch to `pino`
- [[`30c6686`](https://github.com/wgumenyuk/test/commit/30c668628620d9bc4aaae3cb53d4d86fe8b8aafe)] - use `dotenv` config

### Styling
- [[`b26803f`](https://github.com/wgumenyuk/test/commit/b26803f975eea5cb272923329264dbee7c99d070)] - remove redundant space
- [[`54d313b`](https://github.com/wgumenyuk/test/commit/54d313bfb2da79612fbc60c0793eaaa1d6c92e22)] - indent `voiceStateUpdate` handler parameters
- [[`de1d30f`](https://github.com/wgumenyuk/test/commit/de1d30f09fa2ee086fca34746368ec54a2a5ec30)] - indent comment block

## v1.2.0 (July 18, 2023)
### Chores
- [[`d25ea20`](https://github.com/wgumenyuk/test/commit/d25ea2020430a74b3645d457cb3bb711cdbf2ab5)] - update package version
- [[`ba78f1e`](https://github.com/wgumenyuk/test/commit/ba78f1e28871617a98452359337b278a64bd7b72)] - update changelog
- [[`3be48d3`](https://github.com/wgumenyuk/test/commit/3be48d36b2c03d2329dfd31013b424f94399e4e5)] - switch to `esnext`
- [[`5c49075`](https://github.com/wgumenyuk/test/commit/5c49075bcb7a49f5f04ba75e94bb5474a41b809a)] - add `esmify` to `build` script
- [[`8107638`](https://github.com/wgumenyuk/test/commit/81076388880df4765a2d8f9c17a4907fb754f486)] - set `type` to `module`
- [[`7882f6e`](https://github.com/wgumenyuk/test/commit/7882f6e5ff6c4eebd57ed942f9153ca0c71dab33)] - install `@uelgum/esmify`
- [[`5ba4a6b`](https://github.com/wgumenyuk/test/commit/5ba4a6b17bd38b0ad12666af605f9f21e07397e4)] - set `private` to `true`
- [[`9bb298b`](https://github.com/wgumenyuk/test/commit/9bb298b584d0351da539698457a329f75af6fa34)] - update package version
- [[`61ab788`](https://github.com/wgumenyuk/test/commit/61ab7887a34f5eaebe79139c51ff36b1b76487a3)] - update changelog
- [[`0fd68b6`](https://github.com/wgumenyuk/test/commit/0fd68b6f42b44444d0d351c6d4726e1ae94c435a)] - fix sub-headings
- [[`77c9469`](https://github.com/wgumenyuk/test/commit/77c9469ad23edf26d808ef85f7f8b5ba930eb898)] - add `config.example.json`
- [[`e4282fe`](https://github.com/wgumenyuk/test/commit/e4282fe861acaedd54f1ddea7c90c4cc560a35df)] - add changelog
- [[`8975d15`](https://github.com/wgumenyuk/test/commit/8975d15c033aa0ec3951bef0e3701ca19c7e23a5)] - add commit hook
- [[`295f410`](https://github.com/wgumenyuk/test/commit/295f41035570c207f3dc3d285261a2283f46f550)] - add `$internal` path
- [[`81f70bb`](https://github.com/wgumenyuk/test/commit/81f70bbcf13b0635af3b9c34f2edab5788f1a443)] - add `package.json`
- [[`07265d3`](https://github.com/wgumenyuk/test/commit/07265d3307788a024a7f2ebf387b254112057eda)] - remove `declaration`
- [[`32a1efe`](https://github.com/wgumenyuk/test/commit/32a1efe2aed25a8daf9bd2e55068f737cb6f8147)] - add commitlint config
- [[`809a555`](https://github.com/wgumenyuk/test/commit/809a55503ba42ad8196d3924c3d1750b6667b064)] - add `tsconfig.json`
- [[`2b24de0`](https://github.com/wgumenyuk/test/commit/2b24de04be6001c3e7f102dbcd8c9e3de755f3c6)] - add `.gitignore`
- [[`f3d1ad3`](https://github.com/wgumenyuk/test/commit/f3d1ad3cee933282baff4370ffcfe3ec0f277a7a)] - add `.editorconfig`

### Features
- [[`1f12b05`](https://github.com/wgumenyuk/test/commit/1f12b051d940d2d720bddbc2f9625a0866d953d3)] - add alias `s` to `skip` command
- [[`3b828b7`](https://github.com/wgumenyuk/test/commit/3b828b73b2deaae6829998164f6018ead1466699)] - add better error handling
- [[`3b07b40`](https://github.com/wgumenyuk/test/commit/3b07b40b171d14451482e5441b40a43a6c1e9993)] - improved embed
- [[`61b5e2e`](https://github.com/wgumenyuk/test/commit/61b5e2e865a4df3ea2f44fdfd499d3c6f7d2b7d5)] - add `shuffle` command
- [[`caa3e30`](https://github.com/wgumenyuk/test/commit/caa3e305af7c4ca3b23d586c890c3155ac45d99d)] - add `queue` command
- [[`5c6a231`](https://github.com/wgumenyuk/test/commit/5c6a23170e3513945d67dcdcb779a925013afce3)] - add `nowplaying` command
- [[`cd680e2`](https://github.com/wgumenyuk/test/commit/cd680e29df73923f019b85d8f7c695bca56f9778)] - add `skip` command
- [[`d62c57a`](https://github.com/wgumenyuk/test/commit/d62c57a23c2291855a93d188f6774a93f8098de3)] - add `unpause` command
- [[`2303819`](https://github.com/wgumenyuk/test/commit/2303819754ddda56100bf27c9b6b1145517626fa)] - add `pause` command
- [[`e517faf`](https://github.com/wgumenyuk/test/commit/e517faf506608177238fd28ffd8b6212568d0943)] - add `leave` command
- [[`3147df5`](https://github.com/wgumenyuk/test/commit/3147df51a21b0a54792ce064025b18996fbf977e)] - add `play` command
- [[`af53eda`](https://github.com/wgumenyuk/test/commit/af53edada31dfde21ecf05c079e7356980056a7f)] - add `help` command
- [[`9f2bd66`](https://github.com/wgumenyuk/test/commit/9f2bd66a1f15f3b446225bf485de8c7b7e1456a5)] - add `voicecStateUpdate` event
- [[`cfc4787`](https://github.com/wgumenyuk/test/commit/cfc478741bee043a226d27ef696af69c5c35c967)] - add `version` command
- [[`04eab0e`](https://github.com/wgumenyuk/test/commit/04eab0ef2c2ecd8c95259bc5fbd092981dec3d54)] - add `voiceChannelNotFound` event
- [[`582fea8`](https://github.com/wgumenyuk/test/commit/582fea8be15413bd1b0e307130c2f4b598576ff9)] - add `voiceChannelMismatch` event
- [[`5618eef`](https://github.com/wgumenyuk/test/commit/5618eefc289ef0f9030b648c9a14d828d750ff1d)] - add `queueNotFound` event
- [[`90eedd8`](https://github.com/wgumenyuk/test/commit/90eedd8c5a691f43c54bc135a733b601ba67aa39)] - add `commandNotFound` event
- [[`1056fd2`](https://github.com/wgumenyuk/test/commit/1056fd29fb6b478363bf631190907e37d42a5f05)] - add `commandError` event
- [[`c6a19a9`](https://github.com/wgumenyuk/test/commit/c6a19a96d759e9ef88cf524facaf3ac8f1c244fa)] - add `usageError` event
- [[`ded0dbd`](https://github.com/wgumenyuk/test/commit/ded0dbd57a4f91e965c893ec3c1a1da2535c044b)] - add custom `discord.js` types
- [[`521565c`](https://github.com/wgumenyuk/test/commit/521565c924b635373be03bc4ff1cbc69451b706d)] - hide logo when stdout columns are below 85
- [[`a9c46f5`](https://github.com/wgumenyuk/test/commit/a9c46f5f3a951f1c00d6efa3dedd33ec978d4ad8)] - add index
- [[`ac6e2c9`](https://github.com/wgumenyuk/test/commit/ac6e2c95180a989255d83e1ad2373e1863cdc416)] - add message event
- [[`5cda4b2`](https://github.com/wgumenyuk/test/commit/5cda4b287487551b42d2b9beb8935fb388448bfe)] - add ready event
- [[`ac0f27d`](https://github.com/wgumenyuk/test/commit/ac0f27d00074e8d0758534153b8c79025650d18f)] - add logo display
- [[`3eff4aa`](https://github.com/wgumenyuk/test/commit/3eff4aac2ca076bc3979c4285e09885a53dcede6)] - add vinyl loader
- [[`d5b463f`](https://github.com/wgumenyuk/test/commit/d5b463fc9e221b64a55deaca2ec34af15ff03e6b)] - add version loader
- [[`15219f6`](https://github.com/wgumenyuk/test/commit/15219f6036d35188324c36490fa94dea5a61007c)] - add logger loader
- [[`9e98e45`](https://github.com/wgumenyuk/test/commit/9e98e45b6f9e64d1d09cfedaa9ff9f82a3fadc7f)] - add config loader
- [[`d19bccc`](https://github.com/wgumenyuk/test/commit/d19bccc6bbde199dd7db0d884ed3302de16242d2)] - add event loader
- [[`357fb50`](https://github.com/wgumenyuk/test/commit/357fb504272e78c1df967d21073c69c343060ea5)] - add command loader
- [[`f67dfd1`](https://github.com/wgumenyuk/test/commit/f67dfd126a5c7bc3800c9e26693006a16e7fc411)] - add `Command` class
- [[`6a1f277`](https://github.com/wgumenyuk/test/commit/6a1f2776daf6b72fcc5b279db807a7cfd0ee27cb)] - add `Bot` class
- [[`5e25ba8`](https://github.com/wgumenyuk/test/commit/5e25ba8b3693131f831d466aa733ae2989796235)] - add Vinyl to `Bot`
- [[`86b29a5`](https://github.com/wgumenyuk/test/commit/86b29a543a4cf83ecfbdd81280622f7fc8104a86)] - add loader for `vinyl`

### Fixes
- [[`5c54f55`](https://github.com/wgumenyuk/test/commit/5c54f55879b9d73239ae1e0c16029a53559d8fed)] - faulty `voiceStateUpdate` handler
- [[`cd5f0c2`](https://github.com/wgumenyuk/test/commit/cd5f0c21bb1dc7cde6fc91c11b79a5fe57ab6dea)] - show queue duration as timestamp

### Refactor
- [[`998a4e4`](https://github.com/wgumenyuk/test/commit/998a4e42d6403d3edcf82e8a1479c27cbe854622)] - switch to esm
- [[`351d2f4`](https://github.com/wgumenyuk/test/commit/351d2f481e9177f05410763ec17e974f6c40ee51)] - clean up logger loader
- [[`d0f1b99`](https://github.com/wgumenyuk/test/commit/d0f1b99aa71efdbfe0650d39b5835e7049d49bf8)] - improved error message
- [[`8e17d9f`](https://github.com/wgumenyuk/test/commit/8e17d9f24201cd9e97a21fd6076a600e09904e56)] - adjust to new logger version

<!-- generated by git-cliff -->