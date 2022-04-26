import React, { Component} from 'react';
import { StyleSheet, ActivityIndicator, FlatList, Text, View, Image,TouchableOpacity,TextInput,ScrollView,RefreshControl } from 'react-native';
//import StarRating from 'react-native-star-rating';
import {AccordionList,Collapse,CollapseHeader, CollapseBody} from 'accordion-collapse-react-native';
const IP = require('./ipcim.js');

export default class FetchExample extends Component {

  constructor(props){
    super(props);
    this.state ={
      isLoading: true,
      dataSource:[],
      dataSource2:[],
      rating:[],
      szam1:1,
      aktid:1,
      aktid2:0,
      iscollapsed:true,
      collapsed:true,
      megnyomva:[],
      megnyomva2:[],
      megnyom:[],
      nev: '',
      velemeny:"",
      refreshing: false
      }
  
  
}
toggleExpanded = () => {
  this.setState({ collapsed: !this.state.collapsed });
};


frissit=()=>
{
  fetch(IP.ipcim+'/etterem2')
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


  componentDidMount(){
   
     
     this.frissit()

     let m=this.state.megnyomva;
        for (let elem of this.state.dataSource)
            m[elem.id]=true
        this.setState({megnyomva:m})

      
 }


 felvitel= (szam1,szam2)=>{
  alert("Megnyomva")
  let bemenet={
    bevitel1:szam2,
    bevitel2:szam1
  }

  fetch(IP.ipcim+'/ert_felvi' ,{
    method: "POST",
    body: JSON.stringify(bemenet),
    headers: {"Content-type": "application/json; charset=UTF-8"}
    } )
    .then((response) => response.text())
    .then((szoveg) => {
      this.frissit()

      alert(szoveg)
    })
    .catch((error) =>{
      console.error(error);
    });       
  }


  vfelvitel=async (szam)=>{
    if(this.state.nev=="" || this.state.velemeny=="")
    {
      alert("Minden mezőt tölts ki!")
    }
    else{

    
     let bemenet={
      bevitel1: szam,
      bevitel2: this.state.nev,
      bevitel3: this.state.velemeny
    }
 
    fetch(IP.ipcim+'/vfelvi', {
      method: "POST",
      body: JSON.stringify(bemenet),
      headers: {"Content-type": "application/json; charset=UTF-8"}
      } )
      .then((response) => response.text())
      .then((szoveg) => {

        //alert(szoveg)
        this.setState({nev:""})
        this.setState({velemeny:""})

        this.frissit()
        this.velemeny(szam)
        
        
      })
      .catch((error) =>{
        console.error(error);
      });
    }



  }


  velemeny =(szam)=>
  
  {
    
    
    let bemenet={
      bevitel1:szam
      
    }
  
    fetch(IP.ipcim+'/velemenyek' ,{
      method: "POST",
      body: JSON.stringify(bemenet),
      headers: {"Content-type": "application/json; charset=UTF-8"}
      } )
      .then((response) => response.json())
      .then((adat) => {
        
       
  
        
        this.setState({
          isLoading: false,
          dataSource2: adat,
        }, function(){          
      });
      })
      .catch((error) =>{
        console.error(error);
      });       
    }
    like =(szam)=>
  
      {
        
        
        let bemenet={
          bevitel1:szam
          
        }
      
        fetch(IP.ipcim+'/like' ,{
          method: "POST",
          body: JSON.stringify(bemenet),
          headers: {"Content-type": "application/json; charset=UTF-8"}
          } )
          .then((response) => response.json())
          .then((adat) => {
            
           
      
            this.frissit()
           
          })
          .catch((error) =>{
            console.error(error);
          });       
        }
  
        dislike =(szam)=>
  
      {
        
        
        let bemenet={
          bevitel1:szam
          
        }
      
        fetch(IP.ipcim+'/dislike' ,{
          method: "POST",
          body: JSON.stringify(bemenet),
          headers: {"Content-type": "application/json; charset=UTF-8"}
          } )
          .then((response) => response.json())
          .then((adat) => {
            
           
      
            this.frissit()
           
          })
          .catch((error) =>{
            console.error(error);
          });       
        }


  nov = async()=>{
    return fetch(IP.ipcim+'/etterem_abc_rend' )
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
    return fetch(IP.ipcim+'/etterem_abc_csok' )
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
    return fetch(IP.ipcim+'/ert_rend' )
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
  
 /* kattintas=(szam)=>
  {
    alert(szam)
    this.felvitel(szam)
  }

  megnyomas=(sorszam)=>{
    //alert(sorszam)
    let m=this.state.megnyomva
    m[sorszam]=!m[sorszam]
    this.setState({megnyomva:m})
    this.velemeny(sorszam)

    
  }
  megnyomas2=(sorszam)=>{
    //alert(sorszam)
    let m=this.state.megnyomva2
    m[sorszam]=!m[sorszam]
    this.setState({megnyomva2:m})
    
    
  }
  onStarRatingPress(ratings,hanyadik) {
        
    alert(ratings)
    alert(hanyadik)
   // this.setState({starCount:ratings})
    let m=this.state.megnyomva
    m[hanyadik]=ratings
    this.setState({megnyomva:m})
    this.setState({starCount:ratings})
    this.felvitel(ratings,hanyadik)

  }*/


  

 render(){
   if(this.state.isLoading){
     return(
       <View style={styles.loading_content}>
         <Text style={styles.loading}>Adatok betöltése</Text><ActivityIndicator color="white"/>
       </View>
     )
   }

   return(
     <View style={{flex: 1, alignItems: "center"}}>


      <View>
      
      <Collapse>
      
      <CollapseHeader style={{borderWidth:1,borderRadius:10,width:200,height:40,margin:5,backgroundColor:"white"}}>
        
        
        <Text style={{textAlign:"center",fontSize:25}}>Rendezés</Text>
      
      </CollapseHeader>
     
      <CollapseBody>
            <View style={{alignItems:"center"}}>
          <TouchableOpacity
              style={{borderWidth:1,borderRadius:10,width:170,height:30,margin:5,backgroundColor:"white"}}
              onPress={async(szam)=>this.nov()}
              >
            <Text style={{textAlign:"center",fontSize:20}}>Rendezés (ABC)↑</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{borderWidth:1,borderRadius:10,width:170,height:30,margin:5,backgroundColor:"white"}}
              onPress={async(szam)=>this.csok()}
              >
            <Text style={{textAlign:"center",fontSize:20}}>Rendezés (ABC)↓</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{borderWidth:1,borderRadius:10,width:170,height:30,margin:5,backgroundColor:"white"}}
              onPress={async(szam)=>this.ert()}
              >
            <Text style={{textAlign:"center",fontSize:20}}>Értékelés</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{borderWidth:1,borderRadius:10,width:170,height:30,margin:5,backgroundColor:"white"}}
              onPress={async(szam)=>this.frissit()}
              >
            <Text style={{textAlign:"center",fontSize:20}}>Alap rendezés</Text>
            </TouchableOpacity>
            </View>

            </CollapseBody>

            </Collapse>


           
      
      </View>   
      <ScrollView nestedScrollEnabled={true} refreshControl={
      <RefreshControl 
        onRefresh={() => this.frissit()}
        refreshing={this.state.refreshing}
      />
    }>   
    <View>        
     
       <FlatList
         data={this.state.dataSource}
         renderItem={({item}) => 
         <View style={styles.card}>
           <View style={styles.center}>
             <Image style={styles.image}  source={{uri: IP.ipcim+'/kepek/'+item.kep}}/>
           </View>
           <View style={{flexDirection:"row"}}>
             <TouchableOpacity onPress={async ()=>this.like(item.id)}>
             <Image source={require('./like.png')}  resizeMode='contain'  style={{flex:.2, height:50,width:50,margin:10}} />
             </TouchableOpacity>
             <Text style={{paddingTop:15, fontSize:25}}>{item.db}</Text>
             <TouchableOpacity onPress={async ()=>this.dislike(item.id)}>
             <Image source={require('./dislike.png')} resizeMode='contain' style={{flex:.2, height:50,width:50,margin:10,marginLeft:30  }} />
             </TouchableOpacity>
             <Text style={{paddingTop:15, fontSize:25}}>{item.db2}</Text>
           </View>
           <Text style={styles.title}>{item.nev}</Text>
           <Text style={styles.label}>Cím: {item.lakcim}</Text>
           
           <Text style={styles.label}>Nyitvatartás: {"\n"}{item.nyitas}</Text>
           <Text style={styles.label}>Telefon: {item.telefon}</Text>
{/*           <Text style={{padding: 5,fontSize:20,}}>Értékelés: {Math.round((item.atlag + Number.EPSILON) * 100) / 100}/5 </Text>

          

          <Text style={{padding: 5,fontSize:20,}}>Értékeld:</Text>
          
                

          
            
          
            <StarRating
        disabled={false}
        maxStars={5}
        rating={this.state.starCount}
        selectedStar={(ratings) => this.onStarRatingPress(ratings,item.id)}
        fullStarColor='#ffd700'
        
   />*/}




      
 
 


            <Collapse
            onToggle ={ ()=>this.velemeny(item.id)}

            >
            <CollapseHeader style={styles.gomb} >
              <View>
              
                  <Text style={styles.label1}>Vélemények</Text>
                
              
                  
                  </View>
            </CollapseHeader>
  
  
            
              <CollapseBody>
              <FlatList
            data={this.state.dataSource2}
        
            renderItem={({item}) =>
            <View style={styles.velemeny}>
            
            <Text style={{ padding: 5,fontSize:17}}>Név:</Text>
            <Text style={{padding: 5,fontSize:15,marginLeft:10}}>{item.velemeny_nev}</Text>
            <Text style={{padding: 5,fontSize:17}}>Vélemény:</Text>
            <Text style={{padding: 5,fontSize:15,marginLeft:10}}>{item.velemeny}</Text>

            
            </View>
            }
            keyExtractor={({velemenyid}, index) => velemenyid}


            />
            
           

          

          <Collapse>
              <CollapseHeader style={styles.gomb}>
                <View>
                
                    <Text style={styles.label1}>Saját Vélemény</Text>
                  
                </View>
              </CollapseHeader>
              <CollapseBody style={{alignItems:"center"}}>
          <View style={{borderWidth:1,borderRadius:10,padding: 10,alignItems:"center",borderRadius:20,marginLeft:20,marginRight:20}}>
         <Text style={styles.label1}>
         Név:
        </Text>
        <TextInput
          style={styles.szovegdoboz}
          placeholder="Add meg a nevedet!"
          onChangeText={(nev) => this.setState({nev})}
          value={this.state.nev}
        />
         <Text style={styles.label1}>
         Vélemény:
        </Text>
        <TextInput
          style={styles.szovegdoboz2}
          placeholder="Add meg a véleményed!"
          onChangeText={(velemeny) => this.setState({velemeny})}
          value={this.state.velemeny}
        />

        <TouchableOpacity 
        onPress={async ()=>this.vfelvitel(item.id)}>
          <View style={{width:200,backgroundColor:"lightgrey",marginTop:10,borderRadius:5}}>
            <Text style={{textAlign:"center",padding:10 }}>Felvitel</Text>
          </View>
        </TouchableOpacity>
            </View>
            </CollapseBody>
          </Collapse>




            </CollapseBody>
            </Collapse>



           
         </View>
         }
         keyExtractor={({id}, index) => id}
        />
        </View> 
      </ScrollView>
     </View>
     
      
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
  center:{
    alignItems: "center",
    justifyContent: "center"
  },
  title:{
    textAlign: "justify",
    color: "black",
    fontWeight: "bold",
    fontSize: 18,
    padding: 5
  },
  card: {
    padding: 10,
    margin: 10,
    marginBottom: 10,
    width: 300,
    borderRadius: 10,
    backgroundColor: "white",
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1},
    shadowOpacity: 0.22,
    shadowRadius: 1.22,
    elevation: 1,
  },
  label:{
    padding: 5
  },
  image:{
    width: 200,
    height: 200,
    marginBottom: 10
  },
  image2:{
    width: 50,
    height: 50
  },
  label1:{
   padding: 5,
   fontSize:20,
   textAlign:'center'
 
  },
  gomb:{
    
    margin: 10,
    marginBottom: 10,
    width: 250,
    height:50,
    borderRadius: 10,
    backgroundColor: "white",
    shadowColor:"black",
    shadowOffset: { width: 0, height: 1},
    shadowOpacity: 2,
    shadowRadius: 5,
    elevation: 1,
    textAlign:"center"
 
   },
   gomb1:{
     
      marginTop:5,
      marginBottom: 10,
      width: 200,
      borderRadius: 10,
      backgroundColor: "white",
      shadowColor:"black",
      shadowOffset: { width: 0, height: 1},
      shadowOpacity: 2,
      shadowRadius: 5,
      elevation: 1,
      textAlign:"center"
   
     },
   velemeny:
   {
     marginTop:5,
     borderWidth:1,
     borderRadius:10,
     width:270,
     backgroundColor:"white",
      marginLeft:"auto",
      marginRight:"auto"
   },
 
   szovegdoboz:
   {
     paddingLeft:5,
     borderWidth:1,
     borderRadius:10,
     width:200,
     height:30,
     backgroundColor:"white",
      marginLeft:"auto",
      marginRight:"auto"
   },
   szovegdoboz2:
   {padding:10,
     borderWidth:1,
     borderRadius:10,
     width:200,
     height:70,
     backgroundColor:"white",
      marginLeft:"auto",
      marginRight:"auto"
   },
   myStarStyle: {
    color: 'yellow',
    backgroundColor: 'transparent',
    textShadowColor: 'black',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 2,
  },
  myEmptyStarStyle: {
    color: 'white',
  }


 
 });