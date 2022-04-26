import React, { Component } from 'react';
import {StyleSheet, FlatList, ActivityIndicator, Text, View, TouchableOpacity, SafeAreaView, ScrollView, Button, TextInput, RefreshControl } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const IP = require('./ipcim.js');

export default class FetchExample extends Component {

  constructor(props){
    super(props);
    let dt=new Date();
    let teljesdat=dt.getFullYear()+"/"+(dt.getMonth()+1)+"/"+dt.getDate();
    let tm=('0' + dt.getHours()).slice(-2)+":"+('0' + dt.getMinutes()).slice(-2);

    this.state ={
      isLoading: true,
      kivalaszt:1,
      dataSource:[],
      dataSource2:[],
      dataSource3:[],
      etterem_id: "",
      datum: teljesdat,
      ido: tm,
      date: dt,
      etterem_nev: "",
      telefon_szam: "",
      teljes_nev: "",
      hiba: false,
      egesz: null,
      successful: false,
      refreshing: false
      }
  }
  componentDidMount(){
    this.onRefresh()
  }

  onRefresh(){
    this.setState({isLoading: true})
    return fetch(IP.ipcim+'/etterem')
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

  etterem_valaszt = (szam, etterem_nev) =>{
    this.setState({etterem_id:szam})
    this.setState({etterem_nev:etterem_nev})
  }

  telefon = (telefon) =>{
    this.setState({telefon_szam:telefon})
  }

  nev = (nev) =>{
    this.setState({teljes_nev:nev})
  }

  valtoztatdate=(event,datum0)=>{
    this.setState({show:false})
    let dt=new Date();
    dt = datum0 || this.state.date;
    let teljesdat=dt.getFullYear()+"/"+(dt.getMonth()+1)+"/"+dt.getDate();
  
    this.setState({date:dt})
    this.setState({datum:teljesdat})
  }

  valtoztattime=(event,time0)=>{
    this.setState({show2:false})
    let dt=new Date();
    dt = time0 || this.state.ido
    let tm=('0' + dt.getHours()).slice(-2)+":"+('0' + dt.getMinutes()).slice(-2);
  
    this.setState({ido:tm})
    var egesz_szam = this.state.ido.split(":")
    var szam = parseInt(egesz_szam)
    this.setState({egesz:szam})
  }

  ellenorzes = () =>{
    if (this.state.etterem_id == "" || this.state.datum == "" || this.state.ido == "" || this.state.telefon_szam == "" || this.state.teljes_nev == "") {
      this.setState({hiba:true})
    }else{
      this.setState({hiba:false})

      let bemenet={
        bevitel1: this.state.etterem_id,
        bevitel2: this.state.datum,
        bevitel3: this.state.egesz
      }
      return fetch(IP.ipcim+'/ellenorzes', {
      method: "POST",
      body: JSON.stringify(bemenet),
      headers: {"Content-type": "application/json; charset=UTF-8"}
      } )
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState({
          isLoading: false,
          dataSource2: responseJson,
        }, function(){
          //alert(JSON.stringify(this.state.dataSource2))
        });
      })
      .catch((error) =>{
        console.error(error);
      });
    }
  }

  kivalaszt = (szam)=>{
    let bemenet={
      bevitel1: szam,
      bevitel2: this.state.datum,
      bevitel3: this.state.egesz,
      bevitel4: this.state.teljes_nev,
      bevitel5: this.state.telefon_szam
    }
    fetch(IP.ipcim+'/foglalas', {
      method: "POST",
      body: JSON.stringify(bemenet),
      headers: {"Content-type": "application/json; charset=UTF-8"}
      } )
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState({
          isLoading: false,
          dataSource3: responseJson,
        }, function(){
          this.setState({successful:true})
        });
      })
      .catch((error) =>{
        console.error(error);
      });
      this.setState({etterem_nev:""})
      this.setState({etterem_id:""})
      this.setState({teljes_nev:""})
      this.setState({telefon_szam:""})
      this.setState({dataSource2: []})
      this.setState({successful:false})
  }

  render(){

    if(this.state.isLoading){
      return(
        <View style={styles.loading_content}>
          <Text style={styles.loading}>Adatok betöltése</Text><ActivityIndicator color="white"/>
        </View>
      )
    }

    return(
      <SafeAreaView style={{flex: 1}}>
      <ScrollView nestedScrollEnabled={true} refreshControl={
        <RefreshControl 
          onRefresh={() => this.onRefresh()}
          refreshing={this.state.refreshing}
        />
      }>
      <View style={{flex: 1}}>
        <View style={{backgroundColor: "white", padding: 10}}>
          <Text style={styles.title}>Válassz egy éttermet és egy időt a foglaláshoz.</Text>
        </View>
        {this.state.etterem_nev != "" ?
        <View style={{marginTop: 10,backgroundColor: "white", padding: 10}}>
          <Text style={styles.desc}>Választott étterem: {this.state.etterem_nev}</Text>
        </View>
        :
        <View style={{marginTop: 10,backgroundColor: "white", padding: 10}}>
          <Text style={styles.desc}>Választott étterem: Még nem választottál</Text>
        </View>
        }
        <View style={{flex: 1, alignItems: "center"}}>
          <FlatList
            data={this.state.dataSource}
            renderItem={({item}) => 

            <View style={styles.card}>
              <TouchableOpacity
                onPress={async ()=>this.etterem_valaszt(item.id, item.nev)}>
                <Text style={styles.title}>{item.nev}</Text>
              </TouchableOpacity>
            </View>
        
          }
            keyExtractor={({id}, index) => id}
            numColumns={2}
          />
        </View>

        <View style={{marginTop: 10,backgroundColor: "white", padding: 10}}>
          <Text style={styles.desc}>Választott nap: {this.state.datum}</Text>
        </View>
        <View style={{padding: 10}}>
          <Button
            onPress={()=>this.setState({show:true})}
            title="Dátum kiválasztása"
          />
        </View>
          {this.state.show?
            <DateTimePicker
              testID="dateTimePicker"
              value={this.state.date}
              mode="date"
              is24Hour={true}
              display="default"
              onChange={(event,datum0)=>this.valtoztatdate(event,datum0)}
            />
          : null }

        <View style={{backgroundColor: "white", padding: 10}}>
          <Text style={styles.desc}>Választott idő: {this.state.ido}</Text>
        </View>
        <View style={{padding: 10}}>
          <Button
            onPress={()=>this.setState({show2:true})}
            title="Idő kiválasztása"
          />
        </View>
        {this.state.show2?
          <DateTimePicker
            testID="dateTimePicker"
            value={this.state.date}
            mode="time"
            is24Hour={true}
            display="default"
            onChange={(event,time0)=>this.valtoztattime(event,time0)}
          />
        : null }
        {this.state.hiba == true?
        <View style={{padding: 10}}>
          <Text style={styles.hiba}>Nem töltöttél ki minden adatot!</Text>
        </View>
        : null }
        {this.state.successful == true ? 
        <View style={{padding: 10}}>
          <Text style={styles.successful}>Az asztal foglalás sikeresen megkörtént.</Text>
        </View>
        :null}
        <View style={{padding: 10}}>
          <Text>Teljes név</Text>
          <TextInput style={{borderWidth: 1 ,borderColor: "black", padding: 5}} placeholder="Teljes név" maxLength={52} onChangeText = {(nev)=> this.nev(nev)} value = {this.state.teljes_nev}/>
        </View>
        <View style={{padding: 10}}>
          <Text>Telefonszám</Text>
          <TextInput style={{borderWidth: 1 ,borderColor: "black", padding: 5}} keyboardType={"phone-pad"} maxLength={12} placeholder="(06 20) 123 456 7" onChangeText = {(telefon)=> this.telefon(telefon)} value = {this.state.telefon_szam}/>
        </View>
        <View style={{padding: 10}}>
          <Button
          onPress={() => this.ellenorzes()}
          title="Tovább"
          />
        </View>

        <View style={{flex: 1, alignItems: "center"}}>
        {JSON.stringify(this.state.dataSource2.length) > 0?
          <FlatList
            data={this.state.dataSource2}
            renderItem={({item}) => 

            <View style={styles.card}>
              <TouchableOpacity
                onPress={async ()=>this.kivalaszt(item.foglalas_id)}>
                <Text style={styles.desc}>Asztal neve: {item.asztal_megnevezes}</Text>
                <Text style={styles.desc}>Fők száma: {item.fo}</Text>
              </TouchableOpacity>
            </View>
        
          }
            keyExtractor={({id}, index) => id}
            numColumns={2}
          />
          :null}
        </View>
        
      </View>
      </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  loading_content:{
    alignItems: "center",
    padding: 5,
    backgroundColor: "blue",
    height: 40,
    justifyContent: "space-around",
    flexDirection: "row",
  },
  loading:{
    color: "white"
  },
  card: {
    padding: 10,
    margin: 10,
    marginBottom: 10,
    width: 150,
    borderRadius: 10,
    backgroundColor: "white",
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1},
    shadowOpacity: 0.22,
    shadowRadius: 1.22,
    elevation: 1,
    justifyContent: "center"
  },
  title:{
    textAlign: "center",
    color: "black",
    fontWeight: "bold",
    fontSize: 18,
    padding: 5
  },
  desc:{
    textAlign: "center",
    justifyContent: "center",
    fontWeight: "bold",
    fontSize: 14,
    padding: 5
  },
  hiba:{
    borderWidth: 1,
    borderColor: "red",
    borderRadius: 10,
    backgroundColor: "red",
    color: "white",
    padding: 5,
    textAlign: "center"
  },
  successful:{
  borderWidth: 1,
  borderColor: "green",
  borderRadius: 10,
  backgroundColor: "green",
  color: "white",
  padding: 5,
  textAlign: "center"
  },
});