
const arrayGenerator= ()=>{
    const arrayRange = (start:number, stop: number, step: number): number[] =>{
        return Array.from({ length: (stop - start) / step + 1 },(value, index) => start + index * step);
    }    
    
    const getshuffled=(limit:number, optionCount:number):number[]=>{
        const sh:number[]=[];
        const source=arrayRange(0,limit,1);
        while(sh.length<optionCount){
            let lim=limit-sh.length
            const ran = Math.floor(Math.random() * lim);
            const v= source[ran]
            source[ran]= source[lim-1]
            source.pop();
            sh.push(v)
        }
        return sh;
    }
    function removeAt<T>(arr: Array<T>, index: number): Array<T> { 
        if (index > -1) {
          arr.splice(index, 1);
        }
        return arr;
      }
    

    function removeValue<T>(arr: Array<T>, value: T): Array<T> { 
        const index = arr.indexOf(value);
        return removeAt(arr,index);
        return arr;
      }
    const selectionArray=(i: number)=>{
        const uns = arrayRange(0,i,1);
        const sel:number[] =[];
        const move=(from:number[],to:number[],i:number)=>{
            const v= from[i];
            removeAt(from,i);
            to.push(v);
        }
        const select=(i:number)=>{
            move(uns,sel,i)
        }
        const unSelect=(i:number)=>{
            move(sel,uns,i)
        }
        return {uns,sel,select,unSelect};
    } 

      return {arrayRange, getshuffled, removeValue, removeAt,selectionArray}

}
export default arrayGenerator
