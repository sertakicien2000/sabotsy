import React, { Component } from 'react'
import axios from 'axios'
import { MDBContainer,MDBRow, MDBCol, MDBCard, MDBCardBody, MDBMask, MDBView, MDBBtn } from "mdbreact";
import { connect } from 'react-redux'
import Loader from 'react-loader-spinner'
import Zoom from 'react-reveal/Zoom';

class atelierCuisinier extends Component {
    constructor(props) {
        super(props);
        this.state = {
            collapse: false,
            atelier: "",
            loading:true,
            loading2:""
        };
        this.onClick = this.onClick.bind(this);
    }
    onClick() {
        this.setState({
            collapse: !this.state.collapse,
        });
    }

    componentDidMount(){
        
        this.getAtelier()
    }
    

    // localStorage.getItem("id")
    getAtelier() {
        axios.get("https://valimbavaka.herokuapp.com/getAteliercuis/"+localStorage.getItem("id"),this.setAuthToken(localStorage.getItem('token')))
            .then(resp => {
                this.setState({ atelier: resp.data.resp ,loading:false })
                console.log(resp);

            }).catch(err => {
                console.log(err);

            })
    }
    setAuthToken(token) {
        if (token) {
            console.log("if token");

            var t = "bearer " + token
            console.log(t);

            axios.defaults.headers.common['authorization'] = t
        } else {
            console.log("else token");
            delete axios.defaults.headers.common['authorization'];


        }
    }
    desactivation(a){
        this.setState({loading2:a+"e"})
        axios.put("https://valimbavaka.herokuapp.com/updateVisibilite",{id:a},this.setAuthToken(localStorage.getItem('token')))
        .then(resp=>{
            this.setState({loading2:""})
            this.getAtelier()
            console.log("update visibilite",resp.data);
            
        }).catch(err=>{

            console.log("err visibilite",err);
            
        })
    }

    modifier(e){
        const action = { type: 'mod', value: e }
        this.props.dispatch(action)
        this.props.history.push("/modification")
    }

    modifIm(id,image){
        const data = new FormData();
        data.append('file', this.uploadInput.files[0]);
        data.append('id', id);
        data.append('image', image+"a")
        console.log(this.uploadInput.files[0]);
        

        axios.put("https://valimbavaka.herokuapp.com/modifImage",data)
        .then(resp=>{
            console.log(resp);
            
        }).catch(errr=>{
            console.log(errr);
            
        })
    }
    render() {
        
        const container = { height: 1300 }
        return (
            <div>
                
                <MDBContainer style={container} className="text-center mt-5 pt-5">
                    
                    <MDBCard className="my-5 px-5 pb-5">
                        <MDBCardBody>
                            
                            <h2 className="h1-responsive font-weight-bold text-center my-5" style={{fontFamily:"Roboto"}}>
                                Liste des ateliers
                             </h2>
                            <p className="text-center w-responsive mx-auto mb-5">
                                Liste de tous les ateliers
                             </p>
                            


                            {this.state.atelier.length > 0 ? this.state.atelier.map((ate, index) => {
                                var d= "https://valimbavaka.herokuapp.com/image/"+ate.image
                                return <Zoom>
                                    <MDBRow>
                                    <div id="loko">
                                        <MDBCol lg="7">
                                            <MDBView className="rounded z-depth-2 mb-lg-0 mb-4" hover waves>
                                                <img
                                                    className="img-fluid"
                                                    src={d}
                                                    alt="image"
                                                    
                                                />
                                               
                                                <form>
                                                    

                                                
                                                </form>
                                                
                                                <h2 href="#!">
                                                    
                                                  <MDBMask overlay="white-slight" /> 
                                                </h2>
                                            </MDBView>
                                        </MDBCol>
                                        <MDBCol lg="7">
                                            <a href="#!" className="green-text">
                                                <h3 className="font-weight-bold mb-3"style={{ color:"#f3671f"}}>
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
                                            
                                            Prix:{ate.prix} Ar
                                            </p>
                                            {ate.visibilite?<MDBBtn color="danger"   size="md" className="waves-light " onClick={(e)=>{
                                                e.preventDefault()
                                                this.desactivation(ate._id)
                                                
                                                
                                            }}>
                                                Desactiver
                                             </MDBBtn>:<MDBBtn color="info"  size="md" className="waves-light " onClick={(e)=>{
                                                e.preventDefault()
                                                this.desactivation(ate._id)
                                                
                                                
                                            }}>
                                                Activer
                                             </MDBBtn>}
                                            
                                            
                                            
                                             <MDBBtn color="success" size="md" className="waves-light " onClick={(e)=>{
                                                e.preventDefault()
                                                this.modifier(ate)
                                                
                                                
                                            }}>
                                                Modifier l'atelier
                                             </MDBBtn>
                                         
                                        </MDBCol>
                                        </div>
                                    </MDBRow>
                                    <hr className="my-5" />
                                    </Zoom>


                            }) : ""} </MDBCardBody>
                    </MDBCard>
                    <footer class="page-footer font-small black" style={{backgroundColor:"#d05c62"}}>

  
                    <div class="footer-copyright text-center py-3">© 2019 Copyright:
                    <a href="https://mdbootstrap.com/education/bootstrap/" style={{color:"black"}}> Fabricien</a>
                </div>


</footer>
                </MDBContainer>

            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        modification: state.modification
    }
}
export default connect(mapStateToProps)(atelierCuisinier)
