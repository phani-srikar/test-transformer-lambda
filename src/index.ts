import { executeTransform, ExecuteTransformConfig } from "@aws-amplify/graphql-transformer";
import { TransformManager } from './cdk-compat/transform-manager';

const defaultTransformParameters = {
    // General Params
    enableTransformerCfnOutputs: true,
  
    // Model Params
    shouldDeepMergeDirectiveConfigDefaults: true,
    disableResolverDeduping: false,
    sandboxModeEnabled: false,
    allowDestructiveGraphqlSchemaUpdates: false,
    replaceTableUponGsiUpdate: false,
  
    // Auth Params
    useSubUsernameForDefaultIdentityClaim: true,
    populateOwnerFieldForStaticGroupAuth: true,
    suppressApiKeyGeneration: false,
  
    // Index Params
    secondaryKeyAsGSI: true,
    enableAutoIndexQueryNames: true,
  
    // Relational Params
    respectPrimaryKeyAttributesOnConnectionField: true,
  
    // Search Params
    enableSearchNodeToNodeEncryption: false,
};

export const executeGraphQLTransform = () => {
    const schema = `
        type Todo @model {
            id: ID!
            name: String!
            description: String
        }
    `;
    const transformManager = new TransformManager();
      
    const config: ExecuteTransformConfig = {
        scope: transformManager.getTransformScope(),
        nestedStackProvider: transformManager.getNestedStackProvider(),
        assetProvider: transformManager.getAssetProvider(),
        synthParameters: {
        ...transformManager.getSynthParameters(false, false)
        },
        schema,
        dataSourceStrategies: {
            Todo: {
                dbType: 'DYNAMODB',
                provisionStrategy: 'DEFAULT'
            }
        },
        transformParameters: defaultTransformParameters,
        transformersFactoryArgs: {}
    };

    executeTransform(config);
    const result = {
        ...transformManager.generateDeploymentResources(),
    };
    console.log(result);
};
