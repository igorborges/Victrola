import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect}  from 'react';
import { StyleSheet, Text, SafeAreaView } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { FlatGrid } from 'react-native-super-grid';
import { SectionGrid } from 'react-native-super-grid';
import axios from 'axios';

export default function App() {
  const [items, setItems] = React.useState([
    // { name: 'Igor', backgroundColor: '#1abc9c', textColor: '', id: 1160952 },
    // { name: 'Victor', backgroundColor: '#2ecc71', textColor: '', id: 13946184 },
    // { name: 'Brais', backgroundColor: '#3498db', textColor: '', id: 13945827 },    
    // { name: 'Yuri', backgroundColor: '#9b59b6', textColor: '', id: 6471096 },
  ]);

  const ids = [1160952, 13946184, 13945827, 6471096]
  
  getData();
  useEffect(()=>{    
  }, [items])
  
  function getData(){
    ids.forEach(id => {
      
      axios.get("https://api.cartolafc.globo.com/time/id/" + id)
      .then(res => {
        // console.log(id)
        // const nameList = res.data;
        // setItems(nameList);
        // item.name = res.data.time.nome
        // console.log(res.data.time.nome)
        items.push({name: res.data.time.nome, backgroundColor: "#" + res.data.time.cor_camisa})
        // setItems([...items, {name: res.data.time.nome, backgroundColor: "#" + res.data.time.cor_camisa}])
        // setItems(items => ([...items, {name: res.data.time.nome, backgroundColor: "#" + res.data.time.cor_camisa}]))
      })
    });
    console.log(items)
  }

  return (
    <FlatGrid
      itemDimension={130}
      data={items}      
      style={styles.gridView}
      // staticDimension={300}
      // fixed
      spacing={10}
      renderItem={({ item }) => (
        <SafeAreaView style={[styles.itemContainer, { backgroundColor: item.backgroundColor, itemTextColor: '#000'}]}>
          <Text style={styles.itemName}>{item.name}</Text>
          {/* <Text style={styles.itembackgroundColor}>{item.backgroundColor}</Text> */}
        </SafeAreaView>
      )}
    />
  );
}

const styles = StyleSheet.create({
  gridView: {
    marginTop: 10,
    flex: 1,
  },
  itemContainer: {
    justifyContent: 'flex-end',
    borderRadius: 5,
    padding: 10,
    height: 30,
  },
  itemName: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },
  itembackgroundColor: {
    fontWeight: '600',
    fontSize: 12,
    color: '#fff',
  },
  itemTextColor: {
    fontWeight: '600',
    fontSize: 12,
    color: '#fff',
  },
});



// igor =   1160952
// victor = 13946184
// brais =  13945827
// yuri =    6471096