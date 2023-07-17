
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
    

      return {arrayRange, getshuffled, removeValue, removeAt}

}
export default arrayGenerator
