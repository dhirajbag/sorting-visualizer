import { React, Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import { Button, UncontrolledTooltip } from 'reactstrap';
import { mergeSort } from '../sortingAlgos/mergeSort';
import { quickSort, randomizedQuickSort } from '../sortingAlgos/quickSort';
import { insertionSort } from '../sortingAlgos/insertionSort';

import {desc_reset, desc_mergeSort, desc_quickSort, desc_randomQuickSort, desc_insertSort } from '../description/desc_sorting';

class SortInterface extends Component {

    constructor(props) {
        super(props);

        this.state = {
            arr: [],
            isBusy: false,
            timePerBar: 8,
            barColor: "Black",
            min_val: 1,
            max_val: 500,
            len: 100,
            bgColor0: "Teal",
            bgColor1: "Aqua",

        }
    }


    resetArray() {

        const new_arr = [];

        const min_val = this.state.min_val;
        const max_val = this.state.max_val;
        const len = this.state.len;

        for (var i = 0; i < len; i++) {
            new_arr.push(min_val + Math.floor(Math.random() * (max_val - min_val)));
        }

        this.setState({
            arr: new_arr,
        });

    }

    handleMergeSort() {

        const highlight0 = "red";
        const highlight1 = "yellow";

        this.setState({
            isBusy: true
        });

        const result = mergeSort(this.state.arr);
        const indexValuePairs = result.indexValuePairs;
        const tmp_arr = result.arr;
        const bars = document.getElementsByClassName("bar");

        indexValuePairs.map((pair, index) => {
            setTimeout(
                () => {

                    if(index > 0){
                        bars[indexValuePairs[index-1][0]].style.backgroundColor = highlight1;
                    }

                    bars[pair[0]].style.height = `${pair[1]}px`;
                    bars[pair[0]].style.backgroundColor = highlight0;

                    if (index === indexValuePairs.length - 1) {
                        this.setState({
                            arr: tmp_arr,
                            isBusy: false,
                        });

                        for (let bar of bars) {
                            bar.style.backgroundColor = this.state.barColor;
                        }
                    }

                }, index * this.state.timePerBar);
        });

    }

    handleQuickSort(isRandomized) {
        const highlight0 = "yellow";
        const highlight1 = "red";

        let result = [];

        if (isRandomized)
            result = randomizedQuickSort(this.state.arr);
        else
            result = quickSort(this.state.arr);

        const swap_triplets = result.swap_triplets;
        const tmp_arr = result.arr;

        const bars = document.getElementsByClassName("bar");


        this.setState({
            isBusy: true
        });

        swap_triplets.map((triplet, index) => {

            setTimeout(() => {

                bars[triplet[0]].style.backgroundColor = highlight1;
                bars[triplet[1]].style.backgroundColor = highlight1;

                if (index > 0) {

                    if (!swap_triplets[index - 1][2]) {
                        bars[swap_triplets[index - 1][0]].style.backgroundColor = this.state.barColor;
                        bars[swap_triplets[index - 1][1]].style.backgroundColor = this.state.barColor;
                    }
                    else if (swap_triplets[index - 1][0] != swap_triplets[index - 1][1])
                        bars[swap_triplets[index - 1][0]].style.backgroundColor = this.state.barColor;

                }

                const height0 = bars[triplet[0]].style.height;
                bars[triplet[0]].style.height = bars[triplet[1]].style.height;
                bars[triplet[1]].style.height = height0;

                if (triplet[2]) {
                    bars[triplet[1]].style.backgroundColor = highlight0;
                }

                if (index === swap_triplets.length - 1) {
                    this.setState({
                        arr: tmp_arr,
                        isBusy: false
                    });

                    for (let bar of bars) {
                        bar.style.backgroundColor = this.state.barColor;
                    }
                }

            }
                , index * this.state.timePerBar
            );
        });
    }

    handleInsertionSort() {

        const highlight = "yellow";

        const result = insertionSort(this.state.arr);
        const triplets = result.triplets;
        const tmp_arr = result.arr;

        const bars = document.getElementsByClassName("bar");

        this.setState({
            isBusy: true
        });

        triplets.map((triplet, index) => {
            setTimeout(() => {
                if (triplet[2]) {
                    bars[triplet[0]].style.backgroundColor = highlight;
                }
                else {
                    const tmp_height = bars[triplet[1]].style.height;
                    const tmp_bgColor = bars[triplet[1]].style.backgroundColor;
                    bars[triplet[1]].style.height = bars[triplet[0]].style.height;
                    bars[triplet[1]].style.backgroundColor = bars[triplet[0]].style.backgroundColor;

                    bars[triplet[0]].style.height = tmp_height;
                    bars[triplet[0]].style.backgroundColor = tmp_bgColor;

                }

                if (index === triplets.length - 1) {
                    this.setState({
                        arr: tmp_arr,
                        isBusy: false
                    });

                    for (let bar of bars) {
                        bar.style.backgroundColor = this.state.barColor;
                    }
                }
            }

                , index * this.state.timePerBar)
        });

    }

    componentDidMount() {
        this.resetArray();
    }

    renderBars() {


        const bar_seq = this.state.arr.map((value, idx) => {

            return (
                <div key={idx}>
                    <div id={"tootip-" + idx} className="bar" style={
                        {
                            width: `${89 * 0.7 / this.state.arr.length}vw`,
                            backgroundColor: this.state.barColor,
                            marginLeft: `${89 * 0.3 / this.state.arr.length}vw`,
                            height: `${value}px`,
                            marginTop: "10px"

                        }
                    } ></div>
                    <UncontrolledTooltip placement="top" target={"tootip-" + idx}>
                        {this.state.isBusy ? "wait" : value}
                    </UncontrolledTooltip>


                </div>
            );
        });

        return (
            <div className="col-12 col-md-11 border d-flex flex-wrap align-items-end justify-content-center"
                style={{
                    "background-image": `linear-gradient(to bottom right, ${this.state.bgColor0}, ${this.state.bgColor1})`,
                    height: `${this.state.max_val + 50}px`
                }}>
                {bar_seq}

            </div>
        );
    }

    onSpeedChange(value) {
        const time = 400 / value;
        this.setState({
            timePerBar: time
        });
    }

    onBarCountChange(value) {
        this.state.len = value;
        this.resetArray();
    }


    render() {

        return (
            <div>
                <div className="row bg-light justify-content-center">
                    <hr />
                    {this.renderBars()}
                </div>

                <div className="row d-flex justify-content-center align-items-center">
                    <div className="col-8 col-md-6">
                        <Button id="btn-reset" className="mt-3" color="primary" disabled={this.state.isBusy} onClick={() => this.resetArray()}>Reset Array</Button>{' '}
                        <Button id="btn-mergeSort" className="mt-3" color="success" disabled={this.state.isBusy} onClick={() => this.handleMergeSort()}>Merge Sort</Button>{' '}
                        <Button id="btn-quickSort" className="mt-3" color="success" disabled={this.state.isBusy} onClick={() => this.handleQuickSort(false)}>Quick Sort</Button>{' '}
                        <Button id="btn-randQuickSort" className="mt-3" color="success" disabled={this.state.isBusy} onClick={() => this.handleQuickSort(true)}>Randomized Quick Sort</Button>{' '}
                        <Button id="btn-insertSort" className="mt-3" color="success" disabled={this.state.isBusy} onClick={() => this.handleInsertionSort()}>Insertion Sort</Button>{' '}

                        <UncontrolledTooltip placement="top" target={"btn-reset"}>{desc_reset}</UncontrolledTooltip>
                        <UncontrolledTooltip placement="top" target={"btn-mergeSort"}>{desc_mergeSort}</UncontrolledTooltip>
                        <UncontrolledTooltip placement="top" target={"btn-quickSort"}>{desc_quickSort}</UncontrolledTooltip>
                        <UncontrolledTooltip placement="top" target={"btn-randQuickSort"}>{desc_randomQuickSort}</UncontrolledTooltip>
                        <UncontrolledTooltip placement="top" target={"btn-insertSort"}>{desc_insertSort}</UncontrolledTooltip>
                    </div>
                    <div className="col-6 col-md-4 justify-content-center mt-3">
                        <Typography id="speed" gutterBottom>
                            Speed
                        </Typography>
                        <Slider
                            defaultValue={50}
                            aria-labelledby="speed"
                            min={5}
                            max={100}
                            valueLabelDisplay="auto"
                            onChange={(event, value) => {
                                this.onSpeedChange(value);
                            }}
                            disabled={this.state.isBusy}
                        />
                        <Typography id="Bars" gutterBottom>
                            Number of bars
                        </Typography>
                        <Slider
                            defaultValue={100}
                            aria-labelledby="Bars"
                            min={20}
                            max={200}
                            valueLabelDisplay="auto"
                            onChange={(event, value) => {
                                this.onBarCountChange(value);
                            }}
                            disabled={this.state.isBusy}
                        />
                    </div>

                </div>

            </div>
        );
    }

}

export default SortInterface;