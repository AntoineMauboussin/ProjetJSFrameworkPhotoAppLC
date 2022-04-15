import React, { useRef } from 'react';

//composant d'affichage de la liste d'image
export default function ImageList(props) {
    const section = useRef(null)
    let content
    if(props.pictures !== null){
        content=
            props.pictures.map((picture) => (
                <section key={picture.id} className='picture'>
                    <img alt="" src={picture.data}/>
                    <p>Nom: {picture.name}</p>
                    <p>Date: {picture.date}</p>
                </section>
            ))
    }
    
    return (
        <section className='image-list' ref={section}>{content}</section>
    )
}