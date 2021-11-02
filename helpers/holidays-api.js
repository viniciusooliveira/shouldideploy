import axios from 'axios'
import moment from 'moment'


const API_TOKEN = 'dmluaWNpdXM0MzVAZ21haWwuY29tJmhhc2g9NjUyNjU3MTc'
const API_URL = 'https://api.calendario.com.br/?json=true'
const IBGE_CODE = 3304557

async function ListYearHolidays(year){
    try{
        let res = await axios.get(`${API_URL}&ano=${year}&ibge=${IBGE_CODE}&token=${API_TOKEN}`)
        
        return res.data.reduce((a,x) => ({...a, [x.date]: x}), {})
    }catch{
        return null
    }
    
}

async function IsHoliday(date){
    const d = moment(date)
    let holidays = await ListYearHolidays(date.getFullYear())
    return holidays[d.format('DD/MM/YYYY')] != null;
}

export {
    ListYearHolidays,
    IsHoliday
}