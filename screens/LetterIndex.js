import React from "react";
import { StyleSheet, Text, TouchableHighlight, Dimensions } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Col, Row, Grid } from "react-native-easy-grid";
import * as actions from "../actions/actions";

class LetterIndex extends React.Component {
  state = Dimensions.get("window");
  handler = dims => this.setState(dims);

  componentWillMount() {
    Dimensions.addEventListener("change", this.handler);
  }

  componentWillUnmount() {
    // Important to stop updating state after unmount
    Dimensions.removeEventListener("change", this.handler);
  }

  render() {
    const { width, height } = Dimensions.get("window");
    var isPortrait = height > width ? true : false;

    if (isPortrait) {
      return (
        <Grid>
          <Col>
            <Row>
              <Letter char={"a"} {...this.props} />
            </Row>
            <Row>
              <Letter char={"k"} {...this.props} />
            </Row>
            <Row>
              <Letter char={"c"} {...this.props} />
            </Row>
            <Row>
              <Letter char={"t"} {...this.props} />
            </Row>
            <Row>
              <Letter char={"q"} {...this.props} />
            </Row>
            <Row>
              <Letter char={"p"} {...this.props} />
            </Row>
            <Row>
              <Letter char={"X"} {...this.props} />
            </Row>
          </Col>
          <Col>
            <Row>
              <Letter char={"A"} {...this.props} />
            </Row>
            <Row>
              <Letter char={"K"} {...this.props} />
            </Row>
            <Row>
              <Letter char={"C"} {...this.props} />
            </Row>
            <Row>
              <Letter char={"T"} {...this.props} />
            </Row>
            <Row>
              <Letter char={"Q"} {...this.props} />
            </Row>
            <Row>
              <Letter char={"P"} {...this.props} />
            </Row>
            <Row>
              <Letter char={"r"} {...this.props} />
            </Row>
          </Col>
          <Col>
            <Row>
              <Letter char={"e"} {...this.props} />
            </Row>
            <Row>
              <Letter char={"g"} {...this.props} />
            </Row>
            <Row>
              <Letter char={"j"} {...this.props} />
            </Row>
            <Row>
              <Letter char={"f"} {...this.props} />
            </Row>
            <Row>
              <Letter char={"d"} {...this.props} />
            </Row>
            <Row>
              <Letter char={"b"} {...this.props} />
            </Row>
            <Row>
              <Letter char={"l"} {...this.props} />
            </Row>
          </Col>
          <Col>
            <Row>
              <Letter char={"s"} {...this.props} />
            </Row>
            <Row>
              <Letter char={"G"} {...this.props} />
            </Row>
            <Row>
              <Letter char={"J"} {...this.props} />
            </Row>
            <Row>
              <Letter char={"F"} {...this.props} />
            </Row>
            <Row>
              <Letter char={"D"} {...this.props} />
            </Row>
            <Row>
              <Letter char={"B"} {...this.props} />
            </Row>
            <Row>
              <Letter char={"v"} {...this.props} />
            </Row>
          </Col>
          <Col>
            <Row>
              <Letter char={"h"} {...this.props} />
            </Row>
            <Row>
              <Letter char={"|"} {...this.props} disabled={true} />
            </Row>
            <Row>
              <Letter char={"\\"} {...this.props} disabled={true} />
            </Row>
            <Row>
              <Letter char={"x"} {...this.props} disabled={true} />
            </Row>
            <Row>
              <Letter char={"n"} {...this.props} />
            </Row>
            <Row>
              <Letter char={"m"} {...this.props} />
            </Row>
            <Row>
              <Letter char={"V"} {...this.props} disabled={true} />
            </Row>
          </Col>
        </Grid>
      );
    } else {
      return (
        <Grid>
          <Col>
            <Row>
              <Letter char={"a"} {...this.props} />
            </Row>
            <Row>
              <Letter char={"g"} {...this.props} />
            </Row>
            <Row>
              <Letter char={"\\"} {...this.props} disabled={true} />
            </Row>
            <Row>
              <Letter char={"Q"} {...this.props} />
            </Row>
            <Row>
              <Letter char={"B"} {...this.props} />
            </Row>
          </Col>
          <Col>
            <Row>
              <Letter char={"A"} {...this.props} />
            </Row>
            <Row>
              <Letter char={"G"} {...this.props} />
            </Row>
            <Row>
              <Letter char={"t"} {...this.props} />
            </Row>
            <Row>
              <Letter char={"d"} {...this.props} />
            </Row>
            <Row>
              <Letter char={"m"} {...this.props} />
            </Row>
          </Col>
          <Col>
            <Row>
              <Letter char={"e"} {...this.props} />
            </Row>
            <Row>
              <Letter char={"|"} {...this.props} disabled={true} />
            </Row>
            <Row>
              <Letter char={"T"} {...this.props} />
            </Row>
            <Row>
              <Letter char={"D"} {...this.props} />
            </Row>
            <Row>
              <Letter char={"X"} {...this.props} />
            </Row>
          </Col>
          <Col>
            <Row>
              <Letter char={"s"} {...this.props} />
            </Row>
            <Row>
              <Letter char={"c"} {...this.props} />
            </Row>
            <Row>
              <Letter char={"f"} {...this.props} />
            </Row>
            <Row>
              <Letter char={"n"} {...this.props} />
            </Row>
            <Row>
              <Letter char={"r"} {...this.props} />
            </Row>
          </Col>
          <Col>
            <Row>
              <Letter char={"h"} {...this.props} />
            </Row>
            <Row>
              <Letter char={"C"} {...this.props} />
            </Row>
            <Row>
              <Letter char={"F"} {...this.props} />
            </Row>
            <Row>
              <Letter char={"p"} {...this.props} />
            </Row>
            <Row>
              <Letter char={"l"} {...this.props} />
            </Row>
          </Col>
          <Col>
            <Row>
              <Letter char={"k"} {...this.props} />
            </Row>
            <Row>
              <Letter char={"j"} {...this.props} />
            </Row>
            <Row>
              <Letter char={"x"} {...this.props} disabled={true} />
            </Row>
            <Row>
              <Letter char={"P"} {...this.props} />
            </Row>
            <Row>
              <Letter char={"v"} {...this.props} />
            </Row>
          </Col>
          <Col>
            <Row>
              <Letter char={"K"} {...this.props} />
            </Row>
            <Row>
              <Letter char={"J"} {...this.props} />
            </Row>
            <Row>
              <Letter char={"q"} {...this.props} />
            </Row>
            <Row>
              <Letter char={"b"} {...this.props} />
            </Row>
            <Row>
              <Letter char={"V"} {...this.props} disabled={true} />
            </Row>
          </Col>
        </Grid>
      );
    }
  }
}

