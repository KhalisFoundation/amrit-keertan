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
    if(isNaN(this.props.currentKeertanFolder)) {
      this.loadLetterFolder();
      AnalyticsManager.getInstance().trackSearchEvent("letter", this.props.currentKeertanFolder);
    } else {
      AnalyticsManager.getInstance().trackSearchEvent("category", this.props.currentKeertanFolder);
      this.loadKeertanFolder();
    }
  }

  loadLetterFolder() {
    Database.getKeertanForLetter(
      this.props.currentKeertanFolder
    ).then(keertan => {
      this.setState({
        data: keertan,
        isLoading: false
      });
    });
  }

  loadKeertanFolder() {
    Database.getKeertanForFolder(
      this.props.currentKeertanFolder
    ).then(keertan => {
      this.setState({
        data: keertan,
        isLoading: false
      });
    });
  }

  handleOnPress(item, navigator) {
    let index = this.state.data.indexOf(item);
    this.props.setCurrentShabadIndex(item.id);
    navigator.navigate({
      key: "Reader-" + item.id,
      routeName: "Reader",
      params: { item: item, index: index, data: this.state.data }
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

export default connect(mapStateToProps, mapDispatchToProps)(FolderBani);
