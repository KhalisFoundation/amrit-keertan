import React from "react";
import { StyleSheet, View, Image, Text } from "react-native";
import SettingsList from "react-native-settings-list";
import Icon from "react-native-vector-icons/FontAwesome";
import {
  ActionSheet,
  ActionSheetItem
} from "react-native-action-sheet-component";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Slider } from "react-native-elements";
import AnalyticsManager from "../utils/analytics";
import * as actions from "../actions/actions";

class Settings extends React.Component {
  componentDidMount() {
    AnalyticsManager.getInstance().trackScreenView("In App Settings");
  }

  render() {
    const { navigate } = this.props.navigation;

    const checkedIcon = <Icon name="check" size={30} />;

    return (
      <View
        style={[
          styles.viewStyle,
          this.props.nightMode && { backgroundColor: "#000" }
        ]}
      >
        <SettingsList borderColor="#c8c7cc" defaultItemSize={50}>
          <SettingsList.Header
            headerText="Display Options"
            headerStyle={[
              styles.headerStyle,
              this.props.nightMode && { color: "#fff" }
            ]}
          />
          <SettingsList.Item
            backgroundColor={this.props.nightMode ? "#464646" : "#fff"}
            icon={
              <Image
                style={styles.imageStyle}
                source={require("../images/fontsizeicon.png")}
              />
            }
            title="Font Size"
            titleStyle={[
              styles.titleText,
              this.props.nightMode && { color: "#fff" }
            ]}
            titleInfo={
              actions.fontSizeNames[
                actions.FONT_SIZES.indexOf(this.props.fontSize)
              ]
            }
            titleInfoStyle={styles.titleInfoStyle}
            onPress={() => this.FontSizeActionSheet.show()}
          />
          <SettingsList.Item
            backgroundColor={this.props.nightMode ? "#464646" : "#fff"}
            icon={
              <Image
                style={styles.imageStyle}
                source={require("../images/fontfaceicon.png")}
              />
            }
            title="Font Face"
            titleStyle={[
              styles.titleText,
              this.props.nightMode && { color: "#fff" }
            ]}
            titleInfo={
              actions.fontFaceNames[
                actions.FONT_FACES.indexOf(this.props.fontFace)
              ]
            }
            titleInfoStyle={styles.titleInfoStyle}
            onPress={() => this.FontFaceActionSheet.show()}
          />
          <SettingsList.Item
            backgroundColor={this.props.nightMode ? "#464646" : "#fff"}
            icon={
              <Image
                style={styles.imageStyle}
                source={require("../images/romanizeicon.png")}
              />
            }
            hasSwitch={true}
            switchState={this.props.romanized}
            switchOnValueChange={this.props.toggleRomanized}
            hasNavArrow={false}
            title="Romanized"
            titleStyle={[
              styles.titleText,
              this.props.nightMode && { color: "#fff" }
            ]}
          />
          <SettingsList.Item
            backgroundColor={this.props.nightMode ? "#464646" : "#fff"}
            icon={
              <Image
                style={styles.imageStyle}
                source={require("../images/englishicon.png")}
              />
            }
            hasSwitch={true}
            switchState={this.props.englishTranslations}
            switchOnValueChange={this.props.toggleEnglishTranslations}
            hasNavArrow={false}
            title="English Translations"
            titleStyle={[
              styles.titleText,
              this.props.nightMode && { color: "#fff" }
            ]}
          />
          <SettingsList.Item
            backgroundColor={this.props.nightMode ? "#464646" : "#fff"}
            icon={
              <Image
                style={styles.imageStyle}
                source={require("../images/bgcoloricon.png")}
              />
            }
            hasSwitch={true}
            switchState={this.props.nightMode}
            switchOnValueChange={this.props.toggleNightMode}
            hasNavArrow={false}
            title="Night Mode"
            titleStyle={[
              styles.titleText,
              this.props.nightMode && { color: "#fff" }
            ]}
          />
          <SettingsList.Item
            backgroundColor={this.props.nightMode ? "#464646" : "#fff"}
            icon={<Icon style={styles.imageStyle} name="eye-slash" size={30} />}
            hasSwitch={true}
            switchState={this.props.statusBar}
            switchOnValueChange={this.props.toggleStatusBar}
            hasNavArrow={false}
            title="Hide Status Bar"
            titleStyle={[
              styles.titleText,
              this.props.nightMode && { color: "#fff" }
            ]}
          />
          <SettingsList.Item
            backgroundColor={this.props.nightMode ? "#464646" : "#fff"}
            icon={<Icon style={styles.imageStyle} name="magic" size={30} />}
            hasSwitch={true}
            switchState={this.props.autoScroll}
            switchOnValueChange={this.props.toggleAutoScroll}
            hasNavArrow={false}
            title="Auto Scroll"
            titleStyle={[
              styles.titleText,
              this.props.nightMode && { color: "#fff" }
            ]}
          />

          <SettingsList.Item
            backgroundColor={this.props.nightMode ? "#464646" : "#fff"}
            icon={
              <Image
                style={styles.imageStyle}
                source={require("../images/screenonicon.png")}
              />
            }
            hasSwitch={true}
            switchState={this.props.screenAwake || this.props.autoScroll}
            switchOnValueChange={this.props.toggleScreenAwake}
            switchProps={{ disabled: this.props.autoScroll }}
            hasNavArrow={false}
            title="Keep Screen Awake"
            titleStyle={[
              styles.titleText,
              this.props.nightMode && { color: "#fff" }
            ]}
          />

          <SettingsList.Header
            headerText="Bani Options"
            headerStyle={[
              styles.headerStyle,
              this.props.nightMode && { color: "#fff" }
            ]}
          />
          <SettingsList.Item
            backgroundColor={this.props.nightMode ? "#464646" : "#fff"}
            icon={
              <Image
                style={styles.imageStyle}
                source={require("../images/larivaaricon.png")}
              />
            }
            hasSwitch={true}
            switchState={this.props.larivaar}
            switchOnValueChange={this.props.toggleLarivaar}
            hasNavArrow={false}
            title="Larivaar"
            titleStyle={[
              styles.titleText,
              this.props.nightMode && { color: "#fff" }
            ]}
          />
          <SettingsList.Item
            backgroundColor={this.props.nightMode ? "#464646" : "#fff"}
            icon={<Icon style={styles.imageStyle} name="pause" size={30} />}
            hasSwitch={true}
            switchState={this.props.visram}
            switchOnValueChange={this.props.toggleVisram}
            hasNavArrow={false}
            title="Vishram"
            titleStyle={[
              styles.titleText,
              this.props.nightMode && { color: "#fff" }
            ]}
          />

          <SettingsList.Header
            headerText="Other Options"
            headerStyle={[
              styles.headerStyle,
              this.props.nightMode && { color: "#fff" }
            ]}
          />
          <SettingsList.Item
            backgroundColor={this.props.nightMode ? "#464646" : "#fff"}
            icon={
              <Image
                style={styles.imageStyle}
                source={require("../images/analyticsicon.png")}
              />
            }
            hasSwitch={true}
            switchState={this.props.statistics}
            switchOnValueChange={this.props.toggleStatistics}
            hasNavArrow={false}
            title="Collect Statistics"
            titleStyle={[
              styles.titleText,
              this.props.nightMode && { color: "#fff" }
            ]}
          />
          <SettingsList.Item
            backgroundColor={this.props.nightMode ? "#464646" : "#fff"}
            icon={
              <Icon
                style={styles.imageStyle}
                name="question-circle"
                size={30}
              />
            }
            title="About"
            titleStyle={[
              styles.titleText,
              this.props.nightMode && { color: "#fff" }
            ]}
            onPress={() => navigate({ key: "About", routeName: "About" })}
          />
        </SettingsList>

        <ActionSheet
          ref={actionSheet => {
            this.FontSizeActionSheet = actionSheet;
          }}
          position="bottom"
          defaultValue={this.props.fontSize}
        >
          <View>
            <Text style={styles.actionSheetTitle}>Font Size</Text>
          </View>
          {this.actionSheetOptions(
            actions.fontSizeNames,
            actions.FONT_SIZES,
            checkedIcon,
            this.props.setFontSize
          )}
        </ActionSheet>

        <ActionSheet
          ref={actionSheet => {
            this.FontFaceActionSheet = actionSheet;
          }}
          position="bottom"
          defaultValue={this.props.fontFace}
        >
          <View>
            <Text style={styles.actionSheetTitle}>Font Face</Text>
          </View>
          {this.actionSheetOptions(
            actions.fontFaceNames,
            actions.FONT_FACES,
            checkedIcon,
            this.props.setFontFace
          )}
        </ActionSheet>

      </View>
    );
  }

