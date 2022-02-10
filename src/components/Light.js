import React from 'react'
import { shallowEqual, useSelector } from 'react-redux'

const Light = ({device, http, tile, mqtt, useHttp, useMqtt, useMqttSub}) => {

    const device_state = useSelector(state => state.DeviceController.data[tile.id], shallowEqual) || {}
    const client = useMqtt()
    let is_on = device_state[http['get_state']] && device_state[http['get_state']]?.ison ? true: false

    if(device_state[mqtt['get_state']]) {
        is_on = device_state[mqtt['get_state']] === 'on' ? true: false
    }

    useMqttSub(client, mqtt['get_state'], tile.id)

    useHttp(device.id, tile.id, http['get_state'])
    
    const handleClick = () => client.publish(mqtt['toggle'], 'toggle')

    let style = {
        width: '100%',
        cursor: 'pointer',
        color: '' 
    }

    let txt = 'Off'

    if(is_on) {
        style.color = '#6fc796' 
        txt = 'On'
    }
    
    return (
        <div className="txt_center">
            <span 
                onClick={() => handleClick()} 
                style={style} 
                className="tile-icon material-icons f125"
            >lightbulb</span>
            <p style={{color: style.color}}>{txt}</p>
        </div>
    )
}

export default Light