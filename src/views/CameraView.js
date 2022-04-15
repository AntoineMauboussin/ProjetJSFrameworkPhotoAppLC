import React, { Component } from 'react';
import { connect } from "react-redux";

import VideoFeed from '../components/VideoFeed';
import CanvasPicture from '../components/CanvasPicture';
import SavePictureForm from '../components/SavePictureForm';
import FetchRequest from '../assets/library/fetch.class'

//vue caméra et enrtegistrement d'image
class CameraView extends Component {

    constructor(props){

        super(props);

        this.state = {
            available: false,
            video: null,
            picturesTaken: 0,
            messageSave: ""
        }
        
        this.picture = {}
        this.canvas = ""
        this.setAvailable = this.setAvailable.bind(this);
        this.takePicture = this.takePicture.bind(this);
        this.preparePicture = this.preparePicture.bind(this);
        this.savePicture = this.savePicture.bind(this);
        this.removeModal = this.removeModal.bind(this);
    }

    //etat de disponibilité 
    setAvailable(el){
        this.setState({available: true,video: el})
    }

    //affichage ou non de la modal d enregistremnt d image
    takePicture(){
        this.setState({picturesTaken: this.state.picturesTaken+1})
    }

    //recupere l'image de la photo prise pour enregistrement
    preparePicture(picture){
        this.picture = picture
    }

    //enregistre un image en base de données
    savePicture(event){
        this.picture["name"] = event.target[0].value
        const d = new Date()
        this.picture["date"] = d.getDate() + "/" + d.getMonth() + "/" + d.getFullYear() + "  " + d.getHours() + ":" + d.getMinutes()
        this.picture["id_user"] = this.props.user.id

        let fetchRequest = new FetchRequest(process.env.REACT_APP_JSONServerLocation + `pictures`, 'POST', this.picture);

        fetchRequest.sendRequest().then(
            resp => {
                this.setState({messageSave : <p>Image {this.picture["name"]} enregistrée</p>})
            }
        ).catch(
            err => {
                console.log('Error: ', err)
            }
        )

        this.removeModal()
    }

    //retire la modale d'enregistrement d'image
    removeModal(){
        this.setState({picturesTaken:0})
    }

    render() {
        let overlay = ""
        if(this.props.user === null){
            return <h1>Wrong way</h1>
        }
        let message=<p>Waiting for a video media to be available</p>
        if(this.state.available){
            message = ""
        }
        if(this.state.picturesTaken > 0){
            overlay = <div onClick={this.removeModal} className='overlay'></div>
        }

        return(
            <section className="cameraView">
                {message}
                <VideoFeed setParentState={this.setAvailable} takePicture={this.takePicture}/>
                <button >
                    <svg onClick={() => this.takePicture()} className="svg-circleplus" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="45" fill="none" strokeWidth="7.5"></circle>
                    </svg>
                </button>
                <div className='modalPicture'>
                    <CanvasPicture videoFeed={this.state.video!==null?this.state.video.current:null } pictureState={this.state.picturesTaken} idUser={this.props.user.id} preparePicture={this.preparePicture}/>
                    <SavePictureForm pictureState={this.state.picturesTaken} savePicture={this.savePicture}/>
                    {this.state.messageSave}
                </div>
                {overlay}
            </section>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

export default connect( mapStateToProps )( CameraView );