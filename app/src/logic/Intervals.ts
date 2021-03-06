import key from "./Key";
import mode from "./Mode";

class Intervals {
    
	/** An array of the interval names, used as a reference for populating the intervals object. */ 
    public DATABASE: Array<string> = ["one1", "two1", "thr1", "for1", "fiv1", "six1", "sev1", "one2", "two2", "thr2", "for2", "fiv2", "six2", "sev2", "one3", "two3", "thr3", "for3", "fiv3", "six3", "sev3", "one4"];
	/** Whether the Intervals.loadout object is up to date or not. */
    public updated = false;	
    /** The intervals object, populated with the notes of the current key, ordered by the current mode. */
    public loadout: Map<string, string>;

    public populate() {

		// If the Intervals.loadout object is not already populated with the current key,
        if (this.updated == false) {

            let modeOffset: number;
            if (key.current == "C Minor") {
                modeOffset = mode.DATABASE[mode.index].minorPos;
            } else {
                modeOffset = mode.DATABASE[mode.index].majorPos;
            }

            this.loadout = new Map();

            this.DATABASE.forEach((element,index) =>{
                this.loadout.set(element,key.DATABASE[key.index][index + modeOffset])
            })

            // for (let i = 0; i <= this.DATABASE.length - 1; i++) {
            //     let offset = key.DATABASE[Math.floor(Math.random() * 2)];
            //     let newLoadout = offset[i + modeOffset];
            //     this.loadout.set(this.DATABASE[i], newLoadout);                
            // }

            this.updated = true;
        }
        else return this.loadout;
    }
}

const intervals = new Intervals();
export default intervals;