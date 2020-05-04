
export class Websocket{

    async initSocket(userId) {

        const hubConnection = new signalR.HubConnectionBuilder().withUrl("/chatHub").build();

        this.setState({ hubConnection, userId }, () => {
            this.state.hubConnection
                .start()
                .then(() => {

                    setInterval(this.InitUpdate, 1000);

                })
                .catch(err => console.log('Error while establishing connection :('));

            this.state.hubConnection.on('updateResources', (receivedMessage) => {
                var computer = JSON.parse(receivedMessage);
                this.setState({ computer: computer });
            });

        });

    }

    async systemSoftwareData() {

        if (this.systemSoftware == undefined) {
            const response = await fetch('gamenav/getSystemSoftware');
            this.systemSoftware = await response.json();
            return this.systemSoftware;
        }

        return this.systemResource;
    }


    static get instance() { return systemServices }
}

const websocket = new Websocket();

export default websocket;
