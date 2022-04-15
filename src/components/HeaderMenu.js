import { Component } from 'react';
import { connect } from "react-redux";
import FetchRequest from '../assets/library/fetch.class'
import store from '../store/index';
import {Link} from "react-router-dom";

//composant du menu header
class HeaderMenu extends Component {

    constructor(props){

        super(props);

        this.state = {
            type: null,
            toggle : "toggle"
        }

        this.form = ""
        this.changeMessage = ""
        this.userLogout = this.userLogout.bind(this);
        this.changeName = this.changeName.bind(this);
        this.changePassword = this.changePassword.bind(this);
        this.toggleMenu = this.toggleMenu.bind(this);

    }

    //permet de modifier le nom de l'utilisateur connecté
    changeName(event){
        event.preventDefault()
        this.changeMessage = <p>Nom modifié avec succès</p>
        this.props.user["name"] = event.target[0].value

        let fetchRequest = new FetchRequest(process.env.REACT_APP_JSONServerLocation + `users/${this.props.user.id}`, 'PUT', this.props.user);

        fetchRequest.sendRequest().then(
            resp => {
                store.dispatch( {
                    type: 'login_user',
                    value: this.props.user
                })

            }
        ).catch(
            err => {
                console.log('Error: ', err)
            }
        )

        this.renderForm(null)
    }

    //permet de modifier le mot de passe l'utilisateur connecté
    changePassword(event){
        event.preventDefault()

        if(event.target[0].value === this.props.user.password){
            if(event.target[1].value === event.target[2].value){
                this.changeMessage = <p>Mot de passe modifié avec succès</p>
                
                this.props.user["password"] = event.target[1].value

                let fetchRequest = new FetchRequest(process.env.REACT_APP_JSONServerLocation + `users/${this.props.user.id}`, 'PUT', this.props.user);

                fetchRequest.sendRequest().then(
                    resp => {
                        store.dispatch( {
                            type: 'login_user',
                            value: this.props.user
                        })
                                
                    }
                ).catch(
                    err => {
                        console.log('Error: ', err)
                    }
                )
            }else{
                this.changeMessage = <p>Les mots de passe ne correspondent pas</p>
            }
        }else{
            this.changeMessage = <p>L'ancien mot de passe est invalide</p>
        }

        this.renderForm(null)
    }

    //affiche le bon formulaire de changement nom/mot de passe en fonction des boutons utilisés
    renderForm(type){
        if((this.state.type === null || this.state.type === "password") && type === "name"){
            this.form = 
            <form onSubmit={this.changeName}>
                <input type="text" name="newName" placeholder='Nouveau nom' required></input>
                <br/>
                <input className='cta1' type="submit" value="Valider la modification"></input>
            </form>

            this.setState({type: type})

        }else if((this.state.type === null || this.state.type === "name") && type === "password"){
            this.form = 
            <form onSubmit={this.changePassword}>
                <input type="password" name="oldPassword" placeholder='Ancient mot de passe' required></input>
                <br/>
                <label htmlFor='newPassword'></label>
                <input type="password" name="newPassword" placeholder='Nouveau mot de passe' required></input>
                <br/>
                <input type="password" name="confPassword" placeholder='Confirmer le mot de passe' required></input>
                <br/>
                <input className='cta1' type="submit" value="Valider la modification"></input>
            </form>

            this.setState({type: type})

        }else{
            this.form = ""
            this.setState({type: null})
        }
        
    }

    //deconnecte l'utilisatezur (vide le store)
    userLogout(event){

        store.dispatch( {
            type: 'logout_user'
        })
    }

    //affiche ou non le menu modal de changement de nom/mot de passe
    toggleMenu(){
        if(this.state.toggle === "toggle"){
            this.setState({toggle: "visible"})
        }else{
            this.setState({toggle: "toggle"})
        }
    }

    componentDidUpdate(){
        this.changeMessage = ""
    }
    
    render(){
        let homeLink
        if(this.props.state === "camera"){
            homeLink = <Link className='cta1' to={"/"}>Accueil</Link>
        }
        let menu
        if(this.props.user !== null){
            menu = 
            <section className='header-menu'>
                <div className='bar-menu'>
                    <svg onClick={this.toggleMenu} viewBox="0 0 100 80" width="40" height="40">
                        <rect width="100" height="20"></rect>
                        <rect y="30" width="100" height="20"></rect>
                        <rect y="60" width="100" height="20"></rect>
                    </svg>
                    <h1>{this.props.user.name}</h1>
                    {homeLink}
                    <Link className='cta1' onClick={this.userLogout} to={"/"}>Se déconnecter</Link>
                </div>
                <div className={this.state.toggle}>
                    <div className="container">
                        <button className='cta2' onClick={() => this.renderForm("name")}>Modifier le nom</button>
                        <button className='cta2' onClick={() => this.renderForm("password")}>Modifier le mot de passe</button>
                    </div>
                    {this.form}
                    {this.changeMessage}
                </div>
            </section>
        }

        return (
            <header>
                <link rel="preconnect" href="https://fonts.googleapis.com"/>
                <link rel="preconnect" href="https://fonts.gstatic.com"/>
                <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap" rel="stylesheet"/> 
                {menu}
            </header>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

export default connect( mapStateToProps )( HeaderMenu );