import React, { Component } from 'react'
import { StyleSheet, PanResponder, View, Text } from 'react-native'

const CIRCLE_SIZE = 40
const CIRCLE_COLOR = "blue"
const CIRCLE_HIGHLIGHT_COLOR = "green"

class PanResponderExample extends Component {
    constructor(props) {
        super(props)

        this._panResponder = PanResponder.create({
            onStartShouldSetPanResponder: this._handleStartShouldSetPanResponder,
            onMoveShouldSetPanResponder: this._handleMoveShouldSetPanResponder,
            onPanResponderGrant: this._handlePanResponderGrant,
            onPanResponderMove: this._handlePanResponderMove,
            onPanResponderRelease: this._handlePanResponderEnd,
            onPanResponderTerminate: this._handlePanResponderEnd
        })

        this._previousLeft = 20
        this._previousTop = 84
        this._circleStyles = {
            style: { left: this._previousLeft, top: this._previousTop }
        }

        this.state = {
            numberActiveTouches: 0,
            moveX: 0,
            moveY: 0,
            x0: 0,
            y0: 0,
            dx: 0,
            dy: 0,
            vx: 0,
            vy: 0
        }
    }

    componentDidMount() {
        this._updatePosition()
    }

    render() {
        return (
            <View style={styles.container}>
                <View ref={circle => this.circle = circle}
                    style={styles.circle}
                    {...this._panResponder.panHandlers} />
                <Text>
                    {this.state.numberActiveTouches} touches,
                    dx: {this.state.dx},
                    dy: {this.state.dy},
                    vx: {this.state.vx},
                    vy: {this.state.vy}
                </Text>
            </View>
        )
    }

    _highlight = () =>
        this.circle &&
            this.circle.setNativeProps({
                style: { backgroundColor: CIRCLE_HIGHLIGHT_COLOR }
            })
    
    _unHighlight = () =>
        this.circle &&
            this.circle.setNativeProps({
                style: { backgroundColor: CIRCLE_COLOR }
            })

    _updatePosition = () =>
        this.circle &&
            this.circle.setNativeProps(this._circleStyles)

    _handleStartShouldSetPanResponder = () => true

    _handleMoveShouldSetPanResponder = () => true

    _handlePanResponderGrant = () => this._highlight()

    _handlePanResponderMove = (event, gestureState) => {
        this.setState({...gestureState})

        this._circleStyles.style.left = this._previousLeft + gestureState.dx
        this._circleStyles.style.top = this._previousTop + gestureState.dy
        this._updatePosition()
    }

    _handlePanResponderEnd = (event, gestureState) => {
        this._unHighlight()
        this._previousLeft += gestureState.dx
        this._previousTop += gestureState.dy
    }
}

const styles = StyleSheet.create({
    circle: {
        width: CIRCLE_SIZE,
        height: CIRCLE_SIZE,
        borderRadius: CIRCLE_SIZE / 2,
        backgroundColor: CIRCLE_COLOR,
        position: "absolute",
        left: 0,
        top: 0
    },
    container: { flex: 1, paddingTop: 64 }
})

export default PanResponderExample
