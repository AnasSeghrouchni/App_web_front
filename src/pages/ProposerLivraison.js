import React from 'react';
import Navigation from '../components/Navigation';
import 'bootstrap/dist/css/bootstrap.css';
import { useState } from 'react';


const ProposerLivraison = () => {
    const [prix, setPrix] = useState();
    const [depart, setDepart] = useState('');
    const [destination, setDestination] = useState('');
    const [date_max, setDate_max] = useState('');
    const [poids, setPoids] = useState('');
    const [taille, setTaille] = useState('');
    const [photo, setPhoto] = useState('');
    const [nom, setNom] = useState('');


    

    const createColis = async () => {
        try{
            const res = await fetch('http://localhost:8080/projet/rest/colis/createcolis', {
                method: 'POST',
                body: JSON.stringify({ nom,prix, depart, destination, date_max, poids, taille, photo, 'proprietaire' : JSON.parse(localStorage.getItem('membre'))}),
                headers: {
                  'Content-Type': 'application/json',
                },
              });
                if (res.ok){
                    console.log('creation ok');
                    console.log(res.json());
                }
        }catch (error) {
            console.log(error);
            
        }
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
                        <label htmlFor="nom">Nom</label>
                    </div>
                    <div className="col-75">
                        <input type="text" className="form-control" id="nom" name="nom" placeholder="Nom du colis" onChange={(e) => setNom(e.target.value)}/>
                    </div>

                    <div className="col-25">
                        <label htmlFor="prix">Prix</label>
                    </div>
                    <div className="col-75">
                        <input type="number" 
                        className="form-control" 
                        min="1" 
                        placeholder="Prix d'expédition du colis"
                        onChange={(e) => setPrix(e.target.value)}
                        />
                    </div>
                    <div className="col-25">
                        <label htmlFor="depart">Lieu de depart</label>
                    </div>
                    <div className="col-75">
                        <input type="text" className="form-control" id="depart" name="depart" placeholder="Lieu de départ" onChange={(e) => setDepart(e.target.value)}/>
                    </div>
                    <div className="col-25">
                        <label htmlFor="destination">Lieu de destination</label>
                    </div>
                    <div className="col-75">
                        <input type="text" id="destination" className="form-control" name="destination" placeholder="Lieu de destination" onChange={(e) => setDestination(e.target.value)}/>
                    </div>
                    <div className="col-25">
                        <label htmlFor="date_max">Date maximale d arrivee du colis </label>
                    </div>
                    <div className="col-75">
                        <input type="date" id="date_max" className="form-control" name="date_max" placeholder="Date maximale d'arrivée" onChange={(e) => setDate_max(e.target.value)}/>
                    </div>
                    <div className="col-25">
                        <label htmlFor="poids">Poids</label>
                    </div>
                    <div className="col-75">
                        <input type="number" min="10" max="300" id="poids" className="form-control" name="poids" placeholder="Poids (en Kg)" onChange={(e) => setPoids(e.target.value)}/>
                    </div>
                    <div className="col-25">
                        <label htmlFor="taille">Taille</label>
                    </div>
                    <div className="col-75">
                        <input type="number" min="10" id="taille" className="form-control" name="taille" placeholder="Taille (en cm)" onChange={(e) => setTaille(e.target.value)}/>
                    </div>
                    <div className="col-25">
                        <label htmlFor="photo">Photo</label>
                    </div>
                    <div className="col-75">
                        <input type="file"  id="photo" className="form-control" name="photo" placeholder="Photo" onChange={(e) => setPhoto(e.target.value)}/>
                    </div>
                </div>
                <button type="submit" className="btn btn-primary" onClick={createColis}>Proposer</button>
            </form>
      </div>
      </div>
      </div>
    )
}
export default ProposerLivraison;


