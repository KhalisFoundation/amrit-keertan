import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import KeepAwake from "react-native-keep-awake";
import { StatusBar } from "react-native";
import SplashScreen from "react-native-splash-screen";
import AnalyticsManager from "../utils/analytics";
import Database from "../utils/database";
import * as actions from "../actions/actions";
import BaniList from "../components/BaniList";

class LetterIndex extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      isLoading: true
    };
  }

  changeKeepAwake(shouldBeAwake) {
    if (shouldBeAwake) {
      KeepAwake.activate();
    } else {
      KeepAwake.deactivate();
    }
  }

  changeStatusBar(shouldBeHidden) {
    StatusBar.setHidden(shouldBeHidden);
  }

  componentWillMount() {
    this.changeKeepAwake(this.props.screenAwake || this.props.autoScroll);
    this.changeStatusBar(this.props.statusBar);
    AnalyticsManager.getInstance().allowTracking(this.props.statistics);
    Database.getBaniList().then(baniList => {
      this.props.setMergedBaniData(baniList);

      this.setState({
        data: baniList,
        isLoading: false
      });
    });
  }

  componentDidMount() {
    SplashScreen.hide();
    AnalyticsManager.getInstance().trackScreenView("Home Screen");
  }

  componentDidUpdate(prevProps) {
    if (prevProps.screenAwake != this.props.screenAwake) {
      this.changeKeepAwake(this.props.screenAwake);
    } else if (prevProps.autoScroll != this.props.autoScroll) {
      if (this.props.autoScroll) {
        this.changeKeepAwake(true);
      } else {
        this.changeKeepAwake(this.props.screenAwake);
      }
    } else if (prevProps.statusBar != this.props.statusBar) {
      this.changeStatusBar(this.props.statusBar);
    } else if (prevProps.statistics != this.props.statistics) {
      AnalyticsManager.getInstance().allowTracking(this.props.statistics);
    }
  }

  handleOnPress(item, navigator) {
    this.props.setCurrentKeertanFolder(item.id);
    navigator.navigate({
      key: "Folder-" + item.id,
      routeName: "FolderBani",
      params: { title: item.gurmukhi }
    });
  }

  render() {
    return (
      <BaniList
        data={this.state.data}
        nightMode={this.props.nightMode}
        fontSize={this.props.fontSize}
        fontFace={this.props.fontFace}
        romanized={this.props.romanized}
        navigation={this.props.navigation}
        isLoading={this.state.isLoading}
        onPress={this.handleOnPress.bind(this)}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    nightMode: state.nightMode,
    mergedBaniData: state.mergedBaniData,
    romanized: state.romanized,
    fontSize: state.fontSize,
    fontFace: state.fontFace,
    screenAwake: state.screenAwake,
    statusBar: state.statusBar,
    statistics: state.statistics,
    autoScroll: state.autoScroll,
    currentKeertanFolder: state.currentKeertanFolder
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(LetterIndex);
