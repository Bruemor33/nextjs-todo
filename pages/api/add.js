import { db_connections } from "../../project.config"

export default async (req, res) => {
    if (!req.query.todo) {
        return res.status(400).send('Todo param required!')
    }

    let todo = encodeURI(req.query.todo)

    const token = db_connections.token
    const url = `${db_connections.url}/lbush/todo/${todo}?_token=${token}`

    return fetch(url)
        .then(r => r.json())
        .then(data => {
            let result = JSON.stringify(data.result)
            console.log('raw_data', data)
            console.log('result', result)
            return res.status(200).json(result)
        })
}