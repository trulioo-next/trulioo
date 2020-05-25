# Default Headless Wordpress App

## Table of contents

- [Requirements](#requirements)
- [Installation](#installation)
- [Git workflow](#git-workflow)
- [Release process](#release-process)
- [Environments](#environments)
- [Testing](docs/testing.md)

### Other documentations
- TBA


## Testing
- TBA


## Requirements

- Git
- Docker
- Node >= 9
- NPM >= 6

## Installation

1. Pull the contents of this repository onto your local machine.
2. Create **.env** file to root of this repository:

```bash
cp sample.env .env
```

3. Run `yarn install` to install all dependencies.
4. Run `yarn dev` to start the develoment server.

## ENV 
1. Copy .env-sample to .env

## Git workflow

This project tries to follow the following git workflow pattern:

- `develop` branch is used for staging releases
- `master` branch is used for production releases
- You should not push commits straight to none of these previously mentioned branches but you should create your own feature branches instead.
- You should always do merges via GitHub pull requests for `develop` and `master` branches
- You should always ask peer review for your pull request before merging
- Use descriptive branch names. Examples of good feature branch names are: `feature/vat-number-field`, `bugfix/fix-vat-number-field`, `issue/OSS-123` where the **OSS-123** would be the JIRA ticket number.
- Use full commit messages with reference to the possible Asana ticket in the headline.
 
## Wordpress 

- Install WP locally and add theme from /wp-theme
 
