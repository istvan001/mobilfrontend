import React, { Component } from 'react';
import {StyleSheet, FlatList, ActivityIndicator, Text, View, TouchableOpacity, SafeAreaView, ScrollView, RefreshControl } from 'react-native';
import { Col, Row, Grid } from 'react-native-easy-grid';

const IP = require('./ipcim.js');

export default class FetchExample extends Component {

  constructor(props){
    super(props);
    this.state ={
      isLoading: true,
      kivalaszt:1,
      dataSource:[],
      dataSource2:[],
      etterem_nev: "",
      refreshing: false
      }
  }

  componentDidMount(){
    this.onRefresh()
  }

  kivalaszt = async(szam, etterem_nev)=>{
    this.setState({kivalaszt:szam})
    this.setState({etterem_nev:etterem_nev})
    let bemenet={
      bevitel1:szam
    }
    return fetch(IP.ipcim+'/etlapok', {
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
          //alert(JSON.stringify(this.state.dataSource2.length))
        });
      })
      .catch((error) =>{
        console.error(error);
      });
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

  render(){

    if(this.state.isLoading){
      return(
        <View style={styles.loading_content}>
          <Text style={styles.loading}>Adatok betöltése</Text><ActivityIndicator color="white"/>
        </View>
      )
    }

    return(
      <SafeAreaView style={{flex:1}}>
      <ScrollView nestedScrollEnabled={true} refreshControl={
        <RefreshControl 
          onRefresh={() => this.onRefresh()}
          refreshing={this.state.refreshing}
        />
      }>
      <View style={{flex: 1}}>
        <View style={{height: 100, backgroundColor: "white"}}>
          <View style={{marginTop: 20}}>
            <Text style={styles.title}>Éttermek</Text>
            <Text style={styles.desc2}>Kérlek válassz egy éttermet az étlap megjelenítéshez.</Text>
          </View>
        </View>
        {this.state.etterem_nev != "" ?
        <View style={{marginTop: 10,backgroundColor: "white", padding: 10}}>
          <Text style={styles.desc2}>Választott étterem: {this.state.etterem_nev}</Text>
        </View>
        :
        <View style={{marginTop: 10,backgroundColor: "white", padding: 10}}>
          <Text style={styles.desc2}>Választott étterem: Még nem választottál</Text>
        </View>
        }
        <View style={{flex: 1, alignItems: "center"}}>
          <FlatList
            data={this.state.dataSource}
            renderItem={({item}) => 

            <View style={styles.card}>
              <TouchableOpacity
                onPress={async ()=>this.kivalaszt(item.id, item.nev)}>
                <Text style={styles.title}>{item.nev} </Text>
              </TouchableOpacity>
            </View>
        
          }
            keyExtractor={({id}, index) => id}
            numColumns={2}
          />
        </View>

        <View style={{flex: 2, paddingTop: 30, backgroundColor: "white"}}>
          <Text style={styles.title}>Étlap</Text>
          <Text style={styles.desc}>(Az étlapok megtekintéséhez válassz egy éttermet.)</Text>
          {JSON.stringify(this.state.dataSource2.length) > 0? 
            <FlatList
              data={this.state.dataSource2}
              renderItem={({item}) => 
              <View style={styles.table}>
                <Grid>
                  <Col size={25}>
                    <Row style={styles.cell}>
                      <Text>{item.nev}</Text>
                    </Row>
                  </Col>
                  <Col size={25}>
                    <Row style={styles.cell}>
                      <Text>{item.ar} Ft</Text>
                    </Row>
                  </Col>
                </Grid>
              </View>
            }
              keyExtractor={({id}, index) => id}
            />
          :
            <View style={styles.table}>
              <Text style={styles.desc2}>Nincs megjeleníthető adat...</Text>
            </View>
          }
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
    fontSize: 12,
    marginBottom: 20
  },
  desc2:{
    textAlign: "center",
    justifyContent: "center",
    fontWeight: "bold",
    fontSize: 14,
    padding: 5
  },
  cell: {
    borderWidth: 1,
    borderColor: '#F5F5F5',
    flex: 1, 
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10
  },
});