import { Plugin } from '@nestjs/apollo';
import { GraphQLSchemaHost } from '@nestjs/graphql';
import { Logger } from '@nestjs/common';
import {
  ApolloServerPlugin,
  GraphQLRequestListener,
} from 'apollo-server-plugin-base';
import {
  fieldExtensionsEstimator,
  getComplexity,
  simpleEstimator,
} from 'graphql-query-complexity';
import { ConfigService } from '@nestjs/config';
import { GraphQLError } from 'graphql';
import { GraphQLRequestContext } from 'apollo-server-types';

@Plugin()
export class ComplexityPlugin implements ApolloServerPlugin {
  constructor(
    private readonly gqlSchemaHost: GraphQLSchemaHost,
    private readonly configService: ConfigService,
  ) {}

  async requestDidStart(
    request: GraphQLRequestContext,
  ): Promise<GraphQLRequestListener> {
    const { schema } = this.gqlSchemaHost;
    const traceId = request.context?.req?.headers['x-trace-id'];
    const maxComplexity = this.configService.get('MAX_COMPLEXITY');
    return {
      async didResolveOperation({ request, document }): Promise<void> {
        const complexity = getComplexity({
          schema,
          operationName: request.operationName,
          query: document,
          variables: request.variables,
          estimators: [
            fieldExtensionsEstimator(),
            simpleEstimator({ defaultComplexity: 1 }),
          ],
        });
        if (complexity >= maxComplexity) {
          throw new GraphQLError(
            `Query is too complex: ${complexity}. Maximum allowed complexity: ${maxComplexity}`,
          );
        }
        Logger.log(`Query Complexity: ${complexity}`, `${traceId}::Complexity`);
      },
    };
  }
}
