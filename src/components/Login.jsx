import React from 'react';
import '../assetss/css/login.css';
import { Apiurl } from '../services/api.js';
import axios from 'axios';

class Login extends React.Component {

    constructor(props) {
        super(props);
    }

    state = {
        form: {
            "email": "",
            "password": "",
            "app": ""
        },
        err: false,
        errMsg: ""
    }

    manejadorSubmit = e => {
        e.preventDefault();
    }

    onChangeInput = async e => {

        await this.setState({
            form: {
                ...this.state.form,
                [e.target.name]: e.target.value
            }
        });
    }

    onClickEnter = () => {
        let url = `${Apiurl}user/${this.state.form.email}`;
        let app = this.state.form.app;
        axios.put(url, null, {
            headers: {
                "Content-Type": "application/json",
                "password": this.state.form.password,
                "app": this.state.form.app
            }
        })
            .then(response => {
                localStorage.token = response.data.sessionTokenBck;
                localStorage.email = response.data.email; 
                localStorage.app = app;
                this.props.history.push("/lista");
            }).catch(error => {
                this.setState({
                    err: true,
                    errMsg: "Error: Al conectar al api"
                })
            })
    }

    render() {
        return (
            <React.Fragment>
                <div id="login">
                    <div className="container">
                        <div id="login-row" className="row justify-content-center align-items-center">
                            <div id="login-column" className="col-md-6">
                                <div id="login-box" className="col-md-12">
                                    <form id="login-form" className="form" onSubmit={this.manejadorSubmit}>
                                        <h3 className="text-center text-info">Login</h3>
                                        <div className="form-group">
                                            <label htmlFor="username" className="text-info" >Email:</label><br />
                                            <input type="text" name="email" id="username" className="form-control" onChange={this.onChangeInput} />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="password" className="text-info">Contraseña:</label><br />
                                            <input type="password" name="password" id="password" className="form-control" onChange={this.onChangeInput} />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="app" className="text-info">App:</label><br />
                                            <input type="text" name="app" id="app" className="form-control" onChange={this.onChangeInput} />
                                        </div>
                                        <div className="form-group">
                                            <input type="submit" name="submit" className="btn btn-info btn-md" value="Entrar" onClick={this.onClickEnter} />
                                        </div>

                                        {this.state.err === true &&
                                            <div className="alert alert-danger" role="alert">
                                                {this.state.errMsg}
                                            </div>
                                        }
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default Login;