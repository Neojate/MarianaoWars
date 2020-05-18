import { SystemsType } from './SystemConstants';

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

    async systemScriptData() {
        if (this.systemScript === undefined) {
            const response = await fetch('gamenav/getSystemScript');
            this.systemScript = await response.json();
            return this.systemScript;
        }

        return this.systemScript;
    }

    async getSystems() {
        let systems = [];
        //[systems[SystemsType.RESOURCE], systems[SystemsType.SOFTWARE], systems[SystemsType.TALENT]] = await Promise.all([systemServices.systemResourceData(), systemServices.systemSoftwareData(), systemServices.systemTalentData()]);
        [systems[SystemsType.RESOURCE], systems[SystemsType.SOFTWARE], systems[SystemsType.TALENT], systems[SystemsType.SCRIPT]] = await Promise.all([systemServices.systemResourceData(), systemServices.systemSoftwareData(), systemServices.systemTalentData(), systemServices.systemScriptData()]);
        return systems;
    }

    async getInstitute(id) {

        const response = await fetch(`game/getinstitute?instituteId=${id}`);
        return await response.json();
    }


    static get instance() { return systemServices }
}

const systemServices = new SystemServices();

export default systemServices;
