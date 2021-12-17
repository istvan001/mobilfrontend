import React, { Component } from 'react';
import { Text, TextInput, View, FlatList,Image,TouchableOpacity } from 'react-native';
import { SearchBar } from 'react-native-elements';

export default class Etterem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      kereso: '',
      ert:"",

      dataSource:[]
    };

  }

  updateSearch = (search) => {    
    fetch('http://172.16.0.30:3000/kereses' )
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState({
          search,
          isLoading: false,
          dataSource: responseJson,
        }, function(){

        });

        //alert(JSON.stringify(this.state.dataSource))

      })
      .catch((error) =>{
        console.error(error);
      });
    
    
    };

  componentDidMount(){
    fetch('http://172.16.0.30:3000/etterem2' )
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState({
          isLoading: false,
          dataSource: responseJson,
        }, function(){

        });

        //alert(JSON.stringify(this.state.dataSource))

      })
      .catch((error) =>{
        console.error(error);
      });
  }

  nov = async(szam)=>{
    fetch('http://172.16.0.30:3000/etterem_abc_rend' )
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState({
          isLoading: false,
          dataSource: responseJson,
        }, function(){

        });

        

      })
      .catch((error) =>{
        console.error(error);
      });
  }
  csok = async(szam)=>{
    fetch('http://172.16.0.30:3000/etterem_abc_csok' )
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState({
          isLoading: false,
          dataSource: responseJson,
        }, function(){

        });

        

      })
      .catch((error) =>{
        console.error(error);
      });
  }
  ert = async(szam)=>{
    fetch('http://172.16.0.30:3000/etterem_ert' )
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState({
          isLoading: false,
          ert: responseJson,
        }, function(){

        });

        

      })
      .catch((error) =>{
        console.error(error);
      });
  }

  
  
    
  

  render() {
    const { search } = this.state;
    return (

      <View style={{paddingTop:50,backgroundColor:"black"}}>
        <SearchBar       
         placeholder="Kattints ide a kereséshez..."    
             onChangeText={(szoveg)=>this.setState({kereso:szoveg})}        
             value={this.state.kereso}      
        />
        
        <View style={{marginTop:10,marginLeft:20,flexDirection:"row"}}>
          
        <TouchableOpacity
            style={{borderWidth:1,borderRadius:10,width:200,height:35,margin:5,backgroundColor:"blue"}}
            onPress={async ()=>this.nov()}
            >
          <Text style={{textAlign:"center",fontSize:20,color:"white"}}>Rendezés (ABC)↑</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{borderWidth:1,borderRadius:10,width:200,height:35,margin:5,backgroundColor:"blue"}}
            onPress={async ()=>this.csok()}
            >
          <Text style={{textAlign:"center",fontSize:20,color:"white"}}>Rendezés (ABC)↓</Text>
          </TouchableOpacity>
          
          
        
          

          
        </View>
        
      
        
        
        <View style={{padding: 10}}>
        <FlatList
            data={this.state.dataSource}
            renderItem={({item}) => 
            <View style={{borderWidth:1,borderRadius:20,marginLeft:20,marginRight:20,marginBottom:5,padding:10,paddingLeft:15,backgroundColor:"lightblue"}}>
              
            <Image  source={{uri: 'http://172.16.0.30:3000/'+item.kep}} style={{width:500,height:300,marginLeft:"auto",marginRight:"auto"}} /> 
            

              <Text style={{fontSize:30,padding:3,fontStyle:"italic",textShadowColor: '#000', textShadowOffset: { width: 0.5, height: 0.5 }, textShadowRadius: 1}}>{item.nev} </Text>
              <Text style={{fontSize:16,padding:3}}>Lakcím: {item.lakcim} </Text>
              <Text style={{fontSize:16,padding:3}}>Telefonszám: {item.telefon} </Text>
              <Text style={{fontSize:16,padding:3}}>Nyitvatartás: {item.nyitas} </Text>
              <Text style={{fontSize:16,padding:3}}>Értékelés: {item.atlag}/5 </Text>
              
              

            </View>
          }
            keyExtractor={({id}, index) =>id}
          />

        </View>

      </View>
    );
    
  }
}