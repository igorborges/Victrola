import React, { useEffect, useState, useCallback } from 'react';
import { Dimensions, TouchableHighlight, Button, SafeAreaView, RefreshControl, DatePickerAndroid, ToastAndroid } from 'react-native';
import { StyleSheet, Image, View, Text } from 'react-native';
import { FlatGrid } from 'react-native-super-grid';
import axios from 'axios';
export const loaderRef = React.createRef();
import PTRView from 'react-native-pull-to-refresh';
import Modal from 'react-native-modal';



export default function Example() {
  var header = "Classificação Rodada: "
  var rodada_atual = 0
  const [items, setItems] = React.useState([
    { name: "", backgroundColor: "#008000", textColor: "#008000", pointsColor: "#008000", id: 0, pts: 10001 },
    { name: header + rodada_atual, backgroundColor: "#008000", textColor: "#fff", pointsColor: "#008000", id: 0, pts: 10000 },

    { name: "5prastantas F.C.", slug: require("../../assets/escudos/5prastantas-f-c.png"), backgroundColor: "#808080", textColor: "#ffffff", pointsColor: "#ffffff", id: 13945827, maiorPontuacao: 68, pontuacaoUltimaRodada: 34, pts: 0, atletas: [], pegouAtletas: false, numAtletasPontuando: 0, capitaoId: 0, distrital: false },
    { name: "AA AZULAO DO SUL", slug: require("../../assets/escudos/aa-azulao-do-sul.png"), backgroundColor: "#ff241d", textColor: "#063780", pointsColor: "#063780", id: 6717458, maiorPontuacao: 35, pontuacaoUltimaRodada: 35, pts: 0, atletas: [], pegouAtletas: false, numAtletasPontuando: 0, capitaoId: 0, distrital: false },
    { name: "Akuma Sport Club", slug: require("../../assets/escudos/akuma-sport-club.png"), backgroundColor: "#ffffff", textColor: "#000000", pointsColor: "#000000", id: 483335, maiorPontuacao: 63, pontuacaoUltimaRodada: 38, pts: 0, atletas: [], pegouAtletas: false, numAtletasPontuando: 0, capitaoId: 0, distrital: false },
    { name: "Atleticado", slug: require("../../assets/escudos/atleticado.png"), backgroundColor: "#4d004d", textColor: "#0066ff", pointsColor: "#0066ff", id: 661306, maiorPontuacao: 65, pontuacaoUltimaRodada: 21, pts: 0, atletas: [], pegouAtletas: false, numAtletasPontuando: 0, capitaoId: 0, distrital: false },
    { name: "Balacubacu FC", slug: require("../../assets/escudos/balacubacu-fc.png"), backgroundColor: "#000000", textColor: "#808080", pointsColor: "#808080", id: 3170764, maiorPontuacao: 70, pontuacaoUltimaRodada: 44, pts: 0, atletas: [], pegouAtletas: false, numAtletasPontuando: 0, capitaoId: 0, distrital: false },
    { name: "Bigode De Cartola", slug: require("../../assets/escudos/bigode-de-cartola.png"), backgroundColor: "#997a00", textColor: "#ffffff", pointsColor: "#ffffff", id: 987444, maiorPontuacao: 65, pontuacaoUltimaRodada: 41, pts: 0, atletas: [], pegouAtletas: false, numAtletasPontuando: 0, capitaoId: 0, distrital: false },
    { name: "BOUGERS", slug: require("../../assets/escudos/bougers.png"), backgroundColor: "#ff241d", textColor: "#000000", pointsColor: "#000000", id: 2835988, maiorPontuacao: 35, pontuacaoUltimaRodada: 17, pts: 0, atletas: [], pegouAtletas: false, numAtletasPontuando: 0, capitaoId: 0, distrital: false },
    { name: "Calambau Beer", slug: require("../../assets/escudos/calambau-beer.png"), backgroundColor: "#000000", textColor: "#ffffff", pointsColor: "#ffffff", id: 253542, maiorPontuacao: 45, pontuacaoUltimaRodada: 45, pts: 0, atletas: [], pegouAtletas: false, numAtletasPontuando: 0, capitaoId: 0, distrital: false },
    { name: "Cangaceiros BF", slug: require("../../assets/escudos/cangaceiros-bf.png"), backgroundColor: "#000000", textColor: "#19ff81", pointsColor: "#19ff81", id: 4554581, maiorPontuacao: 50, pontuacaoUltimaRodada: 48, pts: 0, atletas: [], pegouAtletas: false, numAtletasPontuando: 0, capitaoId: 0, distrital: false },
    { name: "ChristoFlamengo", slug: require("../../assets/escudos/christoflamengo.png"), backgroundColor: "#bf1d17", textColor: "#000000", pointsColor: "#000000", id: 1540816, maiorPontuacao: 36, pontuacaoUltimaRodada: 36, pts: 0, atletas: [], pegouAtletas: false, numAtletasPontuando: 0, capitaoId: 0, distrital: false },
    { name: "Código Fonte F.C", slug: require("../../assets/escudos/codigo-fonte-f-c.png"), backgroundColor: "#ffffff", textColor: "#063780", pointsColor: "#063780", id: 2489031, maiorPontuacao: 98, pontuacaoUltimaRodada: 98, pts: 0, atletas: [], pegouAtletas: false, numAtletasPontuando: 0, capitaoId: 0, distrital: false },
    { name: "Edu 07 Araxá", slug: require("../../assets/escudos/edu-07-araxa.png"), backgroundColor: "#808080", textColor: "#ffffff", pointsColor: "#ffffff", id: 1225635, maiorPontuacao: 66, pontuacaoUltimaRodada: 54, pts: 0, atletas: [], pegouAtletas: false, numAtletasPontuando: 0, capitaoId: 0, distrital: false },
    { name: "El mordedô", slug: require("../../assets/escudos/el-mordedo.png"), backgroundColor: "#4d004d", textColor: "#00cc5c", pointsColor: "#00cc5c", id: 25856343, maiorPontuacao: 75, pontuacaoUltimaRodada: 46, pts: 0, atletas: [], pegouAtletas: false, numAtletasPontuando: 0, capitaoId: 0, distrital: false },
    { name: "Ganso Doido", slug: require("../../assets/escudos/ganso-doido.png"), backgroundColor: "#bf1d17", textColor: "#063780", pointsColor: "#063780", id: 90144, maiorPontuacao: 54, pontuacaoUltimaRodada: 10, pts: 0, atletas: [], pegouAtletas: false, numAtletasPontuando: 0, capitaoId: 0, distrital: false },
    { name: "GastroNeles", slug: require("../../assets/escudos/gastroneles.png"), backgroundColor: "#000000", textColor: "#ffffff", pointsColor: "#ffffff", id: 3438042, maiorPontuacao: 60, pontuacaoUltimaRodada: 32, pts: 0, atletas: [], pegouAtletas: false, numAtletasPontuando: 0, capitaoId: 0, distrital: false },
    { name: "Golog", slug: require("../../assets/escudos/golog.png"), backgroundColor: "#000000", textColor: "#ffcb00", pointsColor: "#ffcb00", id: 25872151, maiorPontuacao: 49, pontuacaoUltimaRodada: 49, pts: 0, atletas: [], pegouAtletas: false, numAtletasPontuando: 0, capitaoId: 0, distrital: false },
    { name: "Leozito Neves FC", slug: require("../../assets/escudos/leozito-neves-fc.png"), backgroundColor: "#000000", textColor: "#bf1d17", pointsColor: "#bf1d17", id: 4528687, maiorPontuacao: 34, pontuacaoUltimaRodada: 19, pts: 0, atletas: [], pegouAtletas: false, numAtletasPontuando: 0, capitaoId: 0, distrital: false },
    { name: "MBM Football", slug: require("../../assets/escudos/mbm-football.png"), backgroundColor: "#ffffff", textColor: "#000000", pointsColor: "#000000", id: 8869919, maiorPontuacao: 69, pontuacaoUltimaRodada: 45, pts: 0, atletas: [], pegouAtletas: false, numAtletasPontuando: 0, capitaoId: 0, distrital: false },
    { name: "Menino Esperto F. C.", slug: require("../../assets/escudos/menino-esperto-f-c.png"), backgroundColor: "#000000", textColor: "#ffcb00", pointsColor: "#ffcb00", id: 7875842, maiorPontuacao: 56, pontuacaoUltimaRodada: 39, pts: 0, atletas: [], pegouAtletas: false, numAtletasPontuando: 0, capitaoId: 0, distrital: false },
    { name: "Meninos do Maudi", slug: require("../../assets/escudos/meninos-do-maudi.png"), backgroundColor: "#000000", textColor: "#ffffff", pointsColor: "#ffffff", id: 1179838, maiorPontuacao: 55, pontuacaoUltimaRodada: 51, pts: 0, atletas: [], pegouAtletas: false, numAtletasPontuando: 0, capitaoId: 0, distrital: false },
    { name: "MGuto FC", slug: require("../../assets/escudos/mguto-fc.png"), backgroundColor: "#000000", textColor: "#ff241d", pointsColor: "#ff241d", id: 832153, maiorPontuacao: 54, pontuacaoUltimaRodada: 33, pts: 0, atletas: [], pegouAtletas: false, numAtletasPontuando: 0, capitaoId: 0, distrital: false },
    { name: "Palla Sports", slug: require("../../assets/escudos/palla-sports.png"), backgroundColor: "#808080", textColor: "#ff7400", pointsColor: "#ff7400", id: 623570, maiorPontuacao: 50, pontuacaoUltimaRodada: 50, pts: 0, atletas: [], pegouAtletas: false, numAtletasPontuando: 0, capitaoId: 0, distrital: false },
    { name: "Pyranha", slug: require("../../assets/escudos/pyranha.png"), backgroundColor: "#e65ce6", textColor: "#000000", pointsColor: "#000000", id: 1135503, maiorPontuacao: 42, pontuacaoUltimaRodada: 39, pts: 0, atletas: [], pegouAtletas: false, numAtletasPontuando: 0, capitaoId: 0, distrital: false },
    { name: "WolvenFootball", slug: require("../../assets/escudos/wolvenfootball.png"), backgroundColor: "#ffffff", textColor: "#0a6634", pointsColor: "#0a6634", id: 634335, maiorPontuacao: 62, pontuacaoUltimaRodada: 30, pts: 0, atletas: [], pegouAtletas: false, numAtletasPontuando: 0, capitaoId: 0, distrital: false },
    { name: "Sei de tudo e não ganho nada FC", slug: require("../../assets/escudos/sei-de-tudo-e-nao-ganho-nada-fc.png"), backgroundColor: "#ff241d", textColor: "#19ff81", pointsColor: "#19ff81", id: 749772, maiorPontuacao: 51, pontuacaoUltimaRodada: 41, pts: 0, atletas: [], pegouAtletas: false, numAtletasPontuando: 0, capitaoId: 0, distrital: false },
    { name: "Sheik Tosado FC", slug: require("../../assets/escudos/sheik-tosado-fc.png"), backgroundColor: "#ff241d", textColor: "#000000", pointsColor: "#000000", id: 13951041, maiorPontuacao: 56, pontuacaoUltimaRodada: 49, pts: 0, atletas: [], pegouAtletas: false, numAtletasPontuando: 0, capitaoId: 0, distrital: false },
    { name: "sinceridade: qualidade maldita!", slug: require("../../assets/escudos/sinceridade-qualidade-maldita.png"), backgroundColor: "#000000", textColor: "#bf1d17", pointsColor: "#bf1d17", id: 5342721, maiorPontuacao: 57, pontuacaoUltimaRodada: 57, pts: 0, atletas: [], pegouAtletas: false, numAtletasPontuando: 0, capitaoId: 0, distrital: false },
    { name: "Skalabuta FC", slug: require("../../assets/escudos/skalabuta-fc.png"), backgroundColor: "#000000", textColor: "#ffffff", pointsColor: "#ffffff", id: 25871781, maiorPontuacao: 63, pontuacaoUltimaRodada: 48, pts: 0, atletas: [], pegouAtletas: false, numAtletasPontuando: 0, capitaoId: 0, distrital: false },
    { name: "Sporting Draga", slug: require("../../assets/escudos/sporting-draga.png"), backgroundColor: "#000000", textColor: "#ff241d", pointsColor: "#ff241d", id: 810144, maiorPontuacao: 60, pontuacaoUltimaRodada: 48, pts: 0, atletas: [], pegouAtletas: false, numAtletasPontuando: 0, capitaoId: 0, distrital: false },
    { name: "Tangamandapiense Social Clube", slug: require("../../assets/escudos/tangamandapiense-social-clube.png"), backgroundColor: "#ffffff", textColor: "#4d004d", pointsColor: "#4d004d", id: 25867159, maiorPontuacao: 78, pontuacaoUltimaRodada: 78, pts: 0, atletas: [], pegouAtletas: false, numAtletasPontuando: 0, capitaoId: 0, distrital: false },
    { name: "tarcisiospfc", slug: require("../../assets/escudos/tarcisiospfc.png"), backgroundColor: "#ff241d", textColor: "#ffffff", pointsColor: "#ffffff", id: 8917, maiorPontuacao: 50, pontuacaoUltimaRodada: 50, pts: 0, atletas: [], pegouAtletas: false, numAtletasPontuando: 0, capitaoId: 0, distrital: false },
    { name: "Time do Igor FC", slug: require("../../assets/escudos/time-do-igor-fc.png"), backgroundColor: "#ffcb00", textColor: "#000000", pointsColor: "#000000", id: 1160952, maiorPontuacao: 75, pontuacaoUltimaRodada: 27, pts: 0, atletas: [], pegouAtletas: false, numAtletasPontuando: 0, capitaoId: 0, distrital: false },
    { name: "U.C. Leões de Judá", slug: require("../../assets/escudos/u-c-leoes-de-juda.png"), backgroundColor: "#000000", textColor: "#ffcb00", pointsColor: "#ffcb00", id: 14972226, maiorPontuacao: 47, pontuacaoUltimaRodada: 44, pts: 0, atletas: [], pegouAtletas: false, numAtletasPontuando: 0, capitaoId: 0, distrital: false },
    { name: "vernochi82", slug: require("../../assets/escudos/vernochi82.png"), backgroundColor: "#a64b00", textColor: "#ff241d", pointsColor: "#ff241d", id: 25584876, maiorPontuacao: 56, pontuacaoUltimaRodada: 56, pts: 0, atletas: [], pegouAtletas: false, numAtletasPontuando: 0, capitaoId: 0, distrital: false },
    { name: "Victrola F.C.", slug: require("../../assets/escudos/victrola-f-c.png"), backgroundColor: "#808080", textColor: "#bf1d17", pointsColor: "#bf1d17", id: 13946184, maiorPontuacao: 55, pontuacaoUltimaRodada: 19, pts: 0, atletas: [], pegouAtletas: false, numAtletasPontuando: 0, capitaoId: 0, distrital: false },
    { name: "VilãoFC", slug: require("../../assets/escudos/vilaofc.png"), backgroundColor: "#000000", textColor: "#ffffff", pointsColor: "#ffffff", id: 2370283, maiorPontuacao: 68, pontuacaoUltimaRodada: 58, pts: 0, atletas: [], pegouAtletas: false, numAtletasPontuando: 0, capitaoId: 0, distrital: false },
    { name: "OTOPATAMAR cc", slug: require("../../assets/escudos/otopatamar-cc.png"), backgroundColor: "#000000", textColor: "#bf1d17", pointsColor: "#bf1d17", id: 26126210, maiorPontuacao: 64, pontuacaoUltimaRodada: 45, pts: 0, atletas: [], pegouAtletas: false, numAtletasPontuando: 0, capitaoId: 0, distrital: true },
    { name: "Victao Futebol Clube", slug: require("../../assets/escudos/victao-futebol-clube.png"), backgroundColor: "#ffcb00", textColor: "#063780", pointsColor: "#063780", id: 2571803, maiorPontuacao: 15, pontuacaoUltimaRodada: 15, pts: 0, atletas: [], pegouAtletas: false, numAtletasPontuando: 0, capitaoId: 0, distrital: true },

    // { name: "", backgroundColor: "#008000", textColor: "#008000", pointsColor: "#008000", id: 0, pts: -100 },
    // { name: "", backgroundColor: "#008000", textColor: "#008000", pointsColor: "#008000", id: 0, pts: -101 },        
  ]);

  var status = 1
  async function refreshData() {
    // console.log("------entrou aqui---------------")
    // axios.get("https://cartolaigor-pjzxn.hoverfly.io/mercado/status")    
    await axios.get("https://api.cartolafc.globo.com/mercado/status")
      .then(res => {
        status = res.data.status_mercado;
        rodada_atual = res.data.rodada_atual
        items[1].name = header + rodada_atual
        setItems([...items], items);
      });

    if (status == 2) {
      // console.log("------entrou aqui2---------------")

      setTimeout(function () {
        axios.get("https://api.cartolafc.globo.com/atletas/pontuados")
          .then(responseAtletas => {
            // console.log(responseAtletas.data)
            atletasPontuando = responseAtletas.data.atletas;
            // console.log(atletasPontuando)
          });
      }, 500);

      // console.log(atletasPontuando)
      items.forEach(element => {

        items.sort((a, b) => (a.pts <= b.pts) ? 1 : -1)
        if (element.id != 0) {
          try {
            setTimeout(function () {
              if (!element.pegouAtletas) {
                axios.get("https://api.cartolafc.globo.com/time/id/" + element.id + "/" + rodada_atual)
                  .then(res => {
                    // console.log(res.status)
                    if (res.status == 200) {
                      res.data.atletas.forEach(atleta => {
                        element.atletas.push(atleta.atleta_id)
                      })
                      element.pegouAtletas = true
                      element.capitaoId = res.data.capitao_id;
                      setItems([...items], items);
                    }
                  })
              }

            }, 500);
            setTimeout(function () {

              if (element.pegouAtletas) {
                element.pts = 0;
                element.numAtletasPontuando = 0;
                element.atletas.forEach(atleta => {
                  try {
                    element.pts += atletasPontuando[atleta].pontuacao;
                    element.numAtletasPontuando += 1;
                  } catch { }
                })

                try {
                  element.pts += atletasPontuando[element.capitaoId].pontuacao;
                } catch { }
                element.pts = parseInt(element.pts)
                items.sort((a, b) => (a.pts <= b.pts) ? 1 : -1)
                setItems([...items], items);
              }
            }, 1000);
          } catch (error) {
            console.log("caiu no catch")
          }
        }
      });
    }
    else {
      items.forEach(equipe => {
        if (equipe.id != 0) {
          equipe.pontuacaoUltimaRodada = equipe.pts;
          if (equipe.pts > equipe.maiorPontuacao) {
            equipe.maiorPontuacao = equipe.pts;
          }
          equipe.atletas = [];
          equipe.pegouAtletas = false;
          equipe.numAtletasPontuando = 0;

          setItems([...items], items);
        }
      })
    }
  }
  // useState(() => {
  //   refreshData();
  // }, [])


  useEffect(() => {
    refreshData()
  }, []);

  return (
    <PTRView style={{ backgroundColor: "#008000" }} onRefresh={function () {
      return new Promise((resolve) => {
        refreshData();
        setTimeout(() => { resolve() }, 2000)
      });
    }} >
      <View style={{ flex: 1 }}>

        <FlatGrid
          itemDimension={Dimensions.get('window').width}
          data={items}
          style={styles.gridView}
          backgroundColor="#008000"
          showsVerticalScrollIndicator={false}
          spacing={5}
          renderItem={({ item, index }) => (

            <View style={{ flexDirection: 'row' }}>

              {/* Indices */}
              <View style={[styles.itemContainer, { borderColor: item.pointsColor, backgroundColor: item.backgroundColor, width: Dimensions.get('window').width * 0.08 }]}>
                <Text style={[styles.itemName, { fontSize: 15, color: item.pointsColor }]}>{index - 1}</Text>
              </View>

              {/* Nome dos times */}
              <View style={[styles.itemContainer, { borderColor: item.pointsColor, marginHorizontal: Dimensions.get('window').width * 0.003, backgroundColor: item.backgroundColor, width: Dimensions.get('window').width * 0.74 }]}>
                <Text style={[styles.itemName, { color: item.textColor }]}>{item.name}</Text>
              </View>

              {/* Escudo dos times */}
              <Image source={item.slug} style={{ marginVertical: Dimensions.get('window').height * -0.001, marginHorizontal: Dimensions.get('window').width * 0.06, position: 'absolute', height: Dimensions.get('window').width * 0.07, width: Dimensions.get('window').width * 0.07, resizeMode: 'stretch' }} />

              {/* Pontuacao dos times */}
              <View style={[styles.itemContainer, { borderColor: item.pointsColor, shadowColor: item.backgroundColor, marginHorizontal: Dimensions.get('window').width * 0.003, backgroundColor: item.backgroundColor, width: Dimensions.get('window').width * 0.14 }]}>
                <Text style={[styles.itemName, { color: item.pointsColor }]}>{item.pts}</Text>
              </View>

              {/* Num de atletas pontuando */}
              <View style={[item.pts < 1000 ? { borderColor: item.backgroundColor, borderWidth: 1, justifyContent: 'center', alignItems: "center", borderRadius: 100, position: 'absolute', marginVertical: Dimensions.get('window').height * 0.02, marginHorizontal: Dimensions.get('window').width * 0.82, backgroundColor: item.textColor, width: Dimensions.get('window').width * 0.05, height: Dimensions.get('window').width * 0.05 } : {}]}>
                <Text style={[styles.itemName, { fontSize: 10, color: item.backgroundColor }]}>{item.numAtletasPontuando}</Text>
              </View>

            </View>
          )}
        />

      </View>
    </PTRView>
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
    height: Dimensions.get('window').width * 0.08,
    alignItems: "center",
    borderWidth: 1,    

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
    fontSize: 16.5,
    fontWeight: '600'
  }

});

