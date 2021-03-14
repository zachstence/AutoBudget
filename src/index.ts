import AutoBudget from './AutoBudget';
import getSecrets from './PlaidSecrets';

function secretsToRange(): string[][] {
    const secrets = getSecrets();
    return [[secrets.clientId], [secrets.publicToken], [secrets.secret], [secrets.accessToken], [secrets.itemId]];]
}

const app = new AutoBudget();

function getTransactions() {
    return app.getTransactions();
}