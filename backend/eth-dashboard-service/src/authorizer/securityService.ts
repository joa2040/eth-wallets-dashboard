import config from "../../config";
import jwt from "jsonwebtoken";
import jwkToPem from "jwk-to-pem";
import fetch from "node-fetch";
import { APIGatewayAuthorizerResult } from "aws-lambda/trigger/api-gateway-authorizer";
import _ from 'lodash';

const AUTH0_DOMAIN = config.get("auth0.domain");
const CLIENT_ID = config.get("auth0.clientId");
const JWKS_URL = `${AUTH0_DOMAIN}.well-known/jwks.json`;

const getJWKS = _.memoize(() => fetch(JWKS_URL).then((res: any) => res.json()));

const getKey = async (kid: string) => {
  const data = await getJWKS();
  return data?.keys && data.keys.find((k: { kid: string }) => k.kid === kid);
};

const verifySignature = (token: string, key: jwkToPem.JWK) => {
  const pem = jwkToPem(key);
  return jwt.verify(token, pem);
};

const verifyIntegrity = (decoded: any) => {
  if (decoded.azp !== CLIENT_ID) {
    throw new Error("aud does not match");
  }

  if (decoded.iss !== AUTH0_DOMAIN) {
    throw new Error("iss does not match");
  }
  return decoded;
};

/**
 * Verify a JWT token
 * @param token String with JWT token
 */
export const verifyToken = async (token: string): Promise<any> => {
  const { header }: any = jwt.decode(token, { complete: true }) || {};

  const rsaKey = await getKey(header.kid);
  const decoded = await verifySignature(token, rsaKey);
  return verifyIntegrity(decoded);
};

/**
 * Returns an IAM policy document for a given user and resource.
 *
 * @method buildIAMPolicy
 * @param {String} userId - user id
 * @param {String} resource - resource ARN
 * @param {String} context - response context
 * @returns {Object} policyDocument
 */
export const buildIAMPolicy = (userId: string, resource: string, context: {[key: string]: string}, effect: 'Allow' | 'Deny'): APIGatewayAuthorizerResult => {
  const policy = {
    principalId: userId,
    policyDocument: {
      Version: "2012-10-17",
      Statement: [
        {
          Action: "execute-api:Invoke",
          Effect: effect,
          Resource: resource,
        },
      ],
    },
    context,
  };

  return policy;
};
