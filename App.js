import React, { useEffect, useState, useCallback } from 'react';
import { Dimensions, SafeAreaView, RefreshControl, DatePickerAndroid, ToastAndroid } from 'react-native';
import { StyleSheet, Image ,View, Text } from 'react-native';
import { FlatGrid } from 'react-native-super-grid';
import axios from 'axios';
import ActionButton from 'react-native-action-button';
export const loaderRef = React.createRef();


export default function Example() {
  var header = "PRÉ-TEMPORADA: ROUND "
  var rodada_atual = 0
  const [items, setItems] = React.useState([    
        { name: "", backgroundColor: "#008000", textColor: "#008000", pointsColor: "#008000", id: 0, pts: 10001 },     
        { name: header + rodada_atual, backgroundColor: "#008000", textColor: "#fff", pointsColor: "#008000", id: 0, pts: 10000 },     

        { name: "5prastantas F.C.", slug: require("./assets/escudos/5prastantas-f-c.png"), backgroundColor: "#808080", textColor: "#ffffff", pointsColor: "#ffffff", id: 13945827, pts: 0 },
        { name: "AA AZULAO DO SUL", slug: require("./assets/escudos/aa-azulao-do-sul.png"), backgroundColor: "#ff241d", textColor: "#063780", pointsColor: "#063780", id: 6717458, pts: 0 },
        { name: "Akuma Sport Club", slug: require("./assets/escudos/akuma-sport-club.png"), backgroundColor: "#ffffff", textColor: "#000000", pointsColor: "#000000", id: 483335, pts: 0 },
        { name: "Atleticado", slug: require("./assets/escudos/atleticado.png"), backgroundColor: "#4d004d", textColor: "#0066ff", pointsColor: "#0066ff", id: 661306, pts: 0 },
        { name: "Balacubacu FC", slug: require("./assets/escudos/balacubacu-fc.png"), backgroundColor: "#000000", textColor: "#808080", pointsColor: "#808080", id: 3170764, pts: 0 },
        { name: "Bigode De Cartola", slug: require("./assets/escudos/bigode-de-cartola.png"), backgroundColor: "#997a00", textColor: "#ffffff", pointsColor: "#ffffff", id: 987444, pts: 0 },
        { name: "BOUGERS", slug: require("./assets/escudos/bougers.png"), backgroundColor: "#ff241d", textColor: "#000000", pointsColor: "#000000", id: 2835988, pts: 0 },
        { name: "Calambau Beer", slug: require("./assets/escudos/calambau-beer.png"), backgroundColor: "#000000", textColor: "#ffffff", pointsColor: "#ffffff", id: 253542, pts: 0 },
        { name: "Cangaceiros BF", slug: require("./assets/escudos/cangaceiros-bf.png"), backgroundColor: "#000000", textColor: "#19ff81", pointsColor: "#19ff81", id: 4554581, pts: 0 },
        { name: "ChristoFlamengo", slug: require("./assets/escudos/christoflamengo.png"), backgroundColor: "#bf1d17", textColor: "#000000", pointsColor: "#000000", id: 1540816, pts: 0 },
        { name: "Código Fonte F.C", slug: require("./assets/escudos/codigo-fonte-f-c.png"), backgroundColor: "#ffffff", textColor: "#063780", pointsColor: "#063780", id: 2489031, pts: 0 },
        { name: "Edu 07 Araxá", slug: require("./assets/escudos/edu-07-araxa.png"), backgroundColor: "#808080", textColor: "#ffffff", pointsColor: "#ffffff", id: 1225635, pts: 0 },
        { name: "El mordedô", slug: require("./assets/escudos/el-mordedo.png"), backgroundColor: "#4d004d", textColor: "#00cc5c", pointsColor: "#00cc5c", id: 25856343, pts: 0 },
        { name: "Ganso Doido", slug: require("./assets/escudos/ganso-doido.png"), backgroundColor: "#bf1d17", textColor: "#063780", pointsColor: "#063780", id: 90144, pts: 0 },
        { name: "GastroNeles", slug: require("./assets/escudos/gastroneles.png"), backgroundColor: "#000000", textColor: "#ffffff", pointsColor: "#ffffff", id: 3438042, pts: 0 },
        { name: "Golog", slug: require("./assets/escudos/golog.png"), backgroundColor: "#000000", textColor: "#ffcb00", pointsColor: "#ffcb00", id: 25872151, pts: 0 },
        { name: "Leozito Neves FC", slug: require("./assets/escudos/leozito-neves-fc.png"), backgroundColor: "#000000", textColor: "#bf1d17", pointsColor: "#bf1d17", id: 4528687, pts: 0 },
        { name: "MBM Football", slug: require("./assets/escudos/mbm-football.png"), backgroundColor: "#ffffff", textColor: "#000000", pointsColor: "#000000", id: 8869919, pts: 0 },
        { name: "Menino Esperto F. C.", slug: require("./assets/escudos/menino-esperto-f-c.png"), backgroundColor: "#000000", textColor: "#ffcb00", pointsColor: "#ffcb00", id: 7875842, pts: 0 },
        { name: "Meninos do Maudi", slug: require("./assets/escudos/meninos-do-maudi.png"), backgroundColor: "#000000", textColor: "#ffffff", pointsColor: "#ffffff", id: 1179838, pts: 0 },
        { name: "MGuto FC", slug: require("./assets/escudos/mguto-fc.png"), backgroundColor: "#000000", textColor: "#bf1d17", pointsColor: "#bf1d17", id: 832153, pts: 0 },
        { name: "Palla Sports", slug: require("./assets/escudos/palla-sports.png"), backgroundColor: "#808080", textColor: "#ff7400", pointsColor: "#ff7400", id: 623570, pts: 0 },
        { name: "Pyranha", slug: require("./assets/escudos/pyranha.png"), backgroundColor: "#e65ce6", textColor: "#000000", pointsColor: "#000000", id: 1135503, pts: 0 },
        { name: "WolvenFootball", slug: require("./assets/escudos/wolvenfootball.png"), backgroundColor: "#ffffff", textColor: "#0a6634", pointsColor: "#0a6634", id: 634335, pts: 0 },
        { name: "Sei de tudo e não ganho nada FC", slug: require("./assets/escudos/sei-de-tudo-e-nao-ganho-nada-fc.png"), backgroundColor: "#ff241d", textColor: "#19ff81", pointsColor: "#19ff81", id: 749772, pts: 0 },
        { name: "Sheik Tosado FC", slug: require("./assets/escudos/sheik-tosado-fc.png"), backgroundColor: "#ff241d", textColor: "#000000", pointsColor: "#000000", id: 13951041, pts: 0 },
        { name: "sinceridade: qualidade maldita!", slug: require("./assets/escudos/sinceridade-qualidade-maldita.png"), backgroundColor: "#000000", textColor: "#bf1d17", pointsColor: "#bf1d17", id: 5342721, pts: 0 },
        { name: "Skalabuta FC", slug: require("./assets/escudos/skalabuta-fc.png"), backgroundColor: "#000000", textColor: "#ffffff", pointsColor: "#ffffff", id: 25871781, pts: 0 },
        { name: "Sporting Draga", slug: require("./assets/escudos/sporting-draga.png"), backgroundColor: "#000000", textColor: "#ff241d", pointsColor: "#ff241d", id: 810144, pts: 0 },
        { name: "Tangamandapiense Social Clube", slug: require("./assets/escudos/tangamandapiense-social-clube.png"), backgroundColor: "#ffffff", textColor: "#4d004d", pointsColor: "#4d004d", id: 25867159, pts: 0 },
        { name: "tarcisiospfc", slug: require("./assets/escudos/tarcisiospfc.png"), backgroundColor: "#ff241d", textColor: "#ffffff", pointsColor: "#ffffff", id: 8917, pts: 0 },
        { name: "Time do Igor FC", slug: require("./assets/escudos/time-do-igor-fc.png"), backgroundColor: "#ffcb00", textColor: "#000000", pointsColor: "#000000", id: 1160952, pts: 0 },
        { name: "U.C. Leões de Judá", slug: require("./assets/escudos/u-c-leoes-de-juda.png"), backgroundColor: "#000000", textColor: "#ffcb00", pointsColor: "#ffcb00", id: 14972226, pts: 0 },
        { name: "vernochi82", slug: require("./assets/escudos/vernochi82.png"), backgroundColor: "#a64b00", textColor: "#ff241d", pointsColor: "#ff241d", id: 25584876, pts: 0 },
        { name: "Victrola F.C.", slug: require("./assets/escudos/victrola-f-c.png"), backgroundColor: "#808080", textColor: "#bf1d17", pointsColor: "#bf1d17", id: 13946184, pts: 0 },
        { name: "VilãoFC", slug: require("./assets/escudos/vilaofc.png"), backgroundColor: "#000000", textColor: "#ffffff", pointsColor: "#ffffff", id: 2370283, pts: 0 },

        { name: "", backgroundColor: "#008000", textColor: "#008000", pointsColor: "#008000", id: 0, pts: -100 },     
        { name: "", backgroundColor: "#008000", textColor: "#008000", pointsColor: "#008000", id: 0, pts: -101 },        
  ]);
  
  var status = 1
  function refreshData(){    
    // axios.get("https://cartolaigor-pjzxn.hoverfly.io/mercado/status")    
    axios.get("https://api.cartolafc.globo.com/mercado/status")
      .then(res => {
        status = res.data.status_mercado;
        rodada_atual = res.data.rodada_atual   
        items[1].name = header + rodada_atual     
        setItems([...items], items);      
      });

    if(status != 1){
      items.forEach(element => {

        items.sort((a, b) => (a.pts <= b.pts) ? 1 : -1)
        if(element.id != 0){
          try {
            // axios.get("https://cartolaigor-pjzxn.hoverfly.io/time/id/" + element.id)
            axios.get("https://api.cartolafc.globo.com/time/id/" + element.id)
              .then(res => {
                if(res.data.pontos == undefined){
                  element.pts = 0;              
                }
                else{
                  element.pts = parseInt(res.data.pontos);
                  // console.log(res.data.time.nome + " " + res.data.pontos)              
                  items.sort((a, b) => (a.pts <= b.pts) ? 1 : -1)
                  setItems([...items], items);
                  // console.log(element.name + " " + element.pts)
                }   
              }
            )                                         
          }catch(error) {
          console.log(error.response)
          }
        }        
      });    
    }
  }    
  
  useState(() => {
    refreshData();
  }, [])
  

  useEffect(() => {
    const interval = setInterval(() => {      
      refreshData()
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <View style={{ flex:1 }}>
            
      <FlatGrid
        itemDimension={Dimensions.get('window').width}              
        data={items}
        style={styles.gridView}
        backgroundColor="#008000"
        showsVerticalScrollIndicator={false}
        spacing={5}
        renderItem={({ item, items }) => (     
          

          <View style={{ flexDirection: 'row'}}>

            
            <View style={[styles.itemContainer, {shadowColor: item.backgroundColor, marginHorizontal: Dimensions.get('window').width*0.03 ,backgroundColor: item.backgroundColor, width: Dimensions.get('window').width*0.8 }]}>                          
              <Text style = {[styles.itemName, {color: item.textColor}]}>{item.name}</Text>                      
            </View>

            <Image source={item.slug} style = {{marginVertical: Dimensions.get('window').height*-0.001 ,marginHorizontal: Dimensions.get('window').width*-0.01, position: 'absolute', height: Dimensions.get('window').width*0.07, width: Dimensions.get('window').width*0.07, resizeMode : 'stretch'}}/>

            <View style={[styles.itemContainer, {shadowColor: item.backgroundColor, marginHorizontal: Dimensions.get('window').width*-0.022, backgroundColor: item.backgroundColor, width: Dimensions.get('window').width*0.14 }]}>
              <Text style={[styles.itemName, {color: item.pointsColor}]}>{item.pts}</Text>          
            </View>

          </View>          
        )}
      />
      <ActionButton
        buttonColor="#000"
        onPress={() => {
           refreshData() ;
          } }
        buttonText= "↻"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  gridView: {    
    flex: 1,
  },
  itemContainer: {
    justifyContent: 'center',
    borderRadius: 3,
    padding: 5,
    height: Dimensions.get('window').width*0.08,
    alignItems: "center",  

    // shadowOffset: {
    //   width: 3,
    //   height: 3,
    // },
    // shadowOpacity: 0.8,
    // shadowRadius: 3.46,
    // elevation: 5,

    // opacity: 0.9,    
    margin: 1
  },
  itemName: {
    fontSize: 18,
    fontWeight: '600'    
  }
  
});

