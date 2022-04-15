import React, { useEffect, useRef } from 'react';

//coposant qui affiche la photo prise et propose sont enregistrement
export default function CanvasPicture(props) {
    const canvas = useRef(null)
    const prep = props.preparePicture

    //récupère le flux caméra pour afficher la photo et la transfère au composant parent
    useEffect(() => {
        if (canvas.current && props.videoFeed !==null) {
            let picture = canvas.current
            picture.height = props.videoFeed.videoHeight
            picture.width = props.videoFeed.videoWidth
            picture.getContext('2d').drawImage(props.videoFeed, 0, 0);

            let newPicture = {
                id_user: props.idUser,
                data: picture.toDataURL()
            }

            prep(newPicture)
        }
    }, [props.pictureState, props.idUser, props.videoFeed, prep]);
    
    //affichage du composant si la modale d'enregistrement est ouverte
    if(props.pictureState > 0){
        return <canvas ref={canvas}></canvas>
    }
}