import React, { Component } from 'react';
import authService from '../api-authorization/AuthorizeService'
import { Alert, Row, Col, Button } from 'reactstrap';

export class Login extends Component {
  static displayName = Login.name;

  constructor(props) {
      super(props);
      this.state = {
          value: '',
          errors: []
      };
      this.account = this.account.bind(this);
      this.showErrors = this.showErrors.bind(this);


    }

    componentDidMount() {
        this.checkTocken();
    }


    showErrors() {

        return this.state.errors.map((error, index) => {

            return (
            <Row key={index}>
                <Col xs="12">
                    <Alert color="danger">
                        {error.description}
                    </Alert>
                </Col>
                </Row>
                )

        });
    }


    render() {

        const errors = (this.state.errors.length > 0)
            ? this.showErrors()
            : <img alt="img" src={require('../../images/backgrounds/marianao_4.jpeg')} />;
  
        return (
            <div className='container' style={{ padding: `40px 0px` }}>
                
                <div className='row box-account'>
                    <div className='col-sm-4 account-form'>
                      <h2>Login</h2>
                      <form onSubmit={this.account} ref='contactForm' >
                          <div className='form-group'>
                                <label htmlFor='email'>Email</label>
                              <input type='email' className='form-control' id='email'
                                    placeholder='Email' ref={email => this.inputEmail = email}
                                    required
                              />
                          </div>
                          <div className='form-group'>
                              <label htmlFor='password'>Password</label>
                              <input type='password' className='form-control' id='password'
                                    placeholder='Password' ref={password => this.inputPassword = password}
                                    required
                              />
                            </div>
                            <Button onClick={this.account} type='submit' className='btn btn-custom'>Enviar</Button>
                      </form>
                    </div>
                    <div className="col-sm-8 account-image">
                        { errors }
                    </div>
              </div>
          </div>
    );
  }


    goToHome() {
        var location = {
            key: 'ac3df4',
            pathname: `/`,
            search: ``,
            hash: ''
        }
        this.props.history.push(location);
    }

    async checkTocken() {
        const token = await authService.getAccessToken();

        if (token != null) {
            this.goToHome();
      }
    }

    async account(event) {

        event.preventDefault();

        const data = {
            email: this.inputEmail.value,
            password: this.inputPassword.value
        };
        var url = 'user/userLogin';

        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const result = await response.json();
        
        if (!result.succeeded) {
            this.setState({
                errors: [{ "description": "Usuario o contraseña erroneos" }]
            });
            return;
        }

        await authService.signIn();
        this.goToHome();
    }

}



