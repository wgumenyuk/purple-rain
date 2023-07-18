# Changelog

<!--
    ## v<Version> (<Datum>)
    ### Hinzugefügt
    ### Verändert
    ### Behoben
    ### Entfernt
-->

## v1.2.0 (2023-07-18)
### Verändert
- [[`998a4e4`](https://github.com/uelgum/purple-rain/commit/998a4e4)] - refactor: switch to esm
- [[`3be48d3`](https://github.com/uelgum/purple-rain/commit/3be48d3)] - chore: switch to `esnext`
- [[`351d2f4`](https://github.com/uelgum/purple-rain/commit/351d2f4)] - refactor: clean up logger loader
- [[`3b07b40`](https://github.com/uelgum/purple-rain/commit/3b07b40)] - feat: improved embed
- [[`d0f1b99`](https://github.com/uelgum/purple-rain/commit/d0f1b99)] - refactor: improved error message

## Hinzugefügt
- [[`5c49075`](https://github.com/uelgum/purple-rain/commit/5c49075)] - chore: add `esmify` to `build` script
- [[`8107638`](https://github.com/uelgum/purple-rain/commit/8107638)] - chore: set `type` to `module`
- [[`7882f6e`](https://github.com/uelgum/purple-rain/commit/7882f6e)] - chore: install `@uelgum/esmify`
- [[`5ba4a6b`](https://github.com/uelgum/purple-rain/commit/5ba4a6b)] - chore: set `private` to `true`
- [[`1f12b05`](https://github.com/uelgum/purple-rain/commit/1f12b05)] - feat: add alias `s` to `skip` command
- [[`3b828b7`](https://github.com/uelgum/purple-rain/commit/3b828b7)] - feat: add better error handling

## v1.1.0 (2023-06-08)
### Hinzugefügt
- [[`61b5e2e`](https://github.com/uelgum/purple-rain/commit/61b5e2e)] - feat: add `shuffle` command
- [[`77c9469`](https://github.com/uelgum/purple-rain/commit/77c9469)] - chore: add `config.example.json`

### Behoben
- [[`5c54f55`](https://github.com/uelgum/purple-rain/commit/5c54f55)] - fix: faulty `voiceStateUpdate` handler
- [[`cd5f0c2`](https://github.com/uelgum/purple-rain/commit/cd5f0c2)] - fix: show queue duration as timestamp

## v1.0.0 (2023-06-06)
### Hinzugefügt
- [[`caa3e30`](https://github.com/uelgum/purple-rain/commit/caa3e30)] - feat: add `queue` command
- [[`5c6a231`](https://github.com/uelgum/purple-rain/commit/5c6a231)] - feat: add `nowplaying` command
- [[`cd680e2`](https://github.com/uelgum/purple-rain/commit/cd680e2)] - feat: add `skip` command
- [[`d62c57a`](https://github.com/uelgum/purple-rain/commit/d62c57a)] - feat: add `unpause` command
- [[`2303819`](https://github.com/uelgum/purple-rain/commit/2303819)] - feat: add `pause` command
- [[`e517faf`](https://github.com/uelgum/purple-rain/commit/e517faf)] - feat: add `leave` command
- [[`3147df5`](https://github.com/uelgum/purple-rain/commit/3147df5)] - feat: add `play` command
- [[`af53eda`](https://github.com/uelgum/purple-rain/commit/af53eda)] - feat: add `help` command
- [[`9f2bd66`](https://github.com/uelgum/purple-rain/commit/9f2bd66)] - feat: add `voiceStateUpdate` event
- [[`cfc4787`](https://github.com/uelgum/purple-rain/commit/cfc4787)] - feat: add `version` command
- [[`04eab0e`](https://github.com/uelgum/purple-rain/commit/04eab0e)] - feat: add `voiceChannelNotFound` event
- [[`582fea8`](https://github.com/uelgum/purple-rain/commit/582fea8)] - feat: add `voiceChannelMismatch` event
- [[`5618eef`](https://github.com/uelgum/purple-rain/commit/5618eef)] - feat: add `queueNotFound` event
- [[`90eedd8`](https://github.com/uelgum/purple-rain/commit/90eedd8)] - feat: add `commandNotFound` event
- [[`1056fd2`](https://github.com/uelgum/purple-rain/commit/1056fd2)] - feat: add `commandError` event
- [[`c6a19a9`](https://github.com/uelgum/purple-rain/commit/c6a19a9)] - feat: add `usageError` event
- [[`ded0dbd`](https://github.com/uelgum/purple-rain/commit/ded0dbd)] - feat: add custom `discord.js` types
- [[`521565c`](https://github.com/uelgum/purple-rain/commit/521565c)] - feat: hide logo when stdout columns are below 85
- [[`a9c46f5`](https://github.com/uelgum/purple-rain/commit/a9c46f5)] - feat: add index
- [[`ac6e2c9`](https://github.com/uelgum/purple-rain/commit/ac6e2c9)] - feat: add `message` event
- [[`5cda4b2`](https://github.com/uelgum/purple-rain/commit/5cda4b2)] - feat: add `ready` event
- [[`ac0f27d`](https://github.com/uelgum/purple-rain/commit/ac0f27d)] - feat: add logo display
- [[`3eff4aa`](https://github.com/uelgum/purple-rain/commit/3eff4aa)] - feat: add Vinyl loader
- [[`d5b463f`](https://github.com/uelgum/purple-rain/commit/d5b463f)] - feat: add version loader
- [[`15219f6`](https://github.com/uelgum/purple-rain/commit/15219f6)] - feat: add logger loader
- [[`9e98e45`](https://github.com/uelgum/purple-rain/commit/9e98e45)] - feat: add config loader
- [[`f67dfd1`](https://github.com/uelgum/purple-rain/commit/f67dfd1)] - feat: add `Command` class
- [[`6a1f277`](https://github.com/uelgum/purple-rain/commit/6a1f277)] - feat: add `Bot` class

### Verändert
- [[`8e17d9f`](https://github.com/uelgum/purple-rain/commit/8e17d9f)] - refactor: adjust to new logger version