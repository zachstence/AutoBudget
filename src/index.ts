import getSecrets from './PlaidSecrets';

function secretsToRange(): string[][] {
    const secrets = getSecrets();
    return [[secrets.clientId], [secrets.publicToken], [secrets.secret], [secrets.accessToken], [secrets.itemId]];]
}