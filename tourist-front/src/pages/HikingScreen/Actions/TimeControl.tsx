import React from "react";
import {FaFastForward, FaPause, FaPlay} from "react-icons/all";
import {ToggleButton, ToggleButtonGroup} from "react-bootstrap";
import {connect} from "react-redux";
import {TimeControlState, TimeSpeeds} from "model/time/timeControlState";
import {RootState} from "redux/rootReducer";
import {startTimer, stopTimer} from "redux/reducers/timeControl";

interface TimeControlProps {
    timeControlState: TimeControlState;
    startTimer(speed?: TimeSpeeds): void;
    stopTimer(): void;
}

const TimeControl: React.FC<TimeControlProps> = ({timeControlState: {speed, paused}, startTimer, stopTimer}) => {
    const value = paused ? 0 : speed;
    const handleChange = (value: number) =>
        value === 0 ? stopTimer() : startTimer(value);

    return (
        <ToggleButtonGroup name="speed" type="radio" value={value} onChange={handleChange}>
            <ToggleButton value={0}><FaPause/></ToggleButton>
            <ToggleButton value={TimeSpeeds.NORMAL}><FaPlay/></ToggleButton>
            <ToggleButton value={TimeSpeeds.X2}><FaFastForward/></ToggleButton>
        </ToggleButtonGroup>
    );
};

export default connect(
    (state: RootState) => ({
        timeControlState: state.timeControl
    }),
    {startTimer, stopTimer}
)(TimeControl);