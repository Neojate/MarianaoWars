/* 
 * Componentes de ejemplo
 * Ejemplo de componente con popover
 * 
 * */
import React, { Component } from 'react';
import { Button, Popover, PopoverHeader, PopoverBody } from 'reactstrap';

export class Example extends Component {

    constructor(props) {
        super(props);

        this.state = {
            popoverOpen: false,
        };

        this.toogle = this.toogle.bind(this);
    }

    toogle() {
        this.setState({
            popoverOpen: !this.state.popoverOpen
        });
    }

    render() {

        return (
            <div>
                <Button id="Popover1" type="button" onClick={this.toogle} onMouseEnter={this.toogle} onMouseOut={this.toogle}>
                    Launch Popover
                </Button>
                <Popover placement="bottom" isOpen={this.state.popoverOpen} target="Popover1" toggle={this.toggle}>
                    <PopoverHeader>Popover Title</PopoverHeader>
                    <PopoverBody>Sed posuere consectetur est at lobortis. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum.</PopoverBody>
                </Popover>
            </div>
            
        );
    }

}
/* codigo de react 16.8
const Example = (props) => {
    const [popoverOpen, setPopoverOpen] = useState(false);
    const toggle = () => setPopoverOpen(!popoverOpen);

    return (
        <div>
            <Button id="Popover1" type="button">
                Launch Popover
            </Button>
            <Popover placement="bottom" isOpen={popoverOpen} target="Popover1" toggle={toggle}>
                <PopoverHeader>Popover Title</PopoverHeader>
                <PopoverBody>Sed posuere consectetur est at lobortis. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum.</PopoverBody>
            </Popover>
        </div>
    );
}
export default Example;
*/

