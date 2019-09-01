import React, { Component } from 'react'
import axios from 'axios'
import { MDBContainer,MDBRow, MDBCol, MDBCard, MDBCardBody, MDBMask, MDBView, MDBBtn } from "mdbreact";

import { connect } from 'react-redux'
import Loader from 'react-loader-spinner'
import Zoom from 'react-reveal/Zoom';

class listeAtelier extends Component {


    constructor(props) {
        super(props);
        this.state = {
            collapse: false,
            atelier: "",
            loading:true
        };
        this.onClick = this.onClick.bind(this);
    }

    onClick() {
        this.setState({
            collapse: !this.state.collapse,
        });
    }
    componentDidMount() { 
        this.getAtelier()
    }

    getAtelier() {
        axios.get("https://valimbavaka.herokuapp.com/getAtelier")
            .then(resp => {
                this.setState({ atelier: resp.data,loading:false })

                console.log(resp);

            }).catch(err => {
                console.log(err);

            })
    }
    inscr(e) {
        
        const action = { type: "idAt", value: e }
        this.props.dispatch(action)
        this.props.history.push("/inscription")
    }

   
       
    
    render() {
        
        const container = { height: 1300 }
        return (
            <div>
               <div id="demo" class="carousel slide" data-ride="carousel">


                    <ul class="carousel-indicators">
                        <li data-target="#demo" data-slide-to="0" class="active"></li>
                        <li data-target="#demo" data-slide-to="1"></li>
                        <li data-target="#demo" data-slide-to="2"></li>
                    </ul>


                    <div class="carousel-inner">
                    <div class="carousel-item">
                           
                            <img src="./image.jpg" alt="New York" style={{ width: "100%" }} />
                        </div>
                        <div class="carousel-item active">
                           
                            <img src="./image1.jpg" alt="cuis1" style={{ width: "100%" }} />
                        </div>

                        
                        <div class="carousel-item">
                           
                            <img src="./images.jpg" alt="Chicago" style={{ width: "100%" }} />
                            
                        </div>
                        
                    </div>


                        <a class="carousel-control-prev" href="#demo" data-slide="prev">
                            <span class="carousel-control-prev-icon"></span>
                        </a>
                        <a class="carousel-control-next" href="#demo" data-slide="next">
                            <span class="carousel-control-next-icon"></span>
                        </a>

                        </div>
                <MDBContainer  className="text-center mt-5 pt-5">
                  
                    <MDBCard className="my-5 px-5 pb-5">
                   
                      
                        <MDBCardBody>
                            <p>Choisissez bien le choose de bien nouvelle atelier de cuisine .Un app fabricien cuisine est un outil utilisé dans la cuisine pour la préparation de plats</p>
                            <p>C’est la raison pour laquelle nous souhaitons booster cette activité en grâce à une application web.</p>
                            <h2 className="h1-responsive font-weight-bold text-center my-5" style={{color:"#d05c62 ", fontFamily:"Verdana !important"}}>
                            Pour cibler les enfants de +12ans.
                             </h2>
                            <h2 className="text-center w-responsive mx-auto mb-5" style={{fontFamily:"Verdana !important"}}>
                            Merci a vous qui visitent le site de 
                            cuisiner afin de manger correctement.
                             </h2>
                            
                            {this.state.atelier.length > 0 ? this.state.atelier.map((ate, index) => {
                                var d= "https://valimbavaka.herokuapp.com/image/"+ate.image
                                var count=parseInt(ate.placeDispo)
                                var reserv=parseInt(ate.placeReserve)

                                return <div>
                                     {ate.visibilite?<Zoom> 
                                        <MDBRow>
                               
                               <MDBCol lg="5">
                                   <MDBView className="rounded z-depth-2 mb-lg-0 mb-4" hover waves>
                                       <img
                                           className="img-fluid"
                                           src={d}
                                           alt="image"
                                           width="200em"
                                       />
                                       <h2 href="#!">
                                           
                                         <MDBMask overlay="white-slight" /> 
                                       </h2>
                                   </MDBView>
                               </MDBCol>
                               <MDBCol lg="7">
                                   <a href="#!" className="green-text">
                                       <h3 className="font-weight-bold mb-3" style={{color:"#f3671f"}}>
                                       <strong> 
                                           {ate.titre}
                                           </strong>
                                        </h3>
                                   </a>
                                   <p>
                                       {ate.description}
                                   </p>
                                   <p className="font-weight-bold mb-3 p-0">
                                       Date:{ate.date} |
                                   
                                   Heure du debut:{ate.heureDebut} |
                                   
                                   Durée:{ate.duree} |
                                  
                                   Place :{ate.placeDispo} |
                                   
                                   place Reservé:{ate.placeReserve} |
                                   
                                   Prix:{ate.prix} $ 
                                   </p>
                                   
                                   {count>reserv?<div><MDBBtn color="success" size="md" className="waves-light " onClick={(e)=>{
                                       e.preventDefault()
                                       this.inscr(ate._id)
                                       
                                   }}>
                                       S' inscrire
                                    </MDBBtn></div>:<div style={{color:"#d05c62 "}}>Place complet</div>}
                                   
                               </MDBCol>
                           </MDBRow>
                           <hr className="my-5" />
                                     </Zoom>:""}
                                    
                                </div>


                            }) : ""}


                            


                        </MDBCardBody>
                    </MDBCard>
                    
                   
                </MDBContainer>
                <footer class="page-footer font-small black" style={{backgroundColor:"#d05c62",bottom:0}}>

  
                        <div class="footer-copyright text-center py-3">© 2019 Copyright:
                            <a href="https://mdbootstrap.com/education/bootstrap/" style={{color:"black"}}> Fabricien</a>
                        </div>
 

                        </footer>
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        idAtelier: state.idAtelier
    }
}
export default connect(mapStateToProps)(listeAtelier)