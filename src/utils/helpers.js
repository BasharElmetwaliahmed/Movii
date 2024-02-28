export const convertToPercentage = (rate=5)=>{
    return (rate * 10).toFixed(1);
}
export const getRateColor= (rate=5)=>{
    if( rate>7){
        return 'green-500';
    }
    else if(rate>5){
        return "orange-400";
    }
    else return 'red-500'
}