  actionSheetOptions = (names, options, checkedIcon, dispatch) => {
    var items = [];
    for (var i = 0; i < names.length; i++) {
      items.push(
        <ActionSheetItem
          text={names[i]}
          value={options[i]}
          style={{ paddingTop: 15, paddingBottom: 15 }}
          selectedIcon={checkedIcon}
          onPress={value => {
            dispatch(value);
          }}
          key={i}
        />
      );
    }
    return items;
  };
}

const styles = StyleSheet.create({
  actionSheetTitle: {
    fontSize: 18,
    alignSelf: "center",
    padding: 10
  },
  imageStyle: {
    marginLeft: 15,
    marginRight: 10,
    alignSelf: "center",
    width: 28,
    height: 28,
    justifyContent: "center"
  },
  titleInfoStyle: {
    marginLeft: 15
  },
  viewStyle: {
    backgroundColor: "#EFEFF4",
    flex: 1
  },
  headerStyle: {
    marginTop: 15
  },
  titleText: {
    fontSize: 16
  }
});

function mapStateToProps(state) {
  return {
    fontSize: state.fontSize,
    fontFace: state.fontFace,
    romanized: state.romanized,
    englishTranslations: state.englishTranslations,
    nightMode: state.nightMode,
    screenAwake: state.screenAwake,
    larivaar: state.larivaar,
    statistics: state.statistics,
    statusBar: state.statusBar,
    autoScroll: state.autoScroll,
    visram: state.visram
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
