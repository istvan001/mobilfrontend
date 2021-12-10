import React, { Component } from 'react';
import { Text, TextInput, View, FlatList,Image,TouchableOpacity } from 'react-native';

export default class Etterem extends Component {
  constructor(props) {
    super(props);
    this.state = {

      dataSource:[]
    };

  }

  componentDidMount(){
    fetch('http://172.16.0.30:3000/etterem' )
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

  kivalaszt = async(szam)=>{
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

    
  

  render() {
    
    return (
      <View style={{flex: 1, paddingTop:50,backgroundColor:"black"}}>

        <View style={{marginTop:10,marginLeft:20}}>
          <TouchableOpacity
            style={{borderWidth:1,borderRadius:10,width:200,height:35,margin:5,backgroundColor:"blue"}}
            onPress={async ()=>this.kivalaszt()}
            >
          <Text style={{textAlign:"center",fontSize:20,color:"white"}}>Rendezés (ABC)</Text>
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
            </View>
          }
            keyExtractor={({id}, index) =>id}
          />

        </View>

      </View>
    );
  }
}