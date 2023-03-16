import axios from 'axios'
import React from 'react'

const handler = async (req, res) => {
    
    try {
        const {data} = await axios.get('https://data.ct.gov/resource/rf3k-f8fg.json');

        res.send(data)
    } catch (error) {
        res.status('401').send(error)
    }
};

export default handler;
