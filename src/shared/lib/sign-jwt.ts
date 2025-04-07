import { JWTPayload, SignJWT } from 'jose';

interface signJWTArgs {
  payload: JWTPayload;
  expiration: string;
  secret: Uint8Array<ArrayBufferLike>;
}

export const signJWT = async ({ expiration, payload, secret }: signJWTArgs) => {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime(expiration)
    .sign(secret);
};
