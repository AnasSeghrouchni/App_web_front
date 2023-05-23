import React from 'react';
import Navigation from '../components/Navigation';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";

//import "./signup.css"

var validator = require("email-validator");
var passwordValidator = require('password-validator');
export const API_URL="http://localhost:8080/projet/rest"
function Signup(){

    //etat pour contrôler l'affichage du message d'alerte pour le bon remplissage du formulaire
    const [displayAlert, setDisplayAlert] = useState(false)

    //etat contenant le message d'alerte à afficher pour le remplissage des formulaires
    const [alertMsg, setAlertMsg] = useState('')

    //variable utiles pour le routage
    let history = useNavigate();   
    
    //function to check the validity of the form before the storage of data
    function formValidation(){
      var form;

      //retrieve data from the formular
      const firstname = document.getElementById("firstname").value
      const lastname = document.getElementById("lastname").value
      //const pseudo = document.getElementById("pseudo").value
      const email = document.getElementById("email").value
      const adress = document.getElementById("adress").value
      const password = document.getElementById("password").value

      //schema for password validation
      var schema = new passwordValidator();
      schema
      .is().min(5, "Le mote de passe doit contenir au moins 5 caractères")                                    // Minimum length                                  // Maximum length 100
      .has().uppercase(1,"Le mot de passe doit contenir une majuscule")                              // Must have uppercase letters
      .has().lowercase(1,"Le mot de passe doit contenir une minuscule")                              // Must have lowercase letters
      .has().digits(1, "Le mot de passe doit contenir au moins un chiffre")                                // Must have at least 2 digits

      if(lastname === ""){
          setDisplayAlert(true)
          setAlertMsg("Veuillez renseigner votre prenom!")
          return false
      }

      if(firstname === ""){
          setDisplayAlert(true)
          setAlertMsg("Veuillez renseigner votre nom!")
          return false
      }

      /*if(pseudo === ""){
        setDisplayAlert(true)
        setAlertMsg("Veuillez renseigner votre pseudo!")
        return false
      }*/

      if(adress === ""){
        setDisplayAlert(true)
        setAlertMsg("Veuillez renseigner votre adresse!")
        return false
      }

      if(email === "" || !validator.validate(email)){
          setDisplayAlert(true)
          setAlertMsg("Veuillez Entrer une adresse mail valide!")
          return false
      }

      if(password === ""){
          setDisplayAlert(true)
          setAlertMsg("Veuillez renseigner le champ mot de passe!")
          return false

      }else{
          var password_validation = schema.validate(password, { details: true })

          if(password_validation.length){
              setDisplayAlert(true)
              setAlertMsg("mot de passe pas reglementaire")
              return false
          }
      }
      form ={firstname,lastname,email,adress,password}

      return form
  }

// fonctions de creation de compte
 function CreateUser(event){
  //construction de la requete
 var user = formValidation()
 if (user) {
  var requestUrl = API_URL +"/users"
  var request = new XMLHttpRequest();
  request.open('POST', requestUrl);
  request.setRequestHeader('Content-Type' , 'application/json');
  request.responseType = 'json';
  user = JSON.stringify(user);
  request.send(user);
  console.log(user)
  console.log('avance')
  request.onload = function(){
      
      const requestStatus = request.status
      
      if(requestStatus === 500){
          var server_error = true
          setDisplayAlert(true);
          setAlertMsg("Il existe déjà un compte pour cette adresse mail.");
 
      }
      else if (requestStatus===403) {
        setDisplayAlert(true);
        setAlertMsg("Il existe déjà un compte pour cette adresse mail.");
        
      }
      else if(requestStatus === 201){
        console.log('gooddd')
        history.push("");
          //requête réussie
         
      }
  }
   event.preventDefault()
 }
}

    return(
      <div>
            
            
      <Navigation />
      <div>
      
      
      
    <div className="App">
        <div className="auth-wrapper">
          <div className="auth-inner">
            <div>
            
            <form>
            <h1 style={{align: "center", backgroundColor: "lightblue"}}>Inscription</h1>
              <div className="form-group">
                <label>Nom</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nom"
                  id="firstname"
                />
              </div>
              <div className="form-group">
                <label>Prénom</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Prénom"
                  id="lastname"
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  id="email"/>
              </div>
              <div className="form-group">
                <label>Adresse</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Adresse"
                  id="adress"/>
              </div>
              <div className="form-group">
                <label>Mot de passe</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Mot de passe"
                  id="password"/>
              </div>
              <div className="form-group">
                <label>Confirmer le mot de passe</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Confirmer le mot de passe"
                  id="password"/>
              </div>
              <button type="submit" className="btn btn-primary btn-block"
              onClick={(event) => CreateUser(event)}>Inscription</button>
             
              <p className="forgot-password text-right">
                Déjà inscrit: <Link to="/connexion"><a href="">connection ?</a></Link> 
              </p>
              </form>
            </div>
          </div>
        </div>
    </div>
      
    </div>
        </div>
        
    
    );
}
export default Signup;