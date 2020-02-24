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


## Git workflow

This project tries to follow the following git workflow pattern:

- `develop` branch is used for staging releases
- `master` branch is used for production releases
- You should not push commits straight to none of these previously mentioned branches but you should create your own feature branches instead.
- You should always do merges via GitHub pull requests for `develop` and `master` branches
- You should always ask peer review for your pull request before merging
- Use descriptive branch names. Examples of good feature branch names are: `feature/vat-number-field`, `bugfix/fix-vat-number-field`, `issue/OSS-123` where the **OSS-123** would be the JIRA ticket number.
- Use full commit messages with reference to the possible Asana ticket in the headline.

## NOTE
  Do not use ```git -a``` with git because it can add outdated files to the remote repo. Instead, git add your files one by one.

## Release process

We use pull request based release process in this project. This means that when doing release to staging you need to merge your branch to `develop` by using pull request. The same applies to `master` branch which is used for production deployments.

### What to remember before doing releases to **staging**
- TBA

### What to remember before doing releases to **production**:
- TBA

The releases are handled with [CircleCI](https://circleci.com/gh/jouzen) and triggered automatically with merges to `develop` and `master`. The CircleCI configuration can be found from [.circleci/config.yml](.circleci/config.yml).

## Environments
### NOW Testing Env. 
- https://7-11-n21wjd3vq.now.sh/
