import authService from '../api-authorization/AuthorizeService'


export class AccountServices{

    async checkTocken() {
        const token = await authService.getAccessToken();

        if (token != null) {
            var location = {
                key: 'ac3df4',
                pathname: `/instituts`,
                search: ``,
                hash: ''
            }
            return location;
        }
        return false;
    }

    static get instance() { return accountServices }
}

const accountServices = new AccountServices();

export default accountServices;
