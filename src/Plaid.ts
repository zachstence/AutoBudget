import getSecrets, { PlaidSecrets } from "./PlaidSecrets";

export default class Plaid {
    
    host: string = "https://development.plaid.com";
    secrets: PlaidSecrets;

    constructor(secrets: PlaidSecrets) {
        this.secrets = secrets;
    }
  
    getConfig() {
        return {
            client_id: this.secrets.clientId,
            secret: this.secrets.secret,
            access_token: this.secrets.accessToken
        };
    }

    _request(endpoint: string, body: any) {
        const options: any = {
            method: "POST",
            payload: JSON.stringify({
            ...this.getConfig(),
            ...body
            }),
            contentType: "application/json"
        }
        return UrlFetchApp.fetch(this.host + endpoint, options);
    }

    _dateToYYYYMMDD(date: Date): string {
        return `${date.getFullYear()}-${(date.getMonth()+1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`
    }

    getTransactions(startDate: Date, endDate: Date) {
        const response = this._request("/transactions/get", {
            start_date: this._dateToYYYYMMDD(startDate),
            end_date: this._dateToYYYYMMDD(endDate)
        })
        const json = JSON.parse(response.getContentText());
        return json.transactions;
    }
}