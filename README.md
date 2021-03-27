# LINE-in-action

[![build-and-test](https://github.com/raeperd/line-in-action/actions/workflows/test.yml/badge.svg)](https://github.com/raeperd/line-in-action/actions/workflows/test.yml)
[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=raeperd_line-in-action&metric=sqale_rating)](https://sonarcloud.io/dashboard?id=raeperd_line-in-action)
[![Reliability Rating](https://sonarcloud.io/api/project_badges/measure?project=raeperd_line-in-action&metric=reliability_rating)](https://sonarcloud.io/dashboard?id=raeperd_line-in-action)
[![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=raeperd_line-in-action&metric=security_rating)](https://sonarcloud.io/dashboard?id=raeperd_line-in-action)
[![Vulnerabilities](https://sonarcloud.io/api/project_badges/measure?project=raeperd_line-in-action&metric=vulnerabilities)](https://sonarcloud.io/dashboard?id=raeperd_line-in-action)  
[![Lines of Code](https://sonarcloud.io/api/project_badges/measure?project=raeperd_line-in-action&metric=ncloc)](https://sonarcloud.io/dashboard?id=raeperd_line-in-action)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=raeperd_line-in-action&metric=coverage)](https://sonarcloud.io/dashboard?id=raeperd_line-in-action)

Github action for pushing LINE message using [LINE-Notify](https://notify-bot.line.me/en/)

## Usage

```yaml
runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: raeperd/line-in-action@v0.2
        with:
          token: ${{ secrets.LINE_NOTIFY_TOKEN }}
          message: Message to send # Default: Action run by $GITHUB_ACTOR
```

- You can see default environment variables avaliable in [GitHub Docs](https://docs.github.com/en/actions/reference/environment-variables#default-environment-variables)

# Referenced

[GitHub Docs - Createing a JavaScript action](https://docs.github.com/en/actions/creating-actions/creating-a-javascript-action)  
[LINE Notify API Document](https://notify-bot.line.me/doc/en/)
