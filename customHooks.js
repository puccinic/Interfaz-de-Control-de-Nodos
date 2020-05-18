import { useState, useEffect } from 'react'


function useNodesData() {
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

    return [nodesData, sNode, setNodesData, setSNode]
}


function useNodeData(node) {
    const [nodeData, setNodeData] = useState(undefined)
    const [errorMessage, setErrorMessage] = useState(undefined)

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch('http://localhost:4000/ControlNodo?' + new URLSearchParams({ id: node }))

                if (!response.ok) throw new Error('Algo salio mal')

                const data = await response.json()

                if (data.message) throw new Error(data.message)
                setNodeData(data)

            } catch (error) {
                console.log(error)
                setErrorMessage(error.message)
            }
        }
        const timer = setInterval(() => {
            fetchData()
        }, 5000)
        return () => clearInterval(timer)

    }, [])

    return [nodeData, errorMessage]
}


export { useNodesData, useNodeData}