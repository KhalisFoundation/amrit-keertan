import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../actions/actions";
import BaniList from "../components/BaniList";
import Database from "../utils/database";
import AnalyticsManager from "../utils/analytics";

class FolderBani extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: []
    };
  }

  componentWillMount() {
    if (isNaN(this.props.currentKeertanFolder)) {
      this.loadLetterFolder(this.props.currentKeertanFolder);
      AnalyticsManager.getInstance().trackSearchEvent(
        "letter",
        this.props.currentKeertanFolder
      );
    } else {
      AnalyticsManager.getInstance().trackSearchEvent(
        "category",
        this.props.currentKeertanFolder
      );
      this.loadKeertanFolder(this.props.currentKeertanFolder);
    }
  }

  loadLetterFolder(letter) {
    Database.getKeertanForLetter(letter).then(keertan => {
      this.setState({
        data: keertan,
        isLoading: false
      });
    });
  }

  loadKeertanFolder(folderID) {
    Database.getKeertanForFolder(folderID).then(keertan => {
      this.setState({
        data: keertan,
        isLoading: false
      });
    });
  }

  handleOnPress(item, navigator) {
    this.props.setCurrentShabadIndex(item.id);
    if (isNaN(this.props.currentKeertanFolder)) {
      Database.getKeertanForFolder(item.folderID).then(keertan => {
        var index = -1;
        keertan.find(function(obj, i) {
          if (obj.id === item.id) {
            index = i;
            return;
          }
        });
        navigator.navigate({
          key: "Reader-" + item.id,
          routeName: "Reader",
          params: { item: item, index: index, data: keertan }
        });
      });
    } else {
      let index = this.state.data.indexOf(item);
      navigator.navigate({
        key: "Reader-" + item.id,
        routeName: "Reader",
        params: { item: item, index: index, data: this.state.data }
      });
    }
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
        onPress={this.handleOnPress.bind(this)}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    nightMode: state.nightMode,
    romanized: state.romanized,
    fontSize: state.fontSize,
    fontFace: state.fontFace,
    currentKeertanFolder: state.currentKeertanFolder
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FolderBani);
