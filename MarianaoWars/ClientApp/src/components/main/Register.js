import React, { Component } from 'react';
import authService from '../api-authorization/AuthorizeService'
import { Alert, Row, Col } from 'reactstrap';

export class Register extends Component {
  static displayName = Register.name;

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
            : '';
  
        return (
            <div className='container' style={{ padding: `40px 0px` }}>
                <h2>Registro</h2>
                <div className='row'>
                  <div className='col-sm-4'>
                      <form onSubmit={this.account} ref='contactForm' >
                          <div className='form-group'>
                              <label htmlFor='userName'>User Name</label>
                              <input type='text' className='form-control' id='userName'
                                  placeholder='User Name' ref={userName => this.inputUserName = userName}
                              />
                          </div>
                          <div className='form-group'>
                              <label htmlFor='name'>Name</label>
                              <input type='text' className='form-control' id='name'
                                  placeholder='Name' ref={name => this.inputName = name}
                              />
                          </div>
                          <div className='form-group'>
                              <label htmlFor='lastName'>Last Name</label>
                              <input type='text' className='form-control' id='lastName'
                                  placeholder='Last Name' ref={lastName => this.inputLastName = lastName}
                              />
                          </div>
                          <div className='form-group'>
                              <label htmlFor='exampleInputEmail1'>Email</label>
                              <input type='email' className='form-control' id='email'
                                  placeholder='Email' ref={email => this.inputEmail = email}
                              />
                          </div>
                          <div className='form-group'>
                              <label htmlFor='password'>Password</label>
                              <input type='text' className='form-control' id='password'
                                  placeholder='Password' ref={password => this.inputPassword = password}
                              />
                          </div>
                          <button type='submit' className='btn btn-primary'>Send</button>
                      </form>
                    </div>
                    <div className="col-sm-8">
                        { errors }
                    </div>
              </div>
          </div>
    );
  }

    async checkTocken() {
        const token = await authService.getAccessToken();

      if (token != null) {
          var location = {
              key: 'ac3df4',
              pathname: `/instituts`,
              search: ``,
              hash: ''
          }
          this.props.history.push(location);
      }
    }

    async account(event) {

        event.preventDefault();

        const data = {
            firstName: this.inputName.value,
            lastName: this.inputLastName.value,
            userName: this.inputEmail.value,
            email: this.inputEmail.value,
            password: this.inputPassword.value
        };
        var url = 'user/userRegister';

        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const result = await response.json();
        

        if (!result.succeeded) {
            console.log(result.errors);
            this.setState({
                errors: result.errors
            });
            return;
        }

        var location = {
            key: 'ac3df4',
            pathname: `/instituts`,
            search: ``,
            hash: ''
        }
        this.props.history.push(location);


    }

    


}


