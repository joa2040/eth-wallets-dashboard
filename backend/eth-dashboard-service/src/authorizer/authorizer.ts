import * as securityService from "./securityService";
import log from "lambda-log";
import { APIGatewayAuthorizerCallback, APIGatewayEventRequestContext, APIGatewayTokenAuthorizerEvent } from "aws-lambda";

/**
 * Authorizer functions are executed before your actual functions.
 * @method authorize
 * @param {String} event.authorizationToken - JWT
 * @throws Returns 401 if the token is invalid or has  expired.
 * @throws Returns 403 if the token does not have sufficient permissions.
 */
module.exports.handler = async (event: APIGatewayTokenAuthorizerEvent, context: APIGatewayEventRequestContext, callback: APIGatewayAuthorizerCallback) => {
  const token = event.authorizationToken;

  log.info(`Authorizer invoke by ${event.methodArn}, token ${token}`);

  try {
    const decoded = await securityService.verifyToken(token);
    if (!decoded) {
      callback("Unauthorized");
      return;
    }
    const authorizerContext = { authInfo: JSON.stringify(decoded) };

    // Return an IAM policy document for the current endpoint
    const policyDocument = securityService.buildIAMPolicy(
      decoded.sub,
      event.methodArn,
      authorizerContext,
      'Allow'
    );

    callback(null, policyDocument);
  } catch (error) {
    log.error(error);
    callback("Unauthorized"); // Return a 401 Unauthorized response
  }
};
