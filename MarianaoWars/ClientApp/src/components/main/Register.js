import React, { Component } from 'react';
import authService from '../api-authorization/AuthorizeService'

export class Register extends Component {
  static displayName = Register.name;

  constructor(props) {
      super(props);
      this.state = { value: '' };
      this.account = this.account.bind(this);
    }

    componentDidMount() {
        this.populateWeatherData();
    }

  render() {
      return (
          <div className='container' style={{ padding: `40px 0px` }}>
              <div className='row'>
                  <div className='col-sm-4'>
                      <h2>Registro</h2>
                      <form onSubmit={this.account} ref='contactForm' >
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
              </div>
          </div>
    );
  }

  async populateWeatherData() {
    const token = await authService.getAccessToken();
    }

    async account(event) {

        event.preventDefault();

        const params = {
            firstName: this.inputName.value,
            lastName: this.inputLastName.value,
            userName: this.inputEmail.value,
            email: this.inputEmail.value,
            password: this.inputPassword.value
        };


        fetch('account', {
            method: 'POST',
            body: JSON.stringify(params),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
            .then(function (response) {
                if (response.ok) {
                    return response.json();
                    
                } else {
                    throw "Error en la llamada Ajax";
                }

            })
            .then(function (json) {
                console.log(json);
            })
            .catch(function (err) {
                console.log(err);
            });
    }

    


}


