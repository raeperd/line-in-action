# LINE-in-action

[![build-test](https://github.com/raeperd/line-in-action/actions/workflows/test.yml/badge.svg)](https://github.com/raeperd/line-in-action/actions/workflows/test.yml)

Github action for pushing LINE message using [LINE-Notify](https://notify-bot.line.me/en/)



## Usage

``` yaml
runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: raeperd/line-in-action@v0.1-beta
        with:
          token: ${{ secrets.LINE_NOTIFY_TOKEN }}
          message: Message to send # Default: Action run by env.GITHUB_ACTOR
```

- You can see default environment variables you can use in [GitHub Docs](https://docs.github.com/en/actions/reference/environment-variables#default-environment-variables)



# Reference

[GitHub Docs - Createing a JavaScript action](https://docs.github.com/en/actions/creating-actions/creating-a-javascript-action)