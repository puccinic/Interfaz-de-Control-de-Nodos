import {useState,useEffect} from 'react'


function useNodesData(){
    const [nodesData, setNodesData] = useState(undefined)
    const [sNode, setSNode] = useState(632)
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch('http://localhost:4000/Datos')
                if (!response.ok) throw new Error("Algo salio mal")

                const data = await response.json()
                setNodesData(data)
            } catch (error) {
                console.log('Error: ', error)
            }
        }
        fetchData()
    }, [])

    return [nodesData,sNode,setNodesData,setSNode]
}


export {useNodesData}