export interface PlaidSecrets {
    clientId: string;
    publicToken: string;
    secret: string;
    accessToken: string;
    itemId: string;
}

export default function getSecrets(): PlaidSecrets {
    const secretsSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('secrets');
    const secrets = secretsSheet?.getRange('B1:B5').getValues();
    if (!secrets) throw new Error("Could not get secrets");
    return {
        clientId: secrets[0][0],
        publicToken: secrets[1][0],
        secret: secrets[2][0],
        accessToken: secrets[3][0],
        itemId: secrets[4][0],
    }
}