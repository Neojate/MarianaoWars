
export class SystemServices{


    async systemResourceData() {

        if (this.systemResource == undefined) {
            const response = await fetch('gamenav/getSytemResource');
            this.systemResource = await response.json();
            return this.systemResource;
        }

        return this.systemResource;
    }

    async systemSofteareData() {

        if (this.systemResource == undefined) {
            const response = await fetch('gamenav/getSytemResource');
            this.systemResource = await response.json();
            return this.systemResource;
        }

        return this.systemResource;
    }

    static get instance() { return systemServices }
}

const systemServices = new SystemServices();

export default systemServices;
