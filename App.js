import React from "react";
import {
  StyleSheet,
  SafeAreaView,
  StatusBar,
  BackHandler,
  Alert
} from "react-native";
import {
  StackNavigator,
  createMaterialTopTabNavigator
} from "react-navigation";
import { Header } from "react-native-elements";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import Icon from "react-native-vector-icons/MaterialIcons";
import GLOBAL from "./utils/globals";
import ChapterTab from "./screens/ChapterIndex";
import LetterTab from "./screens/LetterIndex";
import FolderBaniScreen from "./screens/FolderBani";
import SettingsScreen from "./screens/Settings";
import AboutScreen from "./screens/About";
import ReaderScreen from "./screens/Reader";
import createStore from "./config/store";

const HomeTabs = createMaterialTopTabNavigator(
  {
    Letter: LetterTab,
    Chapter: ChapterTab
  },
  {
    tabBarOptions: {
      style: {
        backgroundColor: GLOBAL.COLOR.TAB_BAR_COLOR
      }
    }
  }
);

const RootStack = StackNavigator({
  Home: {
    screen: HomeTabs,
    navigationOptions: ({ navigation }) => ({
      header: (
        <Header
          outerContainerStyles={{ borderBottomWidth: 0 }}
          backgroundColor={GLOBAL.COLOR.TOOLBAR_COLOR}
          centerComponent={{
            text: "AMimRq kIrqn",
            style: [
              styles.headerBarStyle,
              { fontFamily: "GurbaniAkharHeavySG", fontSize: 24 }
            ]
          }}
          rightComponent={
            <Icon
              name="settings"
              color={GLOBAL.COLOR.TOOLBAR_TINT}
              size={30}
              onPress={() =>
                navigation.navigate({ key: "Settings", routeName: "Settings" })
              }
            />
          }
        />
      ),
      tabBarVisible: false,
      swipeEnabled: false
    })
  },
  FolderBani: {
    screen: FolderBaniScreen,
    navigationOptions: ({ navigation }) => ({
      header: (
        <Header
          outerContainerStyles={{ borderBottomWidth: 0 }}
          backgroundColor={GLOBAL.COLOR.TOOLBAR_COLOR}
          leftComponent={
            <Icon
              name="arrow-back"
              color={GLOBAL.COLOR.TOOLBAR_TINT}
              size={30}
              onPress={() => navigation.goBack()}
            />
          }
          centerComponent={{
            text: `${navigation.state.params.title}`,
            style: [
              styles.headerBarStyle,
              { fontFamily: "GurbaniAkharHeavySG", fontSize: 24 }
            ]
          }}
          rightComponent={
            <Icon
              name="settings"
              color={GLOBAL.COLOR.TOOLBAR_TINT}
              size={30}
              onPress={() =>
                navigation.navigate({ key: "Settings", routeName: "Settings" })
              }
            />
          }
        />
      ),
      tabBarVisible: false,
      swipeEnabled: false
    })
  },
  Settings: {
    screen: SettingsScreen,
    navigationOptions: ({ navigation }) => ({
      header: (
        <Header
          outerContainerStyles={{ borderBottomWidth: 0 }}
          backgroundColor={GLOBAL.COLOR.TOOLBAR_COLOR_ALT}
          leftComponent={
            <Icon
              name="arrow-back"
              color={GLOBAL.COLOR.TOOLBAR_TINT}
              size={30}
              onPress={() => navigation.goBack()}
            />
          }
          centerComponent={{ text: "Settings", style: styles.headerBarStyle }}
        />
      )
    })
  },
  Reader: {
    screen: ReaderScreen,
    navigationOptions: {
      header: null
    }
  },
  About: {
    screen: AboutScreen,
    navigationOptions: ({ navigation }) => ({
      header: (
        <Header
          outerContainerStyles={{ borderBottomWidth: 0 }}
          backgroundColor={GLOBAL.COLOR.TOOLBAR_COLOR_ALT2}
          leftComponent={
            <Icon
              name="arrow-back"
              color={GLOBAL.COLOR.TOOLBAR_TINT}
              size={30}
              onPress={() => navigation.goBack()}
            />
          }
          centerComponent={{ text: "About", style: styles.headerBarStyle }}
        />
      )
    })
  }
});

const styles = StyleSheet.create({
  headerBarStyle: {
    color: GLOBAL.COLOR.TOOLBAR_TINT,
    fontSize: 18
  }
});

const { store, persistor } = createStore();

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      safeAreaNavBarColor: GLOBAL.COLOR.TOOLBAR_COLOR,
      statusBarType: "light-content"
    };
  }

  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.handleBackPress);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackPress);
  }

  handleBackPress = () => {
    Alert.alert(
      "Exit Amrit Keertan",
      "Are you sure you want to exit?",
      [
        { text: "Cancel" },
        { text: "Exit", onPress: () => BackHandler.exitApp() }
      ],
      { cancelable: true }
    );
    return true;
  };

  _getCurrentRouteName(navState) {
    if (navState.hasOwnProperty("index")) {
      this._getCurrentRouteName(navState.routes[navState.index]);
    } else {
      if (navState.routeName === "Settings") {
        this.setState({ safeAreaNavBarColor: GLOBAL.COLOR.TOOLBAR_COLOR_ALT });
        this.setState({ statusBarType: "dark-content" });
      } else if (navState.routeName === "About") {
        this.setState({ safeAreaNavBarColor: GLOBAL.COLOR.TOOLBAR_COLOR_ALT2 });
        this.setState({ statusBarType: "light-content" });
      } else if (navState.routeName === "Reader") {
        this.setState({
          safeAreaNavBarColor: GLOBAL.COLOR.READER_HEADER_COLOR
        });
        this.setState({ statusBarType: "light-content" });
      } else {
        this.setState({ safeAreaNavBarColor: GLOBAL.COLOR.TOOLBAR_COLOR });
        this.setState({ statusBarType: "light-content" });
      }
    }
  }

  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <StatusBar
            backgroundColor={this.state.safeAreaNavBarColor}
            barStyle={this.state.statusBarType}
          />
          <SafeAreaView
            style={[
              { flex: 1 },
              { backgroundColor: this.state.safeAreaNavBarColor }
            ]}
          >
            <RootStack
              onNavigationStateChange={newState => {
                this._getCurrentRouteName(newState);
              }}
            />
          </SafeAreaView>
        </PersistGate>
      </Provider>
    );
  }
}
