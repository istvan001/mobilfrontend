import React, { Component} from 'react';
import {Button,StyleSheet, View,Text,TextInput,Picker, TouchableOpacity,ScrollView,RefreshControl} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { addMonths } from 'date-fns';
//import "react-datepicker/dist/react-datepicker.css";
import hu from 'date-fns/locale/hu';
import { registerLocale,CalendarContainer} from  "react-datepicker";
registerLocale('hu', hu)
const IP = require('./ipcim.js');
export default class FetchExample extends Component {

    constructor(props){
      super(props);
      let dt= addMonths(new Date(),1);
    let teljesdat=dt.getFullYear()+"/"+(dt.getMonth()+1)+"/"+dt.getDate();
      this.state ={
        dataSource:[],
        dataSource2:0,
        etteremnev:"",
        nev:"",
        telefon:"",
        email:"",
        datum:teljesdat,
      date:dt,
      show:false,
        kecske:[],
        valaszt:1,
        refreshing: false

        
        

        }
    
    
  }

  componentDidMount(){ 
     this.onRefresh()
  }
  onRefresh(){
    this.setState({isLoading: true})
    return fetch(IP.ipcim+'/etterem2')
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

  
  felvitel= (szam)=>{
    alert("sikeres kitöltés")
    
    
    let bemenet={
      bevitel1:this.state.valaszt,  
      bevitel2:this.state.nev,
      bevitel3:this.state.telefon,
      bevitel4:this.state.email,
      bevitel5:this.state.datum,

    }
  
    fetch(IP.ipcim+'/rendezvenyfeltoltes' ,{
      method: "POST",
      body: JSON.stringify(bemenet),
      headers: {"Content-type": "application/json; charset=UTF-8"}
      } )
      .then((response) => response.text())
      .then((szoveg) => {
        
  
        
        
        this.setState({nev:""})
        this.setState({telefon:""})
        this.setState({email:""})
      })
      .catch((error) =>{
        console.error(error);
      });       
    }
    
    kivizsgal=()=>
    {
      


      const nev=this.state.nev
      const telefon=this.state.telefon
      const email=this.state.email
       if ( nev == "" || telefon =="" || email =="") {
         alert("Minden mezőt tölts ki")
       } else {
        
          {
          
          let bemenet={
            bevitel1:this.state.datum,
            bevitel2:this.state.valaszt
            
          }
        
          fetch(IP.ipcim+'/rendezveny2' ,{
            method: "POST",
            body: JSON.stringify(bemenet),
            headers: {"Content-type": "application/json; charset=UTF-8"}
            } )
            .then((response) => response.json())
            .then((adat) => {   
              
              adat.forEach(element => {
                
            if(element.db==1)
            {
              alert("Ez az időpont már foglalt")

            }
            else if(element.db==0)
            {
              this.felvitel()
            }
                
              });
              
              this.setState({
                isLoading: false,
              }, function(){          
            });
            })
            .catch((error) =>{
              console.error(error);
            });   
          }    
          
          
          
          
            
       }
       
      
         
         
       
    }
    valtoztatdate=(event,datum0)=>{
        this.setState({show:false})
        let dt=new Date();
        dt= datum0   ||  this.state.date;
        let teljesdat=dt.getFullYear()+"/"+(dt.getMonth()+1)+"/"+dt.getDate();
      
        this.setState({date:dt})
        this.setState({datum:teljesdat})
    
    
      }
    

 

  render() {

    
    {/*const MyContainer = ({ className, children }) => {


      return (
        <div style={{ padding:10,color: "black",margin:10,backgroundColor:'lightblue' }}>
          <CalendarContainer className={className}>
           
            <div style={{margin:2}} >{children}</div>
          </CalendarContainer>
        </div>
      );
    };*/}
    

    return (<ScrollView nestedScrollEnabled={true} refreshControl={
        <RefreshControl 
          onRefresh={() => this.onRefresh()}
          refreshing={this.state.refreshing}
        />
      }><ScrollView>
      
        <View style={styles.container}>
          <Text style={{fontSize:34,marginBottom:20}}>Rendezvény foglalás</Text>
          
          <View style={{backgroundColor:"lightgrey",padding:10,borderWidth:2,borderRadius:10,shadowRadius:10,width:'90%',justifyContent:'space-between'}}>
         
        
        <Text style={styles.label1}>
        Válassza ki az Éttermet:
        </Text>
        <View style={{backgroundColor:"white",borderWidth:1,alignItems:'center',width:'95%',height:33,borderRadius:10,marginLeft:10}}>
        <Picker
        
        selectedValue={this.state.valaszt}
        style={{ height: 30, width: '100%',marginLeft:10,marginBottom:10}}
        onValueChange={(itemValue, itemIndex) => this.setState({valaszt:itemValue})}
      >
        {this.state.dataSource.map((item) => (
          <Picker.Item style={{color:"white"}} key={item.id} label={item.nev} value={item.id} />
        ))}
        
       
       
      </Picker>
      </View>

        
        
        
        
        <Text style={styles.label1} >
         Név:
        </Text>
        <TextInput
          style={styles.szovegdoboz}
          placeholder="Kérem adja meg a nevét!"
          onChangeText={(nev) => this.setState({nev})}
          value={this.state.nev}
        />

        
        <Text style={styles.label1}>
         Telefonszám:
        </Text>
        <TextInput
          style={styles.szovegdoboz}
          placeholder="Kérem adja meg a telefonszámát!"
          onChangeText={(telefon) => this.setState({telefon})}
          value={this.state.telefon}
        />

        
        <Text style={styles.label1}>
         E-mail:
        </Text>
        <TextInput
          style={styles.szovegdoboz}
          placeholder="Kérem adja meg az Email címét!"
          onChangeText={(email) => this.setState({email})}
          value={this.state.email}
        />
        
        
        
        
         
        <Text style={styles.label1}>
         Dátum:
        </Text>
        <TouchableOpacity 
                  onPress={()=>this.setState({show:true})}
         >
                     <Text style={styles.szovegdoboz2} >
          {this.state.datum}
        </Text> 
        </TouchableOpacity>

        
        
       {/* <DatePicker
        selected={this.state.dt} 
        onChange={(newdate) => this.setState({dt:newdate})}
        minDate={addMonths(new Date(), 1)}
        locale="hu"
        dateFormat="yyyy/MM/dd"
        showMonthDropdown
      showYearDropdown
      dropdownMode="select"
        calendarContainer={MyContainer}
        withPortal
        portalId="root-portal"
        
       
     
        

        />*/}
        
       
         
       
        
        <View style={{alignItems:"center"}}>
        <TouchableOpacity 
                  onPress={()=>this.kivizsgal()}
         >
                    <View style={{width:200,backgroundColor:"#00004d",marginTop:10,borderRadius:5}}>
                      <Text style={{textAlign:"center",padding:10,color:"white"}}>Felvitel</Text>
                    </View>
        </TouchableOpacity>
        </View>
        </View>
        {this.state.show?
<DateTimePicker
          testID="dateTimePicker"
          value={this.state.date}
          minimumDate={addMonths(new Date(),1)}
          mode={"date"}
          is24Hour={true}
          display="default"
          onChange={(event,datum0)=>this.valtoztatdate(event,datum0)}
        />
:
null
}

      </View></ScrollView></ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems:'center',
    flex:1,
    width: '100%' ,
    height:'100%',
  },szovegdoboz:
  {
    padding:10,
    borderWidth:1,
    borderRadius:10,
    marginBottom:5,
    width:'95%',
    height:40,
    backgroundColor:"white",
     marginLeft:10,
     marginRight:"auto"
  },
  szovegdoboz2:
  {
    padding:10,
    borderWidth:1,
    borderRadius:10,
    marginBottom:5,
    width:'95%',
    height:40,
    backgroundColor:"white",
     marginLeft:10,
     marginRight:"auto",
     textAlign:'center'
  },
  label1:{
    fontSize:20
  }
  


});
