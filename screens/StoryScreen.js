import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  Image,
  ScrollView,
  Dimensions
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { RFValue } from "react-native-responsive-fontsize";
import { TouchableOpacity } from "react-native-gesture-handler";
import * as Speech from "expo-speech";

import * as Font from "expo-font";

import * as SplashScreen from 'expo-splash-screen';
SplashScreen.preventAutoHideAsync();

let customFonts = {
  "Bubblegum-Sans": require("../assets/fonts/BubblegumSans-Regular.ttf")
};

export default class StoryScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fontsLoaded: false,
      speakerColor: "gray",
      speakerIcon: "volume-high-outline"
    };
  }

  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }

  componentDidMount() {
    this._loadFontsAsync();
  }

  async initiateTTS(title, author, story, moral) {
   const current_color=this.state.speakerColor
   this.setState({
     speakerColor:current_color==="gray"?"yellow":"gray"
     
   }) 
   if (current_color==="grey"){
     Speech.speak(`${title} by ${author}`);
     Speech.speak(story)
     Speech.speak("the moral of the story is");
     Speech.speak(moral)
   }else{
     Speech.stop()
   }
  }

  render() {
    if (!this.props.route.params) {
      this.props.navigation.navigate("Home");
    } else if (this.state.fontsLoaded) {
      SplashScreen.hideAsync();
      return (
        <View style={styles.container}>
          <SafeAreaView style={styles.droidSafeArea} />
          <View style={styles.appTitle}>
            <View style={styles.appIcon}>
              <Image
                source={require("../assets/logo.png")}
                style={styles.iconImage}
              ></Image>
            </View>
            <View style={styles.appTitleTextContainer}>
              <Text style={styles.appTitleText}>Storytelling App</Text>
            </View>
          </View>
          <View style={styles.storyContainer}>
            <ScrollView style={styles.storyCard}>
              <Image
                source={require("../assets/story_image_1.png")}
                style={styles.image}
              ></Image>

              <View style={styles.dataContainer}>
                <View style={styles.titleTextContainer}>
                  <Text style={styles.storyTitleText}>
                    {this.props.route.params.story.title}
                  </Text>
                  <Text style={styles.storyAuthorText}>
                    {this.props.route.params.story.author}
                  </Text>
                  <Text style={styles.storyAuthorText}>
                    {this.props.route.params.story.created_on}
                  </Text>
                </View>
                <View style={styles.iconContainer}>
             <TouchableOpacity onPress={()=>
             this.initiateTTS(
               this.props.route.params.story.title,
               this.props.route.params.story.author,
               this.props.route.params.story.story,
               this.props.route.params.story.moral,
             )}>
                    <Ionicons
                      name={this.state.speakerIcon}
                      size={RFValue(30)}
                      color={this.state.speakerColor}
                      style={{ margin: RFValue(15) }}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.storyTextContainer}>
                <Text style={styles.storyText}>
                  {this.props.route.params.story.story}
                </Text>
                <Text style={styles.moralText}>
                  Moral - {this.props.route.params.story.moral}
                </Text>
              </View>
              <View style={styles.actionContainer}>
                <View style={styles.likeButton}>
                  <Ionicons name={"heart"} size={RFValue(30)} color={"white"} />
                  <Text style={styles.likeText}>12k</Text>
                </View>
              </View>
            </ScrollView>
          </View>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#15193c"
    },
    droidSafeArea: {
        marginTop: Platform.OS === "android" ? StatusBar.currentHeight : RFValue(35)
    },
    appTitle: {
        flex: 0.07,
        flexDirection: "row"
    },
    appIcon: {
        flex: 0.3,
        justifyContent: "center",
        alignItems: "center"
    },
    iconImage: {
        width: "100%",
        height: "100%",
        resizeMode: "contain"
    },
    appTitleTextContainer: {
        flex: 0.7,
        justifyContent: "center"
    },
    appTitleText: {
        color: "white",
        fontSize: 28,
        fontFamily: "Bubblegum-Sans"
    },
    storyContainer: {
        flex: 1
    },
    storyCard: {
        margin: 20,
        backgroundColor: "#2f345d",
        borderRadius: 20
    },
    image: {
        width: "100%",
        alignSelf: "center",
        height: 200,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        resizeMode: "contain"
    },
    dataContainer: {
        flexDirection: "row",
        padding: 20
    },
    titleTextContainer: {
        flex: 0.8
    },
    storyTitleText: {
        fontFamily: "Bubblegum-Sans",
        fontSize:25,
        color: "white"
    },
    storyAuthorText: {
        fontFamily: "Bubblegum-Sans",
        fontSize:18,
        color: "white"
    },
    iconContainer: {
        flex: 0.2
    },
    storyTextContainer: {
        padding: 20
    },
    storyText: {
        fontFamily: "Bubblegum-Sans",
        fontSize: 15,
        color: "white"
    },
    moralText: {
        fontFamily: "Bubblegum-Sans",
        fontSize: 20,
        color: "white"
    },
    actionContainer: {
        justifyContent: "center",
        alignItems: "center",
        margin: 10
    },
    likeButton: {
        width:160,
        height: 40,
        flexDirection: "row",
        backgroundColor: "#eb3948",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 30
    },
    likeText: {
        color: "white",
        fontFamily: "Bubblegum-Sans",
        fontSize: 25,
        marginLeft: 5
    }
});