class Letter extends React.Component {
  selectLetter = () => {
    this.props.setCurrentKeertanFolder(this.props.char);
    this.props.navigation.navigate({
      key: "Folder-" + this.props.char,
      routeName: "FolderBani",
      params: { title: this.props.char }
    });
  };

  render() {
    const { width, height } = Dimensions.get("window");
    var isPortrait = height > width ? true : false;

    return (
      <TouchableHighlight
        underlayColor={"#c8c7cc"}
        disabled={this.props.disabled}
        style={[
          styles.container,
          this.props.nightMode && { backgroundColor: "#000" }
        ]}
        onPress={this.selectLetter.bind(this)}
      >
        <Text
          style={[
            styles.letter,
            {fontSize: Math.sqrt((height*height)+(width*width))* (isPortrait ? (7/100) : (5/100))},
            this.props.nightMode && { color: "#fff" },
            this.props.disabled && { color: "#BFBFBF80" }
          ]}
        >
          {this.props.char}
        </Text>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
    backgroundColor: "#fff"
  },
  letter: {
    textAlign: "center",
    fontFamily: "GurbaniAkharHeavySG",
    color: "#000"
  }
});

function mapStateToProps(state) {
  return {
    nightMode: state.nightMode,
    currentKeertanFolder: state.currentKeertanFolder
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LetterIndex);
