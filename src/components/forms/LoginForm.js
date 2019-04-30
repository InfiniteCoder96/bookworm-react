import React from 'react';
import PropTypes from 'prop-types';
import { Form,Button } from 'semantic-ui-react';
import InLineError from '../messages/InLineError';

class LoginForm extends React.Component{

    state = {
        data: {
            username: '',
            password: ''
        },
        loading: false,
        errors: {}
    }

    onChange = e =>
        this.setState({
            data: {...this.state.data, [e.target.name]: e.target.value}
        });

    onSubmit = () => {
        const errors = this.validate(this.state.data);
        this.setState({ errors });

        if(Object.keys(errors).length === 0){
            this.props.submit(this.state.data);
        }
    };

    validate = (data) => {
      const errors = {};
      if(!data.password){
          errors.password = "Password can't be empty";

      }
      else{
          if(data.password.toString().length <= 5){
              errors.password = "Password length should be more than 5 characters";
          }
      }

      if (!data.username){
          errors.username = "Username can't be empty";
      }

        return errors;
    };

    render(){
        const { data, errors } = this.state;

        return(
            <Form onSubmit={this.onSubmit}>
                <Form.Field error={!!errors.username}>
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        placeholder="Enter Username"
                        value={data.username}
                        onChange={this.onChange}
                    />
                    {errors.username && <InLineError text={errors.username}/>}

                </Form.Field>
                <Form.Field error={!!errors.password}>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Enter Password"
                        value={data.password}
                        onChange={this.onChange}
                    />
                    {errors.password && <InLineError text={errors.password}/>}
                </Form.Field>
                <Button primary >Login</Button>
            </Form>
        );
    }


}

LoginForm.propTypes = {
    submit: PropTypes.func.isRequired
};

export default LoginForm;