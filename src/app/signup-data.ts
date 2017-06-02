export class SignUpData {
    constructor(){ };

    // It will fetch the domain names from the DNS server. For the 
    // time being it is hardcoded with real and dummy domain names.
    fetchDomain() {
        return ['gmail.com','sweden.co.se','yahoo.com','hotmail.com'];
    }

}