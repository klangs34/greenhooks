import { React, useEffect, useState } from "react";
import 
  { View, 
    Text, 
    StyleSheet, 
    Image, 
    ImageBackground,
    FlatList,
    TouchableOpacity, 
    Button} from "react-native";
import { useGlobalContext } from '../utils/GlobalState';
import { Audio } from 'expo-av';

const MemberScreen = ({navigation}) => {
  const [state, dispatch] = useGlobalContext();
  const [sound, setSound] = useState();
  let memId = navigation.getParam('id');
  let memAvatar = navigation.getParam('avatar_link');
  let memUsername = navigation.getParam('username');

//   console.log(memId)
  
  const prodBeats = state.beatTable.filter(prod => prod.mem_id === memId);
  const prod = state.siteMembers.filter(mem => mem.mem_id === memId);

//   console.log(prod)
//   const description 
//   const copyright

  useEffect(() => {
    return sound
    ? () => {
        sound.unloadAsync(); 
      }
    : undefined;
}, [sound])

  const playBeat = async (beatURL) => {
    try {
        const { sound } = await Audio.Sound.createAsync({
          uri: beatURL, 
        });
        setSound(sound);
  
        await sound.playAsync(); 
      } catch (error) {
        console.error('Error playing audio:', error);
      }
  }


  const imgString = memAvatar === '/images/default/noavatar.gif' ? <Image style={styles.image} source={require('../../assets/images/noavatar.gif')} /> : <Image style={styles.image} source={{ uri: memAvatar}} />;
  return (
    <ImageBackground source={require('../../assets/images/greenbackground.png')} style={styles.backgroundImage}>
      <ImageBackground source={require('../../assets/images/GH_INTRO_BANNER.jpg')} style={styles.brand}>

      </ImageBackground>
      <View style={[styles.view]}>
      <View style={styles.TPTextView}>
        {/* <ImageBackground style={styles.shadowbdr} source={require('../../assets/images/shadow_bdr.gif')}>
          <Text style={{textAlign: 'center'}}>{memId}</Text>  
        </ImageBackground> */}
      </View>
      <View style={{ paddingTop: 20 }}>
        {imgString}
        {/* <Image style={styles.image} source={{ uri: memAvatar}} /> */}
        <Text style={styles.ProducerText}>{memUsername}</Text>  
        <Text style={styles.locationText}>Location: {prod[0].location}</Text>  
      </View>  
        {prodBeats && prodBeats.length > 0 ? 
            <FlatList 
            data={prodBeats} 
            keyExtractor= { prodBeats => prodBeats.bid.toString()}
            renderItem={({ item, index }) => {
                // console.log(index)
                // console.log(prodBeats.indexOf(prodBeats[index]) - 1)
                // console.log(prodBeats.length)
                    return (
                      <>
                        {prodBeats && prodBeats.length > 1 && index < prodBeats.length - 1 ? <Text style={{ textAlign: 'right', paddingRight: 30, color: 'white'}}>Scroll</Text> : null}
                        <TouchableOpacity onPress={() => console.log("Hi")}>
                          <View style={[styles.container, styles.view]}> 
                            <Text style={styles.beatTitle}>{item.title}</Text>
                            <Text style={styles.resultText}>{item.description}</Text>
                            <Button style={{ marginBottom: 5}} color='green' title="Listen" onPress={playBeat.bind(this, item.fb_URL)} />
                          </View> 
                        </TouchableOpacity>
                      </>
                        )
                    }
                }
                />
                : <View style={styles.view}> 
                    <Text style={{padding: 20, color: 'white', textAlign: 'center'}}>I"m just here for a good time!</Text> 
                  </View>}     
          <Text style={styles.footer}>Greenhooks.com. For real producers and beatmakers!</Text>
      </View>
  </ImageBackground>
  )
};

const styles = StyleSheet.create({
view: {
    flex: 1,
    flexDirection: 'column'
},
locationText: {
    textAlign: 'center',
    color: 'white'
},
image: {
    height: 125,
    width: 175,
    alignSelf: 'center',
    resizeMode: 'contain',
},
text: {
    fontSize: 20,
    color: 'white'
},
ProducerText: {
    color: 'white',
    fontSize: 25,
    textAlign: 'center'
},
beatTitle: {
    textAlign: 'center',
    color: '#337a46',
    fontWeight: 'bold'
},
container: {
    margin: 20,
    alignSelf: 'center',
    padding: 10,
    height: 160,
    width: 400,
    borderWidth: 2,
    borderRadius: 20,
    borderColor: '#a59c94',
    backgroundColor: '#c9c9c9'
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
    justifyContent: "center",
    alignItems: 'center'
},
view: {
    flex: 1
},
brand: {
    width: 440,
    height: 125,
    marginBottom: 12,
    resizeMode: 'contain', // or 'stretch'
    borderBottomWidth: 2,
    borderBottomColor: 'green',
    justifyContent: 'center'
},
  resultText: {
    color: 'black',
    width: 390,
    padding: 10,
    marginBottom: 10
  },
footer: {
    fontSize: 12,
    color: 'white',
    alignSelf: 'center',
    marginTop: 25,
    marginBottom: 25
  }
});

export default MemberScreen;
