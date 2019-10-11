import React, { Component } from "react";
import { View, StyleSheet, Text } from "react-native";
import { human } from "react-native-typography";

class InfoCard extends Component {
  static defaultProps = {
    title: "Title",
    description: null,
    asterisk: null,
    backgroundColor: "#e2e2e2",
    borderColor: null,
    borderWidth: 0
  };

  render() {
    const {
      title,
      description,
      asterisk,
      backgroundColor,
      borderColor,
      borderWidth,
      isSmallDevice
    } = this.props;

    return (
      <View style={styles.infoBox}>
        <View style={[styles.card, { backgroundColor, borderColor, borderWidth }]}>
          <Text style={[human.headline, { fontSize: isSmallDevice ? 16 : 18 }]}>{title} </Text>
          <View>
            {(description || asterisk) && (
              <View
                style={{
                  height: 5,
                  borderTopWidth: 2,
                  marginTop: 4,
                  marginBottom: 0,
                  borderColor: "#576574",
                  opacity: 0.15
                }}
              />
            )}
            {description && (
              <Text style={[human.footnote, { fontSize: isSmallDevice ? 12 : 14 }]}>
                {description}
              </Text>
            )}
            {asterisk && <View style={{ height: 3 }} />}
            {asterisk && (
              <View style={{ marginBottom: -1 }}>
                <Text
                  style={[human.caption2, { color: "#576574", fontSize: isSmallDevice ? 10 : 11 }]}
                >
                  *{asterisk}
                </Text>
              </View>
            )}
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  infoBox: {
    marginVertical: 5,
    marginHorizontal: 10
  },
  card: {
    borderRadius: 10,
    padding: 8,
    shadowOffset: { width: 1, height: 1 },
    shadowColor: "gray",
    shadowOpacity: 0.1
  }
});

export { InfoCard };
