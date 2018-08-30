import React from 'react';

class Register extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      registerName: '',
      registerEmail: '',
      registerPassword: ''
    };
  }

  onEmailChange = (event) => {
    this.setState({
      registerEmail: event.target.value
    });
  }

  onPasswordChange = (event) => {
    this.setState({
      registerPassword: event.target.value
    });
  }

  onNameChange = (event) => {
    this.setState({
      registerName: event.target.value
    });
  }

  onSubmitRegister = () => {
    const {loadUser, onRouteChange} = this.props;

    fetch('http://localhost:3000/register', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        name: this.state.registerName,
        email: this.state.registerEmail,
        password: this.state.registerPassword
      })
    })
      .then(response => response.json())
      .then(data => {
        if (data.id) {
          loadUser(data);
          onRouteChange('home');
        } else if (data === 'incorrect form submission'){
          window.alert('Unable to register. Please fill out all fields');
        } else {
          window.alert('User already exists');
        }
      })

  }

  handleEnter = event => {
    if (event.key === "Enter") {
      this.onSubmitRegister();
    }
  }

  render() {
    return(
      <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
        <main className="pa4 black-80">
          <div className="measure">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f1 fw6 ph0 mh0">Register</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                        type="text"
                        name="name"
                        id="name"
                        onChange={this.onNameChange}
                        onKeyPress={this.handleEnter}
                        />
              </div>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                        type="email"
                        name="email-address"
                        id="email-address"
                        onChange={this.onEmailChange}
                        onKeyPress={this.handleEnter}
                        />
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                        type="password"
                        name="password"
                        id="password"
                        onChange={this.onPasswordChange}
                        onKeyPress={this.handleEnter}
                        />
              </div>
            </fieldset>
            <div className="">
              <input
                onClick={this.onSubmitRegister}
                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                type="submit"
                value="Register"/>
            </div>
          </div>
        </main>
      </article>

    );
  }
}



export default Register;
