import React from 'react';
import Navigation from '../components/Navigation';
import "../styles/list.css"
import "../styles/form.css"
import 'bootstrap/dist/css/bootstrap.css';

function ProposerLivraison(){
    
//fonction de creation d'un colis
 function createColis(event){

    //construction de la requete
    var API_URL = "http://localhost:8080/projet/rest/membres/createMembre"
   var requestUrl = API_URL +"/Colis"

   //variable qui signale la présence d'une erreur dans le formulaire
  // var error = false

   //variable indiquant si l'utilisa teur est connecté à internet
   //var  connected = window.navigator.onLine
   
   //récupération des valeurs du formulaire
   const depart= document.querySelector('#depart').value
   const destination = document.querySelector('#destination').value
   const date_max= document.querySelector('#date_max').value
   const poids = document.querySelector('#poids').value
   const taille= document.querySelector('#taille').value
   const photo = document.querySelector('#photo').value
   const prix= document.querySelector('#prix').value
   
   
   
   var token = localStorage.getItem("token")
   const proprietaire = localStorage.getItem("user")
   console.log(proprietaire)
   var colis = {depart,destination,date_max,poids,taille,photo,prix,proprietaire}
   var request = new XMLHttpRequest();
   request.open('POST', requestUrl);
   request.setRequestHeader('Authorization' , 'Bearer ' + token);
   request.setRequestHeader('Content-Type' , 'application/json');
   request.responseType = 'json';
   colis = JSON.stringify(colis);
   request.send(colis);
   console.log(colis)
   console.log(token)
   console.log('avance')
   request.onload = function(){ 
       
       const requestStatus = request.status

       console.log(request.response)
       
       if(requestStatus === 500){
           //var server_error = true
         

       }else if(requestStatus === 201){
           //requête réussie
           console.log('gooddd')
           console.log(request.response)
           //setSpaceName('listColis')
       }
    }
    event.preventDefault();
}
    return (
        <div>
            <Navigation />
        <div>
        <div className="container">
            <h2 style={{textAlign:"center",marginTop:"1%"}}>CREER UN COLIS</h2>
           <form>
                <div className="row form-group">
                    <div className="col-25">
                        <label htmlFor="prix">Prix</label>
                    </div>
                    <div className="col-75">
                        <input type="number" className="form-control" min="1" id="depart" name="depart" placeholder="Prix d'expédition du colis"/>
                    </div>
                    <div className="col-25">
                        <label htmlFor="depart">Lieu de depart</label>
                    </div>
                    <div className="col-75">
                        <input type="text" className="form-control" id="depart" name="depart" placeholder="Lieu de départ"/>
                    </div>
                    <div className="col-25">
                        <label htmlFor="destination">Lieu de destination</label>
                    </div>
                    <div className="col-75">
                        <input type="text" id="destination" className="form-control" name="destination" placeholder="Lieu de destination"/>
                    </div>
                    <div className="col-25">
                        <label htmlFor="date_max">Date maximale d arrivee du colis </label>
                    </div>
                    <div className="col-75">
                        <input type="date" id="date_max" className="form-control" name="date_max" placeholder="Date maximale d'arrivée"/>
                    </div>
                    <div className="col-25">
                        <label htmlFor="poids">Poids</label>
                    </div>
                    <div className="col-75">
                        <input type="number" min="10" max="300" id="poids" className="form-control" name="poids" placeholder="Poids (en Kg)"/>
                    </div>
                    <div className="col-25">
                        <label htmlFor="taille">Taille</label>
                    </div>
                    <div className="col-75">
                        <input type="number" min="10" id="taille" className="form-control" name="taille" placeholder="Taille (en cm)"/>
                    </div>
                    <div className="col-25">
                        <label htmlFor="photo">Photo</label>
                    </div>
                    <div className="col-75">
                        <input type="file"  id="photo" className="form-control" name="photo" placeholder="Photo"/>
                    </div>
                </div>
                <button type="submit" className="btn btn-primary" onClick={(event) => createColis(event)} >Save</button>
            </form>
      </div>
      </div>
      </div>
    )
}
export default ProposerLivraison;


