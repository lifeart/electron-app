import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
const DEFAULT_ROW_COUNT = 1000;
const DEFAULT_COL_COUNT =  10;


export default class PerfTableComponent extends Component {
    @tracked dataSize = 1
    @tracked iteration = 1;
    updateDataSize(newSize) {
        this.dataSize = parseInt(newSize);
    }
    timestamp = Date.now();
    constructor() {
        super(...arguments);
        setTimeout(()=>{
            this.animate(Date.now());
        })
    }
    animate(timestamp) {
        const delta = timestamp - (this.timestamp || 0);
        this.timestamp = timestamp;
        this.iteration++;
        document.title = `[Electron perf] ${Math.ceil(1000 / delta)} fps`;
        requestIdleCallback(()=>{
            requestAnimationFrame(this.animate.bind(this));
        })
        
    }
    get dateSince() {
        if (this.iteration) {
            return  Date.now() - new Date().setHours(0, 0, 0, 0);
        } else {
            return 0;
        }
    }
    get header() {
        return new Array(DEFAULT_COL_COUNT).fill(null).map((e, index)=> {
            return index + 1;
        } );
    }
    get tableData() {
        let newData = new Array(this.dataSize * DEFAULT_ROW_COUNT).fill(null).map((a,index)=>{
            return new Array(DEFAULT_COL_COUNT).fill(null).map((b, i) => {
                return {
                    id: `${index}-${i}`,
                    row: index,
                    col: i
                };
            })
        });
        return newData;
    }
}
