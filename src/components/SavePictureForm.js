import { Component } from 'react';

//composant du formulaire d'enregistrement d'image
class SavePictureForm extends Component {

    onSubmit = (event) => {
        event.preventDefault()

        this.props.savePicture(event)
    }

    //s'affiche si la modale d'enregistrement d'image est affichée
    render(){
        if(this.props.pictureState > 0){
            return (
                <form onSubmit={ this.onSubmit }>
                    <input type="text" name="name" placeholder="Name" required></input>
                    <input type="submit" className='cta1' value="Sauvegarder la photo"></input>
                </form>
            )
        }

        return ""
    }
}

export default SavePictureForm;