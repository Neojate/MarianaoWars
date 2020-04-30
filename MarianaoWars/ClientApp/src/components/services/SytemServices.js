
export class SystemServices{

    async systemResourceData() {

        const response = await fetch('gamenav/getSytemResource');
        const data = await response.json();
        return data;
        //this.setState({ systemResources: data, loading: false });

    }

    static get instance() { return systemServices }
}

const systemServices = new SystemServices();

export default systemServices;
