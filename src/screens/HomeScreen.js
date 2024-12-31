import { React, useEffect } from "react";
import 
  { View, 
    Text, 
    StyleSheet, 
    Image, 
    ImageBackground,
    FlatList,
    TouchableOpacity } from "react-native";
import ghAPI from '../../api/ghHeader';
import { useGlobalContext } from '../utils/GlobalState';
import {
  UPDATE_MORE_PRODUCERS,
  UPDATE_TOP_PRODUCERS,
  UPDATE_TOP_RATED_BEATS
} from '../utils/const';

const HomeScreen = ({navigation}) => {
  const [state, dispatch] = useGlobalContext();
  //console.log(state)

  useEffect(() => {
    try {
      const getData = async() => {
        const topProducers = await ghAPI.get('/gh/top-producers');
        const moreProducers = await ghAPI.get('/gh/more-producers');
        const topRatedBeats = await ghAPI.get('/gh/top-rated-beats');

        //console.log(topProducers.data)

        dispatch({type: UPDATE_TOP_RATED_BEATS, payload: { topRatedBeats: topRatedBeats.data }})
        dispatch({type: UPDATE_TOP_PRODUCERS, payload: { topProducers: topProducers.data }})
        dispatch({type: UPDATE_MORE_PRODUCERS, payload: { moreProducers: moreProducers.data }})
      }
      
      getData();
    
    } catch (error) {
      console.log(error)
    }
  }, [])

  // console.log(state.topRatedBeats)
  // console.log(state.topProducers)
  // console.log(state.moreProducers)

  state.topProducers.forEach(element => {
    console.log(element)
  });


  return (
    <ImageBackground source={require('../../assets/images/greenbackground.png')} style={styles.backgroundImage}>
      <View style={[styles.view]}>
      <ImageBackground source={require('../../assets/images/GH_INTRO_BANNER.jpg')} style={styles.brand}>

      </ImageBackground>
      <View style={styles.TPTextView}>
        <ImageBackground style={styles.shadowbdr} source={require('../../assets/images/shadow_bdr.gif')}>
          <Text style={{textAlign: 'center'}}>Top Producers</Text>  
        </ImageBackground>
      </View>  
        {state.moreProducers && state.moreProducers.length > 0 ? 
            <FlatList 
            data={state.moreProducers} //{state.boards.sort(compareTitle)}
            keyExtractor= { prods => prods.mem_id.toString()}
            renderItem={({ item }) => {
              console.log(item);
                    return (
                      <>
                        <TouchableOpacity onPress={() => console.log("Hi")}> 
                                  {/* <ImageBackground style={style.resultButton} source={require('../assets/images/result-box.png')}> */}
                                    <Text style={styles.resultText}>{item.username}</Text>
                                  {/* </ImageBackground> */}
                        </TouchableOpacity>
                      </>
                        )
                    }
                }
                />
                : <View style={styles.view}> 
                    <Text style={{padding: 20, color: 'white'}}>Please try again.</Text> 
                  </View>}     
          <Text style={styles.footer}>Greenhooks.com. For real producers and beatmakers!</Text>
      </View>
  </ImageBackground>
  )
};

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    color: 'white'
  },
  shadowbdr: {
    width: 250,
    padding: 10,
    marginBottom: 20,
    justifyContent: 'center', 
    alignItems: 'center' ,
    resizeMode: 'cover'
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // or 'stretch'
  },
  TPTextView: {
    flex: 1,
    justifyContent: "center",
    alignItems: 'center'
  },
  view: {
      flex: 1
  },
  brand: {
    flex: 1,
    width: 440,
    marginBottom: 12,
    resizeMode: 'contain', // or 'stretch'
    borderBottomWidth: 2,
    borderBottomColor: 'green'
},
  resultText: {
    color: 'white',
    width: 390,
    padding: 10,
    alignSelf: 'center',
  },
  footer: {
      fontSize: 12,
      color: 'white',
      alignSelf: 'center',
      marginTop: 25,
      marginBottom: 25
  }
});

export default HomeScreen;
