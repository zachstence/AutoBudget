import Plaid from './Plaid';
import getSecrets from './PlaidSecrets';

const secrets = getSecrets();
const plaid = new Plaid(secrets);

function getTransactions(startDate, endDate) {
    const rows = plaid.getTransactions(startDate, endDate).map(t => [
        t.pending,
        t.name,
        t.merchant_name,
        t.date,
        t.amount,
    ]);
    
    return [
        ['Pending', 'Name', 'Merchant Name', 'Date', 'Amount'],
        ...rows
    ];
}
