import { React, useEffect, useState } from "react";
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
  UPDATE_SITEMEMBERS,
  UPDATE_ABOUTME,
  UPDATE_BEATTABLE
} from '../utils/const';

const HomeScreen = ({navigation}) => {
  const [state, dispatch] = useGlobalContext();

  useEffect(() => {
    console.log("Hi")
      const getData = async() => {
        try {
        const siteMembers = await ghAPI.get('/api/sitemembersAll');
        const aboutMe = await ghAPI.get('/api/aboutmeAll');
        const beatTable = await ghAPI.get('/api/beatTableAll');

        dispatch({type: UPDATE_SITEMEMBERS, payload: { siteMembers: siteMembers.data }})
        dispatch({type: UPDATE_ABOUTME, payload: { aboutMe: aboutMe.data }})
        dispatch({type: UPDATE_BEATTABLE, payload: { beatTable: beatTable.data }})

      }  catch (error) {
      console.log(error)
    }}
    getData();
  }, [])

  //console.log(state.siteMembers)
  //console.log(state.aboutMe)
  //console.log(state.beatTable)


  return (
    <ImageBackground source={require('../../assets/images/greenbackground.png')} style={styles.backgroundImage}>
      <View style={[styles.view]}>
      <ImageBackground source={require('../../assets/images/GH_INTRO_BANNER.jpg')} style={styles.brand}>

      </ImageBackground>
      <View style={styles.TPTextView}>
        <ImageBackground style={styles.shadowbdr} source={require('../../assets/images/shadow_bdr.gif')}>
          <Text style={{textAlign: 'center'}}>Classic Producers</Text>  
        </ImageBackground>
      </View>  
        {state.siteMembers && state.siteMembers.length > 0 ? 
            <FlatList 
            data={state.siteMembers} //{state.boards.sort(compareTitle)}
            keyExtractor= { mems => mems.mem_id.toString()}
            renderItem={({ item }) => {
              const bio = state.aboutMe.filter(profile => profile.mem_id === item.mem_id)
              const imgString = item.avatar_link === '/images/default/noavatar.gif' ? <Image style={styles.image} source={require('../../assets/images/noavatar.gif')} /> : <Image style={styles.image} source={{uri: item.avatar_link}} />;
              // console.log(imgString)
                    return (
                      <>
                        <TouchableOpacity onPress={() => navigation.navigate('Member', { id: item.mem_id, avatar_link: item.avatar_link, username: item.username})}>
                          <View style={styles.container}>
                            {imgString}
                            <Text style={styles.prodTitle}>{item.username}</Text>
                            <Text style={styles.resultText}>{bio[0].bio}</Text>
                          </View> 
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
  prodTitle: {
    textAlign: 'center',
    color: '#337a46',
    fontWeight: 'bold',
    fontSize: 20
  },
  image: {
    height: 150,
    width: 175,
    alignSelf: 'center',
    resizeMode: 'contain',
    marginBottom: 20
},
  text: {
    fontSize: 20,
    color: 'white'
  },
  container: {
    margin: 20,
    alignSelf: 'center',
    padding: 17,
    height: 400,
    width: 375,
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
  
  },
  brand: {
    width: 440,
    height: 125,
    marginBottom: 12,
    resizeMode: 'contain', // or 'stretch'
    borderBottomWidth: 2,
    borderBottomColor: 'green'
},
  resultText: {
    color: 'black',
    width: 375,
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
