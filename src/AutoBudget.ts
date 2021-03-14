import Plaid from "./Plaid";
import getSecrets, { PlaidSecrets } from "./PlaidSecrets";

export default class AutoBudget {

    secrets: PlaidSecrets;
    client: Plaid;
    transactionsHeader = [
        'transaction_type',
        'transaction_id',
        'account_owner',
        'pending_transaction_id',
        'pending',
        'payment_channel',
        'payment_meta',
        'name',
        'merchant_name',
        'location',
        'authorized_date',
        'authorized_datetime',
        'date',
        'datetime',
        'category',
        'amount',
        'transaction_code'
    ]

    constructor() {
        this.secrets = getSecrets();
        this.client = new Plaid(this.secrets);
    }

    getTransactions() {
        const startDate = new Date(0);
        const endDate = new Date();
        const rows = this.client.getTransactions(startDate, endDate).map(t => [
            t.transaction_type,
            t.transaction_id,
            t.account_owner,
            t.pending_transaction_id,
            t.pending,
            t.payment_channel,
            JSON.stringify(t.payment_meta),
            t.name,
            t.merchant_name,
            JSON.stringify(t.location),
            t.authorized_date,
            t.authorized_datetime,
            t.date,
            t.datetime,
            t.category,
            t.amount,
            t.transaction_code
          ]);
        
          return [this.transactionsHeader, ...rows]
        
    }
}