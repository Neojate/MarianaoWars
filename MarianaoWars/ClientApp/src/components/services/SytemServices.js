
export class SystemServices{


    async systemResourceData() {

        if (this.systemResource === undefined) {
            const response = await fetch('gamenav/getSytemResource');
            this.systemResource = await response.json();
            return this.systemResource;
        }

        return this.systemResource;
    }

    async systemSoftwareData() {

        if (this.systemSoftware === undefined) {
            const response = await fetch('gamenav/getSystemSoftware');
            this.systemSoftware = await response.json();
            return this.systemSoftware;
        }

        return this.systemResource;
    }

    async systemTalentData() {

        if (this.systemTalent === undefined) {
            const response = await fetch('gamenav/getSystemTalent');
            this.systemTalent = await response.json();
            return this.systemTalent;
        }

        return this.systemTalent;
    }


    static get instance() { return systemServices }
}

const systemServices = new SystemServices();

export default systemServices;
