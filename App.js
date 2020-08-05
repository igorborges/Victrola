import React from 'react';
import { Dimensions } from 'react-native';
import { StyleSheet, View, Text } from 'react-native';
import { FlatGrid } from 'react-native-super-grid';

export default function Example() {
  const [items, setItems] = React.useState([
    { name: "5prastantas F.C.", backgroundColor: "#808080", textColor: "#ffffff", id: 13945827, itemDimension: Dimensions.get('window').width*0.37 },
    { name: "0", backgroundColor: "#808080", textColor: "#ffffff", id: 0, itemDimension: Dimensions.get('window').width*0.1 },
    { name: "X", backgroundColor: "#008000", textColor: "#000000", id: 0, itemDimension: Dimensions.get('window').width*0.06 },
    { name: "0", backgroundColor: "#ff241d", textColor: "#063780", id: 0, itemDimension: Dimensions.get('window').width*0.1 },
    { name: "AA AZULAO DO SUL", backgroundColor: "#ff241d", textColor: "#063780", id: 6717458, itemDimension: Dimensions.get('window').width*0.37 },    
    { name: "Akuma Sport Club", backgroundColor: "#ffffff", textColor: "#000000", id: 483335, itemDimension: 130 },
    { name: "0", backgroundColor: "#ffffff", textColor: "#000000", id: 0, itemDimension: 45 },
    { name: "X", backgroundColor: "#008000", textColor: "#000000", id: 0, itemDimension: 30 },
    { name: "0", backgroundColor: "#4d004d", textColor: "#0066ff", id: 0, itemDimension: 45 },
    { name: "Atleticado", backgroundColor: "#4d004d", textColor: "#0066ff", id: 661306, itemDimension: 130 },    
    { name: "Balacubacu FC", backgroundColor: "#000000", textColor: "#808080", id: 3170764, itemDimension: 130 },
    { name: "0", backgroundColor: "#000000", textColor: "#808080", id: 0, itemDimension: 45 },
    { name: "X", backgroundColor: "#008000", textColor: "#000000", id: 0, itemDimension: 30 },
    { name: "0", backgroundColor: "#997a00", textColor: "#ffffff", id: 0, itemDimension: 45 },
    { name: "Bigode De Cartola", backgroundColor: "#997a00", textColor: "#ffffff", id: 987444, itemDimension: 130 },    
    { name: "BOUGERS", backgroundColor: "#ff241d", textColor: "#000000", id: 2835988, itemDimension: 130 },
    { name: "0", backgroundColor: "#ff241d", textColor: "#000000", id: 0, itemDimension: 45 },
    { name: "X", backgroundColor: "#008000", textColor: "#000000", id: 0, itemDimension: 30 },
    { name: "0", backgroundColor: "#000000", textColor: "#ffffff", id: 0, itemDimension: 45 },
    { name: "Calambau Beer", backgroundColor: "#000000", textColor: "#ffffff", id: 253542, itemDimension: 130 },    
    { name: "Cangaceiros BF", backgroundColor: "#000000", textColor: "#19ff81", id: 4554581, itemDimension: 130 },
    { name: "0", backgroundColor: "#000000", textColor: "#19ff81", id: 0, itemDimension: 45 },
    { name: "X", backgroundColor: "#008000", textColor: "#000000", id: 0, itemDimension: 30 },
    { name: "0", backgroundColor: "#bf1d17", textColor: "#000000", id: 0, itemDimension: 45 },
    { name: "ChristoFlamengo", backgroundColor: "#bf1d17", textColor: "#000000", id: 1540816, itemDimension: 130 },    
    { name: "Código Fonte F.C", backgroundColor: "#ffffff", textColor: "#063780", id: 2489031, itemDimension: 130 },
    { name: "0", backgroundColor: "#ffffff", textColor: "#063780", id: 0, itemDimension: 45 },
    { name: "X", backgroundColor: "#008000", textColor: "#000000", id: 0, itemDimension: 30 },
    { name: "0", backgroundColor: "#808080", textColor: "#ffffff", id: 0, itemDimension: 45 },
    { name: "Edu 07 Araxá", backgroundColor: "#808080", textColor: "#ffffff", id: 1225635, itemDimension: 130 },    
    { name: "El mordedô", backgroundColor: "#4d004d", textColor: "#00cc5c", id: 25856343, itemDimension: 130 },
    { name: "0", backgroundColor: "#4d004d", textColor: "#00cc5c", id: 0, itemDimension: 45 },
    { name: "X", backgroundColor: "#008000", textColor: "#000000", id: 0, itemDimension: 30 },
    { name: "0", backgroundColor: "#bf1d17", textColor: "#063780", id: 0, itemDimension: 45 },
    { name: "Ganso Doido", backgroundColor: "#bf1d17", textColor: "#063780", id: 90144, itemDimension: 130 },    
    { name: "GastroNeles", backgroundColor: "#000000", textColor: "#ffffff", id: 3438042, itemDimension: 130 },
    { name: "0", backgroundColor: "#000000", textColor: "#ffffff", id: 0, itemDimension: 45 },
    { name: "X", backgroundColor: "#008000", textColor: "#000000", id: 0, itemDimension: 30 },
    { name: "0", backgroundColor: "#000000", textColor: "#ffcb00", id: 0, itemDimension: 45 },
    { name: "Golog", backgroundColor: "#000000", textColor: "#ffcb00", id: 25872151, itemDimension: 130 },    
    { name: "Leozito Neves FC", backgroundColor: "#000000", textColor: "#bf1d17", id: 4528687, itemDimension: 130 },
    { name: "0", backgroundColor: "#000000", textColor: "#bf1d17", id: 0, itemDimension: 45 },
    { name: "X", backgroundColor: "#008000", textColor: "#000000", id: 0, itemDimension: 30 },
    { name: "0", backgroundColor: "#ffffff", textColor: "#000000", id: 0, itemDimension: 45 },
    { name: "MBM Football", backgroundColor: "#ffffff", textColor: "#000000", id: 8869919, itemDimension: 130 },    
    { name: "Menino Esperto F. C.", backgroundColor: "#000000", textColor: "#ffcb00", id: 7875842, itemDimension: 130 },
    { name: "0", backgroundColor: "#000000", textColor: "#ffcb00", id: 0, itemDimension: 45 },
    { name: "X", backgroundColor: "#008000", textColor: "#000000", id: 0, itemDimension: 30 },
    { name: "0", backgroundColor: "#000000", textColor: "#ffffff", id: 0, itemDimension: 45 },
    { name: "Meninos do Maudi", backgroundColor: "#000000", textColor: "#ffffff", id: 1179838, itemDimension: 130 },    
    { name: "MGuto FC", backgroundColor: "#000000", textColor: "#bf1d17", id: 832153, itemDimension: 130 },
    { name: "0", backgroundColor: "#000000", textColor: "#bf1d17", id: 0, itemDimension: 45 },
    { name: "X", backgroundColor: "#008000", textColor: "#000000", id: 0, itemDimension: 30 },
    { name: "0", backgroundColor: "#808080", textColor: "#ff7400", id: 0, itemDimension: 45 },
    { name: "Palla Sports", backgroundColor: "#808080", textColor: "#ff7400", id: 623570, itemDimension: 130 },    
    { name: "Pyranha", backgroundColor: "#e65ce6", textColor: "#000000", id: 1135503, itemDimension: 130 },
    { name: "0", backgroundColor: "#e65ce6", textColor: "#000000", id: 0, itemDimension: 45 },
    { name: "X", backgroundColor: "#008000", textColor: "#000000", id: 0, itemDimension: 30 },
    { name: "0", backgroundColor: "#063780", textColor: "#000000", id: 0, itemDimension: 45 },
    { name: "WolvenFootball", backgroundColor: "#063780", textColor: "#000000", id: 634335, itemDimension: 130 },    
    { name: "Sei de tudo e não ganho nada FC", backgroundColor: "#ff241d", textColor: "#19ff81", id: 749772, itemDimension: 130 },
    { name: "0", backgroundColor: "#ff241d", textColor: "#19ff81", id: 0, itemDimension: 45 },
    { name: "X", backgroundColor: "#008000", textColor: "#000000", id: 0, itemDimension: 30 },
    { name: "0", backgroundColor: "#ff241d", textColor: "#000000", id: 0, itemDimension: 45 },
    { name: "Sheik Tosado FC", backgroundColor: "#ff241d", textColor: "#000000", id: 13951041, itemDimension: 130 },    
    { name: "sinceridade: qualidade maldita!", backgroundColor: "#000000", textColor: "#bf1d17", id: 5342721, itemDimension: 130 },
    { name: "0", backgroundColor: "#000000", textColor: "#bf1d17", id: 0, itemDimension: 45 },
    { name: "X", backgroundColor: "#008000", textColor: "#000000", id: 0, itemDimension: 30 },
    { name: "0", backgroundColor: "#000000", textColor: "#ffffff", id: 0, itemDimension: 45 },
    { name: "Skalabuta FC", backgroundColor: "#000000", textColor: "#ffffff", id: 25871781, itemDimension: 130 },    
    { name: "Sporting Draga", backgroundColor: "#000000", textColor: "#ff241d", id: 810144, itemDimension: 130 },
    { name: "0", backgroundColor: "#000000", textColor: "#ff241d", id: 0, itemDimension: 45 },
    { name: "X", backgroundColor: "#008000", textColor: "#000000", id: 0, itemDimension: 30 },
    { name: "0", backgroundColor: "#ffffff", textColor: "#4d004d", id: 0, itemDimension: 45 },
    { name: "Tangamandapiense Social Clube", backgroundColor: "#ffffff", textColor: "#4d004d", id: 25867159, itemDimension: 130 },    
    { name: "tarcisiospfc", backgroundColor: "#ff241d", textColor: "#ffffff", id: 8917, itemDimension: 130 },
    { name: "0", backgroundColor: "#ff241d", textColor: "#ffffff", id: 0, itemDimension: 45 },
    { name: "X", backgroundColor: "#008000", textColor: "#000000", id: 0, itemDimension: 30 },
    { name: "0", backgroundColor: "#fce37e", textColor: "#000000", id: 0, itemDimension: 45 },
    { name: "Time do Igor FC", backgroundColor: "#fce37e", textColor: "#000000", id: 1160952, itemDimension: 130 },    
    { name: "U.C. Leões de Judá", backgroundColor: "#000000", textColor: "#ffcb00", id: 14972226, itemDimension: 130 },
    { name: "0", backgroundColor: "#000000", textColor: "#ffcb00", id: 0, itemDimension: 45 },
    { name: "X", backgroundColor: "#008000", textColor: "#000000", id: 0, itemDimension: 30 },
    { name: "0", backgroundColor: "#a64b00", textColor: "#ff241d", id: 0, itemDimension: 45 },
    { name: "vernochi82", backgroundColor: "#a64b00", textColor: "#ff241d", id: 25584876, itemDimension: 130 },    
    { name: "Victrola F.C.", backgroundColor: "#808080", textColor: "#bf1d17", id: 13946184, itemDimension: 130 },
    { name: "0", backgroundColor: "#808080", textColor: "#bf1d17", id: 0, itemDimension: 45 },
    { name: "X", backgroundColor: "#008000", textColor: "#000000", id: 0, itemDimension: 30 },
    { name: "0", backgroundColor: "#000000", textColor: "#ffffff", id: 0, itemDimension: 45 },
    { name: "VilãoFC", backgroundColor: "#000000", textColor: "#ffffff", id: 2370283, itemDimension: 130 },    
  ]);

  return (
    <FlatGrid
      itemDimension={70}      
      data={items}
      style={styles.gridView}
      backgroundColor="#008000"
      // staticDimension={300}
      // fixed
      spacing={3}
      renderItem={({ item }) => (
        <View style={[styles.itemContainer, { backgroundColor: item.backgroundColor, width: item.itemDimension }]}>
          <Text style={[styles.itemName, {color: item.textColor}]}>{item.name}</Text>                 
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  gridView: {
    marginTop: 50,
    flex: 1  
  },
  itemContainer: {
    justifyContent: 'center',
    borderRadius: 3,
    padding: 5,
    height: 35,
    alignItems: "center",
    // opacity: 1
    // margin: 2
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600'    
  }
});