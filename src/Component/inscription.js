import React, { Component } from 'react'
import { MDBContainer, MDBRow, MDBCol, MDBBtn } from "mdbreact";
import axios from 'axios'
import { connect } from 'react-redux'
import Loader from 'react-loader-spinner'
import Zoom from 'react-reveal/Zoom';

class inscription extends Component {
    state = {
        nom: "",
        prenom: "",
        email: "",
        tel: "",
        loading:false

    };
    componentDidMount() {
        console.log(this.props.idAtelier);
        // if(this.props.idAtelier){
        //     this.props.history.push("/")
        // }

    }

    submitHandler = event => {
        event.preventDefault();
        event.target.className += " was-validated";
        this.inscription({
            nom: this.state.nom,
            prenom: this.state.prenom,
            email: this.state.email,
            tel: this.state.tel,
            idAtelier: this.props.idAtelier
        })
    };

    changeHandler = event => {
        this.setState({ [event.target.name]: event.target.value });
    };
    inscription(r) {
        this.setState({loading:true})
        console.log(r);
        axios.post("https://valimbavaka.herokuapp.com/inscription", r)
            .then(res => {
                if (res.data == "email deja utilisé") {
                    this.setState({loading:false})
                    document.getElementById("erreur").innerHTML = "Email deja utilisé"
                } else if (res.data == "mank donnee") {
                    this.setState({loading:false})
                    document.getElementById("erreur").innerHTML = "Manque de donnée"

                } else {
                    axios.put("https://valimbavaka.herokuapp.com/updPlaceRes", { id: this.props.idAtelier })
                        .then(res2 => {
                            this.setState({loading:false})
                            console.log("res2", res2);
                            console.log("res1", res);
                            document.getElementById("reussi").innerHTML = "Inscription réussie"
                            document.getElementById("erreur").innerHTML = ""
                        }).catch(err => {
                            console.log("err", err);

                        })
                }



            }).catch(err => {
                
                console.log(err);

            })
    }

    render() {
        const container = { height: 800 }
        return (
            <div>
                <Zoom>
                <MDBContainer style={container} className="text-center mt-5 pt-5">
                    <form
                        className="needs-validation"
                        noValidate
                        onSubmit={this.submitHandler}

                    >
                        <MDBRow>
                            <MDBCol md="4" className="mb-3">
                                <label
                                    htmlFor="defaultFormRegisterNameEx"
                                    className="grey-text"
                                >
                                   Entrer votre nom 
                            </label>
                                <input
                                    value={this.state.fname}
                                    name="nom"
                                    onChange={this.changeHandler}
                                    type="text"
                                    id="defaultFormRegisterNameEx"
                                    className="form-control"
                                    placeholder=""
                                    required
                                />
                                <div className="valid-feedback">ok continuer!</div>
                            </MDBCol>
                            <MDBCol md="4" className="mb-3">
                                <label
                                    htmlFor="defaultFormRegisterEmailEx2"
                                    className="grey-text"
                                >
                                Entrer votre   prenom
                             </label>
                                <input
                                    value={this.state.lname}
                                    name="prenom"
                                    onChange={this.changeHandler}
                                    type="text"
                                    id="defaultFormRegisterEmailEx2"
                                    className="form-control"
                                    placeholder=""
                                    required
                                />
                                <div className="valid-feedback">ok continuer!</div>
                            </MDBCol>
                            <MDBCol md="4" className="mb-3">
                                <label
                                    htmlFor="defaultFormRegisterConfirmEx3"
                                    className="grey-text"
                                >
                                Entrer votre    Email
                             </label>
                                <input
                                    value={this.state.email}
                                    onChange={this.changeHandler}
                                    type="email"
                                    id="defaultFormRegisterConfirmEx3"
                                    className="form-control"
                                    name="email"
                                    placeholder=""
                                    required
                                />
                                <small id="emailHelp" className="form-text text-muted">
                                
                            </small>
                            </MDBCol>
                        </MDBRow>
                        <MDBRow>
                            <MDBCol md="4" className="mb-3">
                                <label
                                    htmlFor="defaultFormRegisterPasswordEx4"
                                    className="grey-text"
                                >
                                    Telephone Mobile
                            </label>
                                <input
                                    value={this.state.city}
                                    onChange={this.changeHandler}
                                    type="text"
                                    id="defaultFormRegisterPasswordEx4"
                                    className="form-control"
                                    name="tel"
                                    placeholder=""

                                />
                                <div className="invalid-feedback">
                                    
                            </div>
                                <div className="valid-feedback">votre Telephone est valider!</div>
                            </MDBCol>

                        </MDBRow>
                        {/* <MDBCol md="4" className="mb-3">
                        <div className="custom-control custom-checkbox pl-3">
                            <input
                                className="custom-control-input"
                                type="checkbox"
                                value=""
                                id="invalidCheck"
                                required
                            />
                            <label className="custom-control-label" htmlFor="invalidCheck">
                                Agree to terms and conditions
                            </label>
                            <div className="invalid-feedback">
                                You must agree before submitting.
                            </div>
                        </div>
                    </MDBCol> */}
                        <MDBBtn color="primary" type="submit" >
                          S' inscrire
              </MDBBtn>

                    </form>
                    <h2 id="erreur" style={{color:"#f3671f",fontSize:"2em"}}></h2>
                    <h2 id="reussi" style={{color:"#f3671f",fontSize:"2em"}}></h2>
                   

                </MDBContainer>
                </Zoom>
                <footer class="page-footer font-small black" style={{ backgroundColor: "#d05c62"}}>


                    <div class="footer-copyright text-center py-3">© 2019 Copyright:
                        <a href="https://mdbootstrap.com/education/bootstrap/" style={{ color: "black" }}> Fabricien</a>
                    </div>


                </footer>

            </div>

        );
    }
}


const mapStateToProps = (state) => {
    return {
        idAtelier: state.idAtelier
    }
}
export default connect(mapStateToProps)(inscription)
// {this.state.loading?                                <Loader 
//     type="ThreeDots"
//     color="#f3671f"
//     height="100"	
//     width="100"
// />   :""}
