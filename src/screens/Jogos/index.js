import React, { useEffect, useState, useCallback } from 'react';
import { Dimensions, SafeAreaView, RefreshControl, DatePickerAndroid, ToastAndroid } from 'react-native';
import { StyleSheet, Image, View, Text } from 'react-native';
import { FlatGrid } from 'react-native-super-grid';
import axios from 'axios';
export const loaderRef = React.createRef();
import PTRView from 'react-native-pull-to-refresh';
import { ForceTouchGestureHandler } from 'react-native-gesture-handler';



export default function Example() {

  const coresPorSerie = ["#366092", "#953734", "#76923c", "#fabf8f", "#5f497a", "#a69b62"];
  const contadorDeCores = [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 5, 5, 5, 5, 5, 5];
  var header = "Classificação por Série"
  var rodada_atual = 0
  const [items, setItems] = React.useState([
    { name: "", backgroundColor: "#008000", textColor: "#008000", pointsColor: "#008000", id: 0, pts: 10001 },
    { name: header, backgroundColor: "#008000", textColor: "#fff", pointsColor: "#008000", id: 0, pts: 10000 },

    { serie: "A", rodada: 4, nameHome: "5prastantas F.C.", slugHome: require("../../assets/escudos/5prastantas-f-c.png"), backgroundColorHome: "#808080", textColorHome: "#ffffff", pointsColorHome: "#ffffff", idHome: 13945827, pontuacaoUltimaRodadaHome: 34, ptsHome: 0, atletasHome: [], pegouAtletasHome: false , numAtletasPontuandoHome: 0, capitaoIdHome: 0, nameAway: "AA AZULAO DO SUL", slugAway: require("../../assets/escudos/aa-azulao-do-sul.png"), backgroundColorAway: "#ff241d", textColorAway: "#063780", pointsColorAway: "#063780", idAway: 13945827, pontuacaoUltimaRodadaAway: 35, ptsAway: 0, atletasAway: [], pegouAtletasAway: false , numAtletasPontuandoAway: 0, capitaoIdAway: 0},
    { serie: "A", rodada: 4, nameHome: "Akuma Sport Club", slugHome: require("../../assets/escudos/akuma-sport-club.png"), backgroundColorHome: "#ffffff", textColorHome: "#000000", pointsColorHome: "#000000", idHome: 483335, pontuacaoUltimaRodadaHome: 38, ptsHome: 0, atletasHome: [], pegouAtletasHome: false , numAtletasPontuandoHome: 0, capitaoIdHome: 0, nameAway: "Atleticado", slugAway: require("../../assets/escudos/atleticado.png"), backgroundColorAway: "#4d004d", textColorAway: "#0066ff", pointsColorAway: "#0066ff", idAway: 483335, pontuacaoUltimaRodadaAway: 21, ptsAway: 0, atletasAway: [], pegouAtletasAway: false , numAtletasPontuandoAway: 0, capitaoIdAway: 0},
    { serie: "A", rodada: 4, nameHome: "Balacubacu FC", slugHome: require("../../assets/escudos/balacubacu-fc.png"), backgroundColorHome: "#000000", textColorHome: "#808080", pointsColorHome: "#808080", idHome: 3170764, pontuacaoUltimaRodadaHome: 44, ptsHome: 0, atletasHome: [], pegouAtletasHome: false , numAtletasPontuandoHome: 0, capitaoIdHome: 0, nameAway: "Bigode De Cartola", slugAway: require("../../assets/escudos/bigode-de-cartola.png"), backgroundColorAway: "#997a00", textColorAway: "#ffffff", pointsColorAway: "#ffffff", idAway: 3170764, pontuacaoUltimaRodadaAway: 41, ptsAway: 0, atletasAway: [], pegouAtletasAway: false , numAtletasPontuandoAway: 0, capitaoIdAway: 0},
    { serie: "B", rodada: 4, nameHome: "BOUGERS", slugHome: require("../../assets/escudos/bougers.png"), backgroundColorHome: "#ff241d", textColorHome: "#000000", pointsColorHome: "#000000", idHome: 2835988, pontuacaoUltimaRodadaHome: 17, ptsHome: 0, atletasHome: [], pegouAtletasHome: false , numAtletasPontuandoHome: 0, capitaoIdHome: 0, nameAway: "Calambau Beer", slugAway: require("../../assets/escudos/calambau-beer.png"), backgroundColorAway: "#000000", textColorAway: "#ffffff", pointsColorAway: "#ffffff", idAway: 2835988, pontuacaoUltimaRodadaAway: 45, ptsAway: 0, atletasAway: [], pegouAtletasAway: false , numAtletasPontuandoAway: 0, capitaoIdAway: 0},
    { serie: "B", rodada: 4, nameHome: "Cangaceiros BF", slugHome: require("../../assets/escudos/cangaceiros-bf.png"), backgroundColorHome: "#000000", textColorHome: "#19ff81", pointsColorHome: "#19ff81", idHome: 4554581, pontuacaoUltimaRodadaHome: 48, ptsHome: 0, atletasHome: [], pegouAtletasHome: false , numAtletasPontuandoHome: 0, capitaoIdHome: 0, nameAway: "ChristoFlamengo", slugAway: require("../../assets/escudos/christoflamengo.png"), backgroundColorAway: "#bf1d17", textColorAway: "#000000", pointsColorAway: "#000000", idAway: 4554581, pontuacaoUltimaRodadaAway: 36, ptsAway: 0, atletasAway: [], pegouAtletasAway: false , numAtletasPontuandoAway: 0, capitaoIdAway: 0},
    { serie: "B", rodada: 4, nameHome: "Código Fonte F.C", slugHome: require("../../assets/escudos/codigo-fonte-f-c.png"), backgroundColorHome: "#ffffff", textColorHome: "#063780", pointsColorHome: "#063780", idHome: 2489031, pontuacaoUltimaRodadaHome: 98, ptsHome: 0, atletasHome: [], pegouAtletasHome: false , numAtletasPontuandoHome: 0, capitaoIdHome: 0, nameAway: "Edu 07 Araxá", slugAway: require("../../assets/escudos/edu-07-araxa.png"), backgroundColorAway: "#808080", textColorAway: "#ffffff", pointsColorAway: "#ffffff", idAway: 2489031, pontuacaoUltimaRodadaAway: 54, ptsAway: 0, atletasAway: [], pegouAtletasAway: false , numAtletasPontuandoAway: 0, capitaoIdAway: 0},
    { serie: "C", rodada: 4, nameHome: "El mordedô", slugHome: require("../../assets/escudos/el-mordedo.png"), backgroundColorHome: "#4d004d", textColorHome: "#00cc5c", pointsColorHome: "#00cc5c", idHome: 25856343, pontuacaoUltimaRodadaHome: 46, ptsHome: 0, atletasHome: [], pegouAtletasHome: false , numAtletasPontuandoHome: 0, capitaoIdHome: 0, nameAway: "Ganso Doido", slugAway: require("../../assets/escudos/ganso-doido.png"), backgroundColorAway: "#bf1d17", textColorAway: "#063780", pointsColorAway: "#063780", idAway: 25856343, pontuacaoUltimaRodadaAway: 10, ptsAway: 0, atletasAway: [], pegouAtletasAway: false , numAtletasPontuandoAway: 0, capitaoIdAway: 0},
    { serie: "C", rodada: 4, nameHome: "GastroNeles", slugHome: require("../../assets/escudos/gastroneles.png"), backgroundColorHome: "#000000", textColorHome: "#ffffff", pointsColorHome: "#ffffff", idHome: 3438042, pontuacaoUltimaRodadaHome: 32, ptsHome: 0, atletasHome: [], pegouAtletasHome: false , numAtletasPontuandoHome: 0, capitaoIdHome: 0, nameAway: "Golog", slugAway: require("../../assets/escudos/golog.png"), backgroundColorAway: "#000000", textColorAway: "#ffcb00", pointsColorAway: "#ffcb00", idAway: 3438042, pontuacaoUltimaRodadaAway: 49, ptsAway: 0, atletasAway: [], pegouAtletasAway: false , numAtletasPontuandoAway: 0, capitaoIdAway: 0},
    { serie: "C", rodada: 4, nameHome: "Leozito Neves FC", slugHome: require("../../assets/escudos/leozito-neves-fc.png"), backgroundColorHome: "#000000", textColorHome: "#bf1d17", pointsColorHome: "#bf1d17", idHome: 4528687, pontuacaoUltimaRodadaHome: 19, ptsHome: 0, atletasHome: [], pegouAtletasHome: false , numAtletasPontuandoHome: 0, capitaoIdHome: 0, nameAway: "MBM Football", slugAway: require("../../assets/escudos/mbm-football.png"), backgroundColorAway: "#ffffff", textColorAway: "#000000", pointsColorAway: "#000000", idAway: 4528687, pontuacaoUltimaRodadaAway: 45, ptsAway: 0, atletasAway: [], pegouAtletasAway: false , numAtletasPontuandoAway: 0, capitaoIdAway: 0},
    { serie: "D", rodada: 4, nameHome: "Menino Esperto F. C.", slugHome: require("../../assets/escudos/menino-esperto-f-c.png"), backgroundColorHome: "#000000", textColorHome: "#ffcb00", pointsColorHome: "#ffcb00", idHome: 7875842, pontuacaoUltimaRodadaHome: 39, ptsHome: 0, atletasHome: [], pegouAtletasHome: false , numAtletasPontuandoHome: 0, capitaoIdHome: 0, nameAway: "Meninos do Maudi", slugAway: require("../../assets/escudos/meninos-do-maudi.png"), backgroundColorAway: "#000000", textColorAway: "#ffffff", pointsColorAway: "#ffffff", idAway: 7875842, pontuacaoUltimaRodadaAway: 51, ptsAway: 0, atletasAway: [], pegouAtletasAway: false , numAtletasPontuandoAway: 0, capitaoIdAway: 0},
    { serie: "D", rodada: 4, nameHome: "MGuto FC", slugHome: require("../../assets/escudos/mguto-fc.png"), backgroundColorHome: "#000000", textColorHome: "#ff241d", pointsColorHome: "#ff241d", idHome: 832153, pontuacaoUltimaRodadaHome: 33, ptsHome: 0, atletasHome: [], pegouAtletasHome: false , numAtletasPontuandoHome: 0, capitaoIdHome: 0, nameAway: "Palla Sports", slugAway: require("../../assets/escudos/palla-sports.png"), backgroundColorAway: "#808080", textColorAway: "#ff7400", pointsColorAway: "#ff7400", idAway: 832153, pontuacaoUltimaRodadaAway: 50, ptsAway: 0, atletasAway: [], pegouAtletasAway: false , numAtletasPontuandoAway: 0, capitaoIdAway: 0},
    { serie: "D", rodada: 4, nameHome: "Pyranha", slugHome: require("../../assets/escudos/pyranha.png"), backgroundColorHome: "#e65ce6", textColorHome: "#000000", pointsColorHome: "#000000", idHome: 1135503, pontuacaoUltimaRodadaHome: 39, ptsHome: 0, atletasHome: [], pegouAtletasHome: false , numAtletasPontuandoHome: 0, capitaoIdHome: 0, nameAway: "WolvenFootball", slugAway: require("../../assets/escudos/wolvenfootball.png"), backgroundColorAway: "#ffffff", textColorAway: "#0a6634", pointsColorAway: "#0a6634", idAway: 1135503, pontuacaoUltimaRodadaAway: 30, ptsAway: 0, atletasAway: [], pegouAtletasAway: false , numAtletasPontuandoAway: 0, capitaoIdAway: 0},
    { serie: "E", rodada: 4, nameHome: "Sei de tudo e não ganho nada FC", slugHome: require("../../assets/escudos/sei-de-tudo-e-nao-ganho-nada-fc.png"), backgroundColorHome: "#ff241d", textColorHome: "#19ff81", pointsColorHome: "#19ff81", idHome: 749772, pontuacaoUltimaRodadaHome: 41, ptsHome: 0, atletasHome: [], pegouAtletasHome: false , numAtletasPontuandoHome: 0, capitaoIdHome: 0, nameAway: "Sheik Tosado FC", slugAway: require("../../assets/escudos/sheik-tosado-fc.png"), backgroundColorAway: "#ff241d", textColorAway: "#000000", pointsColorAway: "#000000", idAway: 749772, pontuacaoUltimaRodadaAway: 49, ptsAway: 0, atletasAway: [], pegouAtletasAway: false , numAtletasPontuandoAway: 0, capitaoIdAway: 0},
    { serie: "E", rodada: 4, nameHome: "sinceridade: qualidade maldita!", slugHome: require("../../assets/escudos/sinceridade-qualidade-maldita.png"), backgroundColorHome: "#000000", textColorHome: "#bf1d17", pointsColorHome: "#bf1d17", idHome: 5342721, pontuacaoUltimaRodadaHome: 57, ptsHome: 0, atletasHome: [], pegouAtletasHome: false , numAtletasPontuandoHome: 0, capitaoIdHome: 0, nameAway: "Skalabuta FC", slugAway: require("../../assets/escudos/skalabuta-fc.png"), backgroundColorAway: "#000000", textColorAway: "#ffffff", pointsColorAway: "#ffffff", idAway: 5342721, pontuacaoUltimaRodadaAway: 48, ptsAway: 0, atletasAway: [], pegouAtletasAway: false , numAtletasPontuandoAway: 0, capitaoIdAway: 0},
    { serie: "E", rodada: 4, nameHome: "Sporting Draga", slugHome: require("../../assets/escudos/sporting-draga.png"), backgroundColorHome: "#000000", textColorHome: "#ff241d", pointsColorHome: "#ff241d", idHome: 810144, pontuacaoUltimaRodadaHome: 48, ptsHome: 0, atletasHome: [], pegouAtletasHome: false , numAtletasPontuandoHome: 0, capitaoIdHome: 0, nameAway: "Tangamandapiense Social Clube", slugAway: require("../../assets/escudos/tangamandapiense-social-clube.png"), backgroundColorAway: "#ffffff", textColorAway: "#4d004d", pointsColorAway: "#4d004d", idAway: 810144, pontuacaoUltimaRodadaAway: 78, ptsAway: 0, atletasAway: [], pegouAtletasAway: false , numAtletasPontuandoAway: 0, capitaoIdAway: 0},
    { serie: "F", rodada: 4, nameHome: "tarcisiospfc", slugHome: require("../../assets/escudos/tarcisiospfc.png"), backgroundColorHome: "#ff241d", textColorHome: "#ffffff", pointsColorHome: "#ffffff", idHome: 8917, pontuacaoUltimaRodadaHome: 50, ptsHome: 0, atletasHome: [], pegouAtletasHome: false , numAtletasPontuandoHome: 0, capitaoIdHome: 0, nameAway: "Time do Igor FC", slugAway: require("../../assets/escudos/time-do-igor-fc.png"), backgroundColorAway: "#ffcb00", textColorAway: "#000000", pointsColorAway: "#000000", idAway: 8917, pontuacaoUltimaRodadaAway: 27, ptsAway: 0, atletasAway: [], pegouAtletasAway: false , numAtletasPontuandoAway: 0, capitaoIdAway: 0},
    { serie: "F", rodada: 4, nameHome: "U.C. Leões de Judá", slugHome: require("../../assets/escudos/u-c-leoes-de-juda.png"), backgroundColorHome: "#000000", textColorHome: "#ffcb00", pointsColorHome: "#ffcb00", idHome: 14972226, pontuacaoUltimaRodadaHome: 44, ptsHome: 0, atletasHome: [], pegouAtletasHome: false , numAtletasPontuandoHome: 0, capitaoIdHome: 0, nameAway: "vernochi82", slugAway: require("../../assets/escudos/vernochi82.png"), backgroundColorAway: "#a64b00", textColorAway: "#ff241d", pointsColorAway: "#ff241d", idAway: 14972226, pontuacaoUltimaRodadaAway: 56, ptsAway: 0, atletasAway: [], pegouAtletasAway: false , numAtletasPontuandoAway: 0, capitaoIdAway: 0},
    { serie: "F", rodada: 4, nameHome: "Victrola F.C.", slugHome: require("../../assets/escudos/victrola-f-c.png"), backgroundColorHome: "#808080", textColorHome: "#bf1d17", pointsColorHome: "#bf1d17", idHome: 13946184, pontuacaoUltimaRodadaHome: 19, ptsHome: 0, atletasHome: [], pegouAtletasHome: false , numAtletasPontuandoHome: 0, capitaoIdHome: 0, nameAway: "VilãoFC", slugAway: require("../../assets/escudos/vilaofc.png"), backgroundColorAway: "#000000", textColorAway: "#ffffff", pointsColorAway: "#ffffff", idAway: 13946184, pontuacaoUltimaRodadaAway: 58, ptsAway: 0, atletasAway: [], pegouAtletasAway: false , numAtletasPontuandoAway: 0, capitaoIdAway: 0},
    { serie: "A", rodada: 5, nameHome: "OTOPATAMAR cc", slugHome: require("../../assets/escudos/otopatamar-cc.png"), backgroundColorHome: "#000000", textColorHome: "#bf1d17", pointsColorHome: "#bf1d17", idHome: 26126210, pontuacaoUltimaRodadaHome: 45, ptsHome: 0, atletasHome: [], pegouAtletasHome: false , numAtletasPontuandoHome: 0, capitaoIdHome: 0, nameAway: "Victao Futebol Clube", slugAway: require("../../assets/escudos/victao-futebol-clube.png"), backgroundColorAway: "#ffcb00", textColorAway: "#063780", pointsColorAway: "#063780", idAway: 26126210, pontuacaoUltimaRodadaAway: 15, ptsAway: 0, atletasAway: [], pegouAtletasAway: false , numAtletasPontuandoAway: 0, capitaoIdAway: 0},
    { serie: "A", rodada: 5, nameHome: "5prastantas F.C.", slugHome: require("../../assets/escudos/5prastantas-f-c.png"), backgroundColorHome: "#808080", textColorHome: "#ffffff", pointsColorHome: "#ffffff", idHome: 13945827, pontuacaoUltimaRodadaHome: 34, ptsHome: 0, atletasHome: [], pegouAtletasHome: false , numAtletasPontuandoHome: 0, capitaoIdHome: 0, nameAway: "AA AZULAO DO SUL", slugAway: require("../../assets/escudos/aa-azulao-do-sul.png"), backgroundColorAway: "#ff241d", textColorAway: "#063780", pointsColorAway: "#063780", idAway: 13945827, pontuacaoUltimaRodadaAway: 35, ptsAway: 0, atletasAway: [], pegouAtletasAway: false , numAtletasPontuandoAway: 0, capitaoIdAway: 0},
    { serie: "A", rodada: 5, nameHome: "Akuma Sport Club", slugHome: require("../../assets/escudos/akuma-sport-club.png"), backgroundColorHome: "#ffffff", textColorHome: "#000000", pointsColorHome: "#000000", idHome: 483335, pontuacaoUltimaRodadaHome: 38, ptsHome: 0, atletasHome: [], pegouAtletasHome: false , numAtletasPontuandoHome: 0, capitaoIdHome: 0, nameAway: "Atleticado", slugAway: require("../../assets/escudos/atleticado.png"), backgroundColorAway: "#4d004d", textColorAway: "#0066ff", pointsColorAway: "#0066ff", idAway: 483335, pontuacaoUltimaRodadaAway: 21, ptsAway: 0, atletasAway: [], pegouAtletasAway: false , numAtletasPontuandoAway: 0, capitaoIdAway: 0},
    { serie: "B", rodada: 5, nameHome: "Balacubacu FC", slugHome: require("../../assets/escudos/balacubacu-fc.png"), backgroundColorHome: "#000000", textColorHome: "#808080", pointsColorHome: "#808080", idHome: 3170764, pontuacaoUltimaRodadaHome: 44, ptsHome: 0, atletasHome: [], pegouAtletasHome: false , numAtletasPontuandoHome: 0, capitaoIdHome: 0, nameAway: "Bigode De Cartola", slugAway: require("../../assets/escudos/bigode-de-cartola.png"), backgroundColorAway: "#997a00", textColorAway: "#ffffff", pointsColorAway: "#ffffff", idAway: 3170764, pontuacaoUltimaRodadaAway: 41, ptsAway: 0, atletasAway: [], pegouAtletasAway: false , numAtletasPontuandoAway: 0, capitaoIdAway: 0},
    { serie: "B", rodada: 5, nameHome: "BOUGERS", slugHome: require("../../assets/escudos/bougers.png"), backgroundColorHome: "#ff241d", textColorHome: "#000000", pointsColorHome: "#000000", idHome: 2835988, pontuacaoUltimaRodadaHome: 17, ptsHome: 0, atletasHome: [], pegouAtletasHome: false , numAtletasPontuandoHome: 0, capitaoIdHome: 0, nameAway: "Calambau Beer", slugAway: require("../../assets/escudos/calambau-beer.png"), backgroundColorAway: "#000000", textColorAway: "#ffffff", pointsColorAway: "#ffffff", idAway: 2835988, pontuacaoUltimaRodadaAway: 45, ptsAway: 0, atletasAway: [], pegouAtletasAway: false , numAtletasPontuandoAway: 0, capitaoIdAway: 0},
    { serie: "B", rodada: 5, nameHome: "Cangaceiros BF", slugHome: require("../../assets/escudos/cangaceiros-bf.png"), backgroundColorHome: "#000000", textColorHome: "#19ff81", pointsColorHome: "#19ff81", idHome: 4554581, pontuacaoUltimaRodadaHome: 48, ptsHome: 0, atletasHome: [], pegouAtletasHome: false , numAtletasPontuandoHome: 0, capitaoIdHome: 0, nameAway: "ChristoFlamengo", slugAway: require("../../assets/escudos/christoflamengo.png"), backgroundColorAway: "#bf1d17", textColorAway: "#000000", pointsColorAway: "#000000", idAway: 4554581, pontuacaoUltimaRodadaAway: 36, ptsAway: 0, atletasAway: [], pegouAtletasAway: false , numAtletasPontuandoAway: 0, capitaoIdAway: 0},
    { serie: "C", rodada: 5, nameHome: "Código Fonte F.C", slugHome: require("../../assets/escudos/codigo-fonte-f-c.png"), backgroundColorHome: "#ffffff", textColorHome: "#063780", pointsColorHome: "#063780", idHome: 2489031, pontuacaoUltimaRodadaHome: 98, ptsHome: 0, atletasHome: [], pegouAtletasHome: false , numAtletasPontuandoHome: 0, capitaoIdHome: 0, nameAway: "Edu 07 Araxá", slugAway: require("../../assets/escudos/edu-07-araxa.png"), backgroundColorAway: "#808080", textColorAway: "#ffffff", pointsColorAway: "#ffffff", idAway: 2489031, pontuacaoUltimaRodadaAway: 54, ptsAway: 0, atletasAway: [], pegouAtletasAway: false , numAtletasPontuandoAway: 0, capitaoIdAway: 0},
    { serie: "C", rodada: 5, nameHome: "El mordedô", slugHome: require("../../assets/escudos/el-mordedo.png"), backgroundColorHome: "#4d004d", textColorHome: "#00cc5c", pointsColorHome: "#00cc5c", idHome: 25856343, pontuacaoUltimaRodadaHome: 46, ptsHome: 0, atletasHome: [], pegouAtletasHome: false , numAtletasPontuandoHome: 0, capitaoIdHome: 0, nameAway: "Ganso Doido", slugAway: require("../../assets/escudos/ganso-doido.png"), backgroundColorAway: "#bf1d17", textColorAway: "#063780", pointsColorAway: "#063780", idAway: 25856343, pontuacaoUltimaRodadaAway: 10, ptsAway: 0, atletasAway: [], pegouAtletasAway: false , numAtletasPontuandoAway: 0, capitaoIdAway: 0},
    { serie: "C", rodada: 5, nameHome: "GastroNeles", slugHome: require("../../assets/escudos/gastroneles.png"), backgroundColorHome: "#000000", textColorHome: "#ffffff", pointsColorHome: "#ffffff", idHome: 3438042, pontuacaoUltimaRodadaHome: 32, ptsHome: 0, atletasHome: [], pegouAtletasHome: false , numAtletasPontuandoHome: 0, capitaoIdHome: 0, nameAway: "Golog", slugAway: require("../../assets/escudos/golog.png"), backgroundColorAway: "#000000", textColorAway: "#ffcb00", pointsColorAway: "#ffcb00", idAway: 3438042, pontuacaoUltimaRodadaAway: 49, ptsAway: 0, atletasAway: [], pegouAtletasAway: false , numAtletasPontuandoAway: 0, capitaoIdAway: 0},
    { serie: "D", rodada: 5, nameHome: "Leozito Neves FC", slugHome: require("../../assets/escudos/leozito-neves-fc.png"), backgroundColorHome: "#000000", textColorHome: "#bf1d17", pointsColorHome: "#bf1d17", idHome: 4528687, pontuacaoUltimaRodadaHome: 19, ptsHome: 0, atletasHome: [], pegouAtletasHome: false , numAtletasPontuandoHome: 0, capitaoIdHome: 0, nameAway: "MBM Football", slugAway: require("../../assets/escudos/mbm-football.png"), backgroundColorAway: "#ffffff", textColorAway: "#000000", pointsColorAway: "#000000", idAway: 4528687, pontuacaoUltimaRodadaAway: 45, ptsAway: 0, atletasAway: [], pegouAtletasAway: false , numAtletasPontuandoAway: 0, capitaoIdAway: 0},
    { serie: "D", rodada: 5, nameHome: "Menino Esperto F. C.", slugHome: require("../../assets/escudos/menino-esperto-f-c.png"), backgroundColorHome: "#000000", textColorHome: "#ffcb00", pointsColorHome: "#ffcb00", idHome: 7875842, pontuacaoUltimaRodadaHome: 39, ptsHome: 0, atletasHome: [], pegouAtletasHome: false , numAtletasPontuandoHome: 0, capitaoIdHome: 0, nameAway: "Meninos do Maudi", slugAway: require("../../assets/escudos/meninos-do-maudi.png"), backgroundColorAway: "#000000", textColorAway: "#ffffff", pointsColorAway: "#ffffff", idAway: 7875842, pontuacaoUltimaRodadaAway: 51, ptsAway: 0, atletasAway: [], pegouAtletasAway: false , numAtletasPontuandoAway: 0, capitaoIdAway: 0},
    { serie: "D", rodada: 5, nameHome: "MGuto FC", slugHome: require("../../assets/escudos/mguto-fc.png"), backgroundColorHome: "#000000", textColorHome: "#ff241d", pointsColorHome: "#ff241d", idHome: 832153, pontuacaoUltimaRodadaHome: 33, ptsHome: 0, atletasHome: [], pegouAtletasHome: false , numAtletasPontuandoHome: 0, capitaoIdHome: 0, nameAway: "Palla Sports", slugAway: require("../../assets/escudos/palla-sports.png"), backgroundColorAway: "#808080", textColorAway: "#ff7400", pointsColorAway: "#ff7400", idAway: 832153, pontuacaoUltimaRodadaAway: 50, ptsAway: 0, atletasAway: [], pegouAtletasAway: false , numAtletasPontuandoAway: 0, capitaoIdAway: 0},
    { serie: "E", rodada: 5, nameHome: "Pyranha", slugHome: require("../../assets/escudos/pyranha.png"), backgroundColorHome: "#e65ce6", textColorHome: "#000000", pointsColorHome: "#000000", idHome: 1135503, pontuacaoUltimaRodadaHome: 39, ptsHome: 0, atletasHome: [], pegouAtletasHome: false , numAtletasPontuandoHome: 0, capitaoIdHome: 0, nameAway: "WolvenFootball", slugAway: require("../../assets/escudos/wolvenfootball.png"), backgroundColorAway: "#ffffff", textColorAway: "#0a6634", pointsColorAway: "#0a6634", idAway: 1135503, pontuacaoUltimaRodadaAway: 30, ptsAway: 0, atletasAway: [], pegouAtletasAway: false , numAtletasPontuandoAway: 0, capitaoIdAway: 0},
    { serie: "E", rodada: 5, nameHome: "Sei de tudo e não ganho nada FC", slugHome: require("../../assets/escudos/sei-de-tudo-e-nao-ganho-nada-fc.png"), backgroundColorHome: "#ff241d", textColorHome: "#19ff81", pointsColorHome: "#19ff81", idHome: 749772, pontuacaoUltimaRodadaHome: 41, ptsHome: 0, atletasHome: [], pegouAtletasHome: false , numAtletasPontuandoHome: 0, capitaoIdHome: 0, nameAway: "Sheik Tosado FC", slugAway: require("../../assets/escudos/sheik-tosado-fc.png"), backgroundColorAway: "#ff241d", textColorAway: "#000000", pointsColorAway: "#000000", idAway: 749772, pontuacaoUltimaRodadaAway: 49, ptsAway: 0, atletasAway: [], pegouAtletasAway: false , numAtletasPontuandoAway: 0, capitaoIdAway: 0},
    { serie: "E", rodada: 5, nameHome: "sinceridade: qualidade maldita!", slugHome: require("../../assets/escudos/sinceridade-qualidade-maldita.png"), backgroundColorHome: "#000000", textColorHome: "#bf1d17", pointsColorHome: "#bf1d17", idHome: 5342721, pontuacaoUltimaRodadaHome: 57, ptsHome: 0, atletasHome: [], pegouAtletasHome: false , numAtletasPontuandoHome: 0, capitaoIdHome: 0, nameAway: "Skalabuta FC", slugAway: require("../../assets/escudos/skalabuta-fc.png"), backgroundColorAway: "#000000", textColorAway: "#ffffff", pointsColorAway: "#ffffff", idAway: 5342721, pontuacaoUltimaRodadaAway: 48, ptsAway: 0, atletasAway: [], pegouAtletasAway: false , numAtletasPontuandoAway: 0, capitaoIdAway: 0},
    { serie: "F", rodada: 5, nameHome: "Sporting Draga", slugHome: require("../../assets/escudos/sporting-draga.png"), backgroundColorHome: "#000000", textColorHome: "#ff241d", pointsColorHome: "#ff241d", idHome: 810144, pontuacaoUltimaRodadaHome: 48, ptsHome: 0, atletasHome: [], pegouAtletasHome: false , numAtletasPontuandoHome: 0, capitaoIdHome: 0, nameAway: "Tangamandapiense Social Clube", slugAway: require("../../assets/escudos/tangamandapiense-social-clube.png"), backgroundColorAway: "#ffffff", textColorAway: "#4d004d", pointsColorAway: "#4d004d", idAway: 810144, pontuacaoUltimaRodadaAway: 78, ptsAway: 0, atletasAway: [], pegouAtletasAway: false , numAtletasPontuandoAway: 0, capitaoIdAway: 0},
    { serie: "F", rodada: 5, nameHome: "tarcisiospfc", slugHome: require("../../assets/escudos/tarcisiospfc.png"), backgroundColorHome: "#ff241d", textColorHome: "#ffffff", pointsColorHome: "#ffffff", idHome: 8917, pontuacaoUltimaRodadaHome: 50, ptsHome: 0, atletasHome: [], pegouAtletasHome: false , numAtletasPontuandoHome: 0, capitaoIdHome: 0, nameAway: "Time do Igor FC", slugAway: require("../../assets/escudos/time-do-igor-fc.png"), backgroundColorAway: "#ffcb00", textColorAway: "#000000", pointsColorAway: "#000000", idAway: 8917, pontuacaoUltimaRodadaAway: 27, ptsAway: 0, atletasAway: [], pegouAtletasAway: false , numAtletasPontuandoAway: 0, capitaoIdAway: 0},
    { serie: "F", rodada: 5, nameHome: "U.C. Leões de Judá", slugHome: require("../../assets/escudos/u-c-leoes-de-juda.png"), backgroundColorHome: "#000000", textColorHome: "#ffcb00", pointsColorHome: "#ffcb00", idHome: 14972226, pontuacaoUltimaRodadaHome: 44, ptsHome: 0, atletasHome: [], pegouAtletasHome: false , numAtletasPontuandoHome: 0, capitaoIdHome: 0, nameAway: "vernochi82", slugAway: require("../../assets/escudos/vernochi82.png"), backgroundColorAway: "#a64b00", textColorAway: "#ff241d", pointsColorAway: "#ff241d", idAway: 14972226, pontuacaoUltimaRodadaAway: 56, ptsAway: 0, atletasAway: [], pegouAtletasAway: false , numAtletasPontuandoAway: 0, capitaoIdAway: 0},
    { serie: "A", rodada: 6, nameHome: "Victrola F.C.", slugHome: require("../../assets/escudos/victrola-f-c.png"), backgroundColorHome: "#808080", textColorHome: "#bf1d17", pointsColorHome: "#bf1d17", idHome: 13946184, pontuacaoUltimaRodadaHome: 19, ptsHome: 0, atletasHome: [], pegouAtletasHome: false , numAtletasPontuandoHome: 0, capitaoIdHome: 0, nameAway: "VilãoFC", slugAway: require("../../assets/escudos/vilaofc.png"), backgroundColorAway: "#000000", textColorAway: "#ffffff", pointsColorAway: "#ffffff", idAway: 13946184, pontuacaoUltimaRodadaAway: 58, ptsAway: 0, atletasAway: [], pegouAtletasAway: false , numAtletasPontuandoAway: 0, capitaoIdAway: 0},
    { serie: "A", rodada: 6, nameHome: "OTOPATAMAR cc", slugHome: require("../../assets/escudos/otopatamar-cc.png"), backgroundColorHome: "#000000", textColorHome: "#bf1d17", pointsColorHome: "#bf1d17", idHome: 26126210, pontuacaoUltimaRodadaHome: 45, ptsHome: 0, atletasHome: [], pegouAtletasHome: false , numAtletasPontuandoHome: 0, capitaoIdHome: 0, nameAway: "Victao Futebol Clube", slugAway: require("../../assets/escudos/victao-futebol-clube.png"), backgroundColorAway: "#ffcb00", textColorAway: "#063780", pointsColorAway: "#063780", idAway: 26126210, pontuacaoUltimaRodadaAway: 15, ptsAway: 0, atletasAway: [], pegouAtletasAway: false , numAtletasPontuandoAway: 0, capitaoIdAway: 0},
    { serie: "A", rodada: 6, nameHome: "5prastantas F.C.", slugHome: require("../../assets/escudos/5prastantas-f-c.png"), backgroundColorHome: "#808080", textColorHome: "#ffffff", pointsColorHome: "#ffffff", idHome: 13945827, pontuacaoUltimaRodadaHome: 34, ptsHome: 0, atletasHome: [], pegouAtletasHome: false , numAtletasPontuandoHome: 0, capitaoIdHome: 0, nameAway: "AA AZULAO DO SUL", slugAway: require("../../assets/escudos/aa-azulao-do-sul.png"), backgroundColorAway: "#ff241d", textColorAway: "#063780", pointsColorAway: "#063780", idAway: 13945827, pontuacaoUltimaRodadaAway: 35, ptsAway: 0, atletasAway: [], pegouAtletasAway: false , numAtletasPontuandoAway: 0, capitaoIdAway: 0},
    { serie: "B", rodada: 6, nameHome: "Akuma Sport Club", slugHome: require("../../assets/escudos/akuma-sport-club.png"), backgroundColorHome: "#ffffff", textColorHome: "#000000", pointsColorHome: "#000000", idHome: 483335, pontuacaoUltimaRodadaHome: 38, ptsHome: 0, atletasHome: [], pegouAtletasHome: false , numAtletasPontuandoHome: 0, capitaoIdHome: 0, nameAway: "Atleticado", slugAway: require("../../assets/escudos/atleticado.png"), backgroundColorAway: "#4d004d", textColorAway: "#0066ff", pointsColorAway: "#0066ff", idAway: 483335, pontuacaoUltimaRodadaAway: 21, ptsAway: 0, atletasAway: [], pegouAtletasAway: false , numAtletasPontuandoAway: 0, capitaoIdAway: 0},
    { serie: "B", rodada: 6, nameHome: "Balacubacu FC", slugHome: require("../../assets/escudos/balacubacu-fc.png"), backgroundColorHome: "#000000", textColorHome: "#808080", pointsColorHome: "#808080", idHome: 3170764, pontuacaoUltimaRodadaHome: 44, ptsHome: 0, atletasHome: [], pegouAtletasHome: false , numAtletasPontuandoHome: 0, capitaoIdHome: 0, nameAway: "Bigode De Cartola", slugAway: require("../../assets/escudos/bigode-de-cartola.png"), backgroundColorAway: "#997a00", textColorAway: "#ffffff", pointsColorAway: "#ffffff", idAway: 3170764, pontuacaoUltimaRodadaAway: 41, ptsAway: 0, atletasAway: [], pegouAtletasAway: false , numAtletasPontuandoAway: 0, capitaoIdAway: 0},
    { serie: "B", rodada: 6, nameHome: "BOUGERS", slugHome: require("../../assets/escudos/bougers.png"), backgroundColorHome: "#ff241d", textColorHome: "#000000", pointsColorHome: "#000000", idHome: 2835988, pontuacaoUltimaRodadaHome: 17, ptsHome: 0, atletasHome: [], pegouAtletasHome: false , numAtletasPontuandoHome: 0, capitaoIdHome: 0, nameAway: "Calambau Beer", slugAway: require("../../assets/escudos/calambau-beer.png"), backgroundColorAway: "#000000", textColorAway: "#ffffff", pointsColorAway: "#ffffff", idAway: 2835988, pontuacaoUltimaRodadaAway: 45, ptsAway: 0, atletasAway: [], pegouAtletasAway: false , numAtletasPontuandoAway: 0, capitaoIdAway: 0},
    { serie: "C", rodada: 6, nameHome: "Cangaceiros BF", slugHome: require("../../assets/escudos/cangaceiros-bf.png"), backgroundColorHome: "#000000", textColorHome: "#19ff81", pointsColorHome: "#19ff81", idHome: 4554581, pontuacaoUltimaRodadaHome: 48, ptsHome: 0, atletasHome: [], pegouAtletasHome: false , numAtletasPontuandoHome: 0, capitaoIdHome: 0, nameAway: "ChristoFlamengo", slugAway: require("../../assets/escudos/christoflamengo.png"), backgroundColorAway: "#bf1d17", textColorAway: "#000000", pointsColorAway: "#000000", idAway: 4554581, pontuacaoUltimaRodadaAway: 36, ptsAway: 0, atletasAway: [], pegouAtletasAway: false , numAtletasPontuandoAway: 0, capitaoIdAway: 0},
    { serie: "C", rodada: 6, nameHome: "Código Fonte F.C", slugHome: require("../../assets/escudos/codigo-fonte-f-c.png"), backgroundColorHome: "#ffffff", textColorHome: "#063780", pointsColorHome: "#063780", idHome: 2489031, pontuacaoUltimaRodadaHome: 98, ptsHome: 0, atletasHome: [], pegouAtletasHome: false , numAtletasPontuandoHome: 0, capitaoIdHome: 0, nameAway: "Edu 07 Araxá", slugAway: require("../../assets/escudos/edu-07-araxa.png"), backgroundColorAway: "#808080", textColorAway: "#ffffff", pointsColorAway: "#ffffff", idAway: 2489031, pontuacaoUltimaRodadaAway: 54, ptsAway: 0, atletasAway: [], pegouAtletasAway: false , numAtletasPontuandoAway: 0, capitaoIdAway: 0},
    { serie: "C", rodada: 6, nameHome: "El mordedô", slugHome: require("../../assets/escudos/el-mordedo.png"), backgroundColorHome: "#4d004d", textColorHome: "#00cc5c", pointsColorHome: "#00cc5c", idHome: 25856343, pontuacaoUltimaRodadaHome: 46, ptsHome: 0, atletasHome: [], pegouAtletasHome: false , numAtletasPontuandoHome: 0, capitaoIdHome: 0, nameAway: "Ganso Doido", slugAway: require("../../assets/escudos/ganso-doido.png"), backgroundColorAway: "#bf1d17", textColorAway: "#063780", pointsColorAway: "#063780", idAway: 25856343, pontuacaoUltimaRodadaAway: 10, ptsAway: 0, atletasAway: [], pegouAtletasAway: false , numAtletasPontuandoAway: 0, capitaoIdAway: 0},
    { serie: "D", rodada: 6, nameHome: "GastroNeles", slugHome: require("../../assets/escudos/gastroneles.png"), backgroundColorHome: "#000000", textColorHome: "#ffffff", pointsColorHome: "#ffffff", idHome: 3438042, pontuacaoUltimaRodadaHome: 32, ptsHome: 0, atletasHome: [], pegouAtletasHome: false , numAtletasPontuandoHome: 0, capitaoIdHome: 0, nameAway: "Golog", slugAway: require("../../assets/escudos/golog.png"), backgroundColorAway: "#000000", textColorAway: "#ffcb00", pointsColorAway: "#ffcb00", idAway: 3438042, pontuacaoUltimaRodadaAway: 49, ptsAway: 0, atletasAway: [], pegouAtletasAway: false , numAtletasPontuandoAway: 0, capitaoIdAway: 0},
    { serie: "D", rodada: 6, nameHome: "Leozito Neves FC", slugHome: require("../../assets/escudos/leozito-neves-fc.png"), backgroundColorHome: "#000000", textColorHome: "#bf1d17", pointsColorHome: "#bf1d17", idHome: 4528687, pontuacaoUltimaRodadaHome: 19, ptsHome: 0, atletasHome: [], pegouAtletasHome: false , numAtletasPontuandoHome: 0, capitaoIdHome: 0, nameAway: "MBM Football", slugAway: require("../../assets/escudos/mbm-football.png"), backgroundColorAway: "#ffffff", textColorAway: "#000000", pointsColorAway: "#000000", idAway: 4528687, pontuacaoUltimaRodadaAway: 45, ptsAway: 0, atletasAway: [], pegouAtletasAway: false , numAtletasPontuandoAway: 0, capitaoIdAway: 0},
    { serie: "D", rodada: 6, nameHome: "Menino Esperto F. C.", slugHome: require("../../assets/escudos/menino-esperto-f-c.png"), backgroundColorHome: "#000000", textColorHome: "#ffcb00", pointsColorHome: "#ffcb00", idHome: 7875842, pontuacaoUltimaRodadaHome: 39, ptsHome: 0, atletasHome: [], pegouAtletasHome: false , numAtletasPontuandoHome: 0, capitaoIdHome: 0, nameAway: "Meninos do Maudi", slugAway: require("../../assets/escudos/meninos-do-maudi.png"), backgroundColorAway: "#000000", textColorAway: "#ffffff", pointsColorAway: "#ffffff", idAway: 7875842, pontuacaoUltimaRodadaAway: 51, ptsAway: 0, atletasAway: [], pegouAtletasAway: false , numAtletasPontuandoAway: 0, capitaoIdAway: 0},
    { serie: "E", rodada: 6, nameHome: "MGuto FC", slugHome: require("../../assets/escudos/mguto-fc.png"), backgroundColorHome: "#000000", textColorHome: "#ff241d", pointsColorHome: "#ff241d", idHome: 832153, pontuacaoUltimaRodadaHome: 33, ptsHome: 0, atletasHome: [], pegouAtletasHome: false , numAtletasPontuandoHome: 0, capitaoIdHome: 0, nameAway: "Palla Sports", slugAway: require("../../assets/escudos/palla-sports.png"), backgroundColorAway: "#808080", textColorAway: "#ff7400", pointsColorAway: "#ff7400", idAway: 832153, pontuacaoUltimaRodadaAway: 50, ptsAway: 0, atletasAway: [], pegouAtletasAway: false , numAtletasPontuandoAway: 0, capitaoIdAway: 0},
    { serie: "E", rodada: 6, nameHome: "Pyranha", slugHome: require("../../assets/escudos/pyranha.png"), backgroundColorHome: "#e65ce6", textColorHome: "#000000", pointsColorHome: "#000000", idHome: 1135503, pontuacaoUltimaRodadaHome: 39, ptsHome: 0, atletasHome: [], pegouAtletasHome: false , numAtletasPontuandoHome: 0, capitaoIdHome: 0, nameAway: "WolvenFootball", slugAway: require("../../assets/escudos/wolvenfootball.png"), backgroundColorAway: "#ffffff", textColorAway: "#0a6634", pointsColorAway: "#0a6634", idAway: 1135503, pontuacaoUltimaRodadaAway: 30, ptsAway: 0, atletasAway: [], pegouAtletasAway: false , numAtletasPontuandoAway: 0, capitaoIdAway: 0},
    { serie: "E", rodada: 6, nameHome: "Sei de tudo e não ganho nada FC", slugHome: require("../../assets/escudos/sei-de-tudo-e-nao-ganho-nada-fc.png"), backgroundColorHome: "#ff241d", textColorHome: "#19ff81", pointsColorHome: "#19ff81", idHome: 749772, pontuacaoUltimaRodadaHome: 41, ptsHome: 0, atletasHome: [], pegouAtletasHome: false , numAtletasPontuandoHome: 0, capitaoIdHome: 0, nameAway: "Sheik Tosado FC", slugAway: require("../../assets/escudos/sheik-tosado-fc.png"), backgroundColorAway: "#ff241d", textColorAway: "#000000", pointsColorAway: "#000000", idAway: 749772, pontuacaoUltimaRodadaAway: 49, ptsAway: 0, atletasAway: [], pegouAtletasAway: false , numAtletasPontuandoAway: 0, capitaoIdAway: 0},
    { serie: "F", rodada: 6, nameHome: "sinceridade: qualidade maldita!", slugHome: require("../../assets/escudos/sinceridade-qualidade-maldita.png"), backgroundColorHome: "#000000", textColorHome: "#bf1d17", pointsColorHome: "#bf1d17", idHome: 5342721, pontuacaoUltimaRodadaHome: 57, ptsHome: 0, atletasHome: [], pegouAtletasHome: false , numAtletasPontuandoHome: 0, capitaoIdHome: 0, nameAway: "Skalabuta FC", slugAway: require("../../assets/escudos/skalabuta-fc.png"), backgroundColorAway: "#000000", textColorAway: "#ffffff", pointsColorAway: "#ffffff", idAway: 5342721, pontuacaoUltimaRodadaAway: 48, ptsAway: 0, atletasAway: [], pegouAtletasAway: false , numAtletasPontuandoAway: 0, capitaoIdAway: 0},
    { serie: "F", rodada: 6, nameHome: "Sporting Draga", slugHome: require("../../assets/escudos/sporting-draga.png"), backgroundColorHome: "#000000", textColorHome: "#ff241d", pointsColorHome: "#ff241d", idHome: 810144, pontuacaoUltimaRodadaHome: 48, ptsHome: 0, atletasHome: [], pegouAtletasHome: false , numAtletasPontuandoHome: 0, capitaoIdHome: 0, nameAway: "Tangamandapiense Social Clube", slugAway: require("../../assets/escudos/tangamandapiense-social-clube.png"), backgroundColorAway: "#ffffff", textColorAway: "#4d004d", pointsColorAway: "#4d004d", idAway: 810144, pontuacaoUltimaRodadaAway: 78, ptsAway: 0, atletasAway: [], pegouAtletasAway: false , numAtletasPontuandoAway: 0, capitaoIdAway: 0},
    { serie: "F", rodada: 6, nameHome: "tarcisiospfc", slugHome: require("../../assets/escudos/tarcisiospfc.png"), backgroundColorHome: "#ff241d", textColorHome: "#ffffff", pointsColorHome: "#ffffff", idHome: 8917, pontuacaoUltimaRodadaHome: 50, ptsHome: 0, atletasHome: [], pegouAtletasHome: false , numAtletasPontuandoHome: 0, capitaoIdHome: 0, nameAway: "Time do Igor FC", slugAway: require("../../assets/escudos/time-do-igor-fc.png"), backgroundColorAway: "#ffcb00", textColorAway: "#000000", pointsColorAway: "#000000", idAway: 8917, pontuacaoUltimaRodadaAway: 27, ptsAway: 0, atletasAway: [], pegouAtletasAway: false , numAtletasPontuandoAway: 0, capitaoIdAway: 0},
    { serie: "A", rodada: 7, nameHome: "U.C. Leões de Judá", slugHome: require("../../assets/escudos/u-c-leoes-de-juda.png"), backgroundColorHome: "#000000", textColorHome: "#ffcb00", pointsColorHome: "#ffcb00", idHome: 14972226, pontuacaoUltimaRodadaHome: 44, ptsHome: 0, atletasHome: [], pegouAtletasHome: false , numAtletasPontuandoHome: 0, capitaoIdHome: 0, nameAway: "vernochi82", slugAway: require("../../assets/escudos/vernochi82.png"), backgroundColorAway: "#a64b00", textColorAway: "#ff241d", pointsColorAway: "#ff241d", idAway: 14972226, pontuacaoUltimaRodadaAway: 56, ptsAway: 0, atletasAway: [], pegouAtletasAway: false , numAtletasPontuandoAway: 0, capitaoIdAway: 0},
    { serie: "A", rodada: 7, nameHome: "Victrola F.C.", slugHome: require("../../assets/escudos/victrola-f-c.png"), backgroundColorHome: "#808080", textColorHome: "#bf1d17", pointsColorHome: "#bf1d17", idHome: 13946184, pontuacaoUltimaRodadaHome: 19, ptsHome: 0, atletasHome: [], pegouAtletasHome: false , numAtletasPontuandoHome: 0, capitaoIdHome: 0, nameAway: "VilãoFC", slugAway: require("../../assets/escudos/vilaofc.png"), backgroundColorAway: "#000000", textColorAway: "#ffffff", pointsColorAway: "#ffffff", idAway: 13946184, pontuacaoUltimaRodadaAway: 58, ptsAway: 0, atletasAway: [], pegouAtletasAway: false , numAtletasPontuandoAway: 0, capitaoIdAway: 0},
    { serie: "A", rodada: 7, nameHome: "OTOPATAMAR cc", slugHome: require("../../assets/escudos/otopatamar-cc.png"), backgroundColorHome: "#000000", textColorHome: "#bf1d17", pointsColorHome: "#bf1d17", idHome: 26126210, pontuacaoUltimaRodadaHome: 45, ptsHome: 0, atletasHome: [], pegouAtletasHome: false , numAtletasPontuandoHome: 0, capitaoIdHome: 0, nameAway: "Victao Futebol Clube", slugAway: require("../../assets/escudos/victao-futebol-clube.png"), backgroundColorAway: "#ffcb00", textColorAway: "#063780", pointsColorAway: "#063780", idAway: 26126210, pontuacaoUltimaRodadaAway: 15, ptsAway: 0, atletasAway: [], pegouAtletasAway: false , numAtletasPontuandoAway: 0, capitaoIdAway: 0},
    { serie: "B", rodada: 7, nameHome: "5prastantas F.C.", slugHome: require("../../assets/escudos/5prastantas-f-c.png"), backgroundColorHome: "#808080", textColorHome: "#ffffff", pointsColorHome: "#ffffff", idHome: 13945827, pontuacaoUltimaRodadaHome: 34, ptsHome: 0, atletasHome: [], pegouAtletasHome: false , numAtletasPontuandoHome: 0, capitaoIdHome: 0, nameAway: "AA AZULAO DO SUL", slugAway: require("../../assets/escudos/aa-azulao-do-sul.png"), backgroundColorAway: "#ff241d", textColorAway: "#063780", pointsColorAway: "#063780", idAway: 13945827, pontuacaoUltimaRodadaAway: 35, ptsAway: 0, atletasAway: [], pegouAtletasAway: false , numAtletasPontuandoAway: 0, capitaoIdAway: 0},
    { serie: "B", rodada: 7, nameHome: "Akuma Sport Club", slugHome: require("../../assets/escudos/akuma-sport-club.png"), backgroundColorHome: "#ffffff", textColorHome: "#000000", pointsColorHome: "#000000", idHome: 483335, pontuacaoUltimaRodadaHome: 38, ptsHome: 0, atletasHome: [], pegouAtletasHome: false , numAtletasPontuandoHome: 0, capitaoIdHome: 0, nameAway: "Atleticado", slugAway: require("../../assets/escudos/atleticado.png"), backgroundColorAway: "#4d004d", textColorAway: "#0066ff", pointsColorAway: "#0066ff", idAway: 483335, pontuacaoUltimaRodadaAway: 21, ptsAway: 0, atletasAway: [], pegouAtletasAway: false , numAtletasPontuandoAway: 0, capitaoIdAway: 0},
    { serie: "B", rodada: 7, nameHome: "Balacubacu FC", slugHome: require("../../assets/escudos/balacubacu-fc.png"), backgroundColorHome: "#000000", textColorHome: "#808080", pointsColorHome: "#808080", idHome: 3170764, pontuacaoUltimaRodadaHome: 44, ptsHome: 0, atletasHome: [], pegouAtletasHome: false , numAtletasPontuandoHome: 0, capitaoIdHome: 0, nameAway: "Bigode De Cartola", slugAway: require("../../assets/escudos/bigode-de-cartola.png"), backgroundColorAway: "#997a00", textColorAway: "#ffffff", pointsColorAway: "#ffffff", idAway: 3170764, pontuacaoUltimaRodadaAway: 41, ptsAway: 0, atletasAway: [], pegouAtletasAway: false , numAtletasPontuandoAway: 0, capitaoIdAway: 0},
    { serie: "C", rodada: 7, nameHome: "BOUGERS", slugHome: require("../../assets/escudos/bougers.png"), backgroundColorHome: "#ff241d", textColorHome: "#000000", pointsColorHome: "#000000", idHome: 2835988, pontuacaoUltimaRodadaHome: 17, ptsHome: 0, atletasHome: [], pegouAtletasHome: false , numAtletasPontuandoHome: 0, capitaoIdHome: 0, nameAway: "Calambau Beer", slugAway: require("../../assets/escudos/calambau-beer.png"), backgroundColorAway: "#000000", textColorAway: "#ffffff", pointsColorAway: "#ffffff", idAway: 2835988, pontuacaoUltimaRodadaAway: 45, ptsAway: 0, atletasAway: [], pegouAtletasAway: false , numAtletasPontuandoAway: 0, capitaoIdAway: 0},
    { serie: "C", rodada: 7, nameHome: "Cangaceiros BF", slugHome: require("../../assets/escudos/cangaceiros-bf.png"), backgroundColorHome: "#000000", textColorHome: "#19ff81", pointsColorHome: "#19ff81", idHome: 4554581, pontuacaoUltimaRodadaHome: 48, ptsHome: 0, atletasHome: [], pegouAtletasHome: false , numAtletasPontuandoHome: 0, capitaoIdHome: 0, nameAway: "ChristoFlamengo", slugAway: require("../../assets/escudos/christoflamengo.png"), backgroundColorAway: "#bf1d17", textColorAway: "#000000", pointsColorAway: "#000000", idAway: 4554581, pontuacaoUltimaRodadaAway: 36, ptsAway: 0, atletasAway: [], pegouAtletasAway: false , numAtletasPontuandoAway: 0, capitaoIdAway: 0},
    { serie: "C", rodada: 7, nameHome: "Código Fonte F.C", slugHome: require("../../assets/escudos/codigo-fonte-f-c.png"), backgroundColorHome: "#ffffff", textColorHome: "#063780", pointsColorHome: "#063780", idHome: 2489031, pontuacaoUltimaRodadaHome: 98, ptsHome: 0, atletasHome: [], pegouAtletasHome: false , numAtletasPontuandoHome: 0, capitaoIdHome: 0, nameAway: "Edu 07 Araxá", slugAway: require("../../assets/escudos/edu-07-araxa.png"), backgroundColorAway: "#808080", textColorAway: "#ffffff", pointsColorAway: "#ffffff", idAway: 2489031, pontuacaoUltimaRodadaAway: 54, ptsAway: 0, atletasAway: [], pegouAtletasAway: false , numAtletasPontuandoAway: 0, capitaoIdAway: 0},
    { serie: "D", rodada: 7, nameHome: "El mordedô", slugHome: require("../../assets/escudos/el-mordedo.png"), backgroundColorHome: "#4d004d", textColorHome: "#00cc5c", pointsColorHome: "#00cc5c", idHome: 25856343, pontuacaoUltimaRodadaHome: 46, ptsHome: 0, atletasHome: [], pegouAtletasHome: false , numAtletasPontuandoHome: 0, capitaoIdHome: 0, nameAway: "Ganso Doido", slugAway: require("../../assets/escudos/ganso-doido.png"), backgroundColorAway: "#bf1d17", textColorAway: "#063780", pointsColorAway: "#063780", idAway: 25856343, pontuacaoUltimaRodadaAway: 10, ptsAway: 0, atletasAway: [], pegouAtletasAway: false , numAtletasPontuandoAway: 0, capitaoIdAway: 0},
    { serie: "D", rodada: 7, nameHome: "GastroNeles", slugHome: require("../../assets/escudos/gastroneles.png"), backgroundColorHome: "#000000", textColorHome: "#ffffff", pointsColorHome: "#ffffff", idHome: 3438042, pontuacaoUltimaRodadaHome: 32, ptsHome: 0, atletasHome: [], pegouAtletasHome: false , numAtletasPontuandoHome: 0, capitaoIdHome: 0, nameAway: "Golog", slugAway: require("../../assets/escudos/golog.png"), backgroundColorAway: "#000000", textColorAway: "#ffcb00", pointsColorAway: "#ffcb00", idAway: 3438042, pontuacaoUltimaRodadaAway: 49, ptsAway: 0, atletasAway: [], pegouAtletasAway: false , numAtletasPontuandoAway: 0, capitaoIdAway: 0},
    { serie: "D", rodada: 7, nameHome: "Leozito Neves FC", slugHome: require("../../assets/escudos/leozito-neves-fc.png"), backgroundColorHome: "#000000", textColorHome: "#bf1d17", pointsColorHome: "#bf1d17", idHome: 4528687, pontuacaoUltimaRodadaHome: 19, ptsHome: 0, atletasHome: [], pegouAtletasHome: false , numAtletasPontuandoHome: 0, capitaoIdHome: 0, nameAway: "MBM Football", slugAway: require("../../assets/escudos/mbm-football.png"), backgroundColorAway: "#ffffff", textColorAway: "#000000", pointsColorAway: "#000000", idAway: 4528687, pontuacaoUltimaRodadaAway: 45, ptsAway: 0, atletasAway: [], pegouAtletasAway: false , numAtletasPontuandoAway: 0, capitaoIdAway: 0},
    { serie: "E", rodada: 7, nameHome: "Menino Esperto F. C.", slugHome: require("../../assets/escudos/menino-esperto-f-c.png"), backgroundColorHome: "#000000", textColorHome: "#ffcb00", pointsColorHome: "#ffcb00", idHome: 7875842, pontuacaoUltimaRodadaHome: 39, ptsHome: 0, atletasHome: [], pegouAtletasHome: false , numAtletasPontuandoHome: 0, capitaoIdHome: 0, nameAway: "Meninos do Maudi", slugAway: require("../../assets/escudos/meninos-do-maudi.png"), backgroundColorAway: "#000000", textColorAway: "#ffffff", pointsColorAway: "#ffffff", idAway: 7875842, pontuacaoUltimaRodadaAway: 51, ptsAway: 0, atletasAway: [], pegouAtletasAway: false , numAtletasPontuandoAway: 0, capitaoIdAway: 0},
    { serie: "E", rodada: 7, nameHome: "MGuto FC", slugHome: require("../../assets/escudos/mguto-fc.png"), backgroundColorHome: "#000000", textColorHome: "#ff241d", pointsColorHome: "#ff241d", idHome: 832153, pontuacaoUltimaRodadaHome: 33, ptsHome: 0, atletasHome: [], pegouAtletasHome: false , numAtletasPontuandoHome: 0, capitaoIdHome: 0, nameAway: "Palla Sports", slugAway: require("../../assets/escudos/palla-sports.png"), backgroundColorAway: "#808080", textColorAway: "#ff7400", pointsColorAway: "#ff7400", idAway: 832153, pontuacaoUltimaRodadaAway: 50, ptsAway: 0, atletasAway: [], pegouAtletasAway: false , numAtletasPontuandoAway: 0, capitaoIdAway: 0},
    { serie: "E", rodada: 7, nameHome: "Pyranha", slugHome: require("../../assets/escudos/pyranha.png"), backgroundColorHome: "#e65ce6", textColorHome: "#000000", pointsColorHome: "#000000", idHome: 1135503, pontuacaoUltimaRodadaHome: 39, ptsHome: 0, atletasHome: [], pegouAtletasHome: false , numAtletasPontuandoHome: 0, capitaoIdHome: 0, nameAway: "WolvenFootball", slugAway: require("../../assets/escudos/wolvenfootball.png"), backgroundColorAway: "#ffffff", textColorAway: "#0a6634", pointsColorAway: "#0a6634", idAway: 1135503, pontuacaoUltimaRodadaAway: 30, ptsAway: 0, atletasAway: [], pegouAtletasAway: false , numAtletasPontuandoAway: 0, capitaoIdAway: 0},
    { serie: "F", rodada: 7, nameHome: "Sei de tudo e não ganho nada FC", slugHome: require("../../assets/escudos/sei-de-tudo-e-nao-ganho-nada-fc.png"), backgroundColorHome: "#ff241d", textColorHome: "#19ff81", pointsColorHome: "#19ff81", idHome: 749772, pontuacaoUltimaRodadaHome: 41, ptsHome: 0, atletasHome: [], pegouAtletasHome: false , numAtletasPontuandoHome: 0, capitaoIdHome: 0, nameAway: "Sheik Tosado FC", slugAway: require("../../assets/escudos/sheik-tosado-fc.png"), backgroundColorAway: "#ff241d", textColorAway: "#000000", pointsColorAway: "#000000", idAway: 749772, pontuacaoUltimaRodadaAway: 49, ptsAway: 0, atletasAway: [], pegouAtletasAway: false , numAtletasPontuandoAway: 0, capitaoIdAway: 0},
    { serie: "F", rodada: 7, nameHome: "sinceridade: qualidade maldita!", slugHome: require("../../assets/escudos/sinceridade-qualidade-maldita.png"), backgroundColorHome: "#000000", textColorHome: "#bf1d17", pointsColorHome: "#bf1d17", idHome: 5342721, pontuacaoUltimaRodadaHome: 57, ptsHome: 0, atletasHome: [], pegouAtletasHome: false , numAtletasPontuandoHome: 0, capitaoIdHome: 0, nameAway: "Skalabuta FC", slugAway: require("../../assets/escudos/skalabuta-fc.png"), backgroundColorAway: "#000000", textColorAway: "#ffffff", pointsColorAway: "#ffffff", idAway: 5342721, pontuacaoUltimaRodadaAway: 48, ptsAway: 0, atletasAway: [], pegouAtletasAway: false , numAtletasPontuandoAway: 0, capitaoIdAway: 0},
    { serie: "F", rodada: 7, nameHome: "Sporting Draga", slugHome: require("../../assets/escudos/sporting-draga.png"), backgroundColorHome: "#000000", textColorHome: "#ff241d", pointsColorHome: "#ff241d", idHome: 810144, pontuacaoUltimaRodadaHome: 48, ptsHome: 0, atletasHome: [], pegouAtletasHome: false , numAtletasPontuandoHome: 0, capitaoIdHome: 0, nameAway: "Tangamandapiense Social Clube", slugAway: require("../../assets/escudos/tangamandapiense-social-clube.png"), backgroundColorAway: "#ffffff", textColorAway: "#4d004d", pointsColorAway: "#4d004d", idAway: 810144, pontuacaoUltimaRodadaAway: 78, ptsAway: 0, atletasAway: [], pegouAtletasAway: false , numAtletasPontuandoAway: 0, capitaoIdAway: 0},
    { serie: "A", rodada: 8, nameHome: "tarcisiospfc", slugHome: require("../../assets/escudos/tarcisiospfc.png"), backgroundColorHome: "#ff241d", textColorHome: "#ffffff", pointsColorHome: "#ffffff", idHome: 8917, pontuacaoUltimaRodadaHome: 50, ptsHome: 0, atletasHome: [], pegouAtletasHome: false , numAtletasPontuandoHome: 0, capitaoIdHome: 0, nameAway: "Time do Igor FC", slugAway: require("../../assets/escudos/time-do-igor-fc.png"), backgroundColorAway: "#ffcb00", textColorAway: "#000000", pointsColorAway: "#000000", idAway: 8917, pontuacaoUltimaRodadaAway: 27, ptsAway: 0, atletasAway: [], pegouAtletasAway: false , numAtletasPontuandoAway: 0, capitaoIdAway: 0},
    { serie: "A", rodada: 8, nameHome: "U.C. Leões de Judá", slugHome: require("../../assets/escudos/u-c-leoes-de-juda.png"), backgroundColorHome: "#000000", textColorHome: "#ffcb00", pointsColorHome: "#ffcb00", idHome: 14972226, pontuacaoUltimaRodadaHome: 44, ptsHome: 0, atletasHome: [], pegouAtletasHome: false , numAtletasPontuandoHome: 0, capitaoIdHome: 0, nameAway: "vernochi82", slugAway: require("../../assets/escudos/vernochi82.png"), backgroundColorAway: "#a64b00", textColorAway: "#ff241d", pointsColorAway: "#ff241d", idAway: 14972226, pontuacaoUltimaRodadaAway: 56, ptsAway: 0, atletasAway: [], pegouAtletasAway: false , numAtletasPontuandoAway: 0, capitaoIdAway: 0},
    { serie: "A", rodada: 8, nameHome: "Victrola F.C.", slugHome: require("../../assets/escudos/victrola-f-c.png"), backgroundColorHome: "#808080", textColorHome: "#bf1d17", pointsColorHome: "#bf1d17", idHome: 13946184, pontuacaoUltimaRodadaHome: 19, ptsHome: 0, atletasHome: [], pegouAtletasHome: false , numAtletasPontuandoHome: 0, capitaoIdHome: 0, nameAway: "VilãoFC", slugAway: require("../../assets/escudos/vilaofc.png"), backgroundColorAway: "#000000", textColorAway: "#ffffff", pointsColorAway: "#ffffff", idAway: 13946184, pontuacaoUltimaRodadaAway: 58, ptsAway: 0, atletasAway: [], pegouAtletasAway: false , numAtletasPontuandoAway: 0, capitaoIdAway: 0},
    { serie: "B", rodada: 8, nameHome: "OTOPATAMAR cc", slugHome: require("../../assets/escudos/otopatamar-cc.png"), backgroundColorHome: "#000000", textColorHome: "#bf1d17", pointsColorHome: "#bf1d17", idHome: 26126210, pontuacaoUltimaRodadaHome: 45, ptsHome: 0, atletasHome: [], pegouAtletasHome: false , numAtletasPontuandoHome: 0, capitaoIdHome: 0, nameAway: "Victao Futebol Clube", slugAway: require("../../assets/escudos/victao-futebol-clube.png"), backgroundColorAway: "#ffcb00", textColorAway: "#063780", pointsColorAway: "#063780", idAway: 26126210, pontuacaoUltimaRodadaAway: 15, ptsAway: 0, atletasAway: [], pegouAtletasAway: false , numAtletasPontuandoAway: 0, capitaoIdAway: 0},
    { serie: "B", rodada: 8, nameHome: "5prastantas F.C.", slugHome: require("../../assets/escudos/5prastantas-f-c.png"), backgroundColorHome: "#808080", textColorHome: "#ffffff", pointsColorHome: "#ffffff", idHome: 13945827, pontuacaoUltimaRodadaHome: 34, ptsHome: 0, atletasHome: [], pegouAtletasHome: false , numAtletasPontuandoHome: 0, capitaoIdHome: 0, nameAway: "AA AZULAO DO SUL", slugAway: require("../../assets/escudos/aa-azulao-do-sul.png"), backgroundColorAway: "#ff241d", textColorAway: "#063780", pointsColorAway: "#063780", idAway: 13945827, pontuacaoUltimaRodadaAway: 35, ptsAway: 0, atletasAway: [], pegouAtletasAway: false , numAtletasPontuandoAway: 0, capitaoIdAway: 0},
    { serie: "B", rodada: 8, nameHome: "Akuma Sport Club", slugHome: require("../../assets/escudos/akuma-sport-club.png"), backgroundColorHome: "#ffffff", textColorHome: "#000000", pointsColorHome: "#000000", idHome: 483335, pontuacaoUltimaRodadaHome: 38, ptsHome: 0, atletasHome: [], pegouAtletasHome: false , numAtletasPontuandoHome: 0, capitaoIdHome: 0, nameAway: "Atleticado", slugAway: require("../../assets/escudos/atleticado.png"), backgroundColorAway: "#4d004d", textColorAway: "#0066ff", pointsColorAway: "#0066ff", idAway: 483335, pontuacaoUltimaRodadaAway: 21, ptsAway: 0, atletasAway: [], pegouAtletasAway: false , numAtletasPontuandoAway: 0, capitaoIdAway: 0},
    { serie: "C", rodada: 8, nameHome: "Balacubacu FC", slugHome: require("../../assets/escudos/balacubacu-fc.png"), backgroundColorHome: "#000000", textColorHome: "#808080", pointsColorHome: "#808080", idHome: 3170764, pontuacaoUltimaRodadaHome: 44, ptsHome: 0, atletasHome: [], pegouAtletasHome: false , numAtletasPontuandoHome: 0, capitaoIdHome: 0, nameAway: "Bigode De Cartola", slugAway: require("../../assets/escudos/bigode-de-cartola.png"), backgroundColorAway: "#997a00", textColorAway: "#ffffff", pointsColorAway: "#ffffff", idAway: 3170764, pontuacaoUltimaRodadaAway: 41, ptsAway: 0, atletasAway: [], pegouAtletasAway: false , numAtletasPontuandoAway: 0, capitaoIdAway: 0},
    { serie: "C", rodada: 8, nameHome: "BOUGERS", slugHome: require("../../assets/escudos/bougers.png"), backgroundColorHome: "#ff241d", textColorHome: "#000000", pointsColorHome: "#000000", idHome: 2835988, pontuacaoUltimaRodadaHome: 17, ptsHome: 0, atletasHome: [], pegouAtletasHome: false , numAtletasPontuandoHome: 0, capitaoIdHome: 0, nameAway: "Calambau Beer", slugAway: require("../../assets/escudos/calambau-beer.png"), backgroundColorAway: "#000000", textColorAway: "#ffffff", pointsColorAway: "#ffffff", idAway: 2835988, pontuacaoUltimaRodadaAway: 45, ptsAway: 0, atletasAway: [], pegouAtletasAway: false , numAtletasPontuandoAway: 0, capitaoIdAway: 0},
    { serie: "C", rodada: 8, nameHome: "Cangaceiros BF", slugHome: require("../../assets/escudos/cangaceiros-bf.png"), backgroundColorHome: "#000000", textColorHome: "#19ff81", pointsColorHome: "#19ff81", idHome: 4554581, pontuacaoUltimaRodadaHome: 48, ptsHome: 0, atletasHome: [], pegouAtletasHome: false , numAtletasPontuandoHome: 0, capitaoIdHome: 0, nameAway: "ChristoFlamengo", slugAway: require("../../assets/escudos/christoflamengo.png"), backgroundColorAway: "#bf1d17", textColorAway: "#000000", pointsColorAway: "#000000", idAway: 4554581, pontuacaoUltimaRodadaAway: 36, ptsAway: 0, atletasAway: [], pegouAtletasAway: false , numAtletasPontuandoAway: 0, capitaoIdAway: 0},
    { serie: "D", rodada: 8, nameHome: "Código Fonte F.C", slugHome: require("../../assets/escudos/codigo-fonte-f-c.png"), backgroundColorHome: "#ffffff", textColorHome: "#063780", pointsColorHome: "#063780", idHome: 2489031, pontuacaoUltimaRodadaHome: 98, ptsHome: 0, atletasHome: [], pegouAtletasHome: false , numAtletasPontuandoHome: 0, capitaoIdHome: 0, nameAway: "Edu 07 Araxá", slugAway: require("../../assets/escudos/edu-07-araxa.png"), backgroundColorAway: "#808080", textColorAway: "#ffffff", pointsColorAway: "#ffffff", idAway: 2489031, pontuacaoUltimaRodadaAway: 54, ptsAway: 0, atletasAway: [], pegouAtletasAway: false , numAtletasPontuandoAway: 0, capitaoIdAway: 0},
    { serie: "D", rodada: 8, nameHome: "El mordedô", slugHome: require("../../assets/escudos/el-mordedo.png"), backgroundColorHome: "#4d004d", textColorHome: "#00cc5c", pointsColorHome: "#00cc5c", idHome: 25856343, pontuacaoUltimaRodadaHome: 46, ptsHome: 0, atletasHome: [], pegouAtletasHome: false , numAtletasPontuandoHome: 0, capitaoIdHome: 0, nameAway: "Ganso Doido", slugAway: require("../../assets/escudos/ganso-doido.png"), backgroundColorAway: "#bf1d17", textColorAway: "#063780", pointsColorAway: "#063780", idAway: 25856343, pontuacaoUltimaRodadaAway: 10, ptsAway: 0, atletasAway: [], pegouAtletasAway: false , numAtletasPontuandoAway: 0, capitaoIdAway: 0},
    { serie: "D", rodada: 8, nameHome: "GastroNeles", slugHome: require("../../assets/escudos/gastroneles.png"), backgroundColorHome: "#000000", textColorHome: "#ffffff", pointsColorHome: "#ffffff", idHome: 3438042, pontuacaoUltimaRodadaHome: 32, ptsHome: 0, atletasHome: [], pegouAtletasHome: false , numAtletasPontuandoHome: 0, capitaoIdHome: 0, nameAway: "Golog", slugAway: require("../../assets/escudos/golog.png"), backgroundColorAway: "#000000", textColorAway: "#ffcb00", pointsColorAway: "#ffcb00", idAway: 3438042, pontuacaoUltimaRodadaAway: 49, ptsAway: 0, atletasAway: [], pegouAtletasAway: false , numAtletasPontuandoAway: 0, capitaoIdAway: 0},
    { serie: "E", rodada: 8, nameHome: "Leozito Neves FC", slugHome: require("../../assets/escudos/leozito-neves-fc.png"), backgroundColorHome: "#000000", textColorHome: "#bf1d17", pointsColorHome: "#bf1d17", idHome: 4528687, pontuacaoUltimaRodadaHome: 19, ptsHome: 0, atletasHome: [], pegouAtletasHome: false , numAtletasPontuandoHome: 0, capitaoIdHome: 0, nameAway: "MBM Football", slugAway: require("../../assets/escudos/mbm-football.png"), backgroundColorAway: "#ffffff", textColorAway: "#000000", pointsColorAway: "#000000", idAway: 4528687, pontuacaoUltimaRodadaAway: 45, ptsAway: 0, atletasAway: [], pegouAtletasAway: false , numAtletasPontuandoAway: 0, capitaoIdAway: 0},
    { serie: "E", rodada: 8, nameHome: "Menino Esperto F. C.", slugHome: require("../../assets/escudos/menino-esperto-f-c.png"), backgroundColorHome: "#000000", textColorHome: "#ffcb00", pointsColorHome: "#ffcb00", idHome: 7875842, pontuacaoUltimaRodadaHome: 39, ptsHome: 0, atletasHome: [], pegouAtletasHome: false , numAtletasPontuandoHome: 0, capitaoIdHome: 0, nameAway: "Meninos do Maudi", slugAway: require("../../assets/escudos/meninos-do-maudi.png"), backgroundColorAway: "#000000", textColorAway: "#ffffff", pointsColorAway: "#ffffff", idAway: 7875842, pontuacaoUltimaRodadaAway: 51, ptsAway: 0, atletasAway: [], pegouAtletasAway: false , numAtletasPontuandoAway: 0, capitaoIdAway: 0},
    { serie: "E", rodada: 8, nameHome: "MGuto FC", slugHome: require("../../assets/escudos/mguto-fc.png"), backgroundColorHome: "#000000", textColorHome: "#ff241d", pointsColorHome: "#ff241d", idHome: 832153, pontuacaoUltimaRodadaHome: 33, ptsHome: 0, atletasHome: [], pegouAtletasHome: false , numAtletasPontuandoHome: 0, capitaoIdHome: 0, nameAway: "Palla Sports", slugAway: require("../../assets/escudos/palla-sports.png"), backgroundColorAway: "#808080", textColorAway: "#ff7400", pointsColorAway: "#ff7400", idAway: 832153, pontuacaoUltimaRodadaAway: 50, ptsAway: 0, atletasAway: [], pegouAtletasAway: false , numAtletasPontuandoAway: 0, capitaoIdAway: 0},
    { serie: "F", rodada: 8, nameHome: "Pyranha", slugHome: require("../../assets/escudos/pyranha.png"), backgroundColorHome: "#e65ce6", textColorHome: "#000000", pointsColorHome: "#000000", idHome: 1135503, pontuacaoUltimaRodadaHome: 39, ptsHome: 0, atletasHome: [], pegouAtletasHome: false , numAtletasPontuandoHome: 0, capitaoIdHome: 0, nameAway: "WolvenFootball", slugAway: require("../../assets/escudos/wolvenfootball.png"), backgroundColorAway: "#ffffff", textColorAway: "#0a6634", pointsColorAway: "#0a6634", idAway: 1135503, pontuacaoUltimaRodadaAway: 30, ptsAway: 0, atletasAway: [], pegouAtletasAway: false , numAtletasPontuandoAway: 0, capitaoIdAway: 0},
    { serie: "F", rodada: 8, nameHome: "Sei de tudo e não ganho nada FC", slugHome: require("../../assets/escudos/sei-de-tudo-e-nao-ganho-nada-fc.png"), backgroundColorHome: "#ff241d", textColorHome: "#19ff81", pointsColorHome: "#19ff81", idHome: 749772, pontuacaoUltimaRodadaHome: 41, ptsHome: 0, atletasHome: [], pegouAtletasHome: false , numAtletasPontuandoHome: 0, capitaoIdHome: 0, nameAway: "Sheik Tosado FC", slugAway: require("../../assets/escudos/sheik-tosado-fc.png"), backgroundColorAway: "#ff241d", textColorAway: "#000000", pointsColorAway: "#000000", idAway: 749772, pontuacaoUltimaRodadaAway: 49, ptsAway: 0, atletasAway: [], pegouAtletasAway: false , numAtletasPontuandoAway: 0, capitaoIdAway: 0},
    { serie: "F", rodada: 8, nameHome: "sinceridade: qualidade maldita!", slugHome: require("../../assets/escudos/sinceridade-qualidade-maldita.png"), backgroundColorHome: "#000000", textColorHome: "#bf1d17", pointsColorHome: "#bf1d17", idHome: 5342721, pontuacaoUltimaRodadaHome: 57, ptsHome: 0, atletasHome: [], pegouAtletasHome: false , numAtletasPontuandoHome: 0, capitaoIdHome: 0, nameAway: "Skalabuta FC", slugAway: require("../../assets/escudos/skalabuta-fc.png"), backgroundColorAway: "#000000", textColorAway: "#ffffff", pointsColorAway: "#ffffff", idAway: 5342721, pontuacaoUltimaRodadaAway: 48, ptsAway: 0, atletasAway: [], pegouAtletasAway: false , numAtletasPontuandoAway: 0, capitaoIdAway: 0},
        
    // { name: "", backgroundColor: "#008000", textColor: "#008000", pointsColor: "#008000", id: 0, pts: -100 },
    // { name: "", backgroundColor: "#008000", textColor: "#008000", pointsColor: "#008000", id: 0, pts: -101 },        
  ]);

  const [jogos, setJogos] = React.useState([
    {home: 2489031, away: 25867159},
  ]);

  var status = 1
  async function refreshData() {
    


    // await axios.get("https://cartolaigor-pjzxn.hoverfly.io/mercado/status")    
    await axios.get("https://api.cartolafc.globo.com/mercado/status")
      .then(res => {
        status = res.data.status_mercado;
        rodada_atual = res.data.rodada_atual
        // console.log("------e aqui tb---------------")// ---------------------------------------------------------------------------------------------
        // items[1].name = header + rodada_atual
        // setItems([...items], items);
      });
    // console.log(status)

    if (status == 2) {
      setTimeout(function () {
        // console.log("primeira chamada /atletas")// ---------------------------------------------------------------------------------------------
        axios.get("https://api.cartolafc.globo.com/atletas/pontuados")
          .then(responseAtletas => {
            atletasPontuando = responseAtletas.data.atletas;
          });
      }, 500);

      items.forEach(element => {

        items.sort((a, b) => (a.pts <= b.pts) ? 1 : -1)
        if (element.id != 0) {
          try {

            setTimeout(function () {
              if (!element.pegouAtletas) {
                // console.log("segunda chamada /id") // ---------------------------------------------------------------------------------------------
                // axios.get("https://cartolaigor-pjzxn.hoverfly.io/time/id/" + element.id)
                axios.get("https://api.cartolafc.globo.com/time/id/" + element.id + "/" + rodada_atual)
                  .then(res => {
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
                element.pts = 0
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

                element.pts = parseInt(element.pts) > element.maiorPontuacao ? parseInt(element.pts) : element.maiorPontuacao;
                //   element.pts = parseInt(pontuacao)
                if (element.distrital) {
                  element.pts = -50;
                }
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
          if (equipe.pts > equipe.maiorPontuacao) {
            equipe.maiorPontuacao = equipe.pts;
          }
          equipe.pts = equipe.maiorPontuacao;
          if (equipe.distrital) {
            equipe.pts = -50;
          }
          items.sort((a, b) => (a.pts <= b.pts) ? 1 : -1)
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

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     refreshData()
  //   }, 30000);
  //   return () => clearInterval(interval);
  // }, []);

  useEffect(() => {
    refreshData()
  }, []);

  return (
    <PTRView style={{ backgroundColor: "#008000" }} onRefresh={function () {
      // return new Promise((resolve) => {
      //   refreshData();
      //   setTimeout(() => { resolve() }, 2000)
      // });
    }} >
      <View style={{ flex: 1 }}>

        <FlatGrid
          itemDimension={Dimensions.get('window').width}
          data={items}
          style={styles.gridView}
          backgroundColor="#008000"
          showsVerticalScrollIndicator={false}
          spacing={5}
          // numColumns={2}
          renderItem={({item, index}) => (

            <View style={{ flexDirection: 'row' }}>

              <View style={[item.distrital ? { display: 'none', width: Dimensions.get('window').width * 0 } : { width: Dimensions.get('window').width * 0.48 },
              styles.itemContainer,
              {
                marginHorizontal: Dimensions.get('window').width * 0.003,
                backgroundColor: item.backgroundColor
              }]}>

                <Text adjustsFontSizeToFit={true} style={[styles.itemName, { color: item.textColor }]}>{item.nameHome}</Text>
              </View>


              <View style={[item.distrital ? { display: 'none', width: Dimensions.get('window').width * 0 } : { width: Dimensions.get('window').width * 0.48 },
              styles.itemContainer,
              {
                marginHorizontal: Dimensions.get('window').width * 0.003,
                backgroundColor: item.backgroundColor
              }]}>

                <Text allowFontScaling={true} numberOfLines={1} style={[styles.itemName, { color: item.textColor }]}>{item.nameAway}</Text>
              </View>
              

              {/* Indices */}
              {/* <View style={[item.distrital ? { display: 'none' } : {},
              index % 6 == 1 && index > 2 ? { marginBottom: Dimensions.get('window').width * 0.04 } : {},
              index > 1 ? { backgroundColor: coresPorSerie[contadorDeCores[index]] } : {},
              styles.itemContainer,
              { width: Dimensions.get('window').width * 0.08 }]}>

                <Text style={[item.id == 0 ? { color: item.backgroundColor } : (styles.itemName, { fontSize: 15, color: "#fff" })]}>{index - 1}</Text>
              </View> */}


              {/* Nome dos times */}
              {/* <View style={[item.distrital ? { display: 'none', width: Dimensions.get('window').width * 0 } : { width: Dimensions.get('window').width * 0.74 },
              styles.itemContainer,
              {
                marginHorizontal: Dimensions.get('window').width * 0.003,
                backgroundColor: item.backgroundColor
              }]}>

                <Text style={[styles.itemName, { color: item.textColor }]}>{item.name}</Text>
              </View> */}


              {/* Escudo dos times */}
              {/* <View style={item.distrital ? {display: 'none'} : {}}> */}
              {/* <Image source={item.slug}
                style={[item.distrital ? {
                  display: 'none', height: Dimensions.get('window').width * 0,
                  width: Dimensions.get('window').width * 0,
                } : {
                    height: Dimensions.get('window').width * 0.07,
                    width: Dimensions.get('window').width * 0.07
                  }, {
                  marginVertical: Dimensions.get('window').height * -0.001,
                  marginHorizontal: Dimensions.get('window').width * 0.06,
                  position: 'absolute',
                  resizeMode: 'stretch'
                }]} /> */}
              {/* </View> */}


              {/* Pontuacao dos times */}
              {/* <View style={[item.distrital ? { display: 'none', width: Dimensions.get('window').width * 0 } : { width: Dimensions.get('window').width * 0.14 },
              styles.itemContainer, {
                shadowColor: item.backgroundColor,
                marginHorizontal: Dimensions.get('window').width * 0.003,
                backgroundColor: item.backgroundColor
              }]}>

                <Text style={[styles.itemName, { color: item.pointsColor }]}>{item.pts}</Text>
              </View> */}


              {/* Num de atletas pontuando */}
              {/* <View style={[item.distrital ? {
                display: 'none', width: Dimensions.get('window').width * 0,
                height: Dimensions.get('window').width * 0
              } : {
                  width: Dimensions.get('window').width * 0.05,
                  height: Dimensions.get('window').width * 0.05
                },
              item.id != 0 ? {
                justifyContent: 'center',
                alignItems: "center",
                borderRadius: 100,
                position: 'absolute',
                marginVertical: Dimensions.get('window').height * 0.02,
                marginHorizontal: Dimensions.get('window').width * 0.82,
                backgroundColor: item.textColor
              } : {}]}>


                <Text style={[styles.itemName, { fontSize: 10, color: item.backgroundColor }]}>{item.numAtletasPontuando}</Text>
              </View> */}

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

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds) {
      break;
    }
  }
}