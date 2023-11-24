import React, { useEffect, useState } from 'react';
import './style.css';

const Home = () => {
    const [records, setRecords] = useState([]);
    const [active, setActive] = useState(0);
    const [temperatura, setTemperatura] = useState(0);
    const [calidad, setCalidad] = useState(0);
    const [humedad, setHumedad] = useState(0);
    useEffect(() => {
        async function getRecords() {
            try {
                const response = await fetch(`https://api.thingspeak.com/channels/2354453/fields/1.json?api_key=4FZGVC9KG39BNTEZ&results=2`);
                const responseTemp = await fetch(`https://api.thingspeak.com/channels/2311047/fields/1.json?api_key=LJLFEUXM4RY0RF47&results=2`);
                const responseHum = await fetch(`https://api.thingspeak.com/channels/2311047/fields/2.json?api_key=LJLFEUXM4RY0RF47&results=2`);
                const responseCal = await fetch(`https://api.thingspeak.com/channels/2311047/fields/4.json?api_key=LJLFEUXM4RY0RF47&results=2`);

                if (!response.ok && !responseTemp.ok && !responseHum.ok && !responseCal.ok) {
                    const message = 'An error occurred';
                    window.alert(message);
                    return;
                }
        
                const records = await response.json();
                const recordsTemp = await responseTemp.json();
                const recordsHum = await responseHum.json();
                const recordsCal = await responseCal.json();
                console.log(records.feeds[1].field1);
                console.log(recordsTemp.feeds[1].field1);
                console.log(recordsHum.feeds[1].field2);
                console.log(recordsCal.feeds[1].field4);
                setActive(records.feeds[1].field1);
                setRecords(records);
                setTemperatura(recordsTemp.feeds[1].field1);
                setCalidad(recordsCal.feeds[1].field4);
                setHumedad(recordsHum.feeds[1].field2);
            }
            catch (err) {
                console.log(err);
            }
        }
        getRecords();
    }, [])

const handleDes = async () => {
    try {
        const response = await fetch(`https://api.thingspeak.com/update?api_key=ABA32ZOZ5Q8VYFLR&field1=0`);
        if (!response.ok) {
            const message = `An error occurred: ${response.statusText}`;
            window.alert(message);
            return;
        }
        const records = await response.json();
        console.log(records);
        records !== 0 ? setActive("0") : alert('Espera un poco antes de actualizar');
    }
    catch (err) {
        console.log(err);
    }
}

const handleAct = async () => {
    try {
        const response = await fetch(`https://api.thingspeak.com/update?api_key=ABA32ZOZ5Q8VYFLR&field1=1`);
        if (!response.ok) {
            const message = `An error occurred: ${response.statusText}`;
            window.alert(message);
            return;
        }
        const records = await response.json();
        console.log(records);
        records !== 0 ? setActive("1") : alert('Espera un poco antes de actualizar');
    }
    catch (err) {
        console.log(err);
    }
}

return (
    <div className='top'>

        <div className='main-container'>
        <div className='inner-containers'>
            Alarma: {active === '1' ? 'Activada' : 'Desactivada'}
        </div>

        <div className='inner-containers'>
            {active === '1' ? <button className='btn-primary' onClick={handleDes}>Desactivar Alarma</button> : <button className='btn-primary' onClick={handleAct}>Activar Alarma</button>}
        </div>

        <div className='data-container'>
            <div className='inner-data-container'>
                <p>Temperatura</p>
                <p>{temperatura}°C</p>
            </div>
            <div className='inner-data-container'>
                <p>Calidad Aire</p>
                <p>{calidad < 1000 ? "Excelente" : calidad < 2500 ? "Aceptable" : calidad < 5000 ? "Mala" : "Terrible"}</p>
            </div>
            <div className='inner-data-container'>
                <p>Humedad</p>
                <p>{humedad}%</p>
            </div>
        </div>
        </div>

            
    </div>
);
}

export default Home;
  