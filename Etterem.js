import React, { Component } from 'react';
import { Text, TextInput, View, FlatList,Image } from 'react-native';

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

  render() {
    
    return (
      <View style={{padding: 10}}>
       <FlatList
          data={this.state.dataSource}
          renderItem={({item}) => 
          <View style={{borderWidth:1,borderRadius:20,marginLeft:20,marginRight:20,marginBottom:5,padding:10,paddingLeft:15,}}>
           <Image  source={{uri:'http://172.16.0.30:3000/kepek/'+item.kep}} 
           style={{width:300,height:300,marginLeft:"auto",marginRight:"auto"}} />
            <Text style={{fontSize:20,padding:3}}>{item.nev} </Text>
            <Text style={{fontSize:15,padding:3}}>{item.lakcim} </Text>
            <Text style={{fontSize:15,padding:3}}>{item.telefon} </Text>
            <Text style={{fontSize:15,padding:3}}>{item.nyitas} </Text>
          </View>
        }
          keyExtractor={({etterem_id}, index) => etterem_id}
        />

      </View>
    );
  }
}