import { Plugin } from '@nestjs/apollo';
import {
  ApolloServerPlugin,
  GraphQLRequestListener,
} from 'apollo-server-plugin-base';
import { Logger } from '@nestjs/common';
import { GraphQLRequestContext } from 'apollo-server-types';

@Plugin()
export class LoggingPlugin implements ApolloServerPlugin {
  async requestDidStart(
    request: GraphQLRequestContext,
  ): Promise<GraphQLRequestListener> {
    const startTime = Date.now();
    const req = request.context.req;
    const headers = req?.headers;
    const traceId = headers?.['x-trace-id'];

    Logger.log(`Started`, `${traceId}::Request`);
    Logger.debug(
      `${JSON.stringify({
        originTraceId: headers['x-origin-trace-id'],
        contentType: headers['content-type'],
        userAgent: headers['user-agent'],
        query: req?.body?.query?.replace(/[\s\t\r\n]+/g, ' '),
        variables: req?.body?.variables,
      })}`,
      `${traceId}::Information`,
    );

    return {
      async willSendResponse() {
        const endTime = Date.now();
        Logger.log(
          `Will send response +${endTime - startTime}ms`,
          `${traceId}::Response`,
        );
      },
    };
  }
}
