import getSecrets from './PlaidSecrets';

function secretsToRange(): string[][] {
    const secrets = getSecrets();
    return [[secrets.clientId], [secrets.publicToken], [secrets.secret], [secrets.accessToken], [secrets.itemId]];]
}

const secrets = getSecrets();

const HOST = "https://development.plaid.com";

const plaidConfig = {
  client_id: secrets.clientId,
  secret: secrets.secret,
  access_token: secrets.accessToken,
};

function plaid(endpoint: string, body: any) {
  const options: any = {
    method: "POST",
    payload: JSON.stringify({
      ...plaidConfig,
      ...body
    }),
    contentType: "application/json"
  }

  return UrlFetchApp.fetch(HOST + endpoint, options);
}

// return accounts.map(a => {
//   return [a.name, a.official_name, a.subtype, a.balances.available, a.balances.current];
// });


function getTransactions() {
  let transactions;
  try {
    const response = plaid("/transactions/get", {
        start_date: "2021-01-01",
        end_date: "2021-03-10"
    })
    const json = JSON.parse(response.getContentText());
    transactions = json.transactions;
  } catch (err) {
    return err;
  }

  const header = [
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
  ];

  const rows = transactions.map(t => [
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

  return [header, ...rows]
}
