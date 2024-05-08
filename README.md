This package uses a sample schema and invokes the Amplify GraphQL transformer to generate the resources necessary to provision an AppSync API.
The schema used is a simple `Todo` model that we intend to test against.

If you're consuming this via AWS Lambda dependency, execute the `executeGraphQLTransform` method that's exported from this package in your handler.
