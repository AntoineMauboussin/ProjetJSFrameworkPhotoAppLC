import React, { Component } from 'react';
import store from '../store/index';
import FetchRequest from '../assets/library/fetch.class'


class LoginForm extends Component {

    //fonction de connexion
    onSubmitLogin = (event) => {
        event.preventDefault();

        let fetchRequest = new FetchRequest(process.env.REACT_APP_JSONServerLocation + `users?email=${event.target[0].value}&password=${event.target[1].value}`, 'GET');

        fetchRequest.sendRequest().then(
            resp => {
                if(resp[0]){
                    store.dispatch( {
                        type: 'login_user',
                        value: resp[0]
                    })
    
                    this.props.parentState("userHome")
                }else{
                    this.props.parentMessage("Mauvais identifiant / mot de passe")
                }
            }
        ).catch(
            err => {
                console.log('Error: ', err)
            }
        )
    }
    
    //fonction d'inscription
    onSubmitSignin = (event) => {
        event.preventDefault();

        let newUser = {
            name: event.target[0].value,
            email: event.target[1].value,
            password: event.target[2].value
        }

        let fetchRequest = new FetchRequest(process.env.REACT_APP_JSONServerLocation + `users`, 'POST', newUser);

        fetchRequest.sendRequest().then(
            resp => {
                store.dispatch( {
                    type: 'login_user',
                    value: resp
                })

                this.props.parentState("userHome")
            }
        ).catch(
            err => {
                console.log('Error: ', err)
            }
        )
    }

    //affichage du formulaire de connexion/inscription
    render(){
        const formLogin = 
            <form onSubmit={ this.onSubmitLogin }>
                <label style={{display:"none"}}  htmlFor="email" >Email :</label>
                <input type="email" name="email" placeholder='Email' required></input>
                <br/>
                <input type="password" name="password" placeholder='Password' required></input>
                <br/>
                <a href="/" onClick={e => this.props.parentState("signin", e)}>Cliquez ici pour vous inscrire</a>
                <input className='cta1' type="submit" value="Login"></input>
            </form>

        const formSignin = 
        <form onSubmit={ this.onSubmitSignin }>
            <input type="text" name="name" placeholder='Name' required></input>
            <br/>
            <input type="email" name="email" placeholder='Email' required></input>
            <br/>
            <input type="password" name="password" placeholder='Password' required></input>
            <br/>
            <a href="/" onClick={e => this.props.parentState("login", e)}>Cliquez ici pour vous connecter</a>
            <input className='cta1' type="submit" value="Sign-in"></input>
        </form>
        

        return(
            this.props.signin ? formSignin : formLogin
        )
    }
}

export default LoginForm;