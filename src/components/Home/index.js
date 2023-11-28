import React, { useEffect, useState } from 'react';
import alarm from './triangle-exclamation-solid.svg';
import './style.css';

const Home = () => {
    const [records, setRecords] = useState([]);
    const [active, setActive] = useState(0);
    const [temperatura, setTemperatura] = useState(0);
    const [calidad, setCalidad] = useState(0);
    const [distancia, setDistancia] = useState(0);
    const [humedad, setHumedad] = useState(0);

    async function getRecords() {
        try {
            const responseTemp = await fetch(`https://api.thingspeak.com/channels/2311047/fields/1.json?api_key=LJLFEUXM4RY0RF47&results=2`);
            const responseHum = await fetch(`https://api.thingspeak.com/channels/2311047/fields/2.json?api_key=LJLFEUXM4RY0RF47&results=2`);
            const responseDis = await fetch(`https://api.thingspeak.com/channels/2311047/fields/3.json?api_key=LJLFEUXM4RY0RF47&results=2`);
            const responseCal = await fetch(`https://api.thingspeak.com/channels/2311047/fields/4.json?api_key=LJLFEUXM4RY0RF47&results=2`);
    
            const recordsTemp = await responseTemp.json();
            const recordsHum = await responseHum.json();
            const recordsDis = await responseDis.json();
            const recordsCal = await responseCal.json();
            console.log(records.feeds[1].field1);
            console.log(recordsTemp.feeds[1].field1);
            console.log(recordsHum.feeds[1].field2);
            console.log(recordsDis.feeds[1].field3);
            console.log(recordsCal.feeds[1].field4);
            setActive(records.feeds[1].field1);
            setRecords(records);
            setTemperatura(recordsTemp.feeds[1].field1);
            setDistancia(recordsDis.feeds[1].field3);
            setCalidad(recordsCal.feeds[1].field4);
            setHumedad(recordsHum.feeds[1].field2);
        }
        catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        let mounted = true;
        let isMounted = true
        const intervalId = setInterval(() => {
        getRecords()
        .then(itemsa => {
          if(mounted) {
            setRecords(itemsa)
          }
        })
      }, 1000)
      return () => {
        clearInterval(intervalId);
        mounted = false;
      }
      }, [records])

    useEffect(() => {
        async function getAct() {
            const response = await fetch(`https://api.thingspeak.com/channels/2354453/fields/1.json?api_key=4FZGVC9KG39BNTEZ&results=2`);

            if (!response.ok) {
                const message = `An error occurred: ${response.statusText}`;
                window.alert(message);
                return;
            }

            const records = await response.json();
            console.log(records.feeds[1].field1);
            setActive(records.feeds[1].field1);

        }
        getAct();
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
            <div className='inner-data-container' style={{backgroundColor: calidad < 400 ? "#f0f8ff" : calidad < 500 ? "rgba(255, 212, 148, 0.973)" : calidad < 600 ? "rgba(255, 146, 103, 0.973)" : "rgba(255, 84, 41, 0.973)"}}>
                <p>Calidad Aire</p>
                <p>{calidad < 400 ? "Excelente" : calidad < 500 ? "Aceptable" : calidad < 600 ? "Mala" : "Terrible"}</p>
            </div>
            <div className='inner-data-container'>
                <p>Humedad</p>
                <p>{humedad}%</p>
            </div>
        </div>

        {((distancia > 5) && (active === "1")) && <div>
            <div className='alerta'>
                <p>ALARMA!</p>
                <img className='alerta-icon' src={alarm} alt='alarm' />
            </div>
        </div>}
        </div>

            
    </div>
);
}

export default Home;
  