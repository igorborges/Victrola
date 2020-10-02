
import React, { useEffect, useState, useCallback } from 'react';
import { Dimensions, SafeAreaView, RefreshControl, DatePickerAndroid, ToastAndroid } from 'react-native';
import { StyleSheet, Image, View, Text } from 'react-native';
import { FlatGrid } from 'react-native-super-grid';
import axios from 'axios';
export const loaderRef = React.createRef();
import PTRView from 'react-native-pull-to-refresh';
import { ForceTouchGestureHandler } from 'react-native-gesture-handler';





export default function Example() {

  const coresPorSerie = ["#366092", "#953734", "#4f6128", "#e36c09", "#5f497a", "#6d653f"];
  const contadorDeCores = [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 5, 5, 5, 5, 5, 5];
  var header = "Classificação por Série"
  var rodada_atual = 4
  const [items, setItems] = React.useState([
    { header: true, rodada: 4, serie: "COPA VICTROLA 2020", nameHome: "", backgroundColorHome: "#008000", textColorHome: "#008000", pointsColorHome: "#008000", idHome: 0, ptsHome: 10001, nameAway: "", backgroundColorAway: "#008000", textColorAway: "#008000", pointsColorAway: "#008000", idAway: 0, ptsAway: 10001 },
    // { name: header, backgroundColor: "#008000", textColor: "#fff", pointsColor: "#008000", id: 0, pts: 10000 },

    { header: true , serie: "Serie A", backgroundColor: "#366092", rodada: 4},
    { serie: "A", rodada: 4, nameHome: "GastroNeles", slugHome: require("../../assets/escudos/gastroneles.png"), backgroundColorHome: "#000000", textColorHome: "#ffffff", pointsColorHome: "#ffffff", idHome: 3438042, pontuacaoUltimaRodadaHome: 107, ptsHome: 0, atletasHome: [], pegouAtletasHome: false , numAtletasPontuandoHome: 0, capitaoIdHome: 0, nameAway: "AA AZULAO DO SUL", slugAway: require("../../assets/escudos/aa-azulao-do-sul.png"), backgroundColorAway: "#ff241d", textColorAway: "#063780", pointsColorAway: "#063780", idAway: 6717458, pontuacaoUltimaRodadaAway: 93, ptsAway: 0, atletasAway: [], pegouAtletasAway: false , numAtletasPontuandoAway: 0, capitaoIdAway: 0},
    { serie: "A", rodada: 4, nameHome: "Palla Sports", slugHome: require("../../assets/escudos/palla-sports.png"), backgroundColorHome: "#808080", textColorHome: "#ff7400", pointsColorHome: "#ff7400", idHome: 623570, pontuacaoUltimaRodadaHome: 101, ptsHome: 0, atletasHome: [], pegouAtletasHome: false , numAtletasPontuandoHome: 0, capitaoIdHome: 0, nameAway: "MGuto FC", slugAway: require("../../assets/escudos/mguto-fc.png"), backgroundColorAway: "#000000", textColorAway: "#ff241d", pointsColorAway: "#ff241d", idAway: 832153, pontuacaoUltimaRodadaAway: 94, ptsAway: 0, atletasAway: [], pegouAtletasAway: false , numAtletasPontuandoAway: 0, capitaoIdAway: 0},
    { serie: "A", rodada: 4, nameHome: "Código Fonte F.C", slugHome: require("../../assets/escudos/codigo-fonte-f-c.png"), backgroundColorHome: "#ffffff", textColorHome: "#063780", pointsColorHome: "#063780", idHome: 2489031, pontuacaoUltimaRodadaHome: 68, ptsHome: 0, atletasHome: [], pegouAtletasHome: false , numAtletasPontuandoHome: 0, capitaoIdHome: 0, nameAway: "5prastantas F.C.", slugAway: require("../../assets/escudos/5prastantas-f-c.png"), backgroundColorAway: "#808080", textColorAway: "#ffffff", pointsColorAway: "#ffffff", idAway: 13945827, pontuacaoUltimaRodadaAway: 95, ptsAway: 0, atletasAway: [], pegouAtletasAway: false , numAtletasPontuandoAway: 0, capitaoIdAway: 0},
    { header: true , serie: "Serie B", backgroundColor: "#953734", rodada: 4},
    { serie: "B", rodada: 4, nameHome: "VilãoFC", slugHome: require("../../assets/escudos/vilaofc.png"), backgroundColorHome: "#000000", textColorHome: "#ffffff", pointsColorHome: "#ffffff", idHome: 2370283, pontuacaoUltimaRodadaHome: 82, ptsHome: 0, atletasHome: [], pegouAtletasHome: false , numAtletasPontuandoHome: 0, capitaoIdHome: 0, nameAway: "Pyranha", slugAway: require("../../assets/escudos/pyranha.png"), backgroundColorAway: "#e65ce6", textColorAway: "#000000", pointsColorAway: "#000000", idAway: 1135503, pontuacaoUltimaRodadaAway: 76, ptsAway: 0, atletasAway: [], pegouAtletasAway: false , numAtletasPontuandoAway: 0, capitaoIdAway: 0},
    { serie: "B", rodada: 4, nameHome: "BOUGERS", slugHome: require("../../assets/escudos/bougers.png"), backgroundColorHome: "#ff241d", textColorHome: "#000000", pointsColorHome: "#000000", idHome: 2835988, pontuacaoUltimaRodadaHome: 80, ptsHome: 0, atletasHome: [], pegouAtletasHome: false , numAtletasPontuandoHome: 0, capitaoIdHome: 0, nameAway: "Sei de tudo e não ganho nada FC", slugAway: require("../../assets/escudos/sei-de-tudo-e-nao-ganho-nada-fc.png"), backgroundColorAway: "#ff241d", textColorAway: "#19ff81", pointsColorAway: "#19ff81", idAway: 749772, pontuacaoUltimaRodadaAway: 76, ptsAway: 0, atletasAway: [], pegouAtletasAway: false , numAtletasPontuandoAway: 0, capitaoIdAway: 0},
    { serie: "B", rodada: 4, nameHome: "Tangamandapiense Social Clube", slugHome: require("../../assets/escudos/tangamandapiense-social-clube.png"), backgroundColorHome: "#ffffff", textColorHome: "#4d004d", pointsColorHome: "#4d004d", idHome: 25867159, pontuacaoUltimaRodadaHome: 57, ptsHome: 0, atletasHome: [], pegouAtletasHome: false , numAtletasPontuandoHome: 0, capitaoIdHome: 0, nameAway: "Atleticado", slugAway: require("../../assets/escudos/atleticado.png"), backgroundColorAway: "#4d004d", textColorAway: "#0066ff", pointsColorAway: "#0066ff", idAway: 661306, pontuacaoUltimaRodadaAway: 78, ptsAway: 0, atletasAway: [], pegouAtletasAway: false , numAtletasPontuandoAway: 0, capitaoIdAway: 0},
    { header: true , serie: "Serie C", backgroundColor: "#4f6128", rodada: 4},
    { serie: "C", rodada: 4, nameHome: "El mordedô", slugHome: require("../../assets/escudos/el-mordedo.png"), backgroundColorHome: "#4d004d", textColorHome: "#00cc5c", pointsColorHome: "#00cc5c", idHome: 25856343, pontuacaoUltimaRodadaHome: 55, ptsHome: 0, atletasHome: [], pegouAtletasHome: false , numAtletasPontuandoHome: 0, capitaoIdHome: 0, nameAway: "ChristoFlamengo", slugAway: require("../../assets/escudos/christoflamengo.png"), backgroundColorAway: "#bf1d17", textColorAway: "#000000", pointsColorAway: "#000000", idAway: 1540816, pontuacaoUltimaRodadaAway: 70, ptsAway: 0, atletasAway: [], pegouAtletasAway: false , numAtletasPontuandoAway: 0, capitaoIdAway: 0},
    { serie: "C", rodada: 4, nameHome: "Time do Igor FC", slugHome: require("../../assets/escudos/time-do-igor-fc.png"), backgroundColorHome: "#ffcb00", textColorHome: "#000000", pointsColorHome: "#000000", idHome: 1160952, pontuacaoUltimaRodadaHome: 53, ptsHome: 0, atletasHome: [], pegouAtletasHome: false , numAtletasPontuandoHome: 0, capitaoIdHome: 0, nameAway: "Balacubacu FC", slugAway: require("../../assets/escudos/balacubacu-fc.png"), backgroundColorAway: "#000000", textColorAway: "#808080", pointsColorAway: "#808080", idAway: 3170764, pontuacaoUltimaRodadaAway: 68, ptsAway: 0, atletasAway: [], pegouAtletasAway: false , numAtletasPontuandoAway: 0, capitaoIdAway: 0},
    { serie: "C", rodada: 4, nameHome: "RafitiFC", slugHome: require("../../assets/escudos/rafitifc.png"), backgroundColorHome: "#ffffff", textColorHome: "#0a6634", pointsColorHome: "#0a6634", idHome: 634335, pontuacaoUltimaRodadaHome: 74, ptsHome: 0, atletasHome: [], pegouAtletasHome: false , numAtletasPontuandoHome: 0, capitaoIdHome: 0, nameAway: "U.C. Leões de Judá", slugAway: require("../../assets/escudos/u-c-leoes-de-juda.png"), backgroundColorAway: "#000000", textColorAway: "#ffcb00", pointsColorAway: "#ffcb00", idAway: 14972226, pontuacaoUltimaRodadaAway: 72, ptsAway: 0, atletasAway: [], pegouAtletasAway: false , numAtletasPontuandoAway: 0, capitaoIdAway: 0},
    { header: true , serie: "Serie D", backgroundColor: "#e36c09", rodada: 4},
    { serie: "D", rodada: 4, nameHome: "MBM Football", slugHome: require("../../assets/escudos/mbm-football.png"), backgroundColorHome: "#ffffff", textColorHome: "#000000", pointsColorHome: "#000000", idHome: 8869919, pontuacaoUltimaRodadaHome: 54, ptsHome: 0, atletasHome: [], pegouAtletasHome: false , numAtletasPontuandoHome: 0, capitaoIdHome: 0, nameAway: "Bigode De Cartola", slugAway: require("../../assets/escudos/bigode-de-cartola.png"), backgroundColorAway: "#997a00", textColorAway: "#ffffff", pointsColorAway: "#ffffff", idAway: 987444, pontuacaoUltimaRodadaAway: 66, ptsAway: 0, atletasAway: [], pegouAtletasAway: false , numAtletasPontuandoAway: 0, capitaoIdAway: 0},
    { serie: "D", rodada: 4, nameHome: "Calambau Beer", slugHome: require("../../assets/escudos/calambau-beer.png"), backgroundColorHome: "#000000", textColorHome: "#ffffff", pointsColorHome: "#ffffff", idHome: 253542, pontuacaoUltimaRodadaHome: 69, ptsHome: 0, atletasHome: [], pegouAtletasHome: false , numAtletasPontuandoHome: 0, capitaoIdHome: 0, nameAway: "Victrola F.C.", slugAway: require("../../assets/escudos/victrola-f-c.png"), backgroundColorAway: "#808080", textColorAway: "#bf1d17", pointsColorAway: "#bf1d17", idAway: 13946184, pontuacaoUltimaRodadaAway: 66, ptsAway: 0, atletasAway: [], pegouAtletasAway: false , numAtletasPontuandoAway: 0, capitaoIdAway: 0},
    { serie: "D", rodada: 4, nameHome: "Sporting Draga", slugHome: require("../../assets/escudos/sporting-draga.png"), backgroundColorHome: "#000000", textColorHome: "#ff241d", pointsColorHome: "#ff241d", idHome: 810144, pontuacaoUltimaRodadaHome: 67, ptsHome: 0, atletasHome: [], pegouAtletasHome: false , numAtletasPontuandoHome: 0, capitaoIdHome: 0, nameAway: "Edu 07 Araxá", slugAway: require("../../assets/escudos/edu-07-araxa.png"), backgroundColorAway: "#808080", textColorAway: "#ffffff", pointsColorAway: "#ffffff", idAway: 1225635, pontuacaoUltimaRodadaAway: 58, ptsAway: 0, atletasAway: [], pegouAtletasAway: false , numAtletasPontuandoAway: 0, capitaoIdAway: 0},
    { header: true , serie: "Serie E", backgroundColor: "#5f497a", rodada: 4},
    { serie: "E", rodada: 4, nameHome: "Akuma Sport Club", slugHome: require("../../assets/escudos/akuma-sport-club.png"), backgroundColorHome: "#ffffff", textColorHome: "#000000", pointsColorHome: "#000000", idHome: 483335, pontuacaoUltimaRodadaHome: 58, ptsHome: 0, atletasHome: [], pegouAtletasHome: false , numAtletasPontuandoHome: 0, capitaoIdHome: 0, nameAway: "Menino Esperto F. C.", slugAway: require("../../assets/escudos/menino-esperto-f-c.png"), backgroundColorAway: "#000000", textColorAway: "#ffcb00", pointsColorAway: "#ffcb00", idAway: 7875842, pontuacaoUltimaRodadaAway: 50, ptsAway: 0, atletasAway: [], pegouAtletasAway: false , numAtletasPontuandoAway: 0, capitaoIdAway: 0},
    { serie: "E", rodada: 4, nameHome: "Skalabuta FC", slugHome: require("../../assets/escudos/skalabuta-fc.png"), backgroundColorHome: "#000000", textColorHome: "#ffffff", pointsColorHome: "#ffffff", idHome: 25871781, pontuacaoUltimaRodadaHome: 46, ptsHome: 0, atletasHome: [], pegouAtletasHome: false , numAtletasPontuandoHome: 0, capitaoIdHome: 0, nameAway: "Sheik Tosado FC", slugAway: require("../../assets/escudos/sheik-tosado-fc.png"), backgroundColorAway: "#ff241d", textColorAway: "#000000", pointsColorAway: "#000000", idAway: 13951041, pontuacaoUltimaRodadaAway: 37, ptsAway: 0, atletasAway: [], pegouAtletasAway: false , numAtletasPontuandoAway: 0, capitaoIdAway: 0},
    { serie: "E", rodada: 4, nameHome: "Ganso Doido", slugHome: require("../../assets/escudos/ganso-doido.png"), backgroundColorHome: "#bf1d17", textColorHome: "#063780", pointsColorHome: "#063780", idHome: 90144, pontuacaoUltimaRodadaHome: 58, ptsHome: 0, atletasHome: [], pegouAtletasHome: false , numAtletasPontuandoHome: 0, capitaoIdHome: 0, nameAway: "sinceridade: qualidade maldita!", slugAway: require("../../assets/escudos/sinceridade-qualidade-maldita.png"), backgroundColorAway: "#000000", textColorAway: "#bf1d17", pointsColorAway: "#bf1d17", idAway: 5342721, pontuacaoUltimaRodadaAway: 37, ptsAway: 0, atletasAway: [], pegouAtletasAway: false , numAtletasPontuandoAway: 0, capitaoIdAway: 0},
    { header: true , serie: "Serie F", backgroundColor: "#6d653f", rodada: 4},
    { serie: "F", rodada: 4, nameHome: "vernochi82", slugHome: require("../../assets/escudos/vernochi82.png"), backgroundColorHome: "#a64b00", textColorHome: "#ff241d", pointsColorHome: "#ff241d", idHome: 25584876, pontuacaoUltimaRodadaHome: 44, ptsHome: 0, atletasHome: [], pegouAtletasHome: false , numAtletasPontuandoHome: 0, capitaoIdHome: 0, nameAway: "Leozito Neves FC", slugAway: require("../../assets/escudos/leozito-neves-fc.png"), backgroundColorAway: "#000000", textColorAway: "#bf1d17", pointsColorAway: "#bf1d17", idAway: 4528687, pontuacaoUltimaRodadaAway: 46, ptsAway: 0, atletasAway: [], pegouAtletasAway: false , numAtletasPontuandoAway: 0, capitaoIdAway: 0},
    { serie: "F", rodada: 4, nameHome: "Meninos do Maudi", slugHome: require("../../assets/escudos/meninos-do-maudi.png"), backgroundColorHome: "#000000", textColorHome: "#ffffff", pointsColorHome: "#ffffff", idHome: 1179838, pontuacaoUltimaRodadaHome: 52, ptsHome: 0, atletasHome: [], pegouAtletasHome: false , numAtletasPontuandoHome: 0, capitaoIdHome: 0, nameAway: "tarcisiospfc", slugAway: require("../../assets/escudos/tarcisiospfc.png"), backgroundColorAway: "#ff241d", textColorAway: "#ffffff", pointsColorAway: "#ffffff", idAway: 8917, pontuacaoUltimaRodadaAway: 25, ptsAway: 0, atletasAway: [], pegouAtletasAway: false , numAtletasPontuandoAway: 0, capitaoIdAway: 0},
    { serie: "F", rodada: 4, nameHome: "Golog", slugHome: require("../../assets/escudos/golog.png"), backgroundColorHome: "#000000", textColorHome: "#ffcb00", pointsColorHome: "#ffcb00", idHome: 25872151, pontuacaoUltimaRodadaHome: 53, ptsHome: 0, atletasHome: [], pegouAtletasHome: false , numAtletasPontuandoHome: 0, capitaoIdHome: 0, nameAway: "Cangaceiros BF", slugAway: require("../../assets/escudos/cangaceiros-bf.png"), backgroundColorAway: "#000000", textColorAway: "#19ff81", pointsColorAway: "#19ff81", idAway: 4554581, pontuacaoUltimaRodadaAway: 52, ptsAway: 0, atletasAway: [], pegouAtletasAway: false , numAtletasPontuandoAway: 0, capitaoIdAway: 0},
    // { header: true , serie: "Serie A", backgroundColor: "#366092", rodada: 5},
    // { serie: "A", rodada: 5, nameHome: "MGuto FC", slugHome: require("../../assets/escudos/mguto-fc.png"), backgroundColorHome: "#000000", textColorHome: "#ff241d", pointsColorHome: "#ff241d", idHome: 832153, pontuacaoUltimaRodadaHome: 94, ptsHome: 0, atletasHome: [], pegouAtletasHome: false , numAtletasPontuandoHome: 0, capitaoIdHome: 0, nameAway: "GastroNeles", slugAway: require("../../assets/escudos/gastroneles.png"), backgroundColorAway: "#000000", textColorAway: "#ffffff", pointsColorAway: "#ffffff", idAway: 3438042, pontuacaoUltimaRodadaAway: 107, ptsAway: 0, atletasAway: [], pegouAtletasAway: false , numAtletasPontuandoAway: 0, capitaoIdAway: 0},
    // { serie: "A", rodada: 5, nameHome: "5prastantas F.C.", slugHome: require("../../assets/escudos/5prastantas-f-c.png"), backgroundColorHome: "#808080", textColorHome: "#ffffff", pointsColorHome: "#ffffff", idHome: 13945827, pontuacaoUltimaRodadaHome: 95, ptsHome: 0, atletasHome: [], pegouAtletasHome: false , numAtletasPontuandoHome: 0, capitaoIdHome: 0, nameAway: "Palla Sports", slugAway: require("../../assets/escudos/palla-sports.png"), backgroundColorAway: "#808080", textColorAway: "#ff7400", pointsColorAway: "#ff7400", idAway: 623570, pontuacaoUltimaRodadaAway: 101, ptsAway: 0, atletasAway: [], pegouAtletasAway: false , numAtletasPontuandoAway: 0, capitaoIdAway: 0},
    // { serie: "A", rodada: 5, nameHome: "AA AZULAO DO SUL", slugHome: require("../../assets/escudos/aa-azulao-do-sul.png"), backgroundColorHome: "#ff241d", textColorHome: "#063780", pointsColorHome: "#063780", idHome: 6717458, pontuacaoUltimaRodadaHome: 93, ptsHome: 0, atletasHome: [], pegouAtletasHome: false , numAtletasPontuandoHome: 0, capitaoIdHome: 0, nameAway: "Código Fonte F.C", slugAway: require("../../assets/escudos/codigo-fonte-f-c.png"), backgroundColorAway: "#ffffff", textColorAway: "#063780", pointsColorAway: "#063780", idAway: 2489031, pontuacaoUltimaRodadaAway: 68, ptsAway: 0, atletasAway: [], pegouAtletasAway: false , numAtletasPontuandoAway: 0, capitaoIdAway: 0},
    // { header: true , serie: "Serie B", backgroundColor: "#953734", rodada: 5},
    // { serie: "B", rodada: 5, nameHome: "Sei de tudo e não ganho nada FC", slugHome: require("../../assets/escudos/sei-de-tudo-e-nao-ganho-nada-fc.png"), backgroundColorHome: "#ff241d", textColorHome: "#19ff81", pointsColorHome: "#19ff81", idHome: 749772, pontuacaoUltimaRodadaHome: 76, ptsHome: 0, atletasHome: [], pegouAtletasHome: false , numAtletasPontuandoHome: 0, capitaoIdHome: 0, nameAway: "VilãoFC", slugAway: require("../../assets/escudos/vilaofc.png"), backgroundColorAway: "#000000", textColorAway: "#ffffff", pointsColorAway: "#ffffff", idAway: 2370283, pontuacaoUltimaRodadaAway: 82, ptsAway: 0, atletasAway: [], pegouAtletasAway: false , numAtletasPontuandoAway: 0, capitaoIdAway: 0},
    // { serie: "B", rodada: 5, nameHome: "Atleticado", slugHome: require("../../assets/escudos/atleticado.png"), backgroundColorHome: "#4d004d", textColorHome: "#0066ff", pointsColorHome: "#0066ff", idHome: 661306, pontuacaoUltimaRodadaHome: 78, ptsHome: 0, atletasHome: [], pegouAtletasHome: false , numAtletasPontuandoHome: 0, capitaoIdHome: 0, nameAway: "BOUGERS", slugAway: require("../../assets/escudos/bougers.png"), backgroundColorAway: "#ff241d", textColorAway: "#000000", pointsColorAway: "#000000", idAway: 2835988, pontuacaoUltimaRodadaAway: 80, ptsAway: 0, atletasAway: [], pegouAtletasAway: false , numAtletasPontuandoAway: 0, capitaoIdAway: 0},
    // { serie: "B", rodada: 5, nameHome: "Pyranha", slugHome: require("../../assets/escudos/pyranha.png"), backgroundColorHome: "#e65ce6", textColorHome: "#000000", pointsColorHome: "#000000", idHome: 1135503, pontuacaoUltimaRodadaHome: 76, ptsHome: 0, atletasHome: [], pegouAtletasHome: false , numAtletasPontuandoHome: 0, capitaoIdHome: 0, nameAway: "Tangamandapiense Social Clube", slugAway: require("../../assets/escudos/tangamandapiense-social-clube.png"), backgroundColorAway: "#ffffff", textColorAway: "#4d004d", pointsColorAway: "#4d004d", idAway: 25867159, pontuacaoUltimaRodadaAway: 57, ptsAway: 0, atletasAway: [], pegouAtletasAway: false , numAtletasPontuandoAway: 0, capitaoIdAway: 0},
    // { header: true , serie: "Serie C", backgroundColor: "#4f6128", rodada: 5},
    // { serie: "C", rodada: 5, nameHome: "Balacubacu FC", slugHome: require("../../assets/escudos/balacubacu-fc.png"), backgroundColorHome: "#000000", textColorHome: "#808080", pointsColorHome: "#808080", idHome: 3170764, pontuacaoUltimaRodadaHome: 68, ptsHome: 0, atletasHome: [], pegouAtletasHome: false , numAtletasPontuandoHome: 0, capitaoIdHome: 0, nameAway: "El mordedô", slugAway: require("../../assets/escudos/el-mordedo.png"), backgroundColorAway: "#4d004d", textColorAway: "#00cc5c", pointsColorAway: "#00cc5c", idAway: 25856343, pontuacaoUltimaRodadaAway: 55, ptsAway: 0, atletasAway: [], pegouAtletasAway: false , numAtletasPontuandoAway: 0, capitaoIdAway: 0},
    // { serie: "C", rodada: 5, nameHome: "U.C. Leões de Judá", slugHome: require("../../assets/escudos/u-c-leoes-de-juda.png"), backgroundColorHome: "#000000", textColorHome: "#ffcb00", pointsColorHome: "#ffcb00", idHome: 14972226, pontuacaoUltimaRodadaHome: 72, ptsHome: 0, atletasHome: [], pegouAtletasHome: false , numAtletasPontuandoHome: 0, capitaoIdHome: 0, nameAway: "Time do Igor FC", slugAway: require("../../assets/escudos/time-do-igor-fc.png"), backgroundColorAway: "#ffcb00", textColorAway: "#000000", pointsColorAway: "#000000", idAway: 1160952, pontuacaoUltimaRodadaAway: 53, ptsAway: 0, atletasAway: [], pegouAtletasAway: false , numAtletasPontuandoAway: 0, capitaoIdAway: 0},
    // { serie: "C", rodada: 5, nameHome: "ChristoFlamengo", slugHome: require("../../assets/escudos/christoflamengo.png"), backgroundColorHome: "#bf1d17", textColorHome: "#000000", pointsColorHome: "#000000", idHome: 1540816, pontuacaoUltimaRodadaHome: 70, ptsHome: 0, atletasHome: [], pegouAtletasHome: false , numAtletasPontuandoHome: 0, capitaoIdHome: 0, nameAway: "RafitiFC", slugAway: require("../../assets/escudos/rafitifc.png"), backgroundColorAway: "#ffffff", textColorAway: "#0a6634", pointsColorAway: "#0a6634", idAway: 634335, pontuacaoUltimaRodadaAway: 74, ptsAway: 0, atletasAway: [], pegouAtletasAway: false , numAtletasPontuandoAway: 0, capitaoIdAway: 0},
    // { header: true , serie: "Serie D", backgroundColor: "#e36c09", rodada: 5},
    // { serie: "D", rodada: 5, nameHome: "Victrola F.C.", slugHome: require("../../assets/escudos/victrola-f-c.png"), backgroundColorHome: "#808080", textColorHome: "#bf1d17", pointsColorHome: "#bf1d17", idHome: 13946184, pontuacaoUltimaRodadaHome: 66, ptsHome: 0, atletasHome: [], pegouAtletasHome: false , numAtletasPontuandoHome: 0, capitaoIdHome: 0, nameAway: "MBM Football", slugAway: require("../../assets/escudos/mbm-football.png"), backgroundColorAway: "#ffffff", textColorAway: "#000000", pointsColorAway: "#000000", idAway: 8869919, pontuacaoUltimaRodadaAway: 54, ptsAway: 0, atletasAway: [], pegouAtletasAway: false , numAtletasPontuandoAway: 0, capitaoIdAway: 0},
    // { serie: "D", rodada: 5, nameHome: "Edu 07 Araxá", slugHome: require("../../assets/escudos/edu-07-araxa.png"), backgroundColorHome: "#808080", textColorHome: "#ffffff", pointsColorHome: "#ffffff", idHome: 1225635, pontuacaoUltimaRodadaHome: 58, ptsHome: 0, atletasHome: [], pegouAtletasHome: false , numAtletasPontuandoHome: 0, capitaoIdHome: 0, nameAway: "Calambau Beer", slugAway: require("../../assets/escudos/calambau-beer.png"), backgroundColorAway: "#000000", textColorAway: "#ffffff", pointsColorAway: "#ffffff", idAway: 253542, pontuacaoUltimaRodadaAway: 69, ptsAway: 0, atletasAway: [], pegouAtletasAway: false , numAtletasPontuandoAway: 0, capitaoIdAway: 0},
    // { serie: "D", rodada: 5, nameHome: "Bigode De Cartola", slugHome: require("../../assets/escudos/bigode-de-cartola.png"), backgroundColorHome: "#997a00", textColorHome: "#ffffff", pointsColorHome: "#ffffff", idHome: 987444, pontuacaoUltimaRodadaHome: 66, ptsHome: 0, atletasHome: [], pegouAtletasHome: false , numAtletasPontuandoHome: 0, capitaoIdHome: 0, nameAway: "Sporting Draga", slugAway: require("../../assets/escudos/sporting-draga.png"), backgroundColorAway: "#000000", textColorAway: "#ff241d", pointsColorAway: "#ff241d", idAway: 810144, pontuacaoUltimaRodadaAway: 67, ptsAway: 0, atletasAway: [], pegouAtletasAway: false , numAtletasPontuandoAway: 0, capitaoIdAway: 0},
    // { header: true , serie: "Serie E", backgroundColor: "#5f497a", rodada: 5},
    // { serie: "E", rodada: 5, nameHome: "Sheik Tosado FC", slugHome: require("../../assets/escudos/sheik-tosado-fc.png"), backgroundColorHome: "#ff241d", textColorHome: "#000000", pointsColorHome: "#000000", idHome: 13951041, pontuacaoUltimaRodadaHome: 37, ptsHome: 0, atletasHome: [], pegouAtletasHome: false , numAtletasPontuandoHome: 0, capitaoIdHome: 0, nameAway: "Akuma Sport Club", slugAway: require("../../assets/escudos/akuma-sport-club.png"), backgroundColorAway: "#ffffff", textColorAway: "#000000", pointsColorAway: "#000000", idAway: 483335, pontuacaoUltimaRodadaAway: 58, ptsAway: 0, atletasAway: [], pegouAtletasAway: false , numAtletasPontuandoAway: 0, capitaoIdAway: 0},
    // { serie: "E", rodada: 5, nameHome: "sinceridade: qualidade maldita!", slugHome: require("../../assets/escudos/sinceridade-qualidade-maldita.png"), backgroundColorHome: "#000000", textColorHome: "#bf1d17", pointsColorHome: "#bf1d17", idHome: 5342721, pontuacaoUltimaRodadaHome: 37, ptsHome: 0, atletasHome: [], pegouAtletasHome: false , numAtletasPontuandoHome: 0, capitaoIdHome: 0, nameAway: "Skalabuta FC", slugAway: require("../../assets/escudos/skalabuta-fc.png"), backgroundColorAway: "#000000", textColorAway: "#ffffff", pointsColorAway: "#ffffff", idAway: 25871781, pontuacaoUltimaRodadaAway: 46, ptsAway: 0, atletasAway: [], pegouAtletasAway: false , numAtletasPontuandoAway: 0, capitaoIdAway: 0},
    // { serie: "E", rodada: 5, nameHome: "Menino Esperto F. C.", slugHome: require("../../assets/escudos/menino-esperto-f-c.png"), backgroundColorHome: "#000000", textColorHome: "#ffcb00", pointsColorHome: "#ffcb00", idHome: 7875842, pontuacaoUltimaRodadaHome: 50, ptsHome: 0, atletasHome: [], pegouAtletasHome: false , numAtletasPontuandoHome: 0, capitaoIdHome: 0, nameAway: "Ganso Doido", slugAway: require("../../assets/escudos/ganso-doido.png"), backgroundColorAway: "#bf1d17", textColorAway: "#063780", pointsColorAway: "#063780", idAway: 90144, pontuacaoUltimaRodadaAway: 58, ptsAway: 0, atletasAway: [], pegouAtletasAway: false , numAtletasPontuandoAway: 0, capitaoIdAway: 0},
    // { header: true , serie: "Serie F", backgroundColor: "#6d653f", rodada: 5},
    // { serie: "F", rodada: 5, nameHome: "tarcisiospfc", slugHome: require("../../assets/escudos/tarcisiospfc.png"), backgroundColorHome: "#ff241d", textColorHome: "#ffffff", pointsColorHome: "#ffffff", idHome: 8917, pontuacaoUltimaRodadaHome: 25, ptsHome: 0, atletasHome: [], pegouAtletasHome: false , numAtletasPontuandoHome: 0, capitaoIdHome: 0, nameAway: "vernochi82", slugAway: require("../../assets/escudos/vernochi82.png"), backgroundColorAway: "#a64b00", textColorAway: "#ff241d", pointsColorAway: "#ff241d", idAway: 25584876, pontuacaoUltimaRodadaAway: 44, ptsAway: 0, atletasAway: [], pegouAtletasAway: false , numAtletasPontuandoAway: 0, capitaoIdAway: 0},
    // { serie: "F", rodada: 5, nameHome: "Cangaceiros BF", slugHome: require("../../assets/escudos/cangaceiros-bf.png"), backgroundColorHome: "#000000", textColorHome: "#19ff81", pointsColorHome: "#19ff81", idHome: 4554581, pontuacaoUltimaRodadaHome: 52, ptsHome: 0, atletasHome: [], pegouAtletasHome: false , numAtletasPontuandoHome: 0, capitaoIdHome: 0, nameAway: "Meninos do Maudi", slugAway: require("../../assets/escudos/meninos-do-maudi.png"), backgroundColorAway: "#000000", textColorAway: "#ffffff", pointsColorAway: "#ffffff", idAway: 1179838, pontuacaoUltimaRodadaAway: 52, ptsAway: 0, atletasAway: [], pegouAtletasAway: false , numAtletasPontuandoAway: 0, capitaoIdAway: 0},
    // { serie: "F", rodada: 5, nameHome: "Leozito Neves FC", slugHome: require("../../assets/escudos/leozito-neves-fc.png"), backgroundColorHome: "#000000", textColorHome: "#bf1d17", pointsColorHome: "#bf1d17", idHome: 4528687, pontuacaoUltimaRodadaHome: 46, ptsHome: 0, atletasHome: [], pegouAtletasHome: false , numAtletasPontuandoHome: 0, capitaoIdHome: 0, nameAway: "Golog", slugAway: require("../../assets/escudos/golog.png"), backgroundColorAway: "#000000", textColorAway: "#ffcb00", pointsColorAway: "#ffcb00", idAway: 25872151, pontuacaoUltimaRodadaAway: 53, ptsAway: 0, atletasAway: [], pegouAtletasAway: false , numAtletasPontuandoAway: 0, capitaoIdAway: 0},
    // { header: true , serie: "Serie A", backgroundColor: "#366092", rodada: 6},
    // { serie: "A", rodada: 6, nameHome: "GastroNeles", slugHome: require("../../assets/escudos/gastroneles.png"), backgroundColorHome: "#000000", textColorHome: "#ffffff", pointsColorHome: "#ffffff", idHome: 3438042, pontuacaoUltimaRodadaHome: 107, ptsHome: 0, atletasHome: [], pegouAtletasHome: false , numAtletasPontuandoHome: 0, capitaoIdHome: 0, nameAway: "Palla Sports", slugAway: require("../../assets/escudos/palla-sports.png"), backgroundColorAway: "#808080", textColorAway: "#ff7400", pointsColorAway: "#ff7400", idAway: 623570, pontuacaoUltimaRodadaAway: 101, ptsAway: 0, atletasAway: [], pegouAtletasAway: false , numAtletasPontuandoAway: 0, capitaoIdAway: 0},
    // { serie: "A", rodada: 6, nameHome: "Código Fonte F.C", slugHome: require("../../assets/escudos/codigo-fonte-f-c.png"), backgroundColorHome: "#ffffff", textColorHome: "#063780", pointsColorHome: "#063780", idHome: 2489031, pontuacaoUltimaRodadaHome: 68, ptsHome: 0, atletasHome: [], pegouAtletasHome: false , numAtletasPontuandoHome: 0, capitaoIdHome: 0, nameAway: "MGuto FC", slugAway: require("../../assets/escudos/mguto-fc.png"), backgroundColorAway: "#000000", textColorAway: "#ff241d", pointsColorAway: "#ff241d", idAway: 832153, pontuacaoUltimaRodadaAway: 94, ptsAway: 0, atletasAway: [], pegouAtletasAway: false , numAtletasPontuandoAway: 0, capitaoIdAway: 0},
    // { serie: "A", rodada: 6, nameHome: "5prastantas F.C.", slugHome: require("../../assets/escudos/5prastantas-f-c.png"), backgroundColorHome: "#808080", textColorHome: "#ffffff", pointsColorHome: "#ffffff", idHome: 13945827, pontuacaoUltimaRodadaHome: 95, ptsHome: 0, atletasHome: [], pegouAtletasHome: false , numAtletasPontuandoHome: 0, capitaoIdHome: 0, nameAway: "AA AZULAO DO SUL", slugAway: require("../../assets/escudos/aa-azulao-do-sul.png"), backgroundColorAway: "#ff241d", textColorAway: "#063780", pointsColorAway: "#063780", idAway: 6717458, pontuacaoUltimaRodadaAway: 93, ptsAway: 0, atletasAway: [], pegouAtletasAway: false , numAtletasPontuandoAway: 0, capitaoIdAway: 0},
    // { header: true , serie: "Serie B", backgroundColor: "#953734", rodada: 6},
    // { serie: "B", rodada: 6, nameHome: "VilãoFC", slugHome: require("../../assets/escudos/vilaofc.png"), backgroundColorHome: "#000000", textColorHome: "#ffffff", pointsColorHome: "#ffffff", idHome: 2370283, pontuacaoUltimaRodadaHome: 82, ptsHome: 0, atletasHome: [], pegouAtletasHome: false , numAtletasPontuandoHome: 0, capitaoIdHome: 0, nameAway: "BOUGERS", slugAway: require("../../assets/escudos/bougers.png"), backgroundColorAway: "#ff241d", textColorAway: "#000000", pointsColorAway: "#000000", idAway: 2835988, pontuacaoUltimaRodadaAway: 80, ptsAway: 0, atletasAway: [], pegouAtletasAway: false , numAtletasPontuandoAway: 0, capitaoIdAway: 0},
    // { serie: "B", rodada: 6, nameHome: "Tangamandapiense Social Clube", slugHome: require("../../assets/escudos/tangamandapiense-social-clube.png"), backgroundColorHome: "#ffffff", textColorHome: "#4d004d", pointsColorHome: "#4d004d", idHome: 25867159, pontuacaoUltimaRodadaHome: 57, ptsHome: 0, atletasHome: [], pegouAtletasHome: false , numAtletasPontuandoHome: 0, capitaoIdHome: 0, nameAway: "Sei de tudo e não ganho nada FC", slugAway: require("../../assets/escudos/sei-de-tudo-e-nao-ganho-nada-fc.png"), backgroundColorAway: "#ff241d", textColorAway: "#19ff81", pointsColorAway: "#19ff81", idAway: 749772, pontuacaoUltimaRodadaAway: 76, ptsAway: 0, atletasAway: [], pegouAtletasAway: false , numAtletasPontuandoAway: 0, capitaoIdAway: 0},
    // { serie: "B", rodada: 6, nameHome: "Atleticado", slugHome: require("../../assets/escudos/atleticado.png"), backgroundColorHome: "#4d004d", textColorHome: "#0066ff", pointsColorHome: "#0066ff", idHome: 661306, pontuacaoUltimaRodadaHome: 78, ptsHome: 0, atletasHome: [], pegouAtletasHome: false , numAtletasPontuandoHome: 0, capitaoIdHome: 0, nameAway: "Pyranha", slugAway: require("../../assets/escudos/pyranha.png"), backgroundColorAway: "#e65ce6", textColorAway: "#000000", pointsColorAway: "#000000", idAway: 1135503, pontuacaoUltimaRodadaAway: 76, ptsAway: 0, atletasAway: [], pegouAtletasAway: false , numAtletasPontuandoAway: 0, capitaoIdAway: 0},
    // { header: true , serie: "Serie C", backgroundColor: "#4f6128", rodada: 6},
    // { serie: "C", rodada: 6, nameHome: "El mordedô", slugHome: require("../../assets/escudos/el-mordedo.png"), backgroundColorHome: "#4d004d", textColorHome: "#00cc5c", pointsColorHome: "#00cc5c", idHome: 25856343, pontuacaoUltimaRodadaHome: 55, ptsHome: 0, atletasHome: [], pegouAtletasHome: false , numAtletasPontuandoHome: 0, capitaoIdHome: 0, nameAway: "Time do Igor FC", slugAway: require("../../assets/escudos/time-do-igor-fc.png"), backgroundColorAway: "#ffcb00", textColorAway: "#000000", pointsColorAway: "#000000", idAway: 1160952, pontuacaoUltimaRodadaAway: 53, ptsAway: 0, atletasAway: [], pegouAtletasAway: false , numAtletasPontuandoAway: 0, capitaoIdAway: 0},
    // { serie: "C", rodada: 6, nameHome: "RafitiFC", slugHome: require("../../assets/escudos/rafitifc.png"), backgroundColorHome: "#ffffff", textColorHome: "#0a6634", pointsColorHome: "#0a6634", idHome: 634335, pontuacaoUltimaRodadaHome: 74, ptsHome: 0, atletasHome: [], pegouAtletasHome: false , numAtletasPontuandoHome: 0, capitaoIdHome: 0, nameAway: "Balacubacu FC", slugAway: require("../../assets/escudos/balacubacu-fc.png"), backgroundColorAway: "#000000", textColorAway: "#808080", pointsColorAway: "#808080", idAway: 3170764, pontuacaoUltimaRodadaAway: 68, ptsAway: 0, atletasAway: [], pegouAtletasAway: false , numAtletasPontuandoAway: 0, capitaoIdAway: 0},
    // { serie: "C", rodada: 6, nameHome: "U.C. Leões de Judá", slugHome: require("../../assets/escudos/u-c-leoes-de-juda.png"), backgroundColorHome: "#000000", textColorHome: "#ffcb00", pointsColorHome: "#ffcb00", idHome: 14972226, pontuacaoUltimaRodadaHome: 72, ptsHome: 0, atletasHome: [], pegouAtletasHome: false , numAtletasPontuandoHome: 0, capitaoIdHome: 0, nameAway: "ChristoFlamengo", slugAway: require("../../assets/escudos/christoflamengo.png"), backgroundColorAway: "#bf1d17", textColorAway: "#000000", pointsColorAway: "#000000", idAway: 1540816, pontuacaoUltimaRodadaAway: 70, ptsAway: 0, atletasAway: [], pegouAtletasAway: false , numAtletasPontuandoAway: 0, capitaoIdAway: 0},
    // { header: true , serie: "Serie D", backgroundColor: "#e36c09", rodada: 6},
    // { serie: "D", rodada: 6, nameHome: "MBM Football", slugHome: require("../../assets/escudos/mbm-football.png"), backgroundColorHome: "#ffffff", textColorHome: "#000000", pointsColorHome: "#000000", idHome: 8869919, pontuacaoUltimaRodadaHome: 54, ptsHome: 0, atletasHome: [], pegouAtletasHome: false , numAtletasPontuandoHome: 0, capitaoIdHome: 0, nameAway: "Calambau Beer", slugAway: require("../../assets/escudos/calambau-beer.png"), backgroundColorAway: "#000000", textColorAway: "#ffffff", pointsColorAway: "#ffffff", idAway: 253542, pontuacaoUltimaRodadaAway: 69, ptsAway: 0, atletasAway: [], pegouAtletasAway: false , numAtletasPontuandoAway: 0, capitaoIdAway: 0},
    // { serie: "D", rodada: 6, nameHome: "Sporting Draga", slugHome: require("../../assets/escudos/sporting-draga.png"), backgroundColorHome: "#000000", textColorHome: "#ff241d", pointsColorHome: "#ff241d", idHome: 810144, pontuacaoUltimaRodadaHome: 67, ptsHome: 0, atletasHome: [], pegouAtletasHome: false , numAtletasPontuandoHome: 0, capitaoIdHome: 0, nameAway: "Victrola F.C.", slugAway: require("../../assets/escudos/victrola-f-c.png"), backgroundColorAway: "#808080", textColorAway: "#bf1d17", pointsColorAway: "#bf1d17", idAway: 13946184, pontuacaoUltimaRodadaAway: 66, ptsAway: 0, atletasAway: [], pegouAtletasAway: false , numAtletasPontuandoAway: 0, capitaoIdAway: 0},
    // { serie: "D", rodada: 6, nameHome: "Edu 07 Araxá", slugHome: require("../../assets/escudos/edu-07-araxa.png"), backgroundColorHome: "#808080", textColorHome: "#ffffff", pointsColorHome: "#ffffff", idHome: 1225635, pontuacaoUltimaRodadaHome: 58, ptsHome: 0, atletasHome: [], pegouAtletasHome: false , numAtletasPontuandoHome: 0, capitaoIdHome: 0, nameAway: "Bigode De Cartola", slugAway: require("../../assets/escudos/bigode-de-cartola.png"), backgroundColorAway: "#997a00", textColorAway: "#ffffff", pointsColorAway: "#ffffff", idAway: 987444, pontuacaoUltimaRodadaAway: 66, ptsAway: 0, atletasAway: [], pegouAtletasAway: false , numAtletasPontuandoAway: 0, capitaoIdAway: 0},
    // { header: true , serie: "Serie E", backgroundColor: "#5f497a", rodada: 6},
    // { serie: "E", rodada: 6, nameHome: "Akuma Sport Club", slugHome: require("../../assets/escudos/akuma-sport-club.png"), backgroundColorHome: "#ffffff", textColorHome: "#000000", pointsColorHome: "#000000", idHome: 483335, pontuacaoUltimaRodadaHome: 58, ptsHome: 0, atletasHome: [], pegouAtletasHome: false , numAtletasPontuandoHome: 0, capitaoIdHome: 0, nameAway: "Skalabuta FC", slugAway: require("../../assets/escudos/skalabuta-fc.png"), backgroundColorAway: "#000000", textColorAway: "#ffffff", pointsColorAway: "#ffffff", idAway: 25871781, pontuacaoUltimaRodadaAway: 46, ptsAway: 0, atletasAway: [], pegouAtletasAway: false , numAtletasPontuandoAway: 0, capitaoIdAway: 0},
    // { serie: "E", rodada: 6, nameHome: "Ganso Doido", slugHome: require("../../assets/escudos/ganso-doido.png"), backgroundColorHome: "#bf1d17", textColorHome: "#063780", pointsColorHome: "#063780", idHome: 90144, pontuacaoUltimaRodadaHome: 58, ptsHome: 0, atletasHome: [], pegouAtletasHome: false , numAtletasPontuandoHome: 0, capitaoIdHome: 0, nameAway: "Sheik Tosado FC", slugAway: require("../../assets/escudos/sheik-tosado-fc.png"), backgroundColorAway: "#ff241d", textColorAway: "#000000", pointsColorAway: "#000000", idAway: 13951041, pontuacaoUltimaRodadaAway: 37, ptsAway: 0, atletasAway: [], pegouAtletasAway: false , numAtletasPontuandoAway: 0, capitaoIdAway: 0},
    // { serie: "E", rodada: 6, nameHome: "sinceridade: qualidade maldita!", slugHome: require("../../assets/escudos/sinceridade-qualidade-maldita.png"), backgroundColorHome: "#000000", textColorHome: "#bf1d17", pointsColorHome: "#bf1d17", idHome: 5342721, pontuacaoUltimaRodadaHome: 37, ptsHome: 0, atletasHome: [], pegouAtletasHome: false , numAtletasPontuandoHome: 0, capitaoIdHome: 0, nameAway: "Menino Esperto F. C.", slugAway: require("../../assets/escudos/menino-esperto-f-c.png"), backgroundColorAway: "#000000", textColorAway: "#ffcb00", pointsColorAway: "#ffcb00", idAway: 7875842, pontuacaoUltimaRodadaAway: 50, ptsAway: 0, atletasAway: [], pegouAtletasAway: false , numAtletasPontuandoAway: 0, capitaoIdAway: 0},
    // { header: true , serie: "Serie F", backgroundColor: "#6d653f", rodada: 6},
    // { serie: "F", rodada: 6, nameHome: "vernochi82", slugHome: require("../../assets/escudos/vernochi82.png"), backgroundColorHome: "#a64b00", textColorHome: "#ff241d", pointsColorHome: "#ff241d", idHome: 25584876, pontuacaoUltimaRodadaHome: 44, ptsHome: 0, atletasHome: [], pegouAtletasHome: false , numAtletasPontuandoHome: 0, capitaoIdHome: 0, nameAway: "Meninos do Maudi", slugAway: require("../../assets/escudos/meninos-do-maudi.png"), backgroundColorAway: "#000000", textColorAway: "#ffffff", pointsColorAway: "#ffffff", idAway: 1179838, pontuacaoUltimaRodadaAway: 52, ptsAway: 0, atletasAway: [], pegouAtletasAway: false , numAtletasPontuandoAway: 0, capitaoIdAway: 0},
    // { serie: "F", rodada: 6, nameHome: "Golog", slugHome: require("../../assets/escudos/golog.png"), backgroundColorHome: "#000000", textColorHome: "#ffcb00", pointsColorHome: "#ffcb00", idHome: 25872151, pontuacaoUltimaRodadaHome: 53, ptsHome: 0, atletasHome: [], pegouAtletasHome: false , numAtletasPontuandoHome: 0, capitaoIdHome: 0, nameAway: "tarcisiospfc", slugAway: require("../../assets/escudos/tarcisiospfc.png"), backgroundColorAway: "#ff241d", textColorAway: "#ffffff", pointsColorAway: "#ffffff", idAway: 8917, pontuacaoUltimaRodadaAway: 25, ptsAway: 0, atletasAway: [], pegouAtletasAway: false , numAtletasPontuandoAway: 0, capitaoIdAway: 0},
    // { serie: "F", rodada: 6, nameHome: "Cangaceiros BF", slugHome: require("../../assets/escudos/cangaceiros-bf.png"), backgroundColorHome: "#000000", textColorHome: "#19ff81", pointsColorHome: "#19ff81", idHome: 4554581, pontuacaoUltimaRodadaHome: 52, ptsHome: 0, atletasHome: [], pegouAtletasHome: false , numAtletasPontuandoHome: 0, capitaoIdHome: 0, nameAway: "Leozito Neves FC", slugAway: require("../../assets/escudos/leozito-neves-fc.png"), backgroundColorAway: "#000000", textColorAway: "#bf1d17", pointsColorAway: "#bf1d17", idAway: 4528687, pontuacaoUltimaRodadaAway: 46, ptsAway: 0, atletasAway: [], pegouAtletasAway: false , numAtletasPontuandoAway: 0, capitaoIdAway: 0},
    // { header: true , serie: "Serie A", backgroundColor: "#366092", rodada: 7},
    // { serie: "A", rodada: 7, nameHome: "Código Fonte F.C", slugHome: require("../../assets/escudos/codigo-fonte-f-c.png"), backgroundColorHome: "#ffffff", textColorHome: "#063780", pointsColorHome: "#063780", idHome: 2489031, pontuacaoUltimaRodadaHome: 68, ptsHome: 0, atletasHome: [], pegouAtletasHome: false , numAtletasPontuandoHome: 0, capitaoIdHome: 0, nameAway: "GastroNeles", slugAway: require("../../assets/escudos/gastroneles.png"), backgroundColorAway: "#000000", textColorAway: "#ffffff", pointsColorAway: "#ffffff", idAway: 3438042, pontuacaoUltimaRodadaAway: 107, ptsAway: 0, atletasAway: [], pegouAtletasAway: false , numAtletasPontuandoAway: 0, capitaoIdAway: 0},
    // { serie: "A", rodada: 7, nameHome: "Palla Sports", slugHome: require("../../assets/escudos/palla-sports.png"), backgroundColorHome: "#808080", textColorHome: "#ff7400", pointsColorHome: "#ff7400", idHome: 623570, pontuacaoUltimaRodadaHome: 101, ptsHome: 0, atletasHome: [], pegouAtletasHome: false , numAtletasPontuandoHome: 0, capitaoIdHome: 0, nameAway: "AA AZULAO DO SUL", slugAway: require("../../assets/escudos/aa-azulao-do-sul.png"), backgroundColorAway: "#ff241d", textColorAway: "#063780", pointsColorAway: "#063780", idAway: 6717458, pontuacaoUltimaRodadaAway: 93, ptsAway: 0, atletasAway: [], pegouAtletasAway: false , numAtletasPontuandoAway: 0, capitaoIdAway: 0},
    // { serie: "A", rodada: 7, nameHome: "MGuto FC", slugHome: require("../../assets/escudos/mguto-fc.png"), backgroundColorHome: "#000000", textColorHome: "#ff241d", pointsColorHome: "#ff241d", idHome: 832153, pontuacaoUltimaRodadaHome: 94, ptsHome: 0, atletasHome: [], pegouAtletasHome: false , numAtletasPontuandoHome: 0, capitaoIdHome: 0, nameAway: "5prastantas F.C.", slugAway: require("../../assets/escudos/5prastantas-f-c.png"), backgroundColorAway: "#808080", textColorAway: "#ffffff", pointsColorAway: "#ffffff", idAway: 13945827, pontuacaoUltimaRodadaAway: 95, ptsAway: 0, atletasAway: [], pegouAtletasAway: false , numAtletasPontuandoAway: 0, capitaoIdAway: 0},
    // { header: true , serie: "Serie B", backgroundColor: "#953734", rodada: 7},
    // { serie: "B", rodada: 7, nameHome: "Tangamandapiense Social Clube", slugHome: require("../../assets/escudos/tangamandapiense-social-clube.png"), backgroundColorHome: "#ffffff", textColorHome: "#4d004d", pointsColorHome: "#4d004d", idHome: 25867159, pontuacaoUltimaRodadaHome: 57, ptsHome: 0, atletasHome: [], pegouAtletasHome: false , numAtletasPontuandoHome: 0, capitaoIdHome: 0, nameAway: "VilãoFC", slugAway: require("../../assets/escudos/vilaofc.png"), backgroundColorAway: "#000000", textColorAway: "#ffffff", pointsColorAway: "#ffffff", idAway: 2370283, pontuacaoUltimaRodadaAway: 82, ptsAway: 0, atletasAway: [], pegouAtletasAway: false , numAtletasPontuandoAway: 0, capitaoIdAway: 0},
    // { serie: "B", rodada: 7, nameHome: "BOUGERS", slugHome: require("../../assets/escudos/bougers.png"), backgroundColorHome: "#ff241d", textColorHome: "#000000", pointsColorHome: "#000000", idHome: 2835988, pontuacaoUltimaRodadaHome: 80, ptsHome: 0, atletasHome: [], pegouAtletasHome: false , numAtletasPontuandoHome: 0, capitaoIdHome: 0, nameAway: "Pyranha", slugAway: require("../../assets/escudos/pyranha.png"), backgroundColorAway: "#e65ce6", textColorAway: "#000000", pointsColorAway: "#000000", idAway: 1135503, pontuacaoUltimaRodadaAway: 76, ptsAway: 0, atletasAway: [], pegouAtletasAway: false , numAtletasPontuandoAway: 0, capitaoIdAway: 0},
    // { serie: "B", rodada: 7, nameHome: "Sei de tudo e não ganho nada FC", slugHome: require("../../assets/escudos/sei-de-tudo-e-nao-ganho-nada-fc.png"), backgroundColorHome: "#ff241d", textColorHome: "#19ff81", pointsColorHome: "#19ff81", idHome: 749772, pontuacaoUltimaRodadaHome: 76, ptsHome: 0, atletasHome: [], pegouAtletasHome: false , numAtletasPontuandoHome: 0, capitaoIdHome: 0, nameAway: "Atleticado", slugAway: require("../../assets/escudos/atleticado.png"), backgroundColorAway: "#4d004d", textColorAway: "#0066ff", pointsColorAway: "#0066ff", idAway: 661306, pontuacaoUltimaRodadaAway: 78, ptsAway: 0, atletasAway: [], pegouAtletasAway: false , numAtletasPontuandoAway: 0, capitaoIdAway: 0},
    // { header: true , serie: "Serie C", backgroundColor: "#4f6128", rodada: 7},
    // { serie: "C", rodada: 7, nameHome: "RafitiFC", slugHome: require("../../assets/escudos/rafitifc.png"), backgroundColorHome: "#ffffff", textColorHome: "#0a6634", pointsColorHome: "#0a6634", idHome: 634335, pontuacaoUltimaRodadaHome: 74, ptsHome: 0, atletasHome: [], pegouAtletasHome: false , numAtletasPontuandoHome: 0, capitaoIdHome: 0, nameAway: "El mordedô", slugAway: require("../../assets/escudos/el-mordedo.png"), backgroundColorAway: "#4d004d", textColorAway: "#00cc5c", pointsColorAway: "#00cc5c", idAway: 25856343, pontuacaoUltimaRodadaAway: 55, ptsAway: 0, atletasAway: [], pegouAtletasAway: false , numAtletasPontuandoAway: 0, capitaoIdAway: 0},
    // { serie: "C", rodada: 7, nameHome: "Time do Igor FC", slugHome: require("../../assets/escudos/time-do-igor-fc.png"), backgroundColorHome: "#ffcb00", textColorHome: "#000000", pointsColorHome: "#000000", idHome: 1160952, pontuacaoUltimaRodadaHome: 53, ptsHome: 0, atletasHome: [], pegouAtletasHome: false , numAtletasPontuandoHome: 0, capitaoIdHome: 0, nameAway: "ChristoFlamengo", slugAway: require("../../assets/escudos/christoflamengo.png"), backgroundColorAway: "#bf1d17", textColorAway: "#000000", pointsColorAway: "#000000", idAway: 1540816, pontuacaoUltimaRodadaAway: 70, ptsAway: 0, atletasAway: [], pegouAtletasAway: false , numAtletasPontuandoAway: 0, capitaoIdAway: 0},
    // { serie: "C", rodada: 7, nameHome: "Balacubacu FC", slugHome: require("../../assets/escudos/balacubacu-fc.png"), backgroundColorHome: "#000000", textColorHome: "#808080", pointsColorHome: "#808080", idHome: 3170764, pontuacaoUltimaRodadaHome: 68, ptsHome: 0, atletasHome: [], pegouAtletasHome: false , numAtletasPontuandoHome: 0, capitaoIdHome: 0, nameAway: "U.C. Leões de Judá", slugAway: require("../../assets/escudos/u-c-leoes-de-juda.png"), backgroundColorAway: "#000000", textColorAway: "#ffcb00", pointsColorAway: "#ffcb00", idAway: 14972226, pontuacaoUltimaRodadaAway: 72, ptsAway: 0, atletasAway: [], pegouAtletasAway: false , numAtletasPontuandoAway: 0, capitaoIdAway: 0},
    // { header: true , serie: "Serie D", backgroundColor: "#e36c09", rodada: 7},
    // { serie: "D", rodada: 7, nameHome: "Sporting Draga", slugHome: require("../../assets/escudos/sporting-draga.png"), backgroundColorHome: "#000000", textColorHome: "#ff241d", pointsColorHome: "#ff241d", idHome: 810144, pontuacaoUltimaRodadaHome: 67, ptsHome: 0, atletasHome: [], pegouAtletasHome: false , numAtletasPontuandoHome: 0, capitaoIdHome: 0, nameAway: "MBM Football", slugAway: require("../../assets/escudos/mbm-football.png"), backgroundColorAway: "#ffffff", textColorAway: "#000000", pointsColorAway: "#000000", idAway: 8869919, pontuacaoUltimaRodadaAway: 54, ptsAway: 0, atletasAway: [], pegouAtletasAway: false , numAtletasPontuandoAway: 0, capitaoIdAway: 0},
    // { serie: "D", rodada: 7, nameHome: "Calambau Beer", slugHome: require("../../assets/escudos/calambau-beer.png"), backgroundColorHome: "#000000", textColorHome: "#ffffff", pointsColorHome: "#ffffff", idHome: 253542, pontuacaoUltimaRodadaHome: 69, ptsHome: 0, atletasHome: [], pegouAtletasHome: false , numAtletasPontuandoHome: 0, capitaoIdHome: 0, nameAway: "Bigode De Cartola", slugAway: require("../../assets/escudos/bigode-de-cartola.png"), backgroundColorAway: "#997a00", textColorAway: "#ffffff", pointsColorAway: "#ffffff", idAway: 987444, pontuacaoUltimaRodadaAway: 66, ptsAway: 0, atletasAway: [], pegouAtletasAway: false , numAtletasPontuandoAway: 0, capitaoIdAway: 0},
    // { serie: "D", rodada: 7, nameHome: "Victrola F.C.", slugHome: require("../../assets/escudos/victrola-f-c.png"), backgroundColorHome: "#808080", textColorHome: "#bf1d17", pointsColorHome: "#bf1d17", idHome: 13946184, pontuacaoUltimaRodadaHome: 66, ptsHome: 0, atletasHome: [], pegouAtletasHome: false , numAtletasPontuandoHome: 0, capitaoIdHome: 0, nameAway: "Edu 07 Araxá", slugAway: require("../../assets/escudos/edu-07-araxa.png"), backgroundColorAway: "#808080", textColorAway: "#ffffff", pointsColorAway: "#ffffff", idAway: 1225635, pontuacaoUltimaRodadaAway: 58, ptsAway: 0, atletasAway: [], pegouAtletasAway: false , numAtletasPontuandoAway: 0, capitaoIdAway: 0},
    // { header: true , serie: "Serie E", backgroundColor: "#5f497a", rodada: 7},
    // { serie: "E", rodada: 7, nameHome: "Ganso Doido", slugHome: require("../../assets/escudos/ganso-doido.png"), backgroundColorHome: "#bf1d17", textColorHome: "#063780", pointsColorHome: "#063780", idHome: 90144, pontuacaoUltimaRodadaHome: 58, ptsHome: 0, atletasHome: [], pegouAtletasHome: false , numAtletasPontuandoHome: 0, capitaoIdHome: 0, nameAway: "Akuma Sport Club", slugAway: require("../../assets/escudos/akuma-sport-club.png"), backgroundColorAway: "#ffffff", textColorAway: "#000000", pointsColorAway: "#000000", idAway: 483335, pontuacaoUltimaRodadaAway: 58, ptsAway: 0, atletasAway: [], pegouAtletasAway: false , numAtletasPontuandoAway: 0, capitaoIdAway: 0},
    // { serie: "E", rodada: 7, nameHome: "Skalabuta FC", slugHome: require("../../assets/escudos/skalabuta-fc.png"), backgroundColorHome: "#000000", textColorHome: "#ffffff", pointsColorHome: "#ffffff", idHome: 25871781, pontuacaoUltimaRodadaHome: 46, ptsHome: 0, atletasHome: [], pegouAtletasHome: false , numAtletasPontuandoHome: 0, capitaoIdHome: 0, nameAway: "Menino Esperto F. C.", slugAway: require("../../assets/escudos/menino-esperto-f-c.png"), backgroundColorAway: "#000000", textColorAway: "#ffcb00", pointsColorAway: "#ffcb00", idAway: 7875842, pontuacaoUltimaRodadaAway: 50, ptsAway: 0, atletasAway: [], pegouAtletasAway: false , numAtletasPontuandoAway: 0, capitaoIdAway: 0},
    // { serie: "E", rodada: 7, nameHome: "Sheik Tosado FC", slugHome: require("../../assets/escudos/sheik-tosado-fc.png"), backgroundColorHome: "#ff241d", textColorHome: "#000000", pointsColorHome: "#000000", idHome: 13951041, pontuacaoUltimaRodadaHome: 37, ptsHome: 0, atletasHome: [], pegouAtletasHome: false , numAtletasPontuandoHome: 0, capitaoIdHome: 0, nameAway: "sinceridade: qualidade maldita!", slugAway: require("../../assets/escudos/sinceridade-qualidade-maldita.png"), backgroundColorAway: "#000000", textColorAway: "#bf1d17", pointsColorAway: "#bf1d17", idAway: 5342721, pontuacaoUltimaRodadaAway: 37, ptsAway: 0, atletasAway: [], pegouAtletasAway: false , numAtletasPontuandoAway: 0, capitaoIdAway: 0},
    // { header: true , serie: "Serie F", backgroundColor: "#6d653f", rodada: 7},
    // { serie: "F", rodada: 7, nameHome: "Golog", slugHome: require("../../assets/escudos/golog.png"), backgroundColorHome: "#000000", textColorHome: "#ffcb00", pointsColorHome: "#ffcb00", idHome: 25872151, pontuacaoUltimaRodadaHome: 53, ptsHome: 0, atletasHome: [], pegouAtletasHome: false , numAtletasPontuandoHome: 0, capitaoIdHome: 0, nameAway: "vernochi82", slugAway: require("../../assets/escudos/vernochi82.png"), backgroundColorAway: "#a64b00", textColorAway: "#ff241d", pointsColorAway: "#ff241d", idAway: 25584876, pontuacaoUltimaRodadaAway: 44, ptsAway: 0, atletasAway: [], pegouAtletasAway: false , numAtletasPontuandoAway: 0, capitaoIdAway: 0},
    // { serie: "F", rodada: 7, nameHome: "Meninos do Maudi", slugHome: require("../../assets/escudos/meninos-do-maudi.png"), backgroundColorHome: "#000000", textColorHome: "#ffffff", pointsColorHome: "#ffffff", idHome: 1179838, pontuacaoUltimaRodadaHome: 52, ptsHome: 0, atletasHome: [], pegouAtletasHome: false , numAtletasPontuandoHome: 0, capitaoIdHome: 0, nameAway: "Leozito Neves FC", slugAway: require("../../assets/escudos/leozito-neves-fc.png"), backgroundColorAway: "#000000", textColorAway: "#bf1d17", pointsColorAway: "#bf1d17", idAway: 4528687, pontuacaoUltimaRodadaAway: 46, ptsAway: 0, atletasAway: [], pegouAtletasAway: false , numAtletasPontuandoAway: 0, capitaoIdAway: 0},
    // { serie: "F", rodada: 7, nameHome: "tarcisiospfc", slugHome: require("../../assets/escudos/tarcisiospfc.png"), backgroundColorHome: "#ff241d", textColorHome: "#ffffff", pointsColorHome: "#ffffff", idHome: 8917, pontuacaoUltimaRodadaHome: 25, ptsHome: 0, atletasHome: [], pegouAtletasHome: false , numAtletasPontuandoHome: 0, capitaoIdHome: 0, nameAway: "Cangaceiros BF", slugAway: require("../../assets/escudos/cangaceiros-bf.png"), backgroundColorAway: "#000000", textColorAway: "#19ff81", pointsColorAway: "#19ff81", idAway: 4554581, pontuacaoUltimaRodadaAway: 52, ptsAway: 0, atletasAway: [], pegouAtletasAway: false , numAtletasPontuandoAway: 0, capitaoIdAway: 0},
    // { header: true , serie: "Serie A", backgroundColor: "#366092", rodada: 8},
    // { serie: "A", rodada: 8, nameHome: "GastroNeles", slugHome: require("../../assets/escudos/gastroneles.png"), backgroundColorHome: "#000000", textColorHome: "#ffffff", pointsColorHome: "#ffffff", idHome: 3438042, pontuacaoUltimaRodadaHome: 107, ptsHome: 0, atletasHome: [], pegouAtletasHome: false , numAtletasPontuandoHome: 0, capitaoIdHome: 0, nameAway: "5prastantas F.C.", slugAway: require("../../assets/escudos/5prastantas-f-c.png"), backgroundColorAway: "#808080", textColorAway: "#ffffff", pointsColorAway: "#ffffff", idAway: 13945827, pontuacaoUltimaRodadaAway: 95, ptsAway: 0, atletasAway: [], pegouAtletasAway: false , numAtletasPontuandoAway: 0, capitaoIdAway: 0},
    // { serie: "A", rodada: 8, nameHome: "Palla Sports", slugHome: require("../../assets/escudos/palla-sports.png"), backgroundColorHome: "#808080", textColorHome: "#ff7400", pointsColorHome: "#ff7400", idHome: 623570, pontuacaoUltimaRodadaHome: 101, ptsHome: 0, atletasHome: [], pegouAtletasHome: false , numAtletasPontuandoHome: 0, capitaoIdHome: 0, nameAway: "Código Fonte F.C", slugAway: require("../../assets/escudos/codigo-fonte-f-c.png"), backgroundColorAway: "#ffffff", textColorAway: "#063780", pointsColorAway: "#063780", idAway: 2489031, pontuacaoUltimaRodadaAway: 68, ptsAway: 0, atletasAway: [], pegouAtletasAway: false , numAtletasPontuandoAway: 0, capitaoIdAway: 0},
    // { serie: "A", rodada: 8, nameHome: "MGuto FC", slugHome: require("../../assets/escudos/mguto-fc.png"), backgroundColorHome: "#000000", textColorHome: "#ff241d", pointsColorHome: "#ff241d", idHome: 832153, pontuacaoUltimaRodadaHome: 94, ptsHome: 0, atletasHome: [], pegouAtletasHome: false , numAtletasPontuandoHome: 0, capitaoIdHome: 0, nameAway: "AA AZULAO DO SUL", slugAway: require("../../assets/escudos/aa-azulao-do-sul.png"), backgroundColorAway: "#ff241d", textColorAway: "#063780", pointsColorAway: "#063780", idAway: 6717458, pontuacaoUltimaRodadaAway: 93, ptsAway: 0, atletasAway: [], pegouAtletasAway: false , numAtletasPontuandoAway: 0, capitaoIdAway: 0},
    // { header: true , serie: "Serie B", backgroundColor: "#953734", rodada: 8},
    // { serie: "B", rodada: 8, nameHome: "VilãoFC", slugHome: require("../../assets/escudos/vilaofc.png"), backgroundColorHome: "#000000", textColorHome: "#ffffff", pointsColorHome: "#ffffff", idHome: 2370283, pontuacaoUltimaRodadaHome: 82, ptsHome: 0, atletasHome: [], pegouAtletasHome: false , numAtletasPontuandoHome: 0, capitaoIdHome: 0, nameAway: "Atleticado", slugAway: require("../../assets/escudos/atleticado.png"), backgroundColorAway: "#4d004d", textColorAway: "#0066ff", pointsColorAway: "#0066ff", idAway: 661306, pontuacaoUltimaRodadaAway: 78, ptsAway: 0, atletasAway: [], pegouAtletasAway: false , numAtletasPontuandoAway: 0, capitaoIdAway: 0},
    // { serie: "B", rodada: 8, nameHome: "BOUGERS", slugHome: require("../../assets/escudos/bougers.png"), backgroundColorHome: "#ff241d", textColorHome: "#000000", pointsColorHome: "#000000", idHome: 2835988, pontuacaoUltimaRodadaHome: 80, ptsHome: 0, atletasHome: [], pegouAtletasHome: false , numAtletasPontuandoHome: 0, capitaoIdHome: 0, nameAway: "Tangamandapiense Social Clube", slugAway: require("../../assets/escudos/tangamandapiense-social-clube.png"), backgroundColorAway: "#ffffff", textColorAway: "#4d004d", pointsColorAway: "#4d004d", idAway: 25867159, pontuacaoUltimaRodadaAway: 57, ptsAway: 0, atletasAway: [], pegouAtletasAway: false , numAtletasPontuandoAway: 0, capitaoIdAway: 0},
    // { serie: "B", rodada: 8, nameHome: "Sei de tudo e não ganho nada FC", slugHome: require("../../assets/escudos/sei-de-tudo-e-nao-ganho-nada-fc.png"), backgroundColorHome: "#ff241d", textColorHome: "#19ff81", pointsColorHome: "#19ff81", idHome: 749772, pontuacaoUltimaRodadaHome: 76, ptsHome: 0, atletasHome: [], pegouAtletasHome: false , numAtletasPontuandoHome: 0, capitaoIdHome: 0, nameAway: "Pyranha", slugAway: require("../../assets/escudos/pyranha.png"), backgroundColorAway: "#e65ce6", textColorAway: "#000000", pointsColorAway: "#000000", idAway: 1135503, pontuacaoUltimaRodadaAway: 76, ptsAway: 0, atletasAway: [], pegouAtletasAway: false , numAtletasPontuandoAway: 0, capitaoIdAway: 0},
    // { header: true , serie: "Serie C", backgroundColor: "#4f6128", rodada: 8},
    // { serie: "C", rodada: 8, nameHome: "El mordedô", slugHome: require("../../assets/escudos/el-mordedo.png"), backgroundColorHome: "#4d004d", textColorHome: "#00cc5c", pointsColorHome: "#00cc5c", idHome: 25856343, pontuacaoUltimaRodadaHome: 55, ptsHome: 0, atletasHome: [], pegouAtletasHome: false , numAtletasPontuandoHome: 0, capitaoIdHome: 0, nameAway: "U.C. Leões de Judá", slugAway: require("../../assets/escudos/u-c-leoes-de-juda.png"), backgroundColorAway: "#000000", textColorAway: "#ffcb00", pointsColorAway: "#ffcb00", idAway: 14972226, pontuacaoUltimaRodadaAway: 72, ptsAway: 0, atletasAway: [], pegouAtletasAway: false , numAtletasPontuandoAway: 0, capitaoIdAway: 0},
    // { serie: "C", rodada: 8, nameHome: "Time do Igor FC", slugHome: require("../../assets/escudos/time-do-igor-fc.png"), backgroundColorHome: "#ffcb00", textColorHome: "#000000", pointsColorHome: "#000000", idHome: 1160952, pontuacaoUltimaRodadaHome: 53, ptsHome: 0, atletasHome: [], pegouAtletasHome: false , numAtletasPontuandoHome: 0, capitaoIdHome: 0, nameAway: "RafitiFC", slugAway: require("../../assets/escudos/rafitifc.png"), backgroundColorAway: "#ffffff", textColorAway: "#0a6634", pointsColorAway: "#0a6634", idAway: 634335, pontuacaoUltimaRodadaAway: 74, ptsAway: 0, atletasAway: [], pegouAtletasAway: false , numAtletasPontuandoAway: 0, capitaoIdAway: 0},
    // { serie: "C", rodada: 8, nameHome: "Balacubacu FC", slugHome: require("../../assets/escudos/balacubacu-fc.png"), backgroundColorHome: "#000000", textColorHome: "#808080", pointsColorHome: "#808080", idHome: 3170764, pontuacaoUltimaRodadaHome: 68, ptsHome: 0, atletasHome: [], pegouAtletasHome: false , numAtletasPontuandoHome: 0, capitaoIdHome: 0, nameAway: "ChristoFlamengo", slugAway: require("../../assets/escudos/christoflamengo.png"), backgroundColorAway: "#bf1d17", textColorAway: "#000000", pointsColorAway: "#000000", idAway: 1540816, pontuacaoUltimaRodadaAway: 70, ptsAway: 0, atletasAway: [], pegouAtletasAway: false , numAtletasPontuandoAway: 0, capitaoIdAway: 0},
    // { header: true , serie: "Serie D", backgroundColor: "#e36c09", rodada: 8},
    // { serie: "D", rodada: 8, nameHome: "MBM Football", slugHome: require("../../assets/escudos/mbm-football.png"), backgroundColorHome: "#ffffff", textColorHome: "#000000", pointsColorHome: "#000000", idHome: 8869919, pontuacaoUltimaRodadaHome: 54, ptsHome: 0, atletasHome: [], pegouAtletasHome: false , numAtletasPontuandoHome: 0, capitaoIdHome: 0, nameAway: "Edu 07 Araxá", slugAway: require("../../assets/escudos/edu-07-araxa.png"), backgroundColorAway: "#808080", textColorAway: "#ffffff", pointsColorAway: "#ffffff", idAway: 1225635, pontuacaoUltimaRodadaAway: 58, ptsAway: 0, atletasAway: [], pegouAtletasAway: false , numAtletasPontuandoAway: 0, capitaoIdAway: 0},
    // { serie: "D", rodada: 8, nameHome: "Calambau Beer", slugHome: require("../../assets/escudos/calambau-beer.png"), backgroundColorHome: "#000000", textColorHome: "#ffffff", pointsColorHome: "#ffffff", idHome: 253542, pontuacaoUltimaRodadaHome: 69, ptsHome: 0, atletasHome: [], pegouAtletasHome: false , numAtletasPontuandoHome: 0, capitaoIdHome: 0, nameAway: "Sporting Draga", slugAway: require("../../assets/escudos/sporting-draga.png"), backgroundColorAway: "#000000", textColorAway: "#ff241d", pointsColorAway: "#ff241d", idAway: 810144, pontuacaoUltimaRodadaAway: 67, ptsAway: 0, atletasAway: [], pegouAtletasAway: false , numAtletasPontuandoAway: 0, capitaoIdAway: 0},
    // { serie: "D", rodada: 8, nameHome: "Victrola F.C.", slugHome: require("../../assets/escudos/victrola-f-c.png"), backgroundColorHome: "#808080", textColorHome: "#bf1d17", pointsColorHome: "#bf1d17", idHome: 13946184, pontuacaoUltimaRodadaHome: 66, ptsHome: 0, atletasHome: [], pegouAtletasHome: false , numAtletasPontuandoHome: 0, capitaoIdHome: 0, nameAway: "Bigode De Cartola", slugAway: require("../../assets/escudos/bigode-de-cartola.png"), backgroundColorAway: "#997a00", textColorAway: "#ffffff", pointsColorAway: "#ffffff", idAway: 987444, pontuacaoUltimaRodadaAway: 66, ptsAway: 0, atletasAway: [], pegouAtletasAway: false , numAtletasPontuandoAway: 0, capitaoIdAway: 0},
    // { header: true , serie: "Serie E", backgroundColor: "#5f497a", rodada: 8},
    // { serie: "E", rodada: 8, nameHome: "Akuma Sport Club", slugHome: require("../../assets/escudos/akuma-sport-club.png"), backgroundColorHome: "#ffffff", textColorHome: "#000000", pointsColorHome: "#000000", idHome: 483335, pontuacaoUltimaRodadaHome: 58, ptsHome: 0, atletasHome: [], pegouAtletasHome: false , numAtletasPontuandoHome: 0, capitaoIdHome: 0, nameAway: "sinceridade: qualidade maldita!", slugAway: require("../../assets/escudos/sinceridade-qualidade-maldita.png"), backgroundColorAway: "#000000", textColorAway: "#bf1d17", pointsColorAway: "#bf1d17", idAway: 5342721, pontuacaoUltimaRodadaAway: 37, ptsAway: 0, atletasAway: [], pegouAtletasAway: false , numAtletasPontuandoAway: 0, capitaoIdAway: 0},
    // { serie: "E", rodada: 8, nameHome: "Skalabuta FC", slugHome: require("../../assets/escudos/skalabuta-fc.png"), backgroundColorHome: "#000000", textColorHome: "#ffffff", pointsColorHome: "#ffffff", idHome: 25871781, pontuacaoUltimaRodadaHome: 46, ptsHome: 0, atletasHome: [], pegouAtletasHome: false , numAtletasPontuandoHome: 0, capitaoIdHome: 0, nameAway: "Ganso Doido", slugAway: require("../../assets/escudos/ganso-doido.png"), backgroundColorAway: "#bf1d17", textColorAway: "#063780", pointsColorAway: "#063780", idAway: 90144, pontuacaoUltimaRodadaAway: 58, ptsAway: 0, atletasAway: [], pegouAtletasAway: false , numAtletasPontuandoAway: 0, capitaoIdAway: 0},
    // { serie: "E", rodada: 8, nameHome: "Sheik Tosado FC", slugHome: require("../../assets/escudos/sheik-tosado-fc.png"), backgroundColorHome: "#ff241d", textColorHome: "#000000", pointsColorHome: "#000000", idHome: 13951041, pontuacaoUltimaRodadaHome: 37, ptsHome: 0, atletasHome: [], pegouAtletasHome: false , numAtletasPontuandoHome: 0, capitaoIdHome: 0, nameAway: "Menino Esperto F. C.", slugAway: require("../../assets/escudos/menino-esperto-f-c.png"), backgroundColorAway: "#000000", textColorAway: "#ffcb00", pointsColorAway: "#ffcb00", idAway: 7875842, pontuacaoUltimaRodadaAway: 50, ptsAway: 0, atletasAway: [], pegouAtletasAway: false , numAtletasPontuandoAway: 0, capitaoIdAway: 0},
    // { header: true , serie: "Serie F", backgroundColor: "#6d653f", rodada: 8},
    // { serie: "F", rodada: 8, nameHome: "vernochi82", slugHome: require("../../assets/escudos/vernochi82.png"), backgroundColorHome: "#a64b00", textColorHome: "#ff241d", pointsColorHome: "#ff241d", idHome: 25584876, pontuacaoUltimaRodadaHome: 44, ptsHome: 0, atletasHome: [], pegouAtletasHome: false , numAtletasPontuandoHome: 0, capitaoIdHome: 0, nameAway: "Cangaceiros BF", slugAway: require("../../assets/escudos/cangaceiros-bf.png"), backgroundColorAway: "#000000", textColorAway: "#19ff81", pointsColorAway: "#19ff81", idAway: 4554581, pontuacaoUltimaRodadaAway: 52, ptsAway: 0, atletasAway: [], pegouAtletasAway: false , numAtletasPontuandoAway: 0, capitaoIdAway: 0},
    // { serie: "F", rodada: 8, nameHome: "Meninos do Maudi", slugHome: require("../../assets/escudos/meninos-do-maudi.png"), backgroundColorHome: "#000000", textColorHome: "#ffffff", pointsColorHome: "#ffffff", idHome: 1179838, pontuacaoUltimaRodadaHome: 52, ptsHome: 0, atletasHome: [], pegouAtletasHome: false , numAtletasPontuandoHome: 0, capitaoIdHome: 0, nameAway: "Golog", slugAway: require("../../assets/escudos/golog.png"), backgroundColorAway: "#000000", textColorAway: "#ffcb00", pointsColorAway: "#ffcb00", idAway: 25872151, pontuacaoUltimaRodadaAway: 53, ptsAway: 0, atletasAway: [], pegouAtletasAway: false , numAtletasPontuandoAway: 0, capitaoIdAway: 0},
    // { serie: "F", rodada: 8, nameHome: "tarcisiospfc", slugHome: require("../../assets/escudos/tarcisiospfc.png"), backgroundColorHome: "#ff241d", textColorHome: "#ffffff", pointsColorHome: "#ffffff", idHome: 8917, pontuacaoUltimaRodadaHome: 25, ptsHome: 0, atletasHome: [], pegouAtletasHome: false , numAtletasPontuandoHome: 0, capitaoIdHome: 0, nameAway: "Leozito Neves FC", slugAway: require("../../assets/escudos/leozito-neves-fc.png"), backgroundColorAway: "#000000", textColorAway: "#bf1d17", pointsColorAway: "#bf1d17", idAway: 4528687, pontuacaoUltimaRodadaAway: 46, ptsAway: 0, atletasAway: [], pegouAtletasAway: false , numAtletasPontuandoAway: 0, capitaoIdAway: 0},
    
    // { name: "", backgroundColor: "#008000", textColor: "#008000", pointsColor: "#008000", id: 0, pts: -100 },
    // { name: "", backgroundColor: "#008000", textColor: "#008000", pointsColor: "#008000", id: 0, pts: -101 },        
  ]);

  const [jogos, setJogos] = React.useState([
    { home: 2489031, away: 25867159 },
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
            // console.log(atletasPontuando)
          });
      }, 500);









      items.forEach(element => {

        // items.sort((a, b) => (a.pts <= b.pts) ? 1 : -1)
        if (element.idHome != 0 && element.idAway != 0) {
          try {

            setTimeout(function () {
              if (!element.pegouAtletasHome) {
                // console.log("segunda chamada /id") // ---------------------------------------------------------------------------------------------
                // axios.get("https://cartolaigor-pjzxn.hoverfly.io/time/id/" + element.id)
                axios.get("https://api.cartolafc.globo.com/time/id/" + element.idHome + "/" + rodada_atual)
                  .then(res => {
                    if (res.status == 200) {
                      res.data.atletas.forEach(atleta => {
                        element.atletasHome.push(atleta.atleta_id)
                      })
                      element.pegouAtletasHome = true
                      element.capitaoIdHome = res.data.capitao_id;
                      setItems([...items], items);
                      // console.log("home - " + element.capitaoIdHome)
                    }
                  })
              }
            }, 1000);
            setTimeout(function () {
              if (!element.pegouAtletasAway) {
                axios.get("https://api.cartolafc.globo.com/time/id/" + element.idAway + "/" + rodada_atual)
                  .then(res2 => {
                    if (res2.status == 200) {
                      res2.data.atletas.forEach(atleta2 => {
                        element.atletasAway.push(atleta2.atleta_id)
                      })
                      element.pegouAtletasAway = true
                      element.capitaoidAway = res2.data.capitao_id;
                      // console.log("away - " + element.capitaoidAway)
                      setItems([...items], items);
                    }
                  })
              }
            }, 2000);
            // setItems([...items], items);      









            setTimeout(function () {
              if (element.pegouAtletasHome) {
                element.ptsHome = 0
                element.numAtletasPontuandoHome = 0;
                element.atletasHome.forEach(atleta => {
                  try {
                    element.ptsHome += atletasPontuando[atleta].pontuacao;
                    element.numAtletasPontuandoHome += 1;
                  } catch { }
                })
                try {
                  element.ptsHome += atletasPontuando[element.capitaoIdHome].pontuacao;
                } catch { }
                element.ptsHome = parseInt(element.ptsHome); 
                setItems([...items], items);
              }

              if (element.pegouAtletasAway) {
                element.ptsAway = 0
                element.numAtletasPontuandoAway = 0;
                element.atletasAway.forEach(atleta2 => {
                  try {
                    element.ptsAway += atletasPontuando[atleta2].pontuacao;
                    element.numAtletasPontuandoAway += 1;
                  } catch { }
                })
                try {
                  element.ptsAway += atletasPontuando[element.capitaoidAway].pontuacao;
                } catch { }
                element.ptsAway = parseInt(element.ptsAway);
                // console.log("away - " + element.nameAway + " - " +element.atletasAway)


                // element.pts = parseInt(element.pts) > element.maiorPontuacao ? parseInt(element.pts) : element.maiorPontuacao;
                //   element.pts = parseInt(pontuacao)

                // items.sort((a, b) => (a.pts <= b.pts) ? 1 : -1)
                // setItems([...items], items);
              }
              setItems([...items], items);
            }, 3000);
            // setItems([...items], items);
          } catch (error) {
            console.log("caiu no catch")
          }
        }
      });
    }
    // else {
    //   items.forEach(equipe => {
    //     if (equipe.idHome != 0) {
    //       if (equipe.ptsHome > equipe.maiorPontuacao) {
    //         equipe.maiorPontuacao = equipe.pts;
    //       }
    //       equipe.pts = equipe.maiorPontuacao;
    //       if (equipe.distrital) {
    //         equipe.pts = -50;
    //       }
    //       // items.sort((a, b) => (a.pts <= b.pts) ? 1 : -1)
    //       equipe.atletas = [];
    //       equipe.pegouAtletas = false;
    //       equipe.numAtletasPontuando = 0;
    //       setItems([...items], items);
    //     }

    //     if (equipe.id != 0) {
    //       if (equipe.pts > equipe.maiorPontuacao) {
    //         equipe.maiorPontuacao = equipe.pts;
    //       }
    //       equipe.pts = equipe.maiorPontuacao;
    //       if (equipe.distrital) {
    //         equipe.pts = -50;
    //       }
    //       // items.sort((a, b) => (a.pts <= b.pts) ? 1 : -1)
    //       equipe.atletas = [];
    //       equipe.pegouAtletas = false;
    //       equipe.numAtletasPontuando = 0;
    //       setItems([...items], items);
    //     }
    //   })
    // }

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
          // numColumns={2}
          renderItem={({ item, index }) => (

            <View style={{ flexDirection: 'row' }}>

              {/* Header de séries */}
              <View style={[!item.header || item.rodada != rodada_atual ? { display: 'none', borderWidth: 0, } : { justifyContent: 'center', borderWidth: 1, },
              styles.itemContainer,
              {
                marginHorizontal: Dimensions.get('window').width * 0.003,
                width: Dimensions.get('window').width * 0.97,
                backgroundColor: item.backgroundColor,
              }]}>
                <Text assstyle={[styles.itemName, { fontSize: 20, marginVertical: Dimensions.get('window').height * 0, color: "#ffffff" }]}>{item.serie}</Text>
              </View>

              {/* Nome Time Home */}
              <View style={[item.header || item.rodada != rodada_atual ? { marginVertical: Dimensions.get('window').height * 0, height: Dimensions.get('window').height * 0, display: 'none', borderWidth: 0, } : { width: Dimensions.get('window').width * 0.355, borderWidth: 1, },
              styles.itemContainer,
              {
                marginHorizontal: Dimensions.get('window').width * 0.003,
                backgroundColor: item.backgroundColorHome,
                borderColor: item.pointsColorHome,
              }
              ]}>
                <Text allowFontScaling={true} numberOfLines={1} style={[styles.itemName, { color: item.textColorHome }]}>{item.nameHome}</Text>
              </View>

              {/* Pontuacao do time de Casa */}
              <View style={[item.header || item.rodada != rodada_atual ? { marginVertical: Dimensions.get('window').height * 0, height: Dimensions.get('window').height * 0, display: 'none', borderWidth: 0, } : { width: Dimensions.get('window').width * 0.09, borderWidth: 1, },
              styles.itemContainer, {
                marginHorizontal: Dimensions.get('window').width * 0.003,
                backgroundColor: item.backgroundColorHome,
                borderColor: item.pointsColorHome,
              }
              ]}>
                {/* {console.log(item.ptsHome)} */}
                <Text adjustsFontSizeToFit={true} style={[styles.itemName, { color: item.pointsColorHome }]}>{item.ptsHome}</Text>
              </View>

              {/* Escudo do time Home */}
              <View style={item.header || item.rodada != rodada_atual ? { marginVertical: Dimensions.get('window').height * 0, height: Dimensions.get('window').height * 0, display: 'none' } : {}}>
                <Image source={item.slugHome}
                  style={[item.distrital || item.header || item.rodada != rodada_atual ? {
                    display: 'none', height: Dimensions.get('window').width * 0,
                    width: Dimensions.get('window').width * 0,
                    marginVertical: Dimensions.get('window').height * 0
                  } : {
                      height: Dimensions.get('window').width * 0.05,
                      width: Dimensions.get('window').width * 0.05,
                      marginVertical: Dimensions.get('window').height * -0.005,
                      marginHorizontal: Dimensions.get('window').width * -0.47,
                      position: 'absolute',
                      resizeMode: 'stretch'
                    }]} />
              </View>

              {/* Num de atletas pontuando Home*/}
              <View style={[item.header || item.rodada != rodada_atual ? {
                display: 'none', width: Dimensions.get('window').width * 0,
                height: Dimensions.get('window').width * 0
              } : {
                  width: Dimensions.get('window').width * 0.04,
                  height: Dimensions.get('window').width * 0.04,
                  borderWidth: 1
                },
              item.id != 0 ? {
                justifyContent: 'center',
                alignItems: "center",
                borderRadius: 100,
                position: 'absolute',
                marginVertical: Dimensions.get('window').height * 0.025,
                marginHorizontal: Dimensions.get('window').width * 0.34,
                backgroundColor: item.textColorHome,
                borderColor: item.backgroundColorHome
              } : {}]}>
                <Text adjustsFontSizeToFit={true} style={[styles.itemName, { fontSize: 9, color: item.backgroundColorHome }]}>{item.numAtletasPontuandoHome}</Text>
              </View>



              {/*   X   */}
              <View style={[item.header || index < 2 || item.rodada != rodada_atual ? { marginVertical: Dimensions.get('window').height * 0, height: Dimensions.get('window').height * 0, display: 'none' } : { width: Dimensions.get('window').width * 0.054 },
              styles.itemContainer, {
                marginHorizontal: Dimensions.get('window').width * 0.003,
                borderWidth: 0
              }]}>
                <Text adjustsFontSizeToFit={true} style={[styles.itemName, { color: "#fff", fontSize: 20 }]}>X</Text>
              </View>


              {/* Pontuacao do time de Fora */}
              <View style={[item.distrital || item.header || item.rodada != rodada_atual ? { marginVertical: Dimensions.get('window').height * 0, height: Dimensions.get('window').height * 0, display: 'none', borderWidth: 0, } : { width: Dimensions.get('window').width * 0.09, borderWidth: 1, },
              styles.itemContainer, {
                marginHorizontal: Dimensions.get('window').width * 0.003,
                backgroundColor: item.backgroundColorAway,
                borderColor: item.pointsColorAway,
              }]}>
                <Text adjustsFontSizeToFit={true} style={[styles.itemName, { color: item.pointsColorAway }]}>{item.ptsAway}</Text>
              </View>



              {/* Nome Time away */}
              <View style={[item.distrital || item.header || item.rodada != rodada_atual ? { marginVertical: Dimensions.get('window').height * 0, height: Dimensions.get('window').height * 0, display: 'none', borderWidth: 0, } : { width: Dimensions.get('window').width * 0.355, borderWidth: 1, },
              styles.itemContainer,
              {
                marginHorizontal: Dimensions.get('window').width * 0.003,
                backgroundColor: item.backgroundColorAway,
                borderColor: item.pointsColorAway,
                borderWidth: 1,
              }]}>
                <Text allowFontScaling={true} numberOfLines={1} style={[styles.itemName, { color: item.textColorAway }]}>{item.nameAway}</Text>
              </View>

              {/* Escudo do time Away */}
              <View style={item.distrital || item.header || item.rodada != rodada_atual ? { marginVertical: Dimensions.get('window').height * 0, height: Dimensions.get('window').height * 0, display: 'none' } : {}}>
                <Image source={item.slugAway}
                  style={[item.distrital || item.header || item.rodada != rodada_atual ? {
                    display: 'none', height: Dimensions.get('window').width * 0,
                    width: Dimensions.get('window').width * 0,
                    marginVertical: Dimensions.get('window').height * 0
                  } : {
                      height: Dimensions.get('window').width * 0.05,
                      width: Dimensions.get('window').width * 0.05,
                      marginVertical: Dimensions.get('window').height * -0.005,
                      marginHorizontal: Dimensions.get('window').width * -0.04,
                      position: 'absolute',
                      resizeMode: 'stretch'
                    }]} />
              </View>


              {/* Num de atletas pontuando Away*/}
              <View style={[item.distrital || item.header || item.rodada != rodada_atual ? {
                display: 'none', width: Dimensions.get('window').width * 0,
                height: Dimensions.get('window').width * 0
              } : {
                  width: Dimensions.get('window').width * 0.04,
                  height: Dimensions.get('window').width * 0.04,
                  borderWidth: 1
                },
              item.id != 0 ? {
                justifyContent: 'center',
                alignItems: "center",
                borderRadius: 100,
                position: 'absolute',
                marginVertical: Dimensions.get('window').height * 0.025,
                marginHorizontal: Dimensions.get('window').width * 0.592,
                backgroundColor: item.textColorAway,
                borderColor: item.backgroundColorAway
              } : {}]}>
                <Text adjustsFontSizeToFit={true} style={[styles.itemName, { fontSize: 9, color: item.backgroundColorAway }]}>{item.numAtletasPontuandoAway}</Text>
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
    fontSize: 14,
    fontWeight: '600'
  }

});
