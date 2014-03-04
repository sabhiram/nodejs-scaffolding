# Documentation - Sitemap

---

1. [Introduction](dummy.md)
2. [Installation](dummy.md)
    * [Project structure](dummy.md)
    * [Modules Used](dummy.md)
    * [Requirements](dummy.md)
    * [Build, test, deploy](dummy.md)
3. [Toolbox overview](dummy.md)
    * [Mkdocs](dummy.md)
    * [Grunt](dummy.md)
    * [JSHint](dummy.md)
    * [Vagrant](dummy.md)
    * [Docker](dummy.md)
4. [Testing](dummy.md)
    * [Mocha](dummy.md)
    * [Supertest](dummy.md)
    * [Mock Servers](dummy.md)
    * [User Models and DB Tests](dummy.md)
5. [Deployment, Putting it all together](dummy.md)
    * [Spinning up a MongoDB instance](dummy.md)
    * [The power of grunt](dummy.md)
    * [Workflow](dummy.md)
6. Advanced reading
    * [Diving into docker](dummy.md)
    * [Storing passwords](dummy.md)



---

## Introduction

There are a lot of NodeJS "starter" projects out there in the wild, and this is my take on the matter. The things I find that are crucial to any project can be broken down into three categories:

1. Very low feedback time
2. Consistent and reproducible
3. Happiness inducing

The above three things almost apply to any avenue of development. For most developers with efficiency on the mind: (1) and (2) almost always result in (3). To me, this applies to testing, code-review, ci and it's feedback, ensuring code quality and much more. Developers who spend less time thinking about the process they are following, are happy developers. Then, the ideal process must be the one which does not even appear to exist. 

The goal here is to build a project with the following properties:

1. Has an easy to use, automated test infrastructure for server and client testing
2. Has an easy way to define a coding standard
3. Has an easy way to define and maintian documentation, versioned with the source code
4. Contains rules to spin up services like user dbs, ci-automation etc
5. Provides a simple login / signup user scheme where passwords are securely stored
6. Provides all the above without (almost) any developer effort!

Sound intresting? Then read long with the rest of the documentation.

---

## Expectations

What this is **NOT**:

1. Perfect
2. Final
3. Production worthy
4. Bug free

What this **is**:

1. A conglomeration of useful tools, and best practices
2. A project to clone and borrow ideas from
3. A place where I can learn from other developer's suggestions

---

If you are seeing this page from a self-hosted version of this documentation, then you have already pulled this project, run through the setup, and have a server running! Feel free to skip ahead to the [Tools](dummy.md) section.

To continue reading, click the "[Next](dummy.md)" button (located in the nav bar).