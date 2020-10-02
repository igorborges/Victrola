import React, { useEffect, useState, useCallback } from 'react';
import { Dimensions, SafeAreaView, RefreshControl, DatePickerAndroid, ToastAndroid, Button, AsyncStorage } from 'react-native';
import { StyleSheet, Image, View, Text } from 'react-native';
import { FlatGrid } from 'react-native-super-grid';
import axios from 'axios';
export const loaderRef = React.createRef();
import PTRView from 'react-native-pull-to-refresh';
import { ForceTouchGestureHandler, TouchableHighlight } from 'react-native-gesture-handler';
import Modal from 'react-native-modal';
import { Cache } from "react-native-cache";


export default function Example() {

  const coresPorSerie = ["#366092", "#953734", "#4f6128", "#e36c09", "#5f497a", "#6d653f"];
  const contadorDeCores = [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 5, 5, 5, 5, 5, 5];
  var clubes = { 373: "https://s.glbimg.com/es/sde/f/organizacoes/2020/07/02/atletico-go-2020-45.png", 276: "https://s.glbimg.com/es/sde/f/organizacoes/2014/04/14/sao_paulo_45x45.png", 356: "https://s.glbimg.com/es/sde/f/organizacoes/2018/06/10/fortaleza-ec-45px.png", 292: "https://s.glbimg.com/es/sde/f/organizacoes/2015/07/21/sport45.png", 277: "https://s.glbimg.com/es/sde/f/organizacoes/2014/04/14/santos_45x45.png", 293: "https://s.glbimg.com/es/sde/f/organizacoes/2019/09/09/Athletico-PR-45x45.png", 263: "https://s.glbimg.com/es/sde/f/organizacoes/2019/02/04/botafogo-45.png", 262: "https://s.glbimg.com/es/sde/f/organizacoes/2018/04/09/Flamengo-45.png", 354: "https://s.glbimg.com/es/sde/f/organizacoes/2019/10/10/ceara-45x45.png", 267: "https://s.glbimg.com/es/sde/f/organizacoes/2016/07/29/Vasco-45.png", 266: "https://s.glbimg.com/es/sde/f/organizacoes/2014/04/14/fluminense_45x45.png", 265: "https://s.glbimg.com/es/sde/f/organizacoes/2014/04/14/bahia_45x45.png", 264: "https://s.glbimg.com/es/sde/f/organizacoes/2019/09/30/Corinthians_45.png", 280: "https://s.glbimg.com/es/sde/f/organizacoes/2020/01/01/45.png", 294: "https://s.glbimg.com/es/sde/f/organizacoes/2017/03/29/coritiba45.png", 282: "https://s.glbimg.com/es/sde/f/organizacoes/2017/11/23/Atletico-Mineiro-escudo45px.png", 285: "https://s.glbimg.com/es/sde/f/organizacoes/2016/05/03/inter45.png", 284: "https://s.glbimg.com/es/sde/f/organizacoes/2014/04/14/gremio_45x45.png", 290: "https://s.glbimg.com/es/sde/f/organizacoes/2019/05/01/Goias_45px.png", 275: "https://s.glbimg.com/es/sde/f/organizacoes/2014/04/14/palmeiras_45x45.png", }
  var posicoes = ["Error", "G", "L", "Z", "M", "A", "T"]

  const cache = new Cache({
    namespace: "victrola2",
    policy: {
      maxEntries: 50000
    },
    backend: AsyncStorage
  });

  var header = "Classificação por Série"
  rodada_atual = 9
  const [items, setItems] = React.useState([
    { header: true, rodada: 9, serie: "COPA VICTROLA 2020", nameHome: "", backgroundColorHome: "#008000", textColorHome: "#008000", pointsColorHome: "#008000", idHome: 0, ptsHome: 10001, nameAway: "", backgroundColorAway: "#008000", textColorAway: "#008000", pointsColorAway: "#008000", idAway: 0, ptsAway: 10001, rodada_atual: 0 },
    // { name: header, backgroundColor: "#008000", textColor: "#fff", pointsColor: "#008000", id: 0, pts: 10000 },
    { header: true , serie: "Serie D", backgroundColor: "#e36c09", rodada: 11},
    { header: true , serie: "Liga dos Campeoes", backgroundColor: "#434343", rodada: 11},
    { serie: "Liga dos Campeoes", rodada: 11, rodada_atual: 0, nameHome: "GastroNeles", slugHome: require("../../assets/escudos/gastroneles.png"), backgroundColorHome: "#000000", textColorHome: "#ffffff", pointsColorHome: "#ffffff", idHome: 3438042, pontuacaoUltimaRodadaHome: 92, ptsHome: 0, atletasHome: [], pegouAtletasHome: false , numAtletasPontuandoHome: 0, capitaoIdHome: 0, nameAway: "BOUGERS", slugAway: require("../../assets/escudos/bougers.png"), backgroundColorAway: "#ff241d", textColorAway: "#000000", pointsColorAway: "#000000", idAway: 2835988, pontuacaoUltimaRodadaAway: 67, ptsAway: 0, atletasAway: [], pegouAtletasAway: false , numAtletasPontuandoAway: 0, capitaoIdAway: 0},
    { serie: "Liga dos Campeoes", rodada: 11, rodada_atual: 0, nameHome: "ChristoFlamengo", slugHome: require("../../assets/escudos/christoflamengo.png"), backgroundColorHome: "#bf1d17", textColorHome: "#000000", pointsColorHome: "#000000", idHome: 1540816, pontuacaoUltimaRodadaHome: 62, ptsHome: 0, atletasHome: [], pegouAtletasHome: false , numAtletasPontuandoHome: 0, capitaoIdHome: 0, nameAway: "Skalabuta FC", slugAway: require("../../assets/escudos/skalabuta-fc.png"), backgroundColorAway: "#000000", textColorAway: "#ffffff", pointsColorAway: "#ffffff", idAway: 25871781, pontuacaoUltimaRodadaAway: 77, ptsAway: 0, atletasAway: [], pegouAtletasAway: false , numAtletasPontuandoAway: 0, capitaoIdAway: 0},
    { serie: "Liga dos Campeoes", rodada: 11, rodada_atual: 0, nameHome: "Calambau Beer", slugHome: require("../../assets/escudos/calambau-beer.png"), backgroundColorHome: "#000000", textColorHome: "#ffffff", pointsColorHome: "#ffffff", idHome: 253542, pontuacaoUltimaRodadaHome: 61, ptsHome: 0, atletasHome: [], pegouAtletasHome: false , numAtletasPontuandoHome: 0, capitaoIdHome: 0, nameAway: "Leozito Neves FC", slugAway: require("../../assets/escudos/leozito-neves-fc.png"), backgroundColorAway: "#000000", textColorAway: "#bf1d17", pointsColorAway: "#bf1d17", idAway: 4528687, pontuacaoUltimaRodadaAway: 47, ptsAway: 0, atletasAway: [], pegouAtletasAway: false , numAtletasPontuandoAway: 0, capitaoIdAway: 0},
    { header: true , serie: "Liga dos Vices", backgroundColor: "#666666", rodada: 11},
    { serie: "Liga dos Vices", rodada: 11, rodada_atual: 0, nameHome: "U.C. Leões de Judá", slugHome: require("../../assets/escudos/u-c-leoes-de-juda.png"), backgroundColorHome: "#000000", textColorHome: "#ffcb00", pointsColorHome: "#ffcb00", idHome: 14972226, pontuacaoUltimaRodadaHome: 72, ptsHome: 0, atletasHome: [], pegouAtletasHome: false , numAtletasPontuandoHome: 0, capitaoIdHome: 0, nameAway: "sinceridade: qualidade maldita!", slugAway: require("../../assets/escudos/sinceridade-qualidade-maldita.png"), backgroundColorAway: "#000000", textColorAway: "#bf1d17", pointsColorAway: "#bf1d17", idAway: 5342721, pontuacaoUltimaRodadaAway: 92, ptsAway: 0, atletasAway: [], pegouAtletasAway: false , numAtletasPontuandoAway: 0, capitaoIdAway: 0},
    { serie: "Liga dos Vices", rodada: 11, rodada_atual: 0, nameHome: "Bigode De Cartola", slugHome: require("../../assets/escudos/bigode-de-cartola.png"), backgroundColorHome: "#997a00", textColorHome: "#ffffff", pointsColorHome: "#ffffff", idHome: 987444, pontuacaoUltimaRodadaHome: 87, ptsHome: 0, atletasHome: [], pegouAtletasHome: false , numAtletasPontuandoHome: 0, capitaoIdHome: 0, nameAway: "Cangaceiros BF", slugAway: require("../../assets/escudos/cangaceiros-bf.png"), backgroundColorAway: "#000000", textColorAway: "#19ff81", pointsColorAway: "#19ff81", idAway: 4554581, pontuacaoUltimaRodadaAway: 71, ptsAway: 0, atletasAway: [], pegouAtletasAway: false , numAtletasPontuandoAway: 0, capitaoIdAway: 0},
    { header: true , serie: "Serie A", backgroundColor: "#366092", rodada: 12},
    { serie: "A", rodada: 12, rodada_atual: 0, nameHome: "5prastantas F.C.", slugHome: require("../../assets/escudos/5prastantas-f-c.png"), backgroundColorHome: "#808080", textColorHome: "#ffffff", pointsColorHome: "#ffffff", idHome: 13945827, pontuacaoUltimaRodadaHome: 61, ptsHome: 0, atletasHome: [], pegouAtletasHome: false , numAtletasPontuandoHome: 0, capitaoIdHome: 0, nameAway: "GastroNeles", slugAway: require("../../assets/escudos/gastroneles.png"), backgroundColorAway: "#000000", textColorAway: "#ffffff", pointsColorAway: "#ffffff", idAway: 3438042, pontuacaoUltimaRodadaAway: 92, ptsAway: 0, atletasAway: [], pegouAtletasAway: false , numAtletasPontuandoAway: 0, capitaoIdAway: 0},
    { serie: "A", rodada: 12, rodada_atual: 0, nameHome: "AA AZULAO DO SUL", slugHome: require("../../assets/escudos/aa-azulao-do-sul.png"), backgroundColorHome: "#ff241d", textColorHome: "#063780", pointsColorHome: "#063780", idHome: 6717458, pontuacaoUltimaRodadaHome: 61, ptsHome: 0, atletasHome: [], pegouAtletasHome: false , numAtletasPontuandoHome: 0, capitaoIdHome: 0, nameAway: "VilãoFC", slugAway: require("../../assets/escudos/vilaofc.png"), backgroundColorAway: "#000000", textColorAway: "#ffffff", pointsColorAway: "#ffffff", idAway: 2370283, pontuacaoUltimaRodadaAway: 62, ptsAway: 0, atletasAway: [], pegouAtletasAway: false , numAtletasPontuandoAway: 0, capitaoIdAway: 0},
    { serie: "A", rodada: 12, rodada_atual: 0, nameHome: "BOUGERS", slugHome: require("../../assets/escudos/bougers.png"), backgroundColorHome: "#ff241d", textColorHome: "#000000", pointsColorHome: "#000000", idHome: 2835988, pontuacaoUltimaRodadaHome: 67, ptsHome: 0, atletasHome: [], pegouAtletasHome: false , numAtletasPontuandoHome: 0, capitaoIdHome: 0, nameAway: "Código Fonte F.C", slugAway: require("../../assets/escudos/codigo-fonte-f-c.png"), backgroundColorAway: "#ffffff", textColorAway: "#063780", pointsColorAway: "#063780", idAway: 2489031, pontuacaoUltimaRodadaAway: 74, ptsAway: 0, atletasAway: [], pegouAtletasAway: false , numAtletasPontuandoAway: 0, capitaoIdAway: 0},
    { header: true , serie: "Serie B", backgroundColor: "#953734", rodada: 12},
    { serie: "B", rodada: 12, rodada_atual: 0, nameHome: "Tangamandapiense Social Clube", slugHome: require("../../assets/escudos/tangamandapiense-social-clube.png"), backgroundColorHome: "#ffffff", textColorHome: "#4d004d", pointsColorHome: "#4d004d", idHome: 25867159, pontuacaoUltimaRodadaHome: 57, ptsHome: 0, atletasHome: [], pegouAtletasHome: false , numAtletasPontuandoHome: 0, capitaoIdHome: 0, nameAway: "Palla Sports", slugAway: require("../../assets/escudos/palla-sports.png"), backgroundColorAway: "#808080", textColorAway: "#ff7400", pointsColorAway: "#ff7400", idAway: 623570, pontuacaoUltimaRodadaAway: 41, ptsAway: 0, atletasAway: [], pegouAtletasAway: false , numAtletasPontuandoAway: 0, capitaoIdAway: 0},
    { serie: "B", rodada: 12, rodada_atual: 0, nameHome: "MGuto FC", slugHome: require("../../assets/escudos/mguto-fc.png"), backgroundColorHome: "#000000", textColorHome: "#ff241d", pointsColorHome: "#ff241d", idHome: 832153, pontuacaoUltimaRodadaHome: 50, ptsHome: 0, atletasHome: [], pegouAtletasHome: false , numAtletasPontuandoHome: 0, capitaoIdHome: 0, nameAway: "U.C. Leões de Judá", slugAway: require("../../assets/escudos/u-c-leoes-de-juda.png"), backgroundColorAway: "#000000", textColorAway: "#ffcb00", pointsColorAway: "#ffcb00", idAway: 14972226, pontuacaoUltimaRodadaAway: 72, ptsAway: 0, atletasAway: [], pegouAtletasAway: false , numAtletasPontuandoAway: 0, capitaoIdAway: 0},
    { serie: "B", rodada: 12, rodada_atual: 0, nameHome: "ChristoFlamengo", slugHome: require("../../assets/escudos/christoflamengo.png"), backgroundColorHome: "#bf1d17", textColorHome: "#000000", pointsColorHome: "#000000", idHome: 1540816, pontuacaoUltimaRodadaHome: 62, ptsHome: 0, atletasHome: [], pegouAtletasHome: false , numAtletasPontuandoHome: 0, capitaoIdHome: 0, nameAway: "Pyranha", slugAway: require("../../assets/escudos/pyranha.png"), backgroundColorAway: "#e65ce6", textColorAway: "#000000", pointsColorAway: "#000000", idAway: 1135503, pontuacaoUltimaRodadaAway: 58, ptsAway: 0, atletasAway: [], pegouAtletasAway: false , numAtletasPontuandoAway: 0, capitaoIdAway: 0},
    { header: true , serie: "Serie C", backgroundColor: "#4f6128", rodada: 12},
    { serie: "C", rodada: 12, rodada_atual: 0, nameHome: "RafitiFC", slugHome: require("../../assets/escudos/rafitifc.png"), backgroundColorHome: "#ffffff", textColorHome: "#0a6634", pointsColorHome: "#0a6634", idHome: 634335, pontuacaoUltimaRodadaHome: 66, ptsHome: 0, atletasHome: [], pegouAtletasHome: false , numAtletasPontuandoHome: 0, capitaoIdHome: 0, nameAway: "Atleticado", slugAway: require("../../assets/escudos/atleticado.png"), backgroundColorAway: "#4d004d", textColorAway: "#0066ff", pointsColorAway: "#0066ff", idAway: 661306, pontuacaoUltimaRodadaAway: 58, ptsAway: 0, atletasAway: [], pegouAtletasAway: false , numAtletasPontuandoAway: 0, capitaoIdAway: 0},
    { serie: "C", rodada: 12, rodada_atual: 0, nameHome: "Sei de tudo e não ganho nada FC", slugHome: require("../../assets/escudos/sei-de-tudo-e-nao-ganho-nada-fc.png"), backgroundColorHome: "#ff241d", textColorHome: "#19ff81", pointsColorHome: "#19ff81", idHome: 749772, pontuacaoUltimaRodadaHome: 51, ptsHome: 0, atletasHome: [], pegouAtletasHome: false , numAtletasPontuandoHome: 0, capitaoIdHome: 0, nameAway: "Bigode De Cartola", slugAway: require("../../assets/escudos/bigode-de-cartola.png"), backgroundColorAway: "#997a00", textColorAway: "#ffffff", pointsColorAway: "#ffffff", idAway: 987444, pontuacaoUltimaRodadaAway: 87, ptsAway: 0, atletasAway: [], pegouAtletasAway: false , numAtletasPontuandoAway: 0, capitaoIdAway: 0},
    { serie: "C", rodada: 12, rodada_atual: 0, nameHome: "Calambau Beer", slugHome: require("../../assets/escudos/calambau-beer.png"), backgroundColorHome: "#000000", textColorHome: "#ffffff", pointsColorHome: "#ffffff", idHome: 253542, pontuacaoUltimaRodadaHome: 61, ptsHome: 0, atletasHome: [], pegouAtletasHome: false , numAtletasPontuandoHome: 0, capitaoIdHome: 0, nameAway: "Balacubacu FC", slugAway: require("../../assets/escudos/balacubacu-fc.png"), backgroundColorAway: "#000000", textColorAway: "#808080", pointsColorAway: "#808080", idAway: 3170764, pontuacaoUltimaRodadaAway: 41, ptsAway: 0, atletasAway: [], pegouAtletasAway: false , numAtletasPontuandoAway: 0, capitaoIdAway: 0},
    { header: true , serie: "Serie D", backgroundColor: "#e36c09", rodada: 12},
    { serie: "D", rodada: 12, rodada_atual: 0, nameHome: "MBM Football", slugHome: require("../../assets/escudos/mbm-football.png"), backgroundColorHome: "#ffffff", textColorHome: "#000000", pointsColorHome: "#000000", idHome: 8869919, pontuacaoUltimaRodadaHome: 77, ptsHome: 0, atletasHome: [], pegouAtletasHome: false , numAtletasPontuandoHome: 0, capitaoIdHome: 0, nameAway: "Time do Igor FC", slugAway: require("../../assets/escudos/time-do-igor-fc.png"), backgroundColorAway: "#ffcb00", textColorAway: "#000000", pointsColorAway: "#000000", idAway: 1160952, pontuacaoUltimaRodadaAway: 83, ptsAway: 0, atletasAway: [], pegouAtletasAway: false , numAtletasPontuandoAway: 0, capitaoIdAway: 0},
    { serie: "D", rodada: 12, rodada_atual: 0, nameHome: "El mordedor", slugHome: require("../../assets/escudos/el-mordedor.png"), backgroundColorHome: "#ff241d", textColorHome: "#000000", pointsColorHome: "#000000", idHome: 27003779, pontuacaoUltimaRodadaHome: 71, ptsHome: 0, atletasHome: [], pegouAtletasHome: false , numAtletasPontuandoHome: 0, capitaoIdHome: 0, nameAway: "sinceridade: qualidade maldita!", slugAway: require("../../assets/escudos/sinceridade-qualidade-maldita.png"), backgroundColorAway: "#000000", textColorAway: "#bf1d17", pointsColorAway: "#bf1d17", idAway: 5342721, pontuacaoUltimaRodadaAway: 92, ptsAway: 0, atletasAway: [], pegouAtletasAway: false , numAtletasPontuandoAway: 0, capitaoIdAway: 0},
    { serie: "D", rodada: 12, rodada_atual: 0, nameHome: "Skalabuta FC", slugHome: require("../../assets/escudos/skalabuta-fc.png"), backgroundColorHome: "#000000", textColorHome: "#ffffff", pointsColorHome: "#ffffff", idHome: 25871781, pontuacaoUltimaRodadaHome: 77, ptsHome: 0, atletasHome: [], pegouAtletasHome: false , numAtletasPontuandoHome: 0, capitaoIdHome: 0, nameAway: "Sporting Draga", slugAway: require("../../assets/escudos/sporting-draga.png"), backgroundColorAway: "#000000", textColorAway: "#ff241d", pointsColorAway: "#ff241d", idAway: 810144, pontuacaoUltimaRodadaAway: 88, ptsAway: 0, atletasAway: [], pegouAtletasAway: false , numAtletasPontuandoAway: 0, capitaoIdAway: 0},
    { header: true , serie: "Serie E", backgroundColor: "#5f497a", rodada: 12},
    { serie: "E", rodada: 12, rodada_atual: 0, nameHome: "Menino Esperto F. C.", slugHome: require("../../assets/escudos/menino-esperto-f-c.png"), backgroundColorHome: "#000000", textColorHome: "#ffcb00", pointsColorHome: "#ffcb00", idHome: 7875842, pontuacaoUltimaRodadaHome: 69, ptsHome: 0, atletasHome: [], pegouAtletasHome: false , numAtletasPontuandoHome: 0, capitaoIdHome: 0, nameAway: "Victrola F.C.", slugAway: require("../../assets/escudos/victrola-f-c.png"), backgroundColorAway: "#808080", textColorAway: "#bf1d17", pointsColorAway: "#bf1d17", idAway: 13946184, pontuacaoUltimaRodadaAway: 71, ptsAway: 0, atletasAway: [], pegouAtletasAway: false , numAtletasPontuandoAway: 0, capitaoIdAway: 0},
    { serie: "E", rodada: 12, rodada_atual: 0, nameHome: "Edu 07 Araxá", slugHome: require("../../assets/escudos/edu-07-araxa.png"), backgroundColorHome: "#808080", textColorHome: "#ffffff", pointsColorHome: "#ffffff", idHome: 1225635, pontuacaoUltimaRodadaHome: 48, ptsHome: 0, atletasHome: [], pegouAtletasHome: false , numAtletasPontuandoHome: 0, capitaoIdHome: 0, nameAway: "Cangaceiros BF", slugAway: require("../../assets/escudos/cangaceiros-bf.png"), backgroundColorAway: "#000000", textColorAway: "#19ff81", pointsColorAway: "#19ff81", idAway: 4554581, pontuacaoUltimaRodadaAway: 71, ptsAway: 0, atletasAway: [], pegouAtletasAway: false , numAtletasPontuandoAway: 0, capitaoIdAway: 0},
    { serie: "E", rodada: 12, rodada_atual: 0, nameHome: "Leozito Neves FC", slugHome: require("../../assets/escudos/leozito-neves-fc.png"), backgroundColorHome: "#000000", textColorHome: "#bf1d17", pointsColorHome: "#bf1d17", idHome: 4528687, pontuacaoUltimaRodadaHome: 47, ptsHome: 0, atletasHome: [], pegouAtletasHome: false , numAtletasPontuandoHome: 0, capitaoIdHome: 0, nameAway: "Akuma Sport Club", slugAway: require("../../assets/escudos/akuma-sport-club.png"), backgroundColorAway: "#ffffff", textColorAway: "#000000", pointsColorAway: "#000000", idAway: 483335, pontuacaoUltimaRodadaAway: 72, ptsAway: 0, atletasAway: [], pegouAtletasAway: false , numAtletasPontuandoAway: 0, capitaoIdAway: 0},
    { header: true , serie: "Serie F", backgroundColor: "#6d653f", rodada: 12},
    { serie: "F", rodada: 12, rodada_atual: 0, nameHome: "Golog", slugHome: require("../../assets/escudos/golog.png"), backgroundColorHome: "#000000", textColorHome: "#ffcb00", pointsColorHome: "#ffcb00", idHome: 25872151, pontuacaoUltimaRodadaHome: 73, ptsHome: 0, atletasHome: [], pegouAtletasHome: false , numAtletasPontuandoHome: 0, capitaoIdHome: 0, nameAway: "Ganso Doido", slugAway: require("../../assets/escudos/ganso-doido.png"), backgroundColorAway: "#bf1d17", textColorAway: "#063780", pointsColorAway: "#063780", idAway: 90144, pontuacaoUltimaRodadaAway: 75, ptsAway: 0, atletasAway: [], pegouAtletasAway: false , numAtletasPontuandoAway: 0, capitaoIdAway: 0},
    { serie: "F", rodada: 12, rodada_atual: 0, nameHome: "Sheik Tosado FC", slugHome: require("../../assets/escudos/sheik-tosado-fc.png"), backgroundColorHome: "#ff241d", textColorHome: "#000000", pointsColorHome: "#000000", idHome: 13951041, pontuacaoUltimaRodadaHome: 27, ptsHome: 0, atletasHome: [], pegouAtletasHome: false , numAtletasPontuandoHome: 0, capitaoIdHome: 0, nameAway: "Victao Futebol Clube", slugAway: require("../../assets/escudos/victao-futebol-clube.png"), backgroundColorAway: "#ffcb00", textColorAway: "#063780", pointsColorAway: "#063780", idAway: 2571803, pontuacaoUltimaRodadaAway: 35, ptsAway: 0, atletasAway: [], pegouAtletasAway: false , numAtletasPontuandoAway: 0, capitaoIdAway: 0},
    { serie: "F", rodada: 12, rodada_atual: 0, nameHome: "OTOPATAMAR cc", slugHome: require("../../assets/escudos/otopatamar-cc.png"), backgroundColorHome: "#000000", textColorHome: "#bf1d17", pointsColorHome: "#bf1d17", idHome: 26126210, pontuacaoUltimaRodadaHome: 68, ptsHome: 0, atletasHome: [], pegouAtletasHome: false , numAtletasPontuandoHome: 0, capitaoIdHome: 0, nameAway: "Meninos do Maudi", slugAway: require("../../assets/escudos/meninos-do-maudi.png"), backgroundColorAway: "#000000", textColorAway: "#ffffff", pointsColorAway: "#ffffff", idAway: 1179838, pontuacaoUltimaRodadaAway: 53, ptsAway: 0, atletasAway: [], pegouAtletasAway: false , numAtletasPontuandoAway: 0, capitaoIdAway: 0},
    { header: true , serie: "Liga dos Campeoes", backgroundColor: "#434343", rodada: 12},
    { serie: "Liga dos Campeoes", rodada: 12, rodada_atual: 0, nameHome: "ChristoFlamengo", slugHome: require("../../assets/escudos/christoflamengo.png"), backgroundColorHome: "#bf1d17", textColorHome: "#000000", pointsColorHome: "#000000", idHome: 1540816, pontuacaoUltimaRodadaHome: 62, ptsHome: 0, atletasHome: [], pegouAtletasHome: false , numAtletasPontuandoHome: 0, capitaoIdHome: 0, nameAway: "GastroNeles", slugAway: require("../../assets/escudos/gastroneles.png"), backgroundColorAway: "#000000", textColorAway: "#ffffff", pointsColorAway: "#ffffff", idAway: 3438042, pontuacaoUltimaRodadaAway: 92, ptsAway: 0, atletasAway: [], pegouAtletasAway: false , numAtletasPontuandoAway: 0, capitaoIdAway: 0},
    { serie: "Liga dos Campeoes", rodada: 12, rodada_atual: 0, nameHome: "BOUGERS", slugHome: require("../../assets/escudos/bougers.png"), backgroundColorHome: "#ff241d", textColorHome: "#000000", pointsColorHome: "#000000", idHome: 2835988, pontuacaoUltimaRodadaHome: 67, ptsHome: 0, atletasHome: [], pegouAtletasHome: false , numAtletasPontuandoHome: 0, capitaoIdHome: 0, nameAway: "Leozito Neves FC", slugAway: require("../../assets/escudos/leozito-neves-fc.png"), backgroundColorAway: "#000000", textColorAway: "#bf1d17", pointsColorAway: "#bf1d17", idAway: 4528687, pontuacaoUltimaRodadaAway: 47, ptsAway: 0, atletasAway: [], pegouAtletasAway: false , numAtletasPontuandoAway: 0, capitaoIdAway: 0},
    { serie: "Liga dos Campeoes", rodada: 12, rodada_atual: 0, nameHome: "Skalabuta FC", slugHome: require("../../assets/escudos/skalabuta-fc.png"), backgroundColorHome: "#000000", textColorHome: "#ffffff", pointsColorHome: "#ffffff", idHome: 25871781, pontuacaoUltimaRodadaHome: 77, ptsHome: 0, atletasHome: [], pegouAtletasHome: false , numAtletasPontuandoHome: 0, capitaoIdHome: 0, nameAway: "Calambau Beer", slugAway: require("../../assets/escudos/calambau-beer.png"), backgroundColorAway: "#000000", textColorAway: "#ffffff", pointsColorAway: "#ffffff", idAway: 253542, pontuacaoUltimaRodadaAway: 61, ptsAway: 0, atletasAway: [], pegouAtletasAway: false , numAtletasPontuandoAway: 0, capitaoIdAway: 0},
    { header: true , serie: "Liga dos Vices", backgroundColor: "#666666", rodada: 12},
    { serie: "Liga dos Vices", rodada: 12, rodada_atual: 0, nameHome: "U.C. Leões de Judá", slugHome: require("../../assets/escudos/u-c-leoes-de-juda.png"), backgroundColorHome: "#000000", textColorHome: "#ffcb00", pointsColorHome: "#ffcb00", idHome: 14972226, pontuacaoUltimaRodadaHome: 72, ptsHome: 0, atletasHome: [], pegouAtletasHome: false , numAtletasPontuandoHome: 0, capitaoIdHome: 0, nameAway: "AA AZULAO DO SUL", slugAway: require("../../assets/escudos/aa-azulao-do-sul.png"), backgroundColorAway: "#ff241d", textColorAway: "#063780", pointsColorAway: "#063780", idAway: 6717458, pontuacaoUltimaRodadaAway: 61, ptsAway: 0, atletasAway: [], pegouAtletasAway: false , numAtletasPontuandoAway: 0, capitaoIdAway: 0},
    { serie: "Liga dos Vices", rodada: 12, rodada_atual: 0, nameHome: "VilãoFC", slugHome: require("../../assets/escudos/vilaofc.png"), backgroundColorHome: "#000000", textColorHome: "#ffffff", pointsColorHome: "#ffffff", idHome: 2370283, pontuacaoUltimaRodadaHome: 62, ptsHome: 0, atletasHome: [], pegouAtletasHome: false , numAtletasPontuandoHome: 0, capitaoIdHome: 0, nameAway: "Cangaceiros BF", slugAway: require("../../assets/escudos/cangaceiros-bf.png"), backgroundColorAway: "#000000", textColorAway: "#19ff81", pointsColorAway: "#19ff81", idAway: 4554581, pontuacaoUltimaRodadaAway: 71, ptsAway: 0, atletasAway: [], pegouAtletasAway: false , numAtletasPontuandoAway: 0, capitaoIdAway: 0},
    { serie: "Liga dos Vices", rodada: 12, rodada_atual: 0, nameHome: "sinceridade: qualidade maldita!", slugHome: require("../../assets/escudos/sinceridade-qualidade-maldita.png"), backgroundColorHome: "#000000", textColorHome: "#bf1d17", pointsColorHome: "#bf1d17", idHome: 5342721, pontuacaoUltimaRodadaHome: 92, ptsHome: 0, atletasHome: [], pegouAtletasHome: false , numAtletasPontuandoHome: 0, capitaoIdHome: 0, nameAway: "Bigode De Cartola", slugAway: require("../../assets/escudos/bigode-de-cartola.png"), backgroundColorAway: "#997a00", textColorAway: "#ffffff", pointsColorAway: "#ffffff", idAway: 987444, pontuacaoUltimaRodadaAway: 87, ptsAway: 0, atletasAway: [], pegouAtletasAway: false , numAtletasPontuandoAway: 0, capitaoIdAway: 0},
    { header: true , serie: "Serie A", backgroundColor: "#366092", rodada: 13},
    { serie: "A", rodada: 13, rodada_atual: 0, nameHome: "GastroNeles", slugHome: require("../../assets/escudos/gastroneles.png"), backgroundColorHome: "#000000", textColorHome: "#ffffff", pointsColorHome: "#ffffff", idHome: 3438042, pontuacaoUltimaRodadaHome: 92, ptsHome: 0, atletasHome: [], pegouAtletasHome: false , numAtletasPontuandoHome: 0, capitaoIdHome: 0, nameAway: "Código Fonte F.C", slugAway: require("../../assets/escudos/codigo-fonte-f-c.png"), backgroundColorAway: "#ffffff", textColorAway: "#063780", pointsColorAway: "#063780", idAway: 2489031, pontuacaoUltimaRodadaAway: 74, ptsAway: 0, atletasAway: [], pegouAtletasAway: false , numAtletasPontuandoAway: 0, capitaoIdAway: 0},
    { serie: "A", rodada: 13, rodada_atual: 0, nameHome: "AA AZULAO DO SUL", slugHome: require("../../assets/escudos/aa-azulao-do-sul.png"), backgroundColorHome: "#ff241d", textColorHome: "#063780", pointsColorHome: "#063780", idHome: 6717458, pontuacaoUltimaRodadaHome: 61, ptsHome: 0, atletasHome: [], pegouAtletasHome: false , numAtletasPontuandoHome: 0, capitaoIdHome: 0, nameAway: "5prastantas F.C.", slugAway: require("../../assets/escudos/5prastantas-f-c.png"), backgroundColorAway: "#808080", textColorAway: "#ffffff", pointsColorAway: "#ffffff", idAway: 13945827, pontuacaoUltimaRodadaAway: 61, ptsAway: 0, atletasAway: [], pegouAtletasAway: false , numAtletasPontuandoAway: 0, capitaoIdAway: 0},
    { serie: "A", rodada: 13, rodada_atual: 0, nameHome: "BOUGERS", slugHome: require("../../assets/escudos/bougers.png"), backgroundColorHome: "#ff241d", textColorHome: "#000000", pointsColorHome: "#000000", idHome: 2835988, pontuacaoUltimaRodadaHome: 67, ptsHome: 0, atletasHome: [], pegouAtletasHome: false , numAtletasPontuandoHome: 0, capitaoIdHome: 0, nameAway: "VilãoFC", slugAway: require("../../assets/escudos/vilaofc.png"), backgroundColorAway: "#000000", textColorAway: "#ffffff", pointsColorAway: "#ffffff", idAway: 2370283, pontuacaoUltimaRodadaAway: 62, ptsAway: 0, atletasAway: [], pegouAtletasAway: false , numAtletasPontuandoAway: 0, capitaoIdAway: 0},
    { header: true , serie: "Serie B", backgroundColor: "#953734", rodada: 13},
    { serie: "B", rodada: 13, rodada_atual: 0, nameHome: "Palla Sports", slugHome: require("../../assets/escudos/palla-sports.png"), backgroundColorHome: "#808080", textColorHome: "#ff7400", pointsColorHome: "#ff7400", idHome: 623570, pontuacaoUltimaRodadaHome: 41, ptsHome: 0, atletasHome: [], pegouAtletasHome: false , numAtletasPontuandoHome: 0, capitaoIdHome: 0, nameAway: "Pyranha", slugAway: require("../../assets/escudos/pyranha.png"), backgroundColorAway: "#e65ce6", textColorAway: "#000000", pointsColorAway: "#000000", idAway: 1135503, pontuacaoUltimaRodadaAway: 58, ptsAway: 0, atletasAway: [], pegouAtletasAway: false , numAtletasPontuandoAway: 0, capitaoIdAway: 0},
    { serie: "B", rodada: 13, rodada_atual: 0, nameHome: "MGuto FC", slugHome: require("../../assets/escudos/mguto-fc.png"), backgroundColorHome: "#000000", textColorHome: "#ff241d", pointsColorHome: "#ff241d", idHome: 832153, pontuacaoUltimaRodadaHome: 50, ptsHome: 0, atletasHome: [], pegouAtletasHome: false , numAtletasPontuandoHome: 0, capitaoIdHome: 0, nameAway: "Tangamandapiense Social Clube", slugAway: require("../../assets/escudos/tangamandapiense-social-clube.png"), backgroundColorAway: "#ffffff", textColorAway: "#4d004d", pointsColorAway: "#4d004d", idAway: 25867159, pontuacaoUltimaRodadaAway: 57, ptsAway: 0, atletasAway: [], pegouAtletasAway: false , numAtletasPontuandoAway: 0, capitaoIdAway: 0},
    { serie: "B", rodada: 13, rodada_atual: 0, nameHome: "ChristoFlamengo", slugHome: require("../../assets/escudos/christoflamengo.png"), backgroundColorHome: "#bf1d17", textColorHome: "#000000", pointsColorHome: "#000000", idHome: 1540816, pontuacaoUltimaRodadaHome: 62, ptsHome: 0, atletasHome: [], pegouAtletasHome: false , numAtletasPontuandoHome: 0, capitaoIdHome: 0, nameAway: "U.C. Leões de Judá", slugAway: require("../../assets/escudos/u-c-leoes-de-juda.png"), backgroundColorAway: "#000000", textColorAway: "#ffcb00", pointsColorAway: "#ffcb00", idAway: 14972226, pontuacaoUltimaRodadaAway: 72, ptsAway: 0, atletasAway: [], pegouAtletasAway: false , numAtletasPontuandoAway: 0, capitaoIdAway: 0},
    { header: true , serie: "Serie C", backgroundColor: "#4f6128", rodada: 13},
    { serie: "C", rodada: 13, rodada_atual: 0, nameHome: "Atleticado", slugHome: require("../../assets/escudos/atleticado.png"), backgroundColorHome: "#4d004d", textColorHome: "#0066ff", pointsColorHome: "#0066ff", idHome: 661306, pontuacaoUltimaRodadaHome: 58, ptsHome: 0, atletasHome: [], pegouAtletasHome: false , numAtletasPontuandoHome: 0, capitaoIdHome: 0, nameAway: "Balacubacu FC", slugAway: require("../../assets/escudos/balacubacu-fc.png"), backgroundColorAway: "#000000", textColorAway: "#808080", pointsColorAway: "#808080", idAway: 3170764, pontuacaoUltimaRodadaAway: 41, ptsAway: 0, atletasAway: [], pegouAtletasAway: false , numAtletasPontuandoAway: 0, capitaoIdAway: 0},
    { serie: "C", rodada: 13, rodada_atual: 0, nameHome: "Sei de tudo e não ganho nada FC", slugHome: require("../../assets/escudos/sei-de-tudo-e-nao-ganho-nada-fc.png"), backgroundColorHome: "#ff241d", textColorHome: "#19ff81", pointsColorHome: "#19ff81", idHome: 749772, pontuacaoUltimaRodadaHome: 51, ptsHome: 0, atletasHome: [], pegouAtletasHome: false , numAtletasPontuandoHome: 0, capitaoIdHome: 0, nameAway: "RafitiFC", slugAway: require("../../assets/escudos/rafitifc.png"), backgroundColorAway: "#ffffff", textColorAway: "#0a6634", pointsColorAway: "#0a6634", idAway: 634335, pontuacaoUltimaRodadaAway: 66, ptsAway: 0, atletasAway: [], pegouAtletasAway: false , numAtletasPontuandoAway: 0, capitaoIdAway: 0},
    { serie: "C", rodada: 13, rodada_atual: 0, nameHome: "Calambau Beer", slugHome: require("../../assets/escudos/calambau-beer.png"), backgroundColorHome: "#000000", textColorHome: "#ffffff", pointsColorHome: "#ffffff", idHome: 253542, pontuacaoUltimaRodadaHome: 61, ptsHome: 0, atletasHome: [], pegouAtletasHome: false , numAtletasPontuandoHome: 0, capitaoIdHome: 0, nameAway: "Bigode De Cartola", slugAway: require("../../assets/escudos/bigode-de-cartola.png"), backgroundColorAway: "#997a00", textColorAway: "#ffffff", pointsColorAway: "#ffffff", idAway: 987444, pontuacaoUltimaRodadaAway: 87, ptsAway: 0, atletasAway: [], pegouAtletasAway: false , numAtletasPontuandoAway: 0, capitaoIdAway: 0},
    { header: true , serie: "Serie D", backgroundColor: "#e36c09", rodada: 13},
    { serie: "D", rodada: 13, rodada_atual: 0, nameHome: "Time do Igor FC", slugHome: require("../../assets/escudos/time-do-igor-fc.png"), backgroundColorHome: "#ffcb00", textColorHome: "#000000", pointsColorHome: "#000000", idHome: 1160952, pontuacaoUltimaRodadaHome: 83, ptsHome: 0, atletasHome: [], pegouAtletasHome: false , numAtletasPontuandoHome: 0, capitaoIdHome: 0, nameAway: "Sporting Draga", slugAway: require("../../assets/escudos/sporting-draga.png"), backgroundColorAway: "#000000", textColorAway: "#ff241d", pointsColorAway: "#ff241d", idAway: 810144, pontuacaoUltimaRodadaAway: 88, ptsAway: 0, atletasAway: [], pegouAtletasAway: false , numAtletasPontuandoAway: 0, capitaoIdAway: 0},
    { serie: "D", rodada: 13, rodada_atual: 0, nameHome: "El mordedor", slugHome: require("../../assets/escudos/el-mordedor.png"), backgroundColorHome: "#ff241d", textColorHome: "#000000", pointsColorHome: "#000000", idHome: 27003779, pontuacaoUltimaRodadaHome: 71, ptsHome: 0, atletasHome: [], pegouAtletasHome: false , numAtletasPontuandoHome: 0, capitaoIdHome: 0, nameAway: "MBM Football", slugAway: require("../../assets/escudos/mbm-football.png"), backgroundColorAway: "#ffffff", textColorAway: "#000000", pointsColorAway: "#000000", idAway: 8869919, pontuacaoUltimaRodadaAway: 77, ptsAway: 0, atletasAway: [], pegouAtletasAway: false , numAtletasPontuandoAway: 0, capitaoIdAway: 0},
    { serie: "D", rodada: 13, rodada_atual: 0, nameHome: "Skalabuta FC", slugHome: require("../../assets/escudos/skalabuta-fc.png"), backgroundColorHome: "#000000", textColorHome: "#ffffff", pointsColorHome: "#ffffff", idHome: 25871781, pontuacaoUltimaRodadaHome: 77, ptsHome: 0, atletasHome: [], pegouAtletasHome: false , numAtletasPontuandoHome: 0, capitaoIdHome: 0, nameAway: "sinceridade: qualidade maldita!", slugAway: require("../../assets/escudos/sinceridade-qualidade-maldita.png"), backgroundColorAway: "#000000", textColorAway: "#bf1d17", pointsColorAway: "#bf1d17", idAway: 5342721, pontuacaoUltimaRodadaAway: 92, ptsAway: 0, atletasAway: [], pegouAtletasAway: false , numAtletasPontuandoAway: 0, capitaoIdAway: 0},
    { header: true , serie: "Serie E", backgroundColor: "#5f497a", rodada: 13},
    { serie: "E", rodada: 13, rodada_atual: 0, nameHome: "Victrola F.C.", slugHome: require("../../assets/escudos/victrola-f-c.png"), backgroundColorHome: "#808080", textColorHome: "#bf1d17", pointsColorHome: "#bf1d17", idHome: 13946184, pontuacaoUltimaRodadaHome: 71, ptsHome: 0, atletasHome: [], pegouAtletasHome: false , numAtletasPontuandoHome: 0, capitaoIdHome: 0, nameAway: "Akuma Sport Club", slugAway: require("../../assets/escudos/akuma-sport-club.png"), backgroundColorAway: "#ffffff", textColorAway: "#000000", pointsColorAway: "#000000", idAway: 483335, pontuacaoUltimaRodadaAway: 72, ptsAway: 0, atletasAway: [], pegouAtletasAway: false , numAtletasPontuandoAway: 0, capitaoIdAway: 0},
    { serie: "E", rodada: 13, rodada_atual: 0, nameHome: "Edu 07 Araxá", slugHome: require("../../assets/escudos/edu-07-araxa.png"), backgroundColorHome: "#808080", textColorHome: "#ffffff", pointsColorHome: "#ffffff", idHome: 1225635, pontuacaoUltimaRodadaHome: 48, ptsHome: 0, atletasHome: [], pegouAtletasHome: false , numAtletasPontuandoHome: 0, capitaoIdHome: 0, nameAway: "Menino Esperto F. C.", slugAway: require("../../assets/escudos/menino-esperto-f-c.png"), backgroundColorAway: "#000000", textColorAway: "#ffcb00", pointsColorAway: "#ffcb00", idAway: 7875842, pontuacaoUltimaRodadaAway: 69, ptsAway: 0, atletasAway: [], pegouAtletasAway: false , numAtletasPontuandoAway: 0, capitaoIdAway: 0},
    { serie: "E", rodada: 13, rodada_atual: 0, nameHome: "Leozito Neves FC", slugHome: require("../../assets/escudos/leozito-neves-fc.png"), backgroundColorHome: "#000000", textColorHome: "#bf1d17", pointsColorHome: "#bf1d17", idHome: 4528687, pontuacaoUltimaRodadaHome: 47, ptsHome: 0, atletasHome: [], pegouAtletasHome: false , numAtletasPontuandoHome: 0, capitaoIdHome: 0, nameAway: "Cangaceiros BF", slugAway: require("../../assets/escudos/cangaceiros-bf.png"), backgroundColorAway: "#000000", textColorAway: "#19ff81", pointsColorAway: "#19ff81", idAway: 4554581, pontuacaoUltimaRodadaAway: 71, ptsAway: 0, atletasAway: [], pegouAtletasAway: false , numAtletasPontuandoAway: 0, capitaoIdAway: 0},
    { header: true , serie: "Serie F", backgroundColor: "#6d653f", rodada: 13},
    { serie: "F", rodada: 13, rodada_atual: 0, nameHome: "Ganso Doido", slugHome: require("../../assets/escudos/ganso-doido.png"), backgroundColorHome: "#bf1d17", textColorHome: "#063780", pointsColorHome: "#063780", idHome: 90144, pontuacaoUltimaRodadaHome: 75, ptsHome: 0, atletasHome: [], pegouAtletasHome: false , numAtletasPontuandoHome: 0, capitaoIdHome: 0, nameAway: "Meninos do Maudi", slugAway: require("../../assets/escudos/meninos-do-maudi.png"), backgroundColorAway: "#000000", textColorAway: "#ffffff", pointsColorAway: "#ffffff", idAway: 1179838, pontuacaoUltimaRodadaAway: 53, ptsAway: 0, atletasAway: [], pegouAtletasAway: false , numAtletasPontuandoAway: 0, capitaoIdAway: 0},
    { serie: "F", rodada: 13, rodada_atual: 0, nameHome: "Sheik Tosado FC", slugHome: require("../../assets/escudos/sheik-tosado-fc.png"), backgroundColorHome: "#ff241d", textColorHome: "#000000", pointsColorHome: "#000000", idHome: 13951041, pontuacaoUltimaRodadaHome: 27, ptsHome: 0, atletasHome: [], pegouAtletasHome: false , numAtletasPontuandoHome: 0, capitaoIdHome: 0, nameAway: "Golog", slugAway: require("../../assets/escudos/golog.png"), backgroundColorAway: "#000000", textColorAway: "#ffcb00", pointsColorAway: "#ffcb00", idAway: 25872151, pontuacaoUltimaRodadaAway: 73, ptsAway: 0, atletasAway: [], pegouAtletasAway: false , numAtletasPontuandoAway: 0, capitaoIdAway: 0},
    { serie: "F", rodada: 13, rodada_atual: 0, nameHome: "OTOPATAMAR cc", slugHome: require("../../assets/escudos/otopatamar-cc.png"), backgroundColorHome: "#000000", textColorHome: "#bf1d17", pointsColorHome: "#bf1d17", idHome: 26126210, pontuacaoUltimaRodadaHome: 68, ptsHome: 0, atletasHome: [], pegouAtletasHome: false , numAtletasPontuandoHome: 0, capitaoIdHome: 0, nameAway: "Victao Futebol Clube", slugAway: require("../../assets/escudos/victao-futebol-clube.png"), backgroundColorAway: "#ffcb00", textColorAway: "#063780", pointsColorAway: "#063780", idAway: 2571803, pontuacaoUltimaRodadaAway: 35, ptsAway: 0, atletasAway: [], pegouAtletasAway: false , numAtletasPontuandoAway: 0, capitaoIdAway: 0},
    { header: true , serie: "Liga dos Campeoes", backgroundColor: "#434343", rodada: 13},
    { serie: "Liga dos Campeoes", rodada: 13, rodada_atual: 0, nameHome: "GastroNeles", slugHome: require("../../assets/escudos/gastroneles.png"), backgroundColorHome: "#000000", textColorHome: "#ffffff", pointsColorHome: "#ffffff", idHome: 3438042, pontuacaoUltimaRodadaHome: 92, ptsHome: 0, atletasHome: [], pegouAtletasHome: false , numAtletasPontuandoHome: 0, capitaoIdHome: 0, nameAway: "Calambau Beer", slugAway: require("../../assets/escudos/calambau-beer.png"), backgroundColorAway: "#000000", textColorAway: "#ffffff", pointsColorAway: "#ffffff", idAway: 253542, pontuacaoUltimaRodadaAway: 61, ptsAway: 0, atletasAway: [], pegouAtletasAway: false , numAtletasPontuandoAway: 0, capitaoIdAway: 0},
    { serie: "Liga dos Campeoes", rodada: 13, rodada_atual: 0, nameHome: "BOUGERS", slugHome: require("../../assets/escudos/bougers.png"), backgroundColorHome: "#ff241d", textColorHome: "#000000", pointsColorHome: "#000000", idHome: 2835988, pontuacaoUltimaRodadaHome: 67, ptsHome: 0, atletasHome: [], pegouAtletasHome: false , numAtletasPontuandoHome: 0, capitaoIdHome: 0, nameAway: "ChristoFlamengo", slugAway: require("../../assets/escudos/christoflamengo.png"), backgroundColorAway: "#bf1d17", textColorAway: "#000000", pointsColorAway: "#000000", idAway: 1540816, pontuacaoUltimaRodadaAway: 62, ptsAway: 0, atletasAway: [], pegouAtletasAway: false , numAtletasPontuandoAway: 0, capitaoIdAway: 0},
    { serie: "Liga dos Campeoes", rodada: 13, rodada_atual: 0, nameHome: "Skalabuta FC", slugHome: require("../../assets/escudos/skalabuta-fc.png"), backgroundColorHome: "#000000", textColorHome: "#ffffff", pointsColorHome: "#ffffff", idHome: 25871781, pontuacaoUltimaRodadaHome: 77, ptsHome: 0, atletasHome: [], pegouAtletasHome: false , numAtletasPontuandoHome: 0, capitaoIdHome: 0, nameAway: "Leozito Neves FC", slugAway: require("../../assets/escudos/leozito-neves-fc.png"), backgroundColorAway: "#000000", textColorAway: "#bf1d17", pointsColorAway: "#bf1d17", idAway: 4528687, pontuacaoUltimaRodadaAway: 47, ptsAway: 0, atletasAway: [], pegouAtletasAway: false , numAtletasPontuandoAway: 0, capitaoIdAway: 0},
    { header: true , serie: "Liga dos Vices", backgroundColor: "#666666", rodada: 13},
    { serie: "Liga dos Vices", rodada: 13, rodada_atual: 0, nameHome: "AA AZULAO DO SUL", slugHome: require("../../assets/escudos/aa-azulao-do-sul.png"), backgroundColorHome: "#ff241d", textColorHome: "#063780", pointsColorHome: "#063780", idHome: 6717458, pontuacaoUltimaRodadaHome: 61, ptsHome: 0, atletasHome: [], pegouAtletasHome: false , numAtletasPontuandoHome: 0, capitaoIdHome: 0, nameAway: "Bigode De Cartola", slugAway: require("../../assets/escudos/bigode-de-cartola.png"), backgroundColorAway: "#997a00", textColorAway: "#ffffff", pointsColorAway: "#ffffff", idAway: 987444, pontuacaoUltimaRodadaAway: 87, ptsAway: 0, atletasAway: [], pegouAtletasAway: false , numAtletasPontuandoAway: 0, capitaoIdAway: 0},
    { serie: "Liga dos Vices", rodada: 13, rodada_atual: 0, nameHome: "VilãoFC", slugHome: require("../../assets/escudos/vilaofc.png"), backgroundColorHome: "#000000", textColorHome: "#ffffff", pointsColorHome: "#ffffff", idHome: 2370283, pontuacaoUltimaRodadaHome: 62, ptsHome: 0, atletasHome: [], pegouAtletasHome: false , numAtletasPontuandoHome: 0, capitaoIdHome: 0, nameAway: "U.C. Leões de Judá", slugAway: require("../../assets/escudos/u-c-leoes-de-juda.png"), backgroundColorAway: "#000000", textColorAway: "#ffcb00", pointsColorAway: "#ffcb00", idAway: 14972226, pontuacaoUltimaRodadaAway: 72, ptsAway: 0, atletasAway: [], pegouAtletasAway: false , numAtletasPontuandoAway: 0, capitaoIdAway: 0},
    { serie: "Liga dos Vices", rodada: 13, rodada_atual: 0, nameHome: "sinceridade: qualidade maldita!", slugHome: require("../../assets/escudos/sinceridade-qualidade-maldita.png"), backgroundColorHome: "#000000", textColorHome: "#bf1d17", pointsColorHome: "#bf1d17", idHome: 5342721, pontuacaoUltimaRodadaHome: 92, ptsHome: 0, atletasHome: [], pegouAtletasHome: false , numAtletasPontuandoHome: 0, capitaoIdHome: 0, nameAway: "Cangaceiros BF", slugAway: require("../../assets/escudos/cangaceiros-bf.png"), backgroundColorAway: "#000000", textColorAway: "#19ff81", pointsColorAway: "#19ff81", idAway: 4554581, pontuacaoUltimaRodadaAway: 71, ptsAway: 0, atletasAway: [], pegouAtletasAway: false , numAtletasPontuandoAway: 0, capitaoIdAway: 0},
                // { name: "", backgroundColor: "#008000", textColor: "#008000", pointsColor: "#008000", id: 0, pts: -100 },
    // { name: "", backgroundColor: "#008000", textColor: "#008000", pointsColor: "#008000", id: 0, pts: -101 },        
  ]);


  // global.nova_rodada_atual = 4;
  var status = 1
  async function refreshData() {

    // await axios.get("https://cartolaigor-pjzxn.hoverfly.io/mercado/status")
    await axios.get("https://api.cartolafc.globo.com/mercado/status")
      .then(res => {
        // console.log(res.data)
        status = res.data.status_mercado;
        // console.log("status: " + status)
        if (status == 2) {
          rodada_atual = res.data.rodada_atual
          // global.nova_rodada_atual = rodada_atual
          // console.log("- " + rodada_atual)
        }
        else {
          rodada_atual = res.data.rodada_atual - 1
        }
        items[0].rodada_atual = rodada_atual
        setItems([...items], items);
      });



    if (status == 2) {
      setTimeout(function () {
        // console.log("primeira chamada /atletas")// ---------------------------------------------------------------------------------------------
        axios.get("https://api.cartolafc.globo.com/atletas/pontuados")
          .then(responseAtletas => {
            atletasPontuando = responseAtletas.data.atletas;
          });
      }, 500);
      atletasPontuando = []

      items.forEach(async element => {        

        // items.sort((a, b) => (a.pts <= b.pts) ? 1 : -1)
        if (element.idHome != 0 && element.idAway != 0 && element.rodada == items[0].rodada_atual && !element.header) {
          try {

            if (await cache.peek(element.nameHome + element.nameAway + rodada_atual) != undefined) {
              element = JSON.parse(await cache.get(element.nameHome + element.nameAway + rodada_atual));              
              console.log("buscou da cache");
            } else {
          
              setTimeout(function () {
                // console.log("rodada: " + rodada_atual) 
                if (!element.pegouAtletasHome) {
                  console.log("buscou do backend")
                  // console.log("segunda chamada /id") // ---------------------------------------------------------------------------------------------
                  // axios.get("https://cartolaigor-pjzxn.hoverfly.io/time/id/" + element.id)
                  axios.get("https://api.cartolafc.globo.com/time/id/" + element.idHome + "/" + items[0].rodada_atual)
                    .then(async res => {
                      if (res.status == 200) {
                        // console.log("home: " + res.status)
                        // res.data.atletas.forEach(atleta => {
                        //   element.atletasHome.push(atleta.atleta_id)
                        // })
                        element.atletasHome = res.data.atletas;
                        element.pegouAtletasHome = true;
                        element.capitaoIdHome = res.data.capitao_id;
                        items[items.indexOf(items.find(k => k.nameHome == element.nameHome && k.nameAway == element.nameAway))] = element
                        // console.log(atletasPontuando[res.data.capitao_id].apelido)
                        // element.rodada_atual = rodada_atual;
                        setItems([...items], items);
                        if(element.pegouAtletasAway){ // é invertido (away/home) mesmo... pra saber se já pegou dos dois
                          await cache.set(element.nameHome + element.nameAway + rodada_atual, JSON.stringify(element));
                        }
                      }
                    })
                }
              }, 1000);
              setTimeout(function () {
                if (!element.pegouAtletasAway) {
                  axios.get("https://api.cartolafc.globo.com/time/id/" + element.idAway + "/" + items[0].rodada_atual)
                    .then(async res2 => {
                      if (res2.status == 200) {
                        // console.log("away: " + res2.status)
                        // res2.data.atletas.forEach(atleta2 => {
                        //   element.atletasAway.push(atleta2.atleta_id)
                        // })
                        // console.log("antes: " + element.capitaoidAway)
                        element.atletasAway = res2.data.atletas
                        element.pegouAtletasAway = true
                        element.capitaoIdAway = res2.data.capitao_id;
                        items[items.indexOf(items.find(k => k.nameHome == element.nameHome && k.nameAway == element.nameAway))] = element
                        // console.log("depois: " + element.capitaoidAway)
                        // console.log(atletasPontuando[res2.data.capitao_id].apelido)
                        // console.log(element.nameAway == "Time do Igor FC" ? element.capitaoIdAway : 0)
                        // element.rodada_atual = rodada_atual; 
                        // console.log("away - " + element.capitaoidAway)
                        setItems([...items], items);
                        if(element.pegouAtletasHome){ // é invertido (away/home) mesmo... pra saber se já pegou dos dois
                          await cache.set(element.nameHome + element.nameAway + rodada_atual, JSON.stringify(element));
                        }
                      }
                    })
                }
              }, 1000);     
            }       

            // setTimeout(async function () {
            //   if (element.pegouAtletasHome && element.pegouAtletasAway) {
            //   }
            // }, 1300);

            setTimeout(async function () {              
              // console.log(element.pegouAtletasHome)
              if (element.pegouAtletasHome) {
                element.ptsHome = 0
                element.numAtletasPontuandoHome = 0;
                // console.log(atletasPontuando)
                element.atletasHome.forEach(atleta => {
                  try {
                    // console.log(atletasPontuando[atleta.atleta_id].pontuacao)
                    element.ptsHome += atletasPontuando[atleta.atleta_id].pontuacao;
                    atleta.pontos_num = atletasPontuando[atleta.atleta_id].pontuacao;
                    atleta.status_id = 1 // 1 = pontuando, 0 = nao pontuando
                    element.numAtletasPontuandoHome += 1;
                  } catch {
                    atleta.pontos_num = 0;
                    atleta.status_id = 0 // 1 = pontuando, 0 = nao pontuando
                  }
                })
                try {
                  element.ptsHome += atletasPontuando[element.capitaoIdHome].pontuacao;
                } catch { }
                element.ptsHome = parseInt(element.ptsHome);
                element.atletasHome.sort((a, b) => (a.posicao_id >= b.posicao_id) ? 1 : -1)
                items[items.indexOf(items.find(k => k.nameHome == element.nameHome && k.nameAway == element.nameAway))] = element
                setItems([...items], items);
              }

              if (element.pegouAtletasAway) {
                element.ptsAway = 0
                element.numAtletasPontuandoAway = 0;
                element.atletasAway.forEach(atleta2 => {
                  try {
                    element.ptsAway += atletasPontuando[atleta2.atleta_id].pontuacao;
                    atleta2.pontos_num = atletasPontuando[atleta2.atleta_id].pontuacao;
                    atleta2.status_id = 1 // 1 = pontuando, 0 = nao pontuando
                    element.numAtletasPontuandoAway += 1;
                  } catch {
                    atleta2.pontos_num = 0;
                    atleta2.status_id = 0 // 1 = pontuando, 0 = nao pontuando
                  }
                })
                try {
                  element.ptsAway += atletasPontuando[element.capitaoIdAway].pontuacao;
                } catch { }
                element.ptsAway = parseInt(element.ptsAway);
                // console.log(element.ptsAway)
                element.atletasAway.sort((a, b) => (a.posicao_id >= b.posicao_id) ? 1 : -1)
                items[items.indexOf(items.find(k => k.nameHome == element.nameHome && k.nameAway == element.nameAway))] = element
                setItems([...items], items);
                // console.log( element.nameAway + ": " + element.ptsAway)
              }

              // if(pegouAtletasHome && pegouAtletasAway) {
              //   await cache.set(item.nameHome + item.nameAway, JSON.stringify(item));
              // }

            }, 1500);
          } catch (error) {
            console.log("caiu no catch")
          }
        }
      });
    } else {
      await cache.clearAll()
      items.forEach(async element => {
        if (element.idHome != 0 && element.idAway != 0 && !element.header) {
          try {
            // if (await cache.peek(element.nameHome + element.nameAway) != undefined) {
            //   element = JSON.parse(await cache.get(element.nameHome + element.nameAway))
            //   items[items.indexOf(items.find(k => k.nameHome == element.nameHome && k.nameAway == element.nameAway))] = element
            //   setItems([...items], items);
            // } else {
            setTimeout(function () {
              if (!element.pegouAtletasHome) {
                axios.get("https://api.cartolafc.globo.com/time/id/" + element.idHome + "/" + rodada_atual)
                  .then(res => {
                    if (res.status == 200) {
                      element.atletasHome = res.data.atletas;
                      element.ptsHome = parseInt(res.data.pontos);
                      element.pegouAtletasHome = true;
                      element.capitaoIdHome = res.data.capitao_id;
                      element.atletasHome.sort((a, b) => (a.posicao_id >= b.posicao_id) ? 1 : -1)
                      element.numAtletasPontuandoHome = 12
                    }
                  })
                setItems([...items], items);
              }
            }, 500);

            setTimeout(async function () {

              if (!element.pegouAtletasAway) {
                axios.get("https://api.cartolafc.globo.com/time/id/" + element.idAway + "/" + rodada_atual)
                  .then(res => {
                    if (res.status == 200) {
                      element.atletasAway = res.data.atletas;
                      element.ptsAway = parseInt(res.data.pontos);
                      element.pegouAtletasAway = true;
                      element.capitaoIdAway = res.data.capitao_id;
                      element.atletasAway.sort((a, b) => (a.posicao_id >= b.posicao_id) ? 1 : -1)
                      element.numAtletasPontuandoAway = 12
                    }
                  })
                setItems([...items], items);
              }
            }, 1000);
            if (element.pegouAtletasHome && element.pegouAtletasAway) {
              await cache.set(element.nameHome + element.nameAway + rodada_atual, JSON.stringify(element))
            }
            // }
          } catch { }
        }

      });
    }




    // else {
    //   items.forEach(equipe => {
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


  useEffect(() => {
    refreshData()
  }, []);


  function toggleModal(item) {
    item.isModalVisible = !item.isModalVisible;
    setItems([...items], items);
  }

  async function toggleHighlighted(item) {
    item.isHighlighted = !item.isHighlighted;
    await cache.set(item.nameHome + item.nameAway + rodada_atual, JSON.stringify(item));
    setItems([...items], items);
  }

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
            <TouchableHighlight onPress={() => item.idHome > 0 ? toggleModal(item) : {}} onLongPress={() => item.idHome > 0 ? toggleHighlighted(item) : {}}>


              <View style={{ flexDirection: 'row' }}>
                {/* {console.log(item.capitaoIdHome)} */}

                {/* {console.log(rodada_atual)} */}

                {/* {console.log(global.nova_rodada_atual)} */}
                {/* Header de séries */}
                {item.rodada == items[0].rodada_atual ? (
                  <View style={[!item.header ? { display: 'none', borderWidth: 0, } : { justifyContent: 'center', borderWidth: 1, },
                  styles.itemContainer,
                  {
                    marginHorizontal: Dimensions.get('window').width * 0.003,
                    width: Dimensions.get('window').width * 0.97,
                    backgroundColor: item.backgroundColor,
                  }]}>
                    <Text style={[styles.itemName, { fontSize: 20, marginVertical: Dimensions.get('window').height * 0, color: "#ffffff" }]}>{item.serie}</Text>
                  </View>
                ) : [<View marginVertical={-0} borderWidth={-0}></View>]}




                {/* Nome Time Home */}
                {item.rodada == items[0].rodada_atual && !item.header ? (
                  <View style={[item.distrital || item.header ? { marginVertical: 0, height: Dimensions.get('window').height * 0, display: 'none', borderWidth: 0, } : { width: Dimensions.get('window').width * 0.355, borderWidth: 1, },
                  styles.itemContainer,
                  {
                    marginHorizontal: Dimensions.get('window').width * 0.003,
                    backgroundColor: item.backgroundColorHome,
                    borderColor: item.pointsColorHome,
                  }
                  ]}>
                    <Text allowFontScaling={true} numberOfLines={1} style={[styles.itemName, { color: item.textColorHome }]}>{item.nameHome}</Text>
                  </View>
                ) : [<View marginVertical={0} ></View>]}


                {/* Pontuacao do time de Casa */}
                {item.rodada == items[0].rodada_atual && !item.header ? (
                  <View style={[item.distrital || item.header ? { marginVertical: 0, height: Dimensions.get('window').height * 0, display: 'none', borderWidth: 0, } : { width: Dimensions.get('window').width * 0.09, borderWidth: 1, },
                  styles.itemContainer, {
                    marginHorizontal: Dimensions.get('window').width * 0.003,
                    backgroundColor: item.backgroundColorHome,
                    borderColor: item.pointsColorHome,
                  }
                  ]}>
                    {/* {console.log(item.ptsHome)} */}
                    <Text adjustsFontSizeToFit={true} style={[styles.itemName, { color: item.pointsColorHome }]}>{item.ptsHome}</Text>
                  </View>
                ) : [<View marginVertical={0} ></View>]}

                {/* Escudo do time Home */}
                {item.rodada == items[0].rodada_atual && !item.header ? (
                  <View style={item.distrital || item.header ? { marginVertical: 0, height: Dimensions.get('window').height * 0, display: 'none' } : {}}>
                    <Image source={item.slugHome}
                      style={[item.distrital || item.header ? {
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
                ) : [<View marginVertical={0} ></View>]}

                {/* Num de atletas pontuando Home*/}
                {item.rodada == items[0].rodada_atual && !item.header ? (
                  <View style={[item.distrital || item.header ? {
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
                ) : [<View marginVertical={0} ></View>]}



                {/*   X   */}
                {item.rodada == items[0].rodada_atual && !item.header ? (
                  <View style={[item.distrital || item.header || index < 1 ? { marginVertical: Dimensions.get('window').height * 0, height: Dimensions.get('window').height * 0, display: 'none' } : item.isHighlighted ? { backgroundColor: 'red', width: Dimensions.get('window').width * 0.054 } : { width: Dimensions.get('window').width * 0.054 },
                  styles.itemContainer, {
                    marginHorizontal: Dimensions.get('window').width * 0.003,
                    borderWidth: 1
                  }]}>
                    <Text adjustsFontSizeToFit={true} numberOfLines={1} style={[styles.itemName, { color: "#fff", fontSize: 20 }]}>X</Text>
                  </View>
                ) : [<View marginVertical={0} ></View>]}


                {/* Pontuacao do time de Fora */}
                {item.rodada == items[0].rodada_atual && !item.header ? (
                  <View style={[item.distrital || item.header ? { marginVertical: Dimensions.get('window').height * 0, height: Dimensions.get('window').height * 0, display: 'none', borderWidth: 0, } : { width: Dimensions.get('window').width * 0.09, borderWidth: 1, },
                  styles.itemContainer, {
                    marginHorizontal: Dimensions.get('window').width * 0.003,
                    backgroundColor: item.backgroundColorAway,
                    borderColor: item.pointsColorAway,
                  }]}>
                    <Text adjustsFontSizeToFit={true} style={[styles.itemName, { color: item.pointsColorAway }]}>{item.ptsAway}</Text>
                  </View>
                ) : [<View marginVertical={0} ></View>]}



                {/* Nome Time away */}
                {item.rodada == items[0].rodada_atual && !item.header ? (
                  <View style={[item.distrital || item.header ? { marginVertical: Dimensions.get('window').height * 0, height: Dimensions.get('window').height * 0, display: 'none', borderWidth: 0, } : { width: Dimensions.get('window').width * 0.355, borderWidth: 1, },
                  styles.itemContainer,
                  {
                    marginHorizontal: Dimensions.get('window').width * 0.003,
                    backgroundColor: item.backgroundColorAway,
                    borderColor: item.pointsColorAway,
                    borderWidth: 1,
                  }]}>
                    <Text allowFontScaling={true} numberOfLines={1} style={[styles.itemName, { color: item.textColorAway }]}>{item.nameAway}</Text>
                  </View>
                ) : [<View marginVertical={0} ></View>]}

                {/* Escudo do time Away */}
                {item.rodada == items[0].rodada_atual && !item.header ? (
                  <View style={item.distrital || item.header ? { marginVertical: Dimensions.get('window').height * 0, height: Dimensions.get('window').height * 0, display: 'none' } : {}}>
                    <Image source={item.slugAway}
                      style={[item.distrital || item.header ? {
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
                ) : [<View marginVertical={0} ></View>]}


                {/* Num de atletas pontuando Away*/}
                {item.rodada == items[0].rodada_atual && !item.header ? (
                  <View style={[item.distrital || item.header ? {
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
                ) : [<View marginVertical={0} ></View>]}





                <Modal isVisible={item.isModalVisible} coverScreen={true} backdropColor="#008000" backdropOpacity={0.94} onRequestClose={() => { toggleModal(item) }}>
                  <View style={{ flex: 1, marginVertical: Dimensions.get('window').width * 0.2, marginHorizontal: '-4.5%' }} >
                    <View style={{ flexDirection: 'row' }}>

                      {/* header time Home*/}
                      <View style={[styles.itemContainer, { borderWidth: 1, marginHorizontal: Dimensions.get('window').width * 0.003, backgroundColor: item.textColorHome, width: Dimensions.get('window').width * 0.485 }]}>
                        <Text adjustsFontSizeToFit={true} numberOfLines={1} style={[styles.itemName, { color: item.backgroundColorHome }]}>{item.nameHome}</Text>
                      </View>

                      {/* header time Away*/}
                      <View style={[styles.itemContainer, { borderWidth: 1, marginHorizontal: Dimensions.get('window').width * 0.003, backgroundColor: item.textColorAway, width: Dimensions.get('window').width * 0.485 }]}>
                        <Text adjustsFontSizeToFit={true} numberOfLines={1} style={[styles.itemName, { color: item.backgroundColorAway }]}>{item.nameAway}</Text>
                      </View>
                    </View>

                    {!item.header && item.pegouAtletasHome && item.pegouAtletasAway ? (item.atletasHome.map(x =>
                      <View style={{ flexDirection: 'row' }}>

                        {/* clubes Home */}
                        {/* <View style={[styles.itemContainer, { borderWidth: 1, borderColor: item.textColor, backgroundColor: item.backgroundColor, width: Dimensions.get('window').width * 0.06 }]}> */}
                        <Image source={{ uri: clubes[x.clube_id] }} style={{ justifyContent: 'center', alignSelf: 'center', marginVertical: Dimensions.get('window').height * 0.005, marginHorizontal: Dimensions.get('window').width * 0, height: Dimensions.get('window').width * 0.04, width: Dimensions.get('window').width * 0.04, resizeMode: 'stretch' }} />
                        {/* </View> */}

                        {/* Posicoes Jogadores Home*/}
                        <View style={[styles.itemContainer, { borderWidth: 1, borderColor: item.textColorHome, backgroundColor: item.backgroundColorHome, width: Dimensions.get('window').width * 0.05 }]}>
                          <Text adjustsFontSizeToFit={true} numberOfLines={1} style={[styles.itemName, { fontSize: 12, color: item.pointsColorHome }]}>{posicoes[x.posicao_id]}</Text>
                        </View>

                        {/* item.atletasAway[item.atletasHome.indexOf(x)] */}

                        {/* Nome Jogadores Home */}
                        <View style={[item.capitaoIdHome == x.atleta_id ? { backgroundColor: item.textColorHome, borderColor: item.backgroundColorHome } : { backgroundColor: item.backgroundColorHome, borderColor: item.textColorHome }, styles.itemContainer, { borderWidth: 1, marginHorizontal: Dimensions.get('window').width * 0.003, width: Dimensions.get('window').width * 0.245 }]}>
                          <Text adjustsFontSizeToFit={true} numberOfLines={1} style={[item.capitaoIdHome == x.atleta_id ? { color: item.backgroundColorHome } : { color: item.textColorHome }, styles.itemName]}>{item.capitaoIdHome == x.atleta_id ? x.apelido + ' (c)' : x.apelido}</Text>
                        </View>

                        {/* Pontuacao dos jogadores */}
                        <View style={[styles.itemContainer, { borderWidth: 1, borderColor: item.textColorHome, marginHorizontal: Dimensions.get('window').width * 0.003, backgroundColor: item.backgroundColorHome, width: Dimensions.get('window').width * 0.14 }]}>
                          <Text adjustsFontSizeToFit={true} numberOfLines={2} style={[styles.itemName, { color: item.pointsColorHome }]}>{x.status_id != 0 ? item.capitaoIdHome == x.atleta_id ? '(' + x.pontos_num + ' x2) ' + x.pontos_num * 2 : x.pontos_num : '-'}</Text>
                        </View>





                        {/* Pontuacao dos jogadores Away */}
                        <View style={[styles.itemContainer, { borderWidth: 1, borderColor: item.textColorAway, marginHorizontal: Dimensions.get('window').width * 0.003, backgroundColor: item.backgroundColorAway, width: Dimensions.get('window').width * 0.14 }]}>
                          <Text adjustsFontSizeToFit={true} numberOfLines={2} style={[styles.itemName, { color: item.pointsColorAway }]}>{item.atletasAway[item.atletasHome.indexOf(x)].status_id != 0 ? item.capitaoIdAway == item.atletasAway[item.atletasHome.indexOf(x)].atleta_id ? '(' + item.atletasAway[item.atletasHome.indexOf(x)].pontos_num + ' x2) ' + item.atletasAway[item.atletasHome.indexOf(x)].pontos_num * 2 : item.atletasAway[item.atletasHome.indexOf(x)].pontos_num : '-'}</Text>
                        </View>

                        {/* Nome Jogadores Away */}
                        {/* {console.log("away")} */}
                        {/* {console.log(item.capitaoIdHome)                        }
                        {console.log(item.atletasAway[item.atletasHome.indexOf(x)].atleta_id )} */}
                        {/* {console.log(item.capitaoIdAway)} */}

                        <View style={[item.capitaoIdAway == item.atletasAway[item.atletasHome.indexOf(x)].atleta_id ? { backgroundColor: item.textColorAway, borderColor: item.backgroundColorAway } : { backgroundColor: item.backgroundColorAway, borderColor: item.textColorAway }, styles.itemContainer, { borderWidth: 1, marginHorizontal: Dimensions.get('window').width * 0.003, width: Dimensions.get('window').width * 0.245 }]}>
                          <Text adjustsFontSizeToFit={true} numberOfLines={1} style={[item.capitaoIdAway == item.atletasAway[item.atletasHome.indexOf(x)].atleta_id ? { color: item.backgroundColorAway } : { color: item.textColorAway }, styles.itemName]}>{item.capitaoIdAway == item.atletasAway[item.atletasHome.indexOf(x)].atleta_id ? item.atletasAway[item.atletasHome.indexOf(x)].apelido + ' (c)' : item.atletasAway[item.atletasHome.indexOf(x)].apelido}</Text>
                        </View>

                        {/*  Posicoes Jogadores Away*/}
                        <View style={[styles.itemContainer, { borderWidth: 1, borderColor: item.textColorAway, backgroundColor: item.backgroundColorAway, width: Dimensions.get('window').width * 0.05 }]}>
                          <Text adjustsFontSizeToFit={true} numberOfLines={1} style={[styles.itemName, { fontSize: 12, color: item.pointsColorAway }]}>{posicoes[item.atletasAway[item.atletasHome.indexOf(x)].posicao_id]}</Text>
                        </View>

                        {/* clubes Away */}
                        {/* <View style={[styles.itemContainer, { borderWidth: 1, borderColor: item.textColor, backgroundColor: item.backgroundColor, width: Dimensions.get('window').width * 0.06 }]}> */}
                        <Image source={{ uri: clubes[item.atletasAway[item.atletasHome.indexOf(x)].clube_id] }} style={{ justifyContent: 'center', alignSelf: 'center', marginVertical: Dimensions.get('window').height * 0.005, marginHorizontal: Dimensions.get('window').width * 0, height: Dimensions.get('window').width * 0.04, width: Dimensions.get('window').width * 0.04, resizeMode: 'stretch' }} />
                        {/* </View> */}


                        {/*  Posicoes Jogadores */}
                        {/* <View style={[styles.itemContainer, { borderWidth: 1, borderColor: item.textColor, backgroundColor: item.backgroundColor, width: Dimensions.get('window').width * 0.08 }]}>
                          <Text adjustsFontSizeToFit={true} style={[styles.itemName, { fontSize: 25, color: item.pointsColor }]}>{posicoes[x.posicao_id]}</Text>
                        </View> */}

                        {/* Nome Jogadores */}
                        {/* <View style={[item.capitaoId == x.atleta_id ? { backgroundColor: item.textColor, borderColor: item.backgroundColor } : { backgroundColor: item.backgroundColor, borderColor: item.textColor }, styles.itemContainer, { borderWidth: 1, marginHorizontal: Dimensions.get('window').width * 0.003, width: Dimensions.get('window').width * 0.55 }]}>
                          <Text adjustsFontSizeToFit={true} style={[item.capitaoId == x.atleta_id ? { color: item.backgroundColor } : { color: item.textColor }, styles.itemName]}>{item.capitaoId == x.atleta_id ? x.apelido + ' (c)' : x.apelido}</Text>
                        </View> */}

                        {/* {console.log()} */}
                        {/* Pontuacao dos jogadores */}
                        {/* <View style={[styles.itemContainer, { borderWidth: 1, borderColor: item.textColor, shadowColor: item.backgroundColor, marginHorizontal: Dimensions.get('window').width * 0.003, backgroundColor: item.backgroundColor, width: Dimensions.get('window').width * 0.24 }]}>
                          <Text adjustsFontSizeToFit={true} numberOfLines={1} style={[styles.itemName, { color: item.pointsColor }]}>{x.status_id != 0 ? item.capitaoId == x.atleta_id ? '(' + x.pontos_num + ' x2) ' + x.pontos_num * 2 : x.pontos_num : '-'}</Text>
                        </View> */}

                        {/* {console.log(x.clube_id)} */}
                        {/* Escudo dos times */}



                      </View>)) : {}}

                    <View style={{ flexDirection: 'row' }}>
                      {/* pontuacao total com capitao Home */}
                      <View style={[styles.itemContainer, { borderWidth: 1, borderColor: item.backgroundColorHome, marginHorizontal: Dimensions.get('window').width * 0.003, backgroundColor: item.textColorHome, width: Dimensions.get('window').width * 0.24 }]}>
                        <Text adjustsFontSizeToFit={true} numberOfLines={1} style={[styles.itemName, { color: item.backgroundColorHome }]}>{item.ptsHome}</Text>
                      </View>

                      {/* TOTAL: */}
                      <View style={[{ backgroundColor: "#000", borderColor: "#008000" }, styles.itemContainer, { borderWidth: 1, marginHorizontal: Dimensions.get('window').width * 0.003, width: Dimensions.get('window').width * 0.48 }]}>
                        <Text adjustsFontSizeToFit={true} style={[{ color: "#008000" }, styles.itemName]}>:TOTAL:</Text>
                      </View>

                      {/* pontuacao total com capitao Away*/}
                      <View style={[styles.itemContainer, { borderWidth: 1, borderColor: item.backgroundColorAway, marginHorizontal: Dimensions.get('window').width * 0.003, backgroundColor: item.textColorAway, width: Dimensions.get('window').width * 0.24 }]}>
                        <Text adjustsFontSizeToFit={true} numberOfLines={1} style={[styles.itemName, { color: item.backgroundColorAway }]}>{item.ptsAway}</Text>
                      </View>
                    </View>


                    {/* botao voltar */}
                    {/* <TouchableHighlight underlayColor={'#008000'} onPress={() => toggleModal(item)} >
                      <View style={[{ position: "relative" }, { borderWidth: 2, justifyContent: 'center', alignItems: 'center', fontSize: 20, height: Dimensions.get('window').height * 0.06, width: Dimensions.get('window').width * 0.95, marginVertical: '5%', marginHorizontal: '2%' }]}>
                        <Text adjustsFontSizeToFit={true} numberOfLines={1} style={[{ fontSize: 20 }]}>Voltar</Text>
                      </View>
                    </TouchableHighlight> */}                                        

                  </View>
                </Modal>

              </View>
            </TouchableHighlight>
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